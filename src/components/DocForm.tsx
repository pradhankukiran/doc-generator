import React, { useState } from 'react';
import { FileText, Plus, Trash2, Download, ArrowLeft } from 'lucide-react';
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
  productCode: string;
  serialNumber: string;
  brandName: string;
  manufacturerAddress: string;
  notifiedBody: string;
  notifiedBodyNumber: string;
  legislation: string[];
  standards: string[];
  supplementaryInfo: string;
}

export default function DocForm() {
  const [formData, setFormData] = useState<DocFormData>({
    productName: '',
    productCode: '',
    serialNumber: '',
    brandName: '',
    manufacturerAddress: '',
    notifiedBody: '',
    notifiedBodyNumber: '',
    legislation: [''],
    standards: [''],
    supplementaryInfo: '',
  });

  const [showPreview, setShowPreview] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof DocFormData
  ) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
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
            <h2 className="text-lg font-medium text-gray-900">Product Information</h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter the basic details about your product.
            </p>
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.productName}
                  onChange={(e) => handleInputChange(e, 'productName')}
                />
              </div>

              <div>
                <label
                  htmlFor="productCode"
                  className="block text-sm font-medium text-gray-700"
                >
                  Model/Type
                </label>
                <input
                  type="text"
                  id="productCode"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.productCode}
                  onChange={(e) => handleInputChange(e, 'productCode')}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="serialNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Serial Number
              </label>
              <input
                type="text"
                id="serialNumber"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.serialNumber}
                onChange={(e) => handleInputChange(e, 'serialNumber')}
              />
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Manufacturer Details</h2>
            </div>

            <div>
              <label
                htmlFor="brandName"
                className="block text-sm font-medium text-gray-700"
              >
                Manufacturer/Brand Name
              </label>
              <input
                type="text"
                id="brandName"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.brandName}
                onChange={(e) => handleInputChange(e, 'brandName')}
              />
            </div>

            <div>
              <label
                htmlFor="manufacturerAddress"
                className="block text-sm font-medium text-gray-700"
              >
                Manufacturer Address
              </label>
              <input
                type="text"
                id="manufacturerAddress"
                required
                placeholder="Full business address"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.manufacturerAddress}
                onChange={(e) => handleInputChange(e, 'manufacturerAddress')}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="notifiedBody"
                  className="block text-sm font-medium text-gray-700"
                >
                  Notified Body
                </label>
                <input
                  type="text"
                  id="notifiedBody"
                  placeholder="If applicable"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.notifiedBody}
                  onChange={(e) => handleInputChange(e, 'notifiedBody')}
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
                  placeholder="If applicable"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  value={formData.notifiedBodyNumber}
                  onChange={(e) => handleInputChange(e, 'notifiedBodyNumber')}
                />
              </div>
            </div>

            <div>
              <h2 className="text-lg font-medium text-gray-900 mb-4">Compliance Information</h2>
            </div>

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
                      placeholder="e.g., Directive 2014/30/EU"
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
                      placeholder="e.g., EN 60950-1:2006"
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

            <div>
              <label
                htmlFor="supplementaryInfo"
                className="block text-sm font-medium text-gray-700"
              >
                Supplementary Information
              </label>
              <textarea
                id="supplementaryInfo"
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                value={formData.supplementaryInfo}
                onChange={(e) =>
                  handleInputChange(e as any, 'supplementaryInfo')
                }
                placeholder="Any additional information (optional)"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium flex items-center justify-center gap-2"
          >
            <FileText className="w-4 h-4" />
            Generate Declaration
          </button>
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
                    <Text style={styles.text}>Model/Type: {formData.productCode}</Text>
                    <Text style={styles.text}>Serial Number: {formData.serialNumber}</Text>
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

                  {formData.supplementaryInfo && (
                    <View style={styles.section}>
                      <Text style={styles.heading}>6. Additional Information</Text>
                      <Text style={styles.text}>{formData.supplementaryInfo}</Text>
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