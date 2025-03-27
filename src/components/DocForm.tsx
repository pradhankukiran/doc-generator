import React, { useState, useEffect, useRef } from "react";
import { FileText, Plus, Trash2, ArrowLeft, RefreshCw, Download } from "lucide-react";

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
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
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
}

const DocumentPreview = ({ formData, setShowPreview }: { formData: DocFormData, setShowPreview: (show: boolean) => void }) => {
  const { image: brandLogo, isLoading: brandLogoLoading, error: brandLogoError } = useImage(formData.brandLogo);
  const showBrandLogo = !brandLogoLoading && !brandLogoError && brandLogo;
  const documentRef = useRef<HTMLDivElement>(null);
  
  // Map brand names to signature files and person names
  const signatureMap: Record<string, { file: string, name: string }> = {
    'Guardio': { file: '/signatures/Nawar.png', name: 'Nawar Toma' },
    'Matterhorn': { file: '/signatures/Catrin.png', name: 'Catrin Ogenvall' },
    'Monitor': { file: '/signatures/Ove.png', name: 'Ove Nilsson' },
    'Top Swede': { file: '/signatures/Kristin.png', name: 'Kristin Hallbäck' },
    'South West': { file: '/signatures/Helena.png', name: 'Helena Rydberg' }
  };
  
  // Get the signature data based on the selected brand
  const signatureData = formData.brandName ? signatureMap[formData.brandName] : null;
  
  // Load the signature image if applicable
  const { image: signatureImage, isLoading: signatureLoading, error: signatureError } = 
    useImage(signatureData ? signatureData.file : '');
  
  const showSignature = !signatureLoading && !signatureError && signatureImage && signatureData;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPDF = async () => {
    if (!documentRef.current) return;
    
    // Dynamically import html2pdf to avoid server-side issues
    const html2pdf = (await import('html2pdf.js')).default;
    
    const element = documentRef.current;
    const opt = {
      margin: 10,
      filename: `${formData.brandName || 'Bastadgruppen'}_Declaration_${new Date().toISOString().split('T')[0]}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };
    
    html2pdf().set(opt).from(element).save();
  };

  return (
    <div className="p-8 bg-white h-full overflow-auto">
      <div className="mb-4 flex justify-between">
        <button
          onClick={() => setShowPreview(false)}
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Form
        </button>
        <button
          onClick={handleDownloadPDF}
          className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium flex items-center gap-2"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>
      <div ref={documentRef} className="max-w-2xl mx-auto print:border-0 print:shadow-none">
        <div className="flex justify-end mb-6">
          <img src="/logo.png" alt="Båstadgruppen Logo" className="h-14" />
        </div>
        <div className="flex">
          <div className="w-8 bg-black h-12 mr-4"></div>
          <div>
            <h1 className="text-2xl font-bold">EU Declaration of Conformity</h1>
            <p className="font-medium">Category {formData.categoryClass || 'II'}</p>
          </div>
        </div>
        
        <p className="my-6">
          This declaration of conformity is issued under the sole responsibility
          of the manufacturer:
        </p>
        
        <p className="mb-1">Båstadgruppen AB</p>
        <p className="mb-1">Fraktgatan 1</p>
        <p className="mb-1">262 73 Ängelholm</p>
        <p className="mb-6">Sweden</p>

        <div className="my-8 text-center">
          <p className="mb-4">
            The manufacturer hereby declares that the<br />
            below-described Personal Protective Equipment (PPE):
          </p>
          
          {showBrandLogo && (
            <div className="flex justify-center my-6">
              <img src={brandLogo} alt="Brand Logo" className="h-16" />
            </div>
          )}
          
          <p className="font-bold text-xl my-3">{formData.productName || 'Armet Safety Helmet'}</p>
          <p className="mb-6">with item number {formData.productCode[0] || '1001933'}</p>
        </div>

        <p className="mb-4">
          Is in conformity with the relevant Union harmonisation legislation: {formData.legislation[0] || 'Regulation (EU) 2016/425'} - 
          and the relevant harmonized standards No.: {formData.standards.join(", ") || 'EN ISO 21420: 2020, EN 388:2016 + A1:2018 M.'}
        </p>
        
        <p className="mb-4">
          Is certified to be washed according to EN ISO 21420: General requirements
          (40°C/104°F -3 washing cycles)
        </p>
        
        <p className="mb-6">
          EU type-examination certificate (Module B) and issued the EU
          type-examination certificate No. {formData.certificateNumber || 'BP 60132703'}
        </p>

        <p className="mb-1">{formData.notifiedBodyName || "SGS Fimko Ltd."}</p>
        <p className="mb-1">Notified Body No. {formData.notifiedBodyNumber || "0598"}</p>
        <p className="mb-1">{formData.notifiedBodyAddress || "Takomotie 8"}</p>
        <p className="mb-6">{formData.notifiedBodyZipCode || "FI - 00380"} {formData.notifiedBodyCountry || "Helsinki"}</p>

        <div className="flex justify-between items-end mt-10">
          <div>
            <p className="mb-1 text-blue-600">www.bastadgruppen.com</p>
            <p>Båstadgruppen AB</p>
            <p className="mt-1 text-xs">0046123413445</p>
          </div>
          <div className="text-right">
            <p className="mb-1">Product Manager</p>
            {showSignature ? (
              <>
                <div className="h-20 mb-1 flex justify-end">
                  <img src={signatureImage} alt="Signature" className="h-full" />
                </div>
                <p className="mb-1">{signatureData?.name}</p>
              </>
            ) : (
              <p className="mb-1">Anders Andersson</p>
            )}
            <p>2024-08-29</p>
          </div>
        </div>
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
  };

  const [formData, setFormData] = useState<DocFormData>(() => {
    try {
      const savedData = localStorage.getItem("docFormData");
      return savedData ? JSON.parse(savedData) : initialFormData;
    } catch (error) {
      console.error("Error loading form data from localStorage:", error);
      return initialFormData;
    }
  });

  const [showPreview, setShowPreview] = useState(false);

  const clearForm = () => {
    setFormData(initialFormData);
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
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DocFormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleSelectChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    field: keyof DocFormData
  ) => {
    const value = e.target.value;
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
    // Validate required fields before showing preview
    if (!formData.productName || !formData.productCode[0] || !formData.categoryClass) {
      alert('Please fill in all required fields');
      return;
    }
    setShowPreview(true);
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
                  Product Information
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the basic details about your product.
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
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Name
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
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product number
                </label>
                <div className="space-y-2">
                  {formData.productCode.map((code, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        required
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
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addProductCode}
                    className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <Plus className="w-4 h-4" /> Add product number
                  </button>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Manufacturer Details
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="brandName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Manufacturer
                </label>
                <select
                  id="brandName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.brandName}
                  onChange={(e) => handleSelectChange(e, "brandName")}
                >
                  <option value="">Select manufacturer</option>
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
                <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                  Båstadgruppen AB
                  <br />
                  Fraktgatan 1<br />
                  262 73 Ängelholm
                  <br />
                  Sweden
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Compliance Information
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="notifiedBodyName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notified Body Name
                </label>
                <input
                  type="text"
                  id="notifiedBodyName"
                  placeholder="Enter notified body name"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.notifiedBodyName}
                  onChange={(e) => handleInputChange(e, "notifiedBodyName")}
                />
              </div>

              <div>
                <label
                  htmlFor="notifiedBodyNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notified Body Number
                </label>
                <input
                  type="text"
                  id="notifiedBodyNumber"
                  placeholder="Enter notified body number"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.notifiedBodyNumber}
                  onChange={(e) => handleInputChange(e, "notifiedBodyNumber")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="notifiedBodyAddress"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notified Body Address
                </label>
                <input
                  type="text"
                  id="notifiedBodyAddress"
                  placeholder="Enter street address"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.notifiedBodyAddress}
                  onChange={(e) => handleInputChange(e, "notifiedBodyAddress")}
                />
              </div>

              <div>
                <label
                  htmlFor="notifiedBodyZipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notified Body Zip Code
                </label>
                <input
                  type="text"
                  id="notifiedBodyZipCode"
                  placeholder="Enter zip code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.notifiedBodyZipCode}
                  onChange={(e) => handleInputChange(e, "notifiedBodyZipCode")}
                />
              </div>

              <div>
                <label
                  htmlFor="notifiedBodyCountry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notified Body Country
                </label>
                <input
                  type="text"
                  id="notifiedBodyCountry"
                  placeholder="Enter country"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.notifiedBodyCountry}
                  onChange={(e) => handleInputChange(e, "notifiedBodyCountry")}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Relevant EU Legislation
                </label>
                <div className="space-y-2">
                  {formData.legislation.map((item, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Enter EU legislation (e.g., Directive 2014/30/EU)"
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
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addLegislation}
                    className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <Plus className="w-4 h-4" /> Add EU Legislation
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Harmonised Standards
                </label>
                <div className="space-y-2">
                  {formData.standards.map((standard, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="Enter standard (e.g., EN 60950-1:2006)"
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
                          className="p-2 text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={addStandard}
                    className="inline-flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <Plus className="w-4 h-4" /> Add standard
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="certificateNumber"
                  className="block text-sm font-medium text-gray-700"
                >
                  Certificate Number
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
                  Category Class
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
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-64 bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
            >
              <FileText className="w-4 h-4" />
              Generate Declaration
            </button>
          </div>
        </form>
      ) : (
        <div className="w-full">
          <div
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            style={{ height: "calc(100vh - 120px)" }}
          >
            <DocumentPreview formData={formData} setShowPreview={setShowPreview} />
          </div>
        </div>
      )}
    </div>
  );
}
