import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FileText,
  Plus,
  Trash2,
  ArrowLeft,
  RefreshCw,
  Download,
} from "lucide-react";
import {
  getTranslations,
  availableLanguages,
  Translations,
} from "../translations";
import { notifiedBodies, NotifiedBody } from "../notifiedBodies";

// Import Inter font
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

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

export interface DocFormData {
  productName: string;
  productCode: string[];
  brandName: string;
  brandLogo: string;
  manufacturerAddress: string;
  notifiedBodyName: string;
  notifiedBodyNumber: string;
  notifiedBodyAddress: string;
  notifiedBodyZipCode: string;
  notifiedBodyCountry: string;
  legislation: string[];
  standards: string[];
  certificateNumber: string;
  categoryClass: string;
  moduleType: string;
  selectedNotifiedBodyId: string;
  showCertificateNumber?: boolean;
}

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

  const handleDownloadPDF = async () => {
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
          scale: 3,
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
        });
        
        // Calculate dimensions to fit A4 while maintaining aspect ratio
        const imgData = canvas.toDataURL('image/png');
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
        pdf.addImage(imgData, 'PNG', xOffset, yOffset, imgWidth, imgHeight);
      }
      
      // Clean up the temporary element
      document.body.removeChild(contentClone);
      
      // Save the PDF directly (this forces download without preview)
      pdf.save(filename);
      
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    }
  };

  // Use English for UI buttons instead of the first selected language
  const uiTranslations = getTranslations("en");

  return (
    <div className="p-8 bg-surface h-full overflow-auto">
      <div className="flex justify-center items-start gap-x-4 print:block">
        <div className="print:hidden sticky top-4 self-start flex-shrink-0 z-10">
          <button
            onClick={() => setShowPreview(false)}
            className="bg-surface-tertiary text-primary-700 py-2 px-4 rounded-md hover:bg-surface-secondary focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-30 transition-all duration-200 text-sm font-medium flex items-center gap-2 shadow-button"
          >
            <ArrowLeft className="w-4 h-4" />
            {uiTranslations.backToFormButton}
          </button>
        </div>

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
                  <div className="text-sm">
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

                  <div className="text-right text-sm">
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
        <div className="print:hidden sticky top-4 self-start flex-shrink-0 z-10">
          <button
            onClick={handleDownloadPDF}
            className="bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-30 transition-all duration-200 text-sm font-medium flex items-center gap-2 shadow-button hover:shadow-button-hover"
          >
            <Download className="w-4 h-4" />
            {uiTranslations.downloadPdfButton}
          </button>
        </div>
      </div>
    </div>
  );
};

// Update input styles to create a more refined, premium look
const inputClassName =
  "mt-1 block w-full rounded-md border-0 bg-surface-tertiary py-1.5 px-3 text-primary-800 shadow-subtle ring-0 placeholder:text-primary-400 focus:bg-surface focus:ring-2 focus:ring-accent focus:ring-opacity-30 transition-all duration-200 sm:text-sm";
const selectClassName =
  "mt-1 block w-full rounded-md border-0 bg-surface-tertiary py-1.5 px-3 text-primary-800 shadow-subtle ring-0 focus:bg-surface focus:ring-2 focus:ring-accent focus:ring-opacity-30 transition-all duration-200 sm:text-sm";
const checkboxClassName =
  "h-4 w-4 rounded border-0 bg-surface-tertiary text-accent shadow-subtle focus:ring-2 focus:ring-accent focus:ring-offset-0 transition-colors duration-200";

export default function DocForm({ onClearForm }: { onClearForm?: () => void }) {
  const navigate = useNavigate();
  const location = useLocation();
  const initialFormData: DocFormData = {
    productName: "",
    productCode: [""],
    brandName: "",
    brandLogo: "",
    manufacturerAddress:
      "Båstadgruppen AB\nFraktgatan 1\n262 73 Ängelholm\nSweden",
    notifiedBodyName: "",
    notifiedBodyNumber: "",
    notifiedBodyAddress: "",
    notifiedBodyZipCode: "",
    notifiedBodyCountry: "",
    legislation: [""],
    standards: [""],
    certificateNumber: "",
    categoryClass: "",
    moduleType: "",
    selectedNotifiedBodyId: "",
    showCertificateNumber: true,
  };

  const [formData, setFormData] = useState<DocFormData>(() => {
    try {
      const savedData = localStorage.getItem("docFormData");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed && typeof parsed.productName !== "undefined") {
          return { ...initialFormData, ...parsed };
        }
      }
      return initialFormData;
    } catch (error) {
      console.error("Error loading form data from localStorage:", error);
      return initialFormData;
    }
  });

  const [showPreview, setShowPreview] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(["en"]);
  const [currentLanguage, setCurrentLanguage] = useState<string>(
    availableLanguages[0].code
  );

  const t = getTranslations(currentLanguage);

  // Add a loading state for the PDF generation
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (location.pathname === "/doc" && location.state) {
      const { formData: navFormData, selectedLanguages: navSelectedLanguages } =
        location.state as {
          formData: DocFormData;
          selectedLanguages: string[];
        };
      if (navFormData && navSelectedLanguages) {
        setFormData(navFormData);
        setSelectedLanguages(navSelectedLanguages);
        setShowPreview(true);
        window.scrollTo(0, 0);
      }
    } else {
      setShowPreview(false);
    }
  }, [location]);

  const clearForm = () => {
    setFormData(initialFormData);
    setSelectedLanguages(["en"]);
    localStorage.removeItem("docFormData");
    if (onClearForm) onClearForm();
  };

  useEffect(() => {
    try {
      localStorage.setItem("docFormData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving form data to localStorage:", error);
    }
  }, [formData]);

  useEffect(() => {
    if (onClearForm) {
      // @ts-ignore - This is a hack to expose the clearForm function to the parent
      window.__clearDocForm = clearForm;
    }
    return () => {
      // @ts-ignore
      delete window.__clearDocForm;
    };
  }, [onClearForm]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof DocFormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: keyof DocFormData | "notifiedBodySelect"
  ) => {
    const value = e.target.value;

    if (field === "notifiedBodySelect") {
      const selectedBody = notifiedBodies.find((body) => body.id === value);
      if (selectedBody) {
        setFormData({
          ...formData,
          selectedNotifiedBodyId: value,
          notifiedBodyName: selectedBody.name || "",
          notifiedBodyNumber: selectedBody.number || "",
          notifiedBodyAddress: selectedBody.address || "",
          notifiedBodyZipCode: selectedBody.zipCode || "",
          notifiedBodyCountry: selectedBody.country || "",
        });
      }
    } else if (field === "showCertificateNumber") {
      setFormData({
        ...formData,
        showCertificateNumber: value === "yes",
      });
    } else {
      const brandLogoMap: Record<string, string> = {
        Guardio: "/brands/guardio.png",
        Matterhorn: "/brands/matterhorn.png",
        Monitor: "/brands/monitor.png",
        "Top Swede": "/brands/top-swede.png",
        "South West": "/brands/south-west.png",
      };

      setFormData((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "brandName" && { brandLogo: brandLogoMap[value] || "" }),
      }));
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked, id } = e.target;

    if (id === "lang-all") {
      if (checked) {
        setSelectedLanguages(availableLanguages.map((lang) => lang.code));
      } else {
        setSelectedLanguages([]);
      }
    } else {
      setSelectedLanguages((prev) =>
        checked ? [...prev, value] : prev.filter((lang) => lang !== value)
      );
    }
  };

  const handleProductCodeChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      productCode: prev.productCode.map((code, i) =>
        i === index ? value : code
      ),
    }));
  };

  const addProductCode = () => {
    setFormData((prev) => ({
      ...prev,
      productCode: [...prev.productCode, ""],
    }));
  };

  const removeProductCode = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      productCode: prev.productCode.filter((_, i) => i !== index),
    }));
  };

  const handleStandardChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      standards: prev.standards.map((standard, i) =>
        i === index ? value : standard
      ),
    }));
  };

  const addStandard = () => {
    setFormData((prev) => ({
      ...prev,
      standards: [...prev.standards, ""],
    }));
  };

  const removeStandard = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      standards: prev.standards.filter((_, i) => i !== index),
    }));
  };

  const handleLegislationChange = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      legislation: prev.legislation.map((item, i) =>
        i === index ? value : item
      ),
    }));
  };

  const addLegislation = () => {
    setFormData((prev) => ({
      ...prev,
      legislation: [...prev.legislation, ""],
    }));
  };

  const removeLegislation = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      legislation: prev.legislation.filter((_, i) => i !== index),
    }));
  };

  const generateDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedLanguages.length === 0) {
      alert("Please select at least one language.");
      return;
    }
    if (
      !formData.productName ||
      !formData.productCode[0] ||
      !formData.categoryClass
    ) {
      alert(
        "Please fill in Product Name, at least one Product Number, and Category Class."
      );
      return;
    }
    if (formData.categoryClass === "III" && !formData.moduleType) {
      alert("Please select a Module Type for Class III.");
      return;
    }
    if (!formData.selectedNotifiedBodyId) {
      alert('Please select a Notified Body or choose "Other".');
      return;
    }
    if (
      formData.selectedNotifiedBodyId === "other" &&
      (!formData.notifiedBodyName ||
        !formData.notifiedBodyNumber ||
        !formData.notifiedBodyAddress ||
        !formData.notifiedBodyZipCode ||
        !formData.notifiedBodyCountry)
    ) {
      alert(
        'Please fill in all Notified Body details when "Other" is selected.'
      );
      return;
    }
    if (!formData.certificateNumber && (formData.categoryClass !== "I" || formData.showCertificateNumber !== false)) {
      alert("Please enter the Certificate Number.");
      return;
    }

    setIsGenerating(true);

    // Add a small delay to show loading state
    setTimeout(() => {
      navigate("/doc", { state: { formData, selectedLanguages } });
      setIsGenerating(false);
    }, 300);
  };

  if (showPreview) {
    return (
      <DocumentPreview
        formData={formData}
        selectedLanguages={selectedLanguages}
        setShowPreview={() => navigate("/")}
      />
    );
  }

  return (
    <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-10 font-inter">
      {!showPreview ? (
        <form
          onSubmit={generateDoc}
          className="space-y-8 mx-auto w-full max-w-2xl lg:max-w-none animate-fade-in"
        >
          <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-card border border-border-light">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-base font-semibold leading-7 text-primary-900">
                  Languages
                </h3>
                <div className="flex items-center">
                  <div className="flex h-6 items-center">
                    <input
                      id="lang-all"
                      name="languages-all"
                      type="checkbox"
                      checked={
                        selectedLanguages.length === availableLanguages.length
                      }
                      onChange={handleLanguageChange}
                      className={checkboxClassName}
                    />
                  </div>
                  <div className="ml-2 text-sm leading-6">
                    <label
                      htmlFor="lang-all"
                      className="font-medium text-primary-800"
                    >
                      Select All
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {availableLanguages.map((lang) => (
                  <div key={lang.code} className="relative flex items-center">
                    <div className="flex h-6 items-center">
                      <input
                        id={`lang-${lang.code}`}
                        name="languages"
                        type="checkbox"
                        value={lang.code}
                        checked={selectedLanguages.includes(lang.code)}
                        onChange={handleLanguageChange}
                        className={checkboxClassName}
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor={`lang-${lang.code}`}
                        className="font-medium text-primary-800"
                      >
                        {lang.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-card border border-border-light">
            <h3 className="text-base font-semibold leading-7 text-primary-900 mb-4">
              Product Information
            </h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-primary-800"
                  >
                    Product Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="productName"
                    required
                    placeholder="Enter product name"
                    className={inputClassName}
                    value={formData.productName}
                    onChange={(e) => handleInputChange(e, "productName")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-800 mb-1">
                    Product number(s) <span className="text-red-500">*</span>
                  </label>
                  <div className="space-y-2">
                    {formData.productCode.map((code, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          required={index === 0}
                          placeholder="Enter product number"
                          className={inputClassName}
                          value={code}
                          onChange={(e) =>
                            handleProductCodeChange(index, e.target.value)
                          }
                        />
                        {formData.productCode.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeProductCode(index)}
                            className="p-2 text-primary-400 hover:text-red-600 rounded-md focus:outline-none focus:ring-0 transition-colors duration-150"
                            aria-label="Remove product number"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addProductCode}
                      className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover focus:outline-none focus:ring-0 rounded-md transition-colors duration-150"
                    >
                      <Plus className="w-4 h-4" /> Add product number
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-card border border-border-light">
            <h3 className="text-base font-semibold leading-7 text-primary-900 mb-4">
              Manufacturer Details
            </h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-800 mb-3">
                  Brand / Manufacturer <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {[
                    "Guardio",
                    "Matterhorn",
                    "Monitor",
                    "Top Swede",
                    "South West",
                  ].map((brand) => (
                    <div
                      key={brand}
                      onClick={() => {
                        const fakeEvent = {
                          target: {
                            value: brand,
                          },
                        } as unknown as React.ChangeEvent<HTMLSelectElement>;
                        handleSelectChange(fakeEvent, "brandName");
                      }}
                      className={`border rounded-md p-4 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 ${
                        formData.brandName === brand
                          ? "border-accent bg-surface-secondary shadow-md"
                          : "border-border-light hover:border-border hover:bg-surface-tertiary"
                      }`}
                    >
                      <div className="h-12 flex items-center justify-center mb-2">
                        <img
                          src={`/brands/${brand
                            .toLowerCase()
                            .replace(" ", "-")}.png`}
                          alt={`${brand} logo`}
                          className="h-8 object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-primary-800">
                        {brand}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-800">
                  Manufacturer Address
                </label>
                <div className="mt-1 p-3 bg-surface-tertiary rounded-md text-sm text-primary-700 border border-border-light">
                  Båstadgruppen AB
                  <br />
                  Fraktgatan 1<br />
                  262 73 Ängelholm
                  <br />
                  Sweden
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface p-6 sm:p-8 rounded-lg shadow-card border border-border-light">
            <h3 className="text-base font-semibold leading-7 text-primary-900 mb-4">
              Compliance Information
            </h3>
            <div className="space-y-6">
              <div className="pb-6 border-b border-border-light">
                <label
                  htmlFor="notifiedBodySelect"
                  className="block text-sm font-medium text-primary-800 mb-2"
                >
                  Notified Body <span className="text-red-500">*</span>
                </label>
                <select
                  id="notifiedBodySelect"
                  required
                  className={selectClassName}
                  value={formData.selectedNotifiedBodyId}
                  onChange={(e) => handleSelectChange(e, "notifiedBodySelect")}
                >
                  <option value="">Select Notified Body...</option>
                  {notifiedBodies.map((body) => (
                    <option key={body.id} value={body.id}>
                      {body.name} ({body.number})
                    </option>
                  ))}
                  <option value="other">Other (Enter Manually)</option>
                </select>

                {formData.selectedNotifiedBodyId === "other" && (
                  <div className="mt-4 space-y-4 p-5 bg-surface-tertiary rounded-md border border-border-light">
                    <p className="text-sm text-primary-600 mb-3">
                      Enter Notified Body details manually:
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="notifiedBodyName"
                          className="block text-sm font-medium text-primary-800"
                        >
                          Name <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="notifiedBodyName"
                          required
                          className={inputClassName}
                          value={formData.notifiedBodyName}
                          onChange={(e) =>
                            handleInputChange(e, "notifiedBodyName")
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="notifiedBodyNumber"
                          className="block text-sm font-medium text-primary-800"
                        >
                          Number <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="notifiedBodyNumber"
                          required
                          className={inputClassName}
                          value={formData.notifiedBodyNumber}
                          onChange={(e) =>
                            handleInputChange(e, "notifiedBodyNumber")
                          }
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label
                          htmlFor="notifiedBodyAddress"
                          className="block text-sm font-medium text-primary-800"
                        >
                          Address <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="notifiedBodyAddress"
                          required
                          className={inputClassName}
                          value={formData.notifiedBodyAddress}
                          onChange={(e) =>
                            handleInputChange(e, "notifiedBodyAddress")
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="notifiedBodyZipCode"
                          className="block text-sm font-medium text-primary-800"
                        >
                          Zip Code <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="notifiedBodyZipCode"
                          required
                          className={inputClassName}
                          value={formData.notifiedBodyZipCode}
                          onChange={(e) =>
                            handleInputChange(e, "notifiedBodyZipCode")
                          }
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="notifiedBodyCountry"
                          className="block text-sm font-medium text-primary-800"
                        >
                          Country <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="notifiedBodyCountry"
                          required
                          className={inputClassName}
                          value={formData.notifiedBodyCountry}
                          onChange={(e) =>
                            handleInputChange(e, "notifiedBodyCountry")
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-800 mb-1">
                    Relevant EU Legislation
                  </label>
                  <div className="space-y-2">
                    {formData.legislation.map((item, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          required={index === 0}
                          placeholder="e.g., Regulation (EU) 2016/425"
                          className={inputClassName}
                          value={item}
                          onChange={(e) =>
                            handleLegislationChange(index, e.target.value)
                          }
                        />
                        {formData.legislation.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeLegislation(index)}
                            className="p-2 text-primary-400 hover:text-red-600 rounded-md focus:outline-none focus:ring-0 transition-colors duration-150"
                            aria-label="Remove legislation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addLegislation}
                      className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover focus:outline-none focus:ring-0 rounded-md transition-colors duration-150"
                    >
                      <Plus className="w-4 h-4" /> Add Legislation
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-primary-800 mb-1">
                    Harmonised Standards
                  </label>
                  <div className="space-y-2">
                    {formData.standards.map((standard, index) => (
                      <div key={index} className="flex gap-2 items-center">
                        <input
                          type="text"
                          required={index === 0}
                          placeholder="e.g., EN ISO 21420:2020"
                          className={inputClassName}
                          value={standard}
                          onChange={(e) =>
                            handleStandardChange(index, e.target.value)
                          }
                        />
                        {formData.standards.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeStandard(index)}
                            className="p-2 text-primary-400 hover:text-red-600 rounded-md focus:outline-none focus:ring-0 transition-colors duration-150"
                            aria-label="Remove standard"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={addStandard}
                      className="inline-flex items-center gap-1 text-sm text-accent hover:text-accent-hover focus:outline-none focus:ring-0 rounded-md transition-colors duration-150"
                    >
                      <Plus className="w-4 h-4" /> Add standard
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="certificateNumber"
                    className="block text-sm font-medium text-primary-800"
                  >
                    Certificate Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="certificateNumber"
                    placeholder="Enter certificate number"
                    required
                    className={inputClassName}
                    value={formData.certificateNumber}
                    onChange={(e) => handleInputChange(e, "certificateNumber")}
                  />
                </div>

                <div>
                  <label
                    htmlFor="categoryClass"
                    className="block text-sm font-medium text-primary-800"
                  >
                    Category Class <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="categoryClass"
                    required
                    className={selectClassName}
                    value={formData.categoryClass}
                    onChange={(e) => handleSelectChange(e, "categoryClass")}
                  >
                    <option value="">Select category class</option>
                    <option value="I">Class I</option>
                    <option value="II">Class II</option>
                    <option value="III">Class III</option>
                  </select>
                </div>
              </div>

              {formData.categoryClass === "III" && (
                <div>
                  <label
                    htmlFor="moduleType"
                    className="block text-sm font-medium text-primary-800"
                  >
                    Module Type (for Class III){" "}
                    <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="moduleType"
                    required
                    className={selectClassName}
                    value={formData.moduleType}
                    onChange={(e) => handleSelectChange(e, "moduleType")}
                  >
                    <option value="">Select module type</option>
                    <option value="Module C2">Module C2</option>
                    <option value="Module D">Module D</option>
                  </select>
                </div>
              )}

              {formData.categoryClass === "I" && (
                <div>
                  <div className="flex items-center">
                    <div className="flex h-6 items-center">
                      <input
                        id="showCertificateNumber"
                        type="checkbox"
                        checked={formData.showCertificateNumber !== false}
                        onChange={(e) => {
                          setFormData({
                            ...formData,
                            showCertificateNumber: e.target.checked
                          });
                        }}
                        className={checkboxClassName}
                      />
                    </div>
                    <div className="ml-3 text-sm leading-6">
                      <label
                        htmlFor="showCertificateNumber"
                        className="font-medium text-primary-800"
                      >
                        Add Certificate No.
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-center py-6">
            <button
              type="submit"
              disabled={isGenerating}
              className={`bg-accent text-white py-3 px-6 rounded-md shadow-button transition-all duration-200 text-base font-semibold flex items-center justify-center gap-2 hover:bg-accent-hover hover:shadow-button-hover focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 w-full max-w-xs ${
                isGenerating ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FileText className="w-5 h-5" />
                  Generate Declaration
                </>
              )}
            </button>
          </div>
        </form>
      ) : (
        <div className="w-full">
          <div
            className="bg-white rounded-lg shadow-card border border-border-light overflow-hidden animate-fade-in font-inter"
            style={{ minHeight: "calc(100vh - 200px)" }}
          >
            <DocumentPreview
              formData={formData}
              selectedLanguages={selectedLanguages}
              setShowPreview={setShowPreview}
            />
          </div>
        </div>
      )}
    </div>
  );
}
