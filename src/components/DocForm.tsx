import React, { useState, useEffect, useCallback } from "react";
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
import DocumentPreview from "./DocPreview";
import { DocFormData } from "../types/doc";

// Import Inter font
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

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
    showCertificateNumber: false,
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
    if (location.pathname === "/preview" && location.state) {
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
        ...(field === "categoryClass" && value === "I"
          ? {
              selectedNotifiedBodyId: "",
              notifiedBodyName: "",
              notifiedBodyNumber: "",
              notifiedBodyAddress: "",
              notifiedBodyZipCode: "",
              notifiedBodyCountry: "",
            }
          : {}),
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
    if (formData.categoryClass !== "I" && !formData.selectedNotifiedBodyId) {
      alert('Please select a Notified Body or choose "Other".');
      return;
    }
    if (
      formData.categoryClass !== "I" &&
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
      navigate("/preview", { state: { formData, selectedLanguages } });
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
                  Notified Body {formData.categoryClass !== "I" && (
                    <span className="text-red-500">*</span>
                  )}
                </label>
                <select
                  id="notifiedBodySelect"
                  required={formData.categoryClass !== "I"}
                  disabled={formData.categoryClass === "I"}
                  className={`${selectClassName} ${formData.categoryClass === "I" ? "opacity-50 cursor-not-allowed" : ""}`}
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

                {formData.categoryClass !== "I" && formData.selectedNotifiedBodyId === "other" && (
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
                    Certificate Number{" "}
                    {(formData.categoryClass !== "I" ||
                      formData.showCertificateNumber !== false) && (
                      <span className="text-red-500">*</span>
                    )}
                  </label>
                  <input
                    type="text"
                    id="certificateNumber"
                    placeholder="Enter certificate number"
                    required={
                      formData.categoryClass !== "I" ||
                      formData.showCertificateNumber !== false
                    }
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
