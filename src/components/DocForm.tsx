import React, { useState, useEffect } from "react";
import { FileText, Plus, Trash2, ArrowLeft, RefreshCw } from "lucide-react";
import {
  PDFViewer,
  Document as PDFDocument,
  Page as PDFPage,
  Text as PDFText,
  View as PDFView,
  StyleSheet as PDFStyleSheet,
  Image as PDFImage,
  Font,
} from "@react-pdf/renderer";

const useImage = (path: string) => {
  const [image, setImage] = useState<string>("");

  useEffect(() => {
    fetch(path)
      .then((response) => response.text())
      .then((text) => {
        const base64 = btoa(text);
        setImage(`data:image/svg+xml;base64,${base64}`);
      })
      .catch((error) => console.error("Error loading image:", error));
  }, [path]);

  return image;
};

const formatDate = (date: Date) => {
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

const styles = PDFStyleSheet.create({
  page: {
    padding: 50,
    fontFamily: "Helvetica",
  },
  logo: {
    width: 200,
    marginBottom: 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  category: {
    fontSize: 14,
    color: "#e65100",
    marginBottom: 25,
  },
  section: {
    marginBottom: 20,
  },
  text: {
    fontSize: 11,
    marginBottom: 10,
  },
  brandLogo: {
    width: 150,
    marginVertical: 20,
    alignSelf: "center",
  },
  declaration: {
    fontSize: 11,
    marginTop: 20,
    marginBottom: 20,
  },
  signature: {
    marginTop: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  signatureImage: {
    width: 100,
    height: 50,
  },
  signatureSection: {
    alignItems: "flex-start",
  },
  websiteLink: {
    fontSize: 11,
    color: "#0066cc",
    textDecoration: "underline",
  },
});

interface DocFormData {
  productName: string;
  productCode: string[];
  brandName: string;
  manufacturerAddress: string;
  notifiedBodyName: string;
  notifiedBodyAddress: string;
  notifiedBodyZipCode: string;
  notifiedBodyCountry: string;
  legislation: string[];
  standards: string[];
  certificateNumber: string;
  categoryClass: string;
}

const DocPDF = React.memo(({ formData }: { formData: DocFormData }) => {
  const logo = useImage("/logo.svg");
  const brandLogo = useImage("/brands/guardio.svg");
  const signature = useImage("/signature.svg");

  if (!logo || !brandLogo || !signature) {
    return null;
  }

  return (
    <PDFDocument>
      <PDFPage size="A4" style={styles.page}>
        <PDFImage src={logo} style={styles.logo} />
        <PDFText style={styles.title}>EU Declaration of Conformity</PDFText>
        <PDFText style={styles.category}>
          Category {formData.categoryClass}
        </PDFText>
        <PDFText style={styles.text}>
          This declaration of conformity is issued under the sole responsibility
          of the manufacturer:
        </PDFText>
        <PDFText style={styles.text}>Båstadgruppen AB</PDFText>
        <PDFText style={styles.text}>Fraktgatan 1</PDFText>
        <PDFText style={styles.text}>262 73 Ängelholm</PDFText>
        <PDFText style={styles.text}>Sweden</PDFText>
        <PDFText style={[styles.text, { marginTop: 20 }]}>
          The manufacturer hereby declares that the below-described Personal
          Protective Equipment (PPE):
        </PDFText>
        <PDFImage src={brandLogo} style={styles.brandLogo} />
        <PDFText
          style={[styles.text, { fontWeight: "bold", textAlign: "center" }]}
        >
          {formData.productName}
        </PDFText>
        <PDFText style={[styles.text, { textAlign: "center" }]}>
          with item number {formData.productCode[0]}
        </PDFText>
        <PDFText style={[styles.text, { marginTop: 20 }]}>
          Is in conformity with the relevant Union harmonisation legislation:{" "}
          {formData.legislation[0]}, and the relevant harmonized standards No.:{" "}
          {formData.standards.join(", ")}
        </PDFText>
        <PDFText style={[styles.text, { marginTop: 20 }]}>
          EU type-examination certificate (Module B) and issued the EU
          type-examination certificate No. {formData.certificateNumber}
        </PDFText>
        <PDFText style={[styles.text, { marginTop: 20 }]}>
          {formData.notifiedBodyName}
        </PDFText>
        <PDFText style={styles.text}>
          Notified Body No. {formData.certificateNumber}
        </PDFText>
        <PDFText style={styles.text}>{formData.notifiedBodyAddress}</PDFText>
        <PDFText style={styles.text}>
          {formData.notifiedBodyZipCode} {formData.notifiedBodyCountry}
        </PDFText>
        <PDFView style={styles.signature}>
          <PDFView>
            <PDFText style={styles.websiteLink}>www.bastadgruppen.com</PDFText>
            <PDFText style={styles.text}>Båstadgruppen AB</PDFText>
          </PDFView>
          <PDFView style={styles.signatureSection}>
            <PDFImage src={signature} style={styles.signatureImage} />
            <PDFText style={styles.text}>Product Manager Safety</PDFText>
            <PDFText style={styles.text}>Anders Andersson</PDFText>
            <PDFText style={styles.text}>{formatDate(new Date())}</PDFText>
          </PDFView>
        </PDFView>
      </PDFPage>
    </PDFDocument>
  );
});

export default function DocForm() {
  const initialFormData: DocFormData = {
    productName: "",
    productCode: [""],
    brandName: "",
    manufacturerAddress:
      "Båstadgruppen AB\nFraktgatan 1\n262 73 Ängelholm\nSweden",
    notifiedBodyName: "",
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
                  onChange={(e) => handleInputChange(e, "brandName")}
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  onChange={(e) => handleInputChange(e, "categoryClass")}
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
          <button
            onClick={() => setShowPreview(false)}
            className="mb-4 inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Form
          </button>
          <div
            className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden"
            style={{ height: "calc(100vh - 120px)" }}
          >
            <PDFViewer
              style={{ width: "100%", height: "100%" }}
              showToolbar={false}
            >
              <DocPDF formData={formData} />
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}
