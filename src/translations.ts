// src/translations.ts
export interface Translations {
  docTitle: string;
  categoryLabel: string;
  responsibilityStatement: string;
  manufacturerAddressLabel: string; // Assuming 'Båstadgruppen AB...' is the manufacturer section label
  ppeLabel: string;
  ppeNameLabel: string; // Placeholder for 'Armet Safety Helmet' section if needed, or combine with ppeLabel
  itemNumberLabel: string; // Placeholder for 'with item number' part
  conformityLegislationLabel: string;
  harmonisedStandardsLabel: string;
  euCertificateLabel: string;
  notifiedBodySectionLabel: string; // Placeholder for the start of the notified body section
  notifiedBodyLabel: string;
  notifiedBodyNumberLabel: string;
  issuedByLabel: string; // Assuming 'issued the EU type-examination certificate No.' needs translation
  signatureTitle: string;
  signatureNamePlaceholder: string; // Placeholder for 'Anders Andersson' if signature fails
  signatureDateLabel: string; // Placeholder if date needs a label
  backToFormButton: string;
  downloadPdfButton: string;
  footerWebsite: string;
  footerCompanyName: string;
  footerPhoneNumber: string; // Assuming the phone number needs translation context/label if any
}

export const translations: Record<string, Partial<Translations>> = {
  en: {
    docTitle: "EU Declaration of Conformity",
    categoryLabel: "Category",
    responsibilityStatement: "This declaration of conformity is issued under the sole responsibility of the manufacturer:",
    manufacturerAddressLabel: "Båstadgruppen AB", // Assuming this is the intended section start
    ppeLabel: "The manufacturer hereby declares that the below-described Personal Protective Equipment (PPE):",
    ppeNameLabel: "Product Name", // Added a basic label for the product name itself
    itemNumberLabel: "with item number",
    conformityLegislationLabel: "is in conformity with the relevant Union harmonisation legislation:",
    harmonisedStandardsLabel: "and fulfills the applicable essential health and safety requirements set out in Annex II and the relevant harmonized standards or other technical specifications, No. :",
    euCertificateLabel: "EU type-examination certificate (Module B) and issued the EU type-examination certificate No.",
    notifiedBodySectionLabel: "Notified Body Information", // Added a generic label
    notifiedBodyLabel: "Notified Body Name", // Label inferred
    notifiedBodyNumberLabel: "Notified Body No.",
    issuedByLabel: "issued by", // Extracted from context
    signatureTitle: "Product Manager Safety",
    signatureNamePlaceholder: "Anders Andersson", // Default name if signature fails
    signatureDateLabel: "Date", // Added basic label
    backToFormButton: "Back to Form",
    downloadPdfButton: "Download PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445", // Assuming static for now
  },
  sv: {
    docTitle: "EU-försäkran om överensstämmelse",
    categoryLabel: "Kategori",
    responsibilityStatement: "Denna försäkran om överensstämmelse utfärdas på tillverkarens eget ansvar:",
    manufacturerAddressLabel: "Båstadgruppen AB", // Keep same?
    ppeLabel: "Tillverkaren försäkrar härmed att den nedan beskrivna personliga skyddsutrustningen (PPE):",
    ppeNameLabel: "Produktnamn", // Swedish placeholder
    itemNumberLabel: "med artikelnummer",
    conformityLegislationLabel: "överensstämmer med relevant unionslagstiftning om harmonisering:",
    harmonisedStandardsLabel: "och uppfyller de tillämpliga väsentliga hälso- och säkerhetskraven i bilaga II och de relevanta harmoniserade standarderna eller andra tekniska specifikationer, nr:",
    euCertificateLabel: "EU-typintyg (Modul B) och utfärdade EU-typintyget nr.",
    notifiedBodySectionLabel: "Anmält organ Information", // Placeholder
    notifiedBodyLabel: "Anmält organ Namn", // Placeholder
    notifiedBodyNumberLabel: "Anmält organ nr.",
    issuedByLabel: "utfärdat av", // Placeholder
    signatureTitle: "Produktchef Säkerhet", // Placeholder
    signatureNamePlaceholder: "Anders Andersson", // Placeholder
    signatureDateLabel: "Datum", // Placeholder
    backToFormButton: "Tillbaka till formulär",
    downloadPdfButton: "Ladda ner PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445", // Placeholder
  },
  // Add entries for 'no', 'da', 'fi', 'pl', 'et', 'de', 'fr', 'it', 'nl', 'pt', 'lv'
  // Example:
  // no: { ... },
  // da: { ... },
};

// Function to get translations for a specific language, falling back to English
export const getTranslations = (lang: string): Translations => {
  const langTranslations = translations[lang] || {};
  const defaultTranslations = translations['en'] as Translations; // Assume 'en' is always complete

  // Merge language-specific translations with English fallback
  // Ensure all keys from the interface are present
  const merged = { ...defaultTranslations };
  for (const key in defaultTranslations) {
    if (Object.prototype.hasOwnProperty.call(defaultTranslations, key)) {
      const typedKey = key as keyof Translations;
      if (langTranslations[typedKey] !== undefined && langTranslations[typedKey] !== null) {
        merged[typedKey] = langTranslations[typedKey] as string;
      }
    }
  }
  return merged;
};

// List of available languages based on the keys in the translations object
export const availableLanguages: { code: string; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'sv', name: 'Swedish' },
  { code: 'no', name: 'Norwegian' },
  { code: 'da', name: 'Danish' },
  { code: 'fi', name: 'Finnish' },
  { code: 'pl', name: 'Polish' },
  { code: 'et', name: 'Estonian' },
  { code: 'de', name: 'German' },
  { code: 'fr', name: 'French' },
  { code: 'it', name: 'Italian' },
  { code: 'nl', name: 'Dutch' },
  { code: 'pt', name: 'Portuguese' }, // Corrected spelling
  { code: 'lv', name: 'Latvian' },
]; 