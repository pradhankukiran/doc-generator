import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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
          className="bg-primary-700 text-white py-2 px-4 rounded-md hover:bg-primary-800 focus:outline-none focus:ring-0 transition-colors duration-200 text-sm font-medium flex items-center gap-2 shadow-button"
        >
          <ArrowLeft className="w-4 h-4" />
          {buttonT.backToFormButton}
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-accent text-white py-2 px-4 rounded-md hover:bg-accent-hover focus:outline-none focus:ring-0 transition-colors duration-200 text-sm font-medium flex items-center gap-2 shadow-button"
        >
          <Download className="w-4 h-4" />
          {buttonT.downloadPdfButton}
        </button>
      </div>
      <div ref={documentRef} className="max-w-2xl mx-auto print:border-0 print:shadow-none shadow-card">
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
                  <p className="font-medium text-xs">
                    {t.categoryLabel} {formData.categoryClass || 'II'}
                    {formData.categoryClass === "II" && " - Module B"}
                    {formData.categoryClass === "III" && formData.moduleType && ` - ${formData.moduleType}`}
                  </p>
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
              
              {(() => {
                const notifiedBodyName = formData.notifiedBodyName || "SGS Fimko Ltd.";
                const notifiedBodyNumber = formData.notifiedBodyNumber || "0598";
                const certificateNumberVal = formData.certificateNumber || 'BP 60132703';
                const notifiedBodyInfoStr = `${notifiedBodyName} (No ${notifiedBodyNumber})`;
                let statement = "";

                if (formData.categoryClass === "I") {
                  statement = `${t.euCertificateLabel} ${certificateNumberVal}`;
                } else if (formData.categoryClass === "II") {
                  statement = `The notified body "${notifiedBodyInfoStr}" performed the EU type-examination (Module B) and issued the EU type-examination certificate "${certificateNumberVal}".`;
                } else if (formData.categoryClass === "III") {
                  const baseStatement = `The notified body "${notifiedBodyInfoStr}" performed the EU type-examination (Module B) and issued the EU type-examination certificate "${certificateNumberVal}".`;
                  if (formData.moduleType === "Module C2") {
                    statement = `${baseStatement} The PPE is subject to the conformity assessment procedure based on internal production control plus supervised product checks at random intervals (Module C2) under surveillance of the notified body "${notifiedBodyInfoStr}".`;
                  } else if (formData.moduleType === "Module D") {
                    statement = `${baseStatement} The PPE is subject to the conformity assessment procedure based on quality assurance of the production process (Module D) under surveillance of the notified body "${notifiedBodyInfoStr}".`;
                  } else {
                    // Fallback for Category III if moduleType is unexpected or not set (form validation should usually prevent the latter)
                    statement = baseStatement; 
                  }
                } else {
                  // Fallback for cases where categoryClass might be empty or unexpected, though form validation should prevent this.
                  statement = `${t.euCertificateLabel} ${certificateNumberVal}`;
                }
                return <p className="mb-6 text-sm">{statement}</p>;
              })()}

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

// Update input styles to create a more refined, premium look
const inputClassName = "mt-1 block w-full rounded-md border-0 bg-primary-50 py-1.5 px-3 text-primary-900 shadow-subtle ring-0 placeholder:text-primary-400 focus:bg-white focus:ring-1 focus:ring-inset focus:ring-accent sm:text-sm";
const selectClassName = "mt-1 block w-full rounded-md border-0 bg-primary-50 py-1.5 px-3 text-primary-900 shadow-subtle ring-0 focus:bg-white focus:ring-1 focus:ring-inset focus:ring-accent sm:text-sm";
const checkboxClassName = "h-4 w-4 rounded border-0 bg-primary-50 text-accent shadow-subtle focus:ring-0 focus:ring-offset-0";

export default function DocForm() {
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
  const [currentLanguage, setCurrentLanguage] = useState<string>(availableLanguages[0].code);

  const t = getTranslations(currentLanguage);

  useEffect(() => {
    if (location.pathname === '/doc' && location.state) {
      const { formData: navFormData, selectedLanguages: navSelectedLanguages } = location.state as { formData: DocFormData, selectedLanguages: string[] };
      if (navFormData && navSelectedLanguages) {
        setFormData(navFormData);
        setSelectedLanguages(navSelectedLanguages);
        setShowPreview(true);
      }
    } else {
      setShowPreview(false);
    }
  }, [location]);

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
    const { value, checked, id } = e.target;

    if (id === 'lang-all') {
      if (checked) {
        setSelectedLanguages(availableLanguages.map(lang => lang.code));
      } else {
        setSelectedLanguages([]);
      }
    } else {
      setSelectedLanguages(prev =>
        checked ? [...prev, value] : prev.filter(lang => lang !== value)
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

    navigate('/doc', { state: { formData, selectedLanguages } });
  };

  if (showPreview) {
    return <DocumentPreview formData={formData} selectedLanguages={selectedLanguages} setShowPreview={() => navigate('/')} />;
  }

  return (
    <div className="container max-w-7xl mx-auto">
      {!showPreview ? (
        <form
          onSubmit={generateDoc}
          className="space-y-10 mx-auto w-full max-w-2xl lg:max-w-none"
        >
          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-card">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-lg font-display font-medium text-primary-900">
                  Declaration Details
                </h2>
                <p className="mt-1 text-sm text-primary-600">
                  Fill in the form to generate the Declaration of Conformity.
                </p>
              </div>
              <button
                type="button"
                onClick={clearForm}
                className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-primary-700 bg-white border border-primary-200 rounded-md hover:bg-primary-50 focus:outline-none focus:ring-0 shadow-button transition-all duration-150"
              >
                <RefreshCw className="w-4 h-4" />
                Clear Form
              </button>
            </div>
          
            <div className="mb-8">
              <h3 className="text-base font-semibold leading-7 text-primary-900 mb-4">Languages</h3>
              <p className="mb-4 text-sm text-primary-500">Select the languages for the generated document.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {availableLanguages.map(lang => (
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
                      <label htmlFor={`lang-${lang.code}`} className="font-medium text-primary-900">
                        {lang.name}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 relative flex items-center">
                <div className="flex h-6 items-center">
                  <input
                    id="lang-all"
                    name="languages-all"
                    type="checkbox"
                    checked={selectedLanguages.length === availableLanguages.length}
                    onChange={handleLanguageChange}
                    className={checkboxClassName}
                  />
                </div>
                <div className="ml-3 text-sm leading-6">
                  <label htmlFor="lang-all" className="font-medium text-primary-900">
                    Select All
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-card">
            <h3 className="text-base font-semibold leading-7 text-primary-900 mb-4">Product Information</h3>
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="productName"
                    className="block text-sm font-medium text-primary-700"
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
                  <label className="block text-sm font-medium text-primary-700 mb-1">
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

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-card">
            <h3 className="text-base font-semibold leading-7 text-primary-900 mb-4">Manufacturer Details</h3>
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-3">
                  Brand / Manufacturer <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {['Guardio', 'Matterhorn', 'Monitor', 'Top Swede', 'South West'].map(brand => (
                    <div 
                      key={brand}
                      onClick={() => {
                        const fakeEvent = { 
                          target: { 
                            value: brand 
                          } 
                        } as unknown as React.ChangeEvent<HTMLSelectElement>;
                        handleSelectChange(fakeEvent, "brandName");
                      }}
                      className={`border rounded-md p-3 flex flex-col items-center justify-center cursor-pointer transition-all duration-150 ${
                        formData.brandName === brand 
                          ? 'border-accent border-2 bg-primary-100 shadow-md' 
                          : 'border-primary-200 hover:border-primary-300 hover:bg-primary-50'
                      }`}
                    >
                      <div className="h-12 flex items-center justify-center mb-2">
                        <img 
                          src={`/brands/${brand.toLowerCase().replace(' ', '-')}.png`} 
                          alt={`${brand} logo`}
                          className="h-8 object-contain" 
                        />
                      </div>
                      <span className="text-sm font-medium text-primary-900">{brand}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-primary-700">
                  Manufacturer Address
                </label>
                <div className="mt-1 p-3 bg-primary-50 rounded-md text-sm text-primary-800">
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

          <div className="bg-white p-6 sm:p-8 rounded-lg shadow-card">
            <h3 className="text-base font-semibold leading-7 text-primary-900 mb-4">Compliance Information</h3>
            <div className="space-y-6">
              <div className="pb-6 border-b border-primary-100">
                <label htmlFor="notifiedBodySelect" className="block text-sm font-medium text-primary-700 mb-2">
                  Notified Body <span className="text-red-500">*</span>
                </label>
                <select
                  id="notifiedBodySelect"
                  required
                  className={selectClassName}
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
                  <div className="mt-4 space-y-4 p-5 bg-primary-50 rounded-md">
                    <p className="text-sm text-primary-600 mb-3">Enter Notified Body details manually:</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="notifiedBodyName" className="block text-sm font-medium text-primary-700">Name <span className="text-red-500">*</span></label>
                        <input type="text" id="notifiedBodyName" required className={inputClassName} value={formData.notifiedBodyName} onChange={(e) => handleInputChange(e, "notifiedBodyName")} />
                      </div>
                      <div>
                        <label htmlFor="notifiedBodyNumber" className="block text-sm font-medium text-primary-700">Number <span className="text-red-500">*</span></label>
                        <input type="text" id="notifiedBodyNumber" required className={inputClassName} value={formData.notifiedBodyNumber} onChange={(e) => handleInputChange(e, "notifiedBodyNumber")} />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="notifiedBodyAddress" className="block text-sm font-medium text-primary-700">Address <span className="text-red-500">*</span></label>
                        <input type="text" id="notifiedBodyAddress" required className={inputClassName} value={formData.notifiedBodyAddress} onChange={(e) => handleInputChange(e, "notifiedBodyAddress")} />
                      </div>
                      <div>
                        <label htmlFor="notifiedBodyZipCode" className="block text-sm font-medium text-primary-700">Zip Code <span className="text-red-500">*</span></label>
                        <input type="text" id="notifiedBodyZipCode" required className={inputClassName} value={formData.notifiedBodyZipCode} onChange={(e) => handleInputChange(e, "notifiedBodyZipCode")} />
                      </div>
                      <div>
                        <label htmlFor="notifiedBodyCountry" className="block text-sm font-medium text-primary-700">Country <span className="text-red-500">*</span></label>
                        <input type="text" id="notifiedBodyCountry" required className={inputClassName} value={formData.notifiedBodyCountry} onChange={(e) => handleInputChange(e, "notifiedBodyCountry")} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
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
                  <label className="block text-sm font-medium text-primary-700 mb-1">
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
                    className="block text-sm font-medium text-primary-700"
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
                    className="block text-sm font-medium text-primary-700"
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
                    className="block text-sm font-medium text-primary-700"
                  >
                    Module Type (for Class III) <span className="text-red-500">*</span>
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
            </div>
          </div>

          <div className="flex justify-center py-6">
            <button
              type="submit"
              className="w-full max-w-xs bg-accent text-white py-3 px-4 rounded-md shadow-button hover:bg-accent-hover focus:outline-none focus:ring-0 transition-all duration-200 text-base font-semibold flex items-center justify-center gap-2 hover:shadow-md"
            >
              <FileText className="w-5 h-5" />
              Generate Declaration
            </button>
          </div>
        </form>
      ) : (
         <div className="w-full">
          <div
            className="bg-white rounded-lg shadow-card border-0 overflow-hidden"
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
