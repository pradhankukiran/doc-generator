import React, { useState, useEffect } from 'react';
import { FileText, Plus, Trash2, Download, ArrowLeft, RefreshCw } from 'lucide-react';
import { PDFViewer, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Helvetica',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
    paddingLeft: 15,
  },
  declaration: {
    fontSize: 12,
    marginTop: 20,
    marginBottom: 20,
  },
  signature: {
    marginTop: 40,
  },
  footer: {
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    fontSize: 10,
    color: '#666',
  },
});

interface DocFormData {
  productName: string;
  productCode: string[];
  brandName: string;
  manufacturerAddress: string;
  legislation: string[];
  notifiedBodyAddress: string;
  notifiedBodyZipCode: string;
  notifiedBodyCountry: string;
  standards: string[];
  certificateNumber: string;
  categoryClass: string;
}

export default function DocForm() {
  const initialFormData: DocFormData = {
    productName: '',
    productCode: [''],
    brandName: '',
    manufacturerAddress: 'Båstadgruppen AB\nFraktgatan 1\n262 73 Ängelholm\nSweden',
    notifiedBodyAddress: '',
    notifiedBodyZipCode: '',
    notifiedBodyCountry: '',
    legislation: [''],
    standards: [''],
    standards: [''],
    certificateNumber: '',
    categoryClass: '',
  };

  const [formData, setFormData] = useState<DocFormData>(() => {
    const savedData = localStorage.getItem('docFormData');
    return savedData ? JSON.parse(savedData) : initialFormData;
  });

  const [showPreview, setShowPreview] = useState(false);

  const clearForm = () => {
    setFormData(initialFormData);
    localStorage.removeItem('docFormData');
  };

  useEffect(() => {
    localStorage.setItem('docFormData', JSON.stringify(formData));
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
      productCode: [...prev.productCode, ''],
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
      standards: [...prev.standards, ''],
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
      legislation: [...prev.legislation, ''],
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

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  return (
    <div className="container max-w-7xl mx-auto">
      {!showPreview ? (
        <form onSubmit={generateDoc} className="space-y-8 bg-white p-6 sm:p-8 rounded-lg shadow-lg border border-gray-200 mx-auto w-full max-w-2xl lg:max-w-none">
          <div>
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-lg font-medium text-gray-900">Product Information</h2>
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
                  onChange={(e) => handleInputChange(e, 'productName')}
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
              <h2 className="text-lg font-medium text-gray-900 mb-4">Manufacturer Details</h2>
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
                  onChange={(e) => handleInputChange(e, 'brandName')}
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
                <label
                  className="block text-sm font-medium text-gray-700"
                >
                  Manufacturer Address
                </label>
                <div className="mt-1 p-3 bg-gray-50 rounded-md text-sm text-gray-700">
                  Båstadgruppen AB<br />
                  Fraktgatan 1<br />
                  262 73 Ängelholm<br />
                  Sweden
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Compliance Information</h2>
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
                  onChange={(e) => handleInputChange(e, 'notifiedBodyAddress')}
                />
              </div>

              <div>
                <label
                  htmlFor="notifiedBodyZipCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Zip Code
                </label>
                <input
                  type="text"
                  id="notifiedBodyZipCode"
                  placeholder="Enter zip code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.notifiedBodyZipCode}
                  onChange={(e) => handleInputChange(e, 'notifiedBodyZipCode')}
                />
              </div>

              <div>
                <label
                  htmlFor="notifiedBodyCountry"
                  className="block text-sm font-medium text-gray-700"
                >
                  Country
                </label>
                <input
                  type="text"
                  id="notifiedBodyCountry"
                  placeholder="Enter country"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.notifiedBodyCountry}
                  onChange={(e) => handleInputChange(e, 'notifiedBodyCountry')}
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
                  onChange={(e) => handleInputChange(e, 'certificateNumber')}
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
                  onChange={(e) => handleInputChange(e, 'categoryClass')}
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
          <div className="bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden" style={{ height: 'calc(100vh - 120px)' }}>
            <PDFViewer style={{ width: '100%', height: '100%' }}>
              <Document>
                <Page size="A4" style={styles.page}>
                  <Text style={styles.title}>EU Declaration of Conformity</Text>
                  <Text style={styles.subtitle}>In accordance with ISO/IEC 17050-1</Text>
                  
                  <View style={styles.section}>
                    <Text style={styles.heading}>1. Manufacturer</Text>
                    <Text style={styles.text}>{formData.brandName}</Text>
                    <Text style={styles.text}>{formData.manufacturerAddress}</Text>
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.heading}>2. Product Identification</Text>
                    <Text style={styles.text}>Product: {formData.productName}</Text>
                    {formData.productCode.map((code, index) => 
                      code && <Text key={index} style={styles.text}>Product number: {code}</Text>
                    )}
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.heading}>4. Relevant EU Legislation</Text>
                    {formData.legislation.map((item, index) => 
                      item && <Text key={index} style={styles.text}>• {item}</Text>
                    )}
                  </View>

                  <View style={styles.section}>
                    <Text style={styles.heading}>5. References to Harmonised Standards</Text>
                    {formData.standards.map((standard, index) => 
                      standard && <Text key={index} style={styles.text}>• {standard}</Text>
                    )}
                  </View>

                  {formData.certificateNumber && (
                    <View style={styles.section}>
                      <Text style={styles.heading}>6. Certificate Number</Text>
                      <Text style={styles.text}>{formData.certificateNumber}</Text>
                      <Text style={styles.text}>Category Class: {formData.categoryClass}</Text>
                    </View>
                  )}

                  <View style={styles.section}>
                    <Text style={styles.heading}>Declaration</Text>
                    <Text style={styles.declaration}>
                      I hereby declare that the product described above complies with the relevant Union harmonisation legislation and standards listed above. This declaration of conformity is issued under the sole responsibility of the manufacturer.
                    </Text>
                  </View>

                  <View style={styles.signature}>
                    <Text style={styles.heading}>Signed for and on behalf of:</Text>
                    <Text style={styles.text}>{formData.brandName}</Text>
                    <Text style={styles.text}>Date: {formatDate(new Date())}</Text>
                  </View>

                  <View style={styles.footer}>
                    <Text>
                      This document must be kept for a period of 10 years from the date the product was placed on the market.
                    </Text>
                  </View>
                </Page>
              </Document>
            </PDFViewer>
          </div>
        </div>
      )}
    </div>
  );
}