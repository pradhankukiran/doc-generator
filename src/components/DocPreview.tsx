import React, { useState, useEffect, useRef, useCallback } from "react";
import { RefreshCw } from "lucide-react";
import { Document, Page, pdfjs } from 'react-pdf';

import { getTranslations } from "../translations";
import { DocFormData } from "../types/doc";

// Import Inter font
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

// Configure pdfjs worker for react-pdf
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export function useImage(path: string) {
  const [image, setImage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!path) {
      setIsLoading(false);
      setError(true);
      return;
    }

    setIsLoading(true);
    setError(false);

    fetch(path)
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const blob = await response.blob();
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(blob);
        });
      })
      .then((dataUrl) => {
        setImage(dataUrl);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading image:", error);
        setError(true);
        setIsLoading(false);
      });
  }, [path]);

  return { image, isLoading, error };
}

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const DocumentPreview = ({
  formData,
  selectedLanguages,
  setShowPreview,
}: {
  formData: DocFormData;
  selectedLanguages: string[];
  setShowPreview: (show: boolean) => void;
}) => {
  const {
    image: brandLogo,
    isLoading: brandLogoLoading,
    error: brandLogoError,
  } = useImage(formData.brandLogo);
  const showBrandLogo = !brandLogoLoading && !brandLogoError && brandLogo;
  const documentRef = useRef<HTMLDivElement>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(true);
  const [numPages, setNumPages] = useState<number>(0);

  const signatureMap: Record<string, { file: string; name: string }> = {
    Guardio: { file: "/signatures/Nawar.png", name: "Nawar Toma" },
    Matterhorn: { file: "/signatures/Catrin.png", name: "Catrin Ogenvall" },
    Monitor: { file: "/signatures/Ove.png", name: "Ove Nilsson" },
    "Top Swede": { file: "/signatures/Kristin.png", name: "Kristin Hallbäck" },
    "South West": { file: "/signatures/Helena.png", name: "Helena Rydberg" },
  };

  const signatureData = formData.brandName
    ? signatureMap[formData.brandName]
    : null;

  const {
    image: signatureImage,
    isLoading: signatureLoading,
    error: signatureError,
  } = useImage(signatureData ? signatureData.file : "");

  const showSignature =
    !signatureLoading && !signatureError && signatureImage && signatureData;

  const handlePrint = () => {
    window.print();
  };

  const generatePdf = useCallback(async (outputType: 'bloburl' | 'save') => {
    if (!documentRef.current) return;

    // First apply high contrast styling to ensure dark text
    const contentElement = documentRef.current;
    const contentClone = contentElement.cloneNode(true) as HTMLElement;
    
    // Apply forced dark text styling and Inter font
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        color: #000 !important;
        text-shadow: none !important;
        filter: none !important;
        -webkit-text-stroke: none !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
      }
      p, span, h1, h2, h3, h4, h5, h6, div {
        color: #000 !important;
        opacity: 1 !important;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif !important;
      }
      img {
        opacity: 1 !important;
        filter: contrast(1.2) !important;
      }
      .text-gray-600 {
        color: #000 !important;
      }
    `;
    contentClone.appendChild(style);
    
    try {
      // Import required libraries
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      
      const filename = `DOC-${formData.brandName || "Bastadgruppen"}-${
        formData.productName || "Declaration"
      }-${formData.productCode.join("-") || "N/A"}.pdf`;
      
      // Temporarily append the clone to the document to render it correctly
      contentClone.style.position = 'absolute';
      contentClone.style.left = '-9999px';
      document.body.appendChild(contentClone);
      
      // Create a new PDF document
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      
      // Define professional margins (in mm)
      const horizontalMargin = 15; // 15mm margin on left and right
      
      // Process each language page
      const pages = contentClone.querySelectorAll('.language-page');
      
      for (let i = 0; i < pages.length; i++) {
        // If not the first page, add a new page to the PDF
        if (i > 0) {
          pdf.addPage();
        }
        
        // Capture the current page as canvas
        const canvas = await html2canvas(pages[i] as HTMLElement, {
          scale: 2,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        });
        
        // Calculate dimensions to fit A4 while maintaining aspect ratio
        const imgData = canvas.toDataURL('image/jpeg', 0.95);
        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        
        // Apply horizontal margins
        const availableWidth = pageWidth - (2 * horizontalMargin);
        
        // Calculate the proper scaling to maintain aspect ratio
        const canvasRatio = canvas.width / canvas.height;
        
        // Set the content width to the available width (accounting for margins)
        let imgWidth = availableWidth;
        let imgHeight = imgWidth / canvasRatio;
        
        // If height exceeds page height, scale down based on height
        if (imgHeight > pageHeight) {
          imgHeight = pageHeight;
          imgWidth = imgHeight * canvasRatio;
          // Ensure width doesn't exceed available width
          if (imgWidth > availableWidth) {
            imgWidth = availableWidth;
            imgHeight = imgWidth / canvasRatio;
          }
        }
        
        // Center the image horizontally with the defined margins
        const xOffset = horizontalMargin + (availableWidth - imgWidth) / 2;
        
        // Center vertically
        const yOffset = (pageHeight - imgHeight) / 2;
        
        // Add image to PDF with appropriate scaling and positioning
        pdf.addImage(imgData, 'JPEG', xOffset, yOffset, imgWidth, imgHeight);
      }
      
      // Clean up the temporary element
      document.body.removeChild(contentClone);
      
      if (outputType === 'save') {
        pdf.save(filename);
      } else {
        return pdf.output('bloburl');
      }
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
    return null;
  }, [formData]);

  useEffect(() => {
    const generatePreview = async () => {
      // A brief delay to allow the hidden content to render fully
      await new Promise(resolve => setTimeout(resolve, 300));
      const url = await generatePdf('bloburl');
      if (url) {
        setPdfUrl(`${url.toString()}#toolbar=0`);
      }
      setIsGeneratingPreview(false);
    };

    generatePreview();
  }, [generatePdf]);

  const handleDownloadPDF = useCallback(async () => {
    await generatePdf('save');
  }, [generatePdf]);

  useEffect(() => {
    // @ts-ignore
    window.__downloadPDF = handleDownloadPDF;
    return () => {
      // @ts-ignore
      delete window.__downloadPDF;
    };
  }, [handleDownloadPDF]);

  const onDocumentLoadSuccess = ({ numPages: nextNumPages }: { numPages: number }) => {
    setNumPages(nextNumPages);
  };

  // Use English for UI buttons instead of the first selected language
  const uiTranslations = getTranslations("en");

  return (
    <div className="w-full h-full bg-surface flex justify-center items-center">
      {isGeneratingPreview ? (
        <div className="text-center">
          <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-4 text-accent" />
          <p className="text-lg font-medium text-primary-800">
            Generating PDF Preview...
          </p>
          <p className="text-sm text-primary-600">Please wait a moment.</p>
        </div>
      ) : (
        pdfUrl && (
          <div className="w-full max-w-4xl h-[85vh] bg-white shadow-lg rounded-lg overflow-y-scroll p-4">
            <Document
              file={pdfUrl}
              onLoadSuccess={onDocumentLoadSuccess}
              loading={
                <div className="flex flex-col items-center justify-center h-full text-primary-700">
                  <RefreshCw className="w-6 h-6 animate-spin mb-2" />
                  Loading Preview...
                </div>
              }
              className="flex flex-col items-center gap-4"
            >
              {Array.from(new Array(numPages), (_el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  width={750}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              ))}
            </Document>
          </div>
        )
      )}

      {/* Hidden container for PDF generation source */}
      <div className="absolute -left-[9999px] top-0">
        <div
          ref={documentRef}
          className="flex-grow max-w-2xl min-w-0 print:border-0 print:shadow-none shadow-card bg-white rounded-lg overflow-hidden animate-fade-in print:mx-0 print:max-w-full print:flex-auto font-inter"
        >
          {selectedLanguages.map((lang, index) => {
            const t = getTranslations(lang);
            return (
              <div
                key={lang}
                className="p-6 language-page animate-slide-in-bottom"
                style={{
                  pageBreakBefore: index > 0 ? "always" : "auto",
                  animationDelay: `${index * 100}ms`,
                  fontFamily: "'Inter', sans-serif",
                }}
              >
                <div className="flex justify-end mb-3">
                  <img
                    src="/logo.png"
                    alt="Båstadgruppen Logo"
                    className="h-10"
                  />
                </div>
                <div className="flex">
                  <div className="w-6 bg-black h-10 mr-3"></div>
                  <div>
                    <h1 className="text-lg font-bold">{t.docTitle}</h1>
                    <p className="font-medium text-xs">
                      {t.categoryLabel} {formData.categoryClass || "II"}
                      {formData.categoryClass === "II" && " - Module B"}
                      {formData.categoryClass === "III" &&
                        formData.moduleType &&
                        ` - ${formData.moduleType}`}
                    </p>
                  </div>
                </div>

                <p className="my-3 text-sm">{t.responsibilityStatement}</p>

                <p className="text-sm" style={{ marginBottom: "1px" }}>
                  Båstadgruppen AB
                </p>
                <p className="text-sm" style={{ marginBottom: "1px" }}>
                  Fraktgatan 1
                </p>
                <p className="text-sm" style={{ marginBottom: "1px" }}>
                  262 73 Ängelholm
                </p>
                <p className="text-sm" style={{ marginBottom: "5px" }}>
                  Sweden
                </p>

                <div className="my-4 text-center">
                  <p
                    className="mb-6 text-sm"
                    dangerouslySetInnerHTML={{
                      __html: t.ppeLabel.replace("\n", "<br />"),
                    }}
                  />

                  {showBrandLogo && (
                    <div className="flex justify-center my-3">
                      <img src={brandLogo} alt="Brand Logo" className="h-10" />
                    </div>
                  )}

                  <p className="font-bold text-lg my-1">
                    {formData.productName || "Armet Safety Helmet"}
                  </p>
                  <p className="mb-1 text-sm">
                    {t.itemNumberLabel}{" "}
                    {formData.productCode.join(", ") || "1001933"}
                  </p>
                </div>

                <p className="mb-3 text-sm">
                  {t.conformityLegislationLabel}{" "}
                  {formData.legislation[0] || "Regulation (EU) 2016/425"}{" "}
                  {t.harmonisedStandardsLabel}
                </p>
                {formData.standards.length > 0 && formData.standards[0] !== "" ? (
                  <div className="mb-3 text-sm">
                    {formData.standards.map((standard, idx) => (
                      <div key={idx} className="flex items-start">
                        <span className="inline-block w-4 text-center mr-1">
                          •
                        </span>
                        <span>{standard}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="mb-3 text-sm pl-5">
                    EN ISO 21420: 2020, EN 388:2016 + A1:2018 M.
                  </p>
                )}

                {(() => {
                  const notifiedBodyName =
                    formData.notifiedBodyName || "SGS Fimko Ltd.";
                  const notifiedBodyNumber =
                    formData.notifiedBodyNumber || "0598";
                  const certificateNumberVal =
                    formData.certificateNumber || "BP 60132703";
                  const notifiedBodyInfoStr = `${notifiedBodyName} (No ${notifiedBodyNumber})`;
                  let statement = "";

                  if (formData.categoryClass === "I") {
                    if (formData.certificateNumber && formData.showCertificateNumber !== false) {
                      statement = `${t.simpleCertificateLabel || "Certificate:"} ${formData.certificateNumber}`;
                    } else {
                      statement = "\u00A0";
                    }
                  } else if (formData.categoryClass === "II") {
                    statement = `${t.text_theNotifiedBody || "The notified body"} "${notifiedBodyInfoStr}" ${t.text_performedEUExam || "performed the EU type-examination (Module B) and issued the EU type-examination certificate"} "${certificateNumberVal}".`;
                  } else if (formData.categoryClass === "III") {
                    const baseStatement = `${t.text_theNotifiedBody || "The notified body"} "${notifiedBodyInfoStr}" ${t.text_performedEUExam || "performed the EU type-examination (Module B) and issued the EU type-examination certificate"} "${certificateNumberVal}".`;
                    if (formData.moduleType === "Module C2") {
                      statement = `${baseStatement} ${t.text_ppeSubjectToModuleC2 || "The PPE is subject to the conformity assessment procedure based on internal production control plus supervised product checks at random intervals (Module C2) under surveillance of the notified body"} "${notifiedBodyInfoStr}".`;
                    } else if (formData.moduleType === "Module D") {
                      statement = `${baseStatement} ${t.text_ppeSubjectToModuleD || "The PPE is subject to the conformity assessment procedure based on quality assurance of the production process (Module D) under surveillance of the notified body"} "${notifiedBodyInfoStr}".`;
                    } else {
                      statement = baseStatement;
                    }
                  } else {
                    if (formData.certificateNumber) {
                       statement = `${t.simpleCertificateLabel || "Certificate:"} ${certificateNumberVal}`;
                    } else {
                      statement = "";
                    }
                  }
                  return <p className="mb-6 text-sm">{statement}</p>;
                })()}

                <div className="flex justify-between items-start mb-3">
                  <div
                    className="text-sm"
                    style={{
                      visibility: formData.categoryClass === "I" ? "hidden" : "visible",
                    }}
                  >
                    <p className="mb-1">
                      {formData.notifiedBodyName || "SGS Fimko Ltd."}
                    </p>
                    <p className="mb-1">
                      {t.notifiedBodyNumberLabel}{" "}
                      {formData.notifiedBodyNumber || "0598"}
                    </p>
                    <p className="mb-1">
                      {formData.notifiedBodyAddress || "Takomotie 8"}
                    </p>
                    <p>
                      {formData.notifiedBodyZipCode || "FI - 00380"}{" "}
                      {formData.notifiedBodyCountry || "Helsinki"}
                    </p>
                  </div>

                  <div className="text-right text-sm flex-shrink-0">
                    {showSignature ? (
                      <>
                        <div className="h-9 mb-1 flex justify-end">
                          <img
                            src={signatureImage}
                            alt="Signature"
                            className="h-full"
                          />
                        </div>
                        <p className="mb-1">{t.signatureTitle}</p>
                        <p className="mb-1">{signatureData?.name}</p>
                        <p>{formatDate(new Date())}</p>
                      </>
                    ) : (
                      <>
                        <div className="h-9 mb-1"></div>
                        <p className="mb-1">{t.signatureTitle}</p>
                        <p className="mb-1">
                          {signatureData?.name || t.signatureNamePlaceholder}
                        </p>
                        <p>{formatDate(new Date())}</p>
                      </>
                    )}
                  </div>
                </div>

                <div className="pt-10 mt-1 flex justify-between items-center text-xs text-gray-600">
                  <a
                    href="https://www.bastadgruppen.com"
                    className="text-blue-600 hover:underline"
                  >
                    {t.footerWebsite}
                  </a>
                  <span>{t.footerCompanyName}</span>
                  <span>{t.footerPhoneNumber}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DocumentPreview; 