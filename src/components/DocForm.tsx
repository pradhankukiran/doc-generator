import React, { useState, useEffect, useRef } from "react";
import { FileText, Plus, Trash2, ArrowLeft, RefreshCw, Download } from "lucide-react";
import { getTranslations, availableLanguages, Translations } from '../translations';
import { notifiedBodies, NotifiedBody } from '../notifiedBodies';

const useImage = (path: string) => {
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
};

const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

interface DocFormData {
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
}

const DocumentPreview = ({
  formData,
  selectedLanguages,
  setShowPreview
}: {
  formData: DocFormData,
  selectedLanguages: string[],
  setShowPreview: (show: boolean) => void
}) => {
  const { image: brandLogo, isLoading: brandLogoLoading, error: brandLogoError } = useImage(formData.brandLogo);
  const showBrandLogo = !brandLogoLoading && !brandLogoError && brandLogo;
  const documentRef = useRef<HTMLDivElement>(null);
  
  const signatureMap: Record<string, { file: string, name: string }> = {
    'Guardio': { file: '/signatures/Nawar.png', name: 'Nawar Toma' },
    'Matterhorn': { file: '/signatures/Catrin.png', name: 'Catrin Ogenvall' },
    'Monitor': { file: '/signatures/Ove.png', name: 'Ove Nilsson' },
    'Top Swede': { file: '/signatures/Kristin.png', name: 'Kristin Hallbäck' },
    'South West': { file: '/signatures/Helena.png', name: 'Helena Rydberg' }
  };
  
  const signatureData = formData.brandName ? signatureMap[formData.brandName] : null;
  
  const { image: signatureImage, isLoading: signatureLoading, error: signatureError } = 
    useImage(signatureData ? signatureData.file : '');
  
  const showSignature = !signatureLoading && !signatureError && signatureImage && signatureData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!documentRef.current) return;
    
    const html2pdf = (await import('html2pdf.js')).default;
    
    const element = documentRef.current;
    const opt = {
      margin: [5, 10, 0, 10],  // [top, right, bottom, left] margins in mm
      filename: `DOC-${formData.brandName || 'Bastadgruppen'}-${formData.productName || 'Declaration'}-${formData.productCode.join('-') || 'N/A'}.pdf`,
      image: { type: 'jpeg', quality: 1 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  const buttonLang = selectedLanguages[0] || 'en';
  const buttonT = getTranslations(buttonLang);

  return (
    <div className="p-8 bg-white h-full overflow-auto">
      <div className="mb-4 flex justify-between print:hidden">
        <button
          onClick={() => setShowPreview(false)}
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          {buttonT.backToFormButton}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          {buttonT.downloadPdfButton}
        </button>
      </div>
      <div ref={documentRef} className="max-w-2xl mx-auto print:border-0 print:shadow-none">
        {selectedLanguages.map((lang, index) => {
          const t = getTranslations(lang);
          return (
            <div key={lang} className="p-6 language-page" style={{ pageBreakBefore: index > 0 ? 'always' : 'auto' }}>
              <div className="flex justify-end mb-3">
                <img src="/logo.png" alt="Båstadgruppen Logo" className="h-10" />
              </div>
              <div className="flex">
                <div className="w-6 bg-black h-10 mr-3"></div>
                <div>
                  <h1 className="text-lg font-bold">{t.docTitle}</h1>
                  <p className="font-medium text-xs">{t.categoryLabel} {formData.categoryClass || 'II'}
                  {formData.categoryClass === "III" && formData.moduleType && ` - ${formData.moduleType}`}</p>
                </div>
              </div>
              
              <p className="my-3 text-sm">{t.responsibilityStatement}</p>
              
              <p className="text-sm" style={{ marginBottom: '1px' }}>Båstadgruppen AB</p>
              <p className="text-sm" style={{ marginBottom: '1px' }}>Fraktgatan 1</p>
              <p className="text-sm" style={{ marginBottom: '1px' }}>262 73 Ängelholm</p>
              <p className="text-sm" style={{ marginBottom: '5px' }}>Sweden</p>

              <div className="my-4 text-center">
                <p className="mb-6 text-sm" dangerouslySetInnerHTML={{ __html: t.ppeLabel.replace('\n', '<br />') }} />
                
                {showBrandLogo && (
                  <div className="flex justify-center my-3">
                    <img src={brandLogo} alt="Brand Logo" className="h-10" />
                  </div>
                )}
                
                <p className="font-bold text-lg my-1">{formData.productName || 'Armet Safety Helmet'}</p>
                <p className="mb-1 text-sm">{t.itemNumberLabel} {formData.productCode.join(', ') || '1001933'}</p>
              </div>

              <p className="mb-3 text-sm">
                {t.conformityLegislationLabel} {formData.legislation[0] || 'Regulation (EU) 2016/425'}{' '}
                {t.harmonisedStandardsLabel}
              </p>
              {formData.standards.length > 0 && formData.standards[0] !== '' ? (
                <div className="mb-3 text-sm">
                  {formData.standards.map((standard, idx) => (
                    <div key={idx} className="flex items-start">
                      <span className="inline-block w-4 text-center mr-1">•</span>
                      <span>{standard}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="mb-3 text-sm pl-5">EN ISO 21420: 2020, EN 388:2016 + A1:2018 M.</p>
              )}
              
              <p className="mb-6 text-sm">
                {t.euCertificateLabel} {formData.certificateNumber || 'BP 60132703'}
              </p>

              <div className="flex justify-between items-start mb-3">
                <div className="text-sm">
                  <p className="mb-1">{formData.notifiedBodyName || "SGS Fimko Ltd."}</p>
                  <p className="mb-1">{t.notifiedBodyNumberLabel} {formData.notifiedBodyNumber || "0598"}</p>
                  <p className="mb-1">{formData.notifiedBodyAddress || "Takomotie 8"}</p>
                  <p>{formData.notifiedBodyZipCode || "FI - 00380"} {formData.notifiedBodyCountry || "Helsinki"}</p>
                </div>
                
                <div className="text-right text-sm">
                  {showSignature ? (
                    <>
                      <div className="h-9 mb-1 flex justify-end">
                        <img src={signatureImage} alt="Signature" className="h-full" />
                      </div>
                      <p className="mb-1">{t.signatureTitle}</p>
                      <p className="mb-1">{signatureData?.name}</p>
                      <p>{formatDate(new Date())}</p>
                    </>
                  ) : (
                    <>
                      <div className="h-9 mb-1"></div>
                      <p className="mb-1">{t.signatureTitle}</p>
                      <p className="mb-1">{signatureData?.name || t.signatureNamePlaceholder}</p>
                      <p>{formatDate(new Date())}</p>
                    </>
                  )}
                </div>
              </div>

              <div className="pt-10 mt-1 flex justify-between items-center text-xs text-gray-600">
                <a href="https://www.bastadgruppen.com" className="text-blue-600 hover:underline">{t.footerWebsite}</a>
                <span>{t.footerCompanyName}</span>
                <span>{t.footerPhoneNumber}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default function DocForm() {
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
  };

  const [formData, setFormData] = useState<DocFormData>(() => {
    try {
      const savedData = localStorage.getItem("docFormData");
      if (savedData) {
        const parsed = JSON.parse(savedData);
        if (parsed && typeof parsed.productName !== 'undefined') {
          return parsed;
        }
      }
      return initialFormData;
    } catch (error) {
      console.error("Error loading form data from localStorage:", error);
      return initialFormData;
    }
  });

  const [showPreview, setShowPreview] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['en']);
  const [selectedNotifiedBodyId, setSelectedNotifiedBodyId] = useState<string>('');

  const clearForm = () => {
    setFormData(initialFormData);
    setSelectedLanguages(['en']);
    setSelectedNotifiedBodyId('');
    localStorage.removeItem("docFormData");
  };

  useEffect(() => {
    try {
      localStorage.setItem("docFormData", JSON.stringify(formData));
    } catch (error) {
      console.error("Error saving form data to localStorage:", error);
    }
  }, [formData]);

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
    field: keyof DocFormData | 'notifiedBodySelect'
  ) => {
    const value = e.target.value;

    if (field === 'notifiedBodySelect') {
        setSelectedNotifiedBodyId(value);
        if (value === 'other' || value === '') {
            setFormData((prev) => ({
              ...prev,
              notifiedBodyName: '',
              notifiedBodyNumber: '',
              notifiedBodyAddress: '',
              notifiedBodyZipCode: '',
              notifiedBodyCountry: '',
            }));
        } else {
            const selectedBody = notifiedBodies.find(body => body.id === value);
            if (selectedBody) {
                setFormData((prev) => ({
                    ...prev,
                    notifiedBodyName: selectedBody.name,
                    notifiedBodyNumber: selectedBody.number,
                    notifiedBodyAddress: selectedBody.address,
                    notifiedBodyZipCode: selectedBody.zipCode,
                    notifiedBodyCountry: selectedBody.country,
                }));
            }
        }
    } else {
      const brandLogoMap: Record<string, string> = {
        'Guardio': '/brands/guardio.png',
        'Matterhorn': '/brands/matterhorn.png',
        'Monitor': '/brands/monitor.png',
        'Top Swede': '/brands/top-swede.png',
        'South West': '/brands/south-west.png'
      };

      setFormData((prev) => ({
        ...prev,
        [field]: value,
        ...(field === 'brandName' && { brandLogo: brandLogoMap[value] || '' })
      }));
    }
  };

  const handleLanguageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedLanguages(prev =>
      checked ? [...prev, value] : prev.filter(lang => lang !== value)
    );
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
      alert('Please select at least one language.');
      return;
    }
    if (!formData.productName || !formData.productCode[0] || !formData.categoryClass) {
      alert('Please fill in Product Name, at least one Product Number, and Category Class.');
      return;
    }
    if (formData.categoryClass === "III" && !formData.moduleType) {
      alert('Please select a Module Type for Class III.');
      return;
    }
    if (!selectedNotifiedBodyId) {
       alert('Please select a Notified Body or choose "Other".');
       return;
    }
    if (selectedNotifiedBodyId === 'other' &&
        (!formData.notifiedBodyName || !formData.notifiedBodyNumber || !formData.notifiedBodyAddress || !formData.notifiedBodyZipCode || !formData.notifiedBodyCountry)) {
        alert('Please fill in all Notified Body details when "Other" is selected.');
        return;
    }
    if (!formData.certificateNumber) {
        alert('Please enter the Certificate Number.');
        return;
    }

    setShowPreview(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container max-w-7xl mx-auto">
      {!showPreview ? (
        <form
          onSubmit={generateDoc}
          className="space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 mx-auto w-full max-w-2xl lg:max-w-none"
        >
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium text-gray-900">
                  Declaration Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Fill in the form to generate the Declaration of Conformity.
                </p>
              </div>
              <button
                type="button"
                onClick={clearForm}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <RefreshCw className="w-4 h-4" />
                Clear Form
              </button>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
             <h3 className="text-base font-semibold leading-7 text-gray-900">Languages</h3>
             <p className="mt-1 text-sm text-gray-500">Select the languages for the generated document.</p>
             <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                 {availableLanguages.map(lang => (
                     <div key={lang.code} className="relative flex items-start">
                         <div className="flex h-6 items-center">
                             <input
                                 id={`lang-${lang.code}`}
                                 name="languages"
                                 type="checkbox"
                                 value={lang.code}
                                 checked={selectedLanguages.includes(lang.code)}
                                 onChange={handleLanguageChange}
                                 className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                             />
                         </div>
                         <div className="ml-3 text-sm leading-6">
                             <label htmlFor={`lang-${lang.code}`} className="font-medium text-gray-900">
                                 {lang.name}
                             </label>
                         </div>
                     </div>
                 ))}
             </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
             <h3 className="text-base font-semibold leading-7 text-gray-900">Product Information</h3>
            <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="productName"
                  required
                  placeholder="Enter product name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.productName}
                  onChange={(e) => handleInputChange(e, "productName")}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product number(s) <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                  {formData.productCode.map((code, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        required={index === 0}
                        placeholder="Enter product number"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={code}
                        onChange={(e) =>
                          handleProductCodeChange(index, e.target.value)
                        }
                      />
                      {formData.productCode.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeProductCode(index)}
                          className="p-2 text-red-600 hover:text-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                  >
                    <Plus className="w-4 h-4" /> Add product number
                  </button>
                </div>
              </div>
            </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-base font-semibold leading-7 text-gray-900">Manufacturer Details</h3>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="brandName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Brand / Manufacturer <span className="text-red-500">*</span>
                </label>
                <select
                  id="brandName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.brandName}
                  onChange={(e) => handleSelectChange(e, "brandName")}
                >
                  <option value="">Select brand</option>
                  <option value="Guardio">Guardio</option>
                  <option value="Matterhorn">Matterhorn</option>
                  <option value="Monitor">Monitor</option>
                  <option value="Top Swede">Top Swede</option>
                  <option value="South West">South West</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Manufacturer Address
                </label>
                <div className="mt-1 p-3 bg-gray-100 rounded-md text-sm text-gray-800 border border-gray-200">
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
          <div className="border-t border-gray-200 pt-6">
             <h3 className="text-base font-semibold leading-7 text-gray-900">Compliance Information</h3>
            <div className="mt-4 space-y-4">

            <div className="border-b border-gray-200 pb-6">
                 <label htmlFor="notifiedBodySelect" className="block text-sm font-medium text-gray-700">
                     Notified Body <span className="text-red-500">*</span>
                 </label>
                 <select
                     id="notifiedBodySelect"
                     required
                     className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                     value={selectedNotifiedBodyId}
                     onChange={(e) => handleSelectChange(e, 'notifiedBodySelect')}
                 >
                     <option value="">Select Notified Body...</option>
                     {notifiedBodies.map(body => (
                         <option key={body.id} value={body.id}>{body.name} ({body.number})</option>
                     ))}
                     <option value="other">Other (Enter Manually)</option>
                 </select>

                 {selectedNotifiedBodyId === 'other' && (
                     <div className="mt-4 space-y-4 p-4 border border-dashed border-gray-300 rounded-md">
                         <p className="text-sm text-gray-600">Enter Notified Body details manually:</p>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="notifiedBodyName" className="block text-sm font-medium text-gray-700">Name <span className="text-red-500">*</span></label>
                                <input type="text" id="notifiedBodyName" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.notifiedBodyName} onChange={(e) => handleInputChange(e, "notifiedBodyName")} />
                            </div>
                            <div>
                                <label htmlFor="notifiedBodyNumber" className="block text-sm font-medium text-gray-700">Number <span className="text-red-500">*</span></label>
                                <input type="text" id="notifiedBodyNumber" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.notifiedBodyNumber} onChange={(e) => handleInputChange(e, "notifiedBodyNumber")} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="notifiedBodyAddress" className="block text-sm font-medium text-gray-700">Address <span className="text-red-500">*</span></label>
                                <input type="text" id="notifiedBodyAddress" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.notifiedBodyAddress} onChange={(e) => handleInputChange(e, "notifiedBodyAddress")} />
                            </div>
                            <div>
                                <label htmlFor="notifiedBodyZipCode" className="block text-sm font-medium text-gray-700">Zip Code <span className="text-red-500">*</span></label>
                                <input type="text" id="notifiedBodyZipCode" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.notifiedBodyZipCode} onChange={(e) => handleInputChange(e, "notifiedBodyZipCode")} />
                            </div>
                            <div>
                                <label htmlFor="notifiedBodyCountry" className="block text-sm font-medium text-gray-700">Country <span className="text-red-500">*</span></label>
                                <input type="text" id="notifiedBodyCountry" required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" value={formData.notifiedBodyCountry} onChange={(e) => handleInputChange(e, "notifiedBodyCountry")} />
                            </div>
                        </div>
                     </div>
                 )}
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Relevant EU Legislation
                </label>
                <div className="space-y-2">
                  {formData.legislation.map((item, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        required={index === 0}
                        placeholder="e.g., Regulation (EU) 2016/425"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={item}
                        onChange={(e) =>
                          handleLegislationChange(index, e.target.value)
                        }
                      />
                      {formData.legislation.length > 1 && (
                         <button
                          type="button"
                          onClick={() => removeLegislation(index)}
                          className="p-2 text-red-600 hover:text-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                  >
                    <Plus className="w-4 h-4" /> Add Legislation
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Harmonised Standards
                </label>
                <div className="space-y-2">
                  {formData.standards.map((standard, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <input
                        type="text"
                        required={index === 0}
                        placeholder="e.g., EN ISO 21420:2020"
                        className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        value={standard}
                        onChange={(e) =>
                          handleStandardChange(index, e.target.value)
                        }
                      />
                      {formData.standards.length > 1 && (
                         <button
                          type="button"
                          onClick={() => removeStandard(index)}
                          className="p-2 text-red-600 hover:text-red-700 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
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
                    className="inline-flex items-center gap-1 text-sm text-indigo-600 hover:text-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded-md"
                  >
                    <Plus className="w-4 h-4" /> Add standard
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
               <div>
                <label
                  htmlFor="certificateNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Certificate Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="certificateNumber"
                  placeholder="Enter certificate number"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.certificateNumber}
                  onChange={(e) => handleInputChange(e, "certificateNumber")}
                />
              </div>

              <div>
                <label
                  htmlFor="categoryClass"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Class <span className="text-red-500">*</span>
                </label>
                <select
                  id="categoryClass"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
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
              <div className="pt-4">
                <label
                  htmlFor="moduleType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Module Type (for Class III) <span className="text-red-500">*</span>
                </label>
                <select
                  id="moduleType"
                  required
                  className="mt-1 block w-full md:w-1/2 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.moduleType}
                  onChange={(e) => handleSelectChange(e, "moduleType")}
                >
                  <option value="">Select module type</option>
                  <option value="Module C2">Module C2</option>
                  <option value="Module D">Module D</option>
                </select>
              </div>
            )}
          </div>
          </div>

          <div className="pt-8 flex justify-center border-t border-gray-200">
            <button
              type="submit"
              className="w-full max-w-xs bg-indigo-600 text-white py-3 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 text-base font-semibold flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Generate Declaration
            </button>
          </div>
        </form>
      ) : (
         <div className="w-full">
          <div
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
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
