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
  euCertificateLabel: string; // This one is problematic, will be less used or redefined
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

  // New keys for category-specific statements
  simpleCertificateLabel?: string;
  text_theNotifiedBody?: string;
  text_performedEUExam?: string;
  text_ppeSubjectToModuleC2?: string;
  text_ppeSubjectToModuleD?: string;
}

export const translations: Record<string, Partial<Translations>> = {
  en: {
    docTitle: "EU Declaration of Conformity",
    categoryLabel: "Category",
    responsibilityStatement:
      "This declaration of conformity is issued under the sole responsibility of the manufacturer:",
    manufacturerAddressLabel: "Båstadgruppen AB", // Assuming this is the intended section start
    ppeLabel:
      "The manufacturer hereby declares that the below-described Personal Protective Equipment (PPE):",
    ppeNameLabel: "Product Name", // Added a basic label for the product name itself
    itemNumberLabel: "with item number",
    conformityLegislationLabel:
      "is in conformity with the relevant Union harmonisation legislation:",
    harmonisedStandardsLabel:
      "and fulfills the applicable essential health and safety requirements set out in Annex II and the relevant harmonized standards or other technical specifications, No. :",
    euCertificateLabel:
      "EU type-examination certificate (Module B) and issued the EU type-examination certificate No.", // Retain for now, but usage will change
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

    // New English translations
    simpleCertificateLabel: "Certificate:",
    text_theNotifiedBody: "The notified body",
    text_performedEUExam: "performed the EU type-examination (Module B) and issued the EU type-examination certificate",
    text_ppeSubjectToModuleC2: "The PPE is subject to the conformity assessment procedure based on internal production control plus supervised product checks at random intervals (Module C2) under surveillance of the notified body",
    text_ppeSubjectToModuleD: "The PPE is subject to the conformity assessment procedure based on quality assurance of the production process (Module D) under surveillance of the notified body",
  },
  sv: {
    docTitle: "EU-försäkran om överensstämmelse",
    categoryLabel: "Kategori",
    responsibilityStatement:
      "Denna försäkran om överensstämmelse utfärdas på tillverkarens eget ansvar:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Tillverkaren försäkrar härmed att den nedan beskrivna personliga skyddsutrustningen (PPE):",
    ppeNameLabel: "Produktnamn",
    itemNumberLabel: "med artikelnummer",
    conformityLegislationLabel:
      "överensstämmer med relevant unionslagstiftning om harmonisering:",
    harmonisedStandardsLabel:
      "och uppfyller de tillämpliga väsentliga hälso- och säkerhetskraven i bilaga II och de relevanta harmoniserade standarderna eller andra tekniska specifikationer, nr:",
    euCertificateLabel: "EU-typintyg (Modul B) och utfärdade EU-typintyget nr.",
    notifiedBodySectionLabel: "Information om anmält organ",
    notifiedBodyLabel: "Anmält organs namn",
    notifiedBodyNumberLabel: "Anmält organ nr.",
    issuedByLabel: "utfärdat av",
    signatureTitle: "Produktchef Säkerhet",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Datum",
    backToFormButton: "Tillbaka till formulär",
    downloadPdfButton: "Ladda ner PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",

    // New Swedish translations
    simpleCertificateLabel: "Certifikat:",
    text_theNotifiedBody: "Det anmälda organet",
    text_performedEUExam: "utförde EU-typkontrollen (modul B) och utfärdade EU-typkontrollintyget",
    text_ppeSubjectToModuleC2: "Den personliga skyddsutrustningen är föremål för förfarandet för bedömning av överensstämmelse baserat på intern tillverkningskontroll plus övervakade produktkontroller med slumpvisa intervaller (modul C2) under övervakning av det anmälda organet",
    text_ppeSubjectToModuleD: "Den personliga skyddsutrustningen är föremål för förfarandet för bedömning av överensstämmelse baserat på kvalitetssäkring av tillverkningsprocessen (modul D) under övervakning av det anmälda organet",
  },
  is: {
    docTitle: "ESB-SAMRÆMISYFIRLÝSING",
    categoryLabel: "Flokkur:",
    responsibilityStatement:
      "Þessi samræmisyfirlýsing er gefin út eingöngu á ábyrgð framleiðanda.",
    ppeLabel:
      "Hlífðarbúnaðurinn sem lýst er hér að ofan er í samræmi við viðeigandi samhæfingarlöggjöf Sambandsins:",
    itemNumberLabel: "Vörunúmer:",
    conformityLegislationLabel: "er í samræmi við löggjöf",
    harmonisedStandardsLabel: "og samræmda staðla",
    euCertificateLabel: "ESB-gerðarprófunarvottorð nr.", // Icelandic version was simpler.
    notifiedBodyNumberLabel: "Tilkynntur aðili nr.",
    signatureTitle: "Ábyrgðarmaður vörugæða",
    signatureNamePlaceholder: "Nafn undirritaðs",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "+46 431-732 00",
    backToFormButton: "Til baka í eyðublað",
    downloadPdfButton: "Hlaða niður PDF",

    // New Icelandic translations
    simpleCertificateLabel: "Vottorð:",
    text_theNotifiedBody: "Tilkynnti aðilinn",
    text_performedEUExam: "framkvæmdi ESB-gerðarprófun (eining B) og gaf út ESB-gerðarprófunarvottorðið",
    text_ppeSubjectToModuleC2: "Hlífðarbúnaðurinn er háður samræmismatsaðferðinni sem byggir á innri framleiðslustýringu auk eftirlits með vöruprófunum með handahófskenndu millibili (eining C2) undir eftirliti tilkynnta aðilans",
    text_ppeSubjectToModuleD: "Hlífðarbúnaðurinn er háður samræmismatsaðferðinni sem byggir á gæðatryggingu framleiðsluferlisins (eining D) undir eftirliti tilkynnta aðilans",
  },
  no: {
    docTitle: "EU-samsvarserklæring",
    categoryLabel: "Kategori",
    responsibilityStatement:
      "Denne samsvarserklæringen er utstedt på produsentens alleinansvar:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Produsenten erklærer herved at følgende personlige verneutstyr (PVU):",
    ppeNameLabel: "Produktnavn",
    itemNumberLabel: "med artikkelnummer",
    conformityLegislationLabel:
      "er i samsvar med relevant EU-harmoniseringslovgivning:",
    harmonisedStandardsLabel:
      "og oppfyller de gjeldende grunnleggende helse- og sikkerhetskrav fastsatt i vedlegg II og de relevante harmoniserte standardene eller andre tekniske spesifikasjoner, nr.:",
    euCertificateLabel:
      "EU-typeprøvingssertifikat (Modul B) og utstedte EU-typeprøvingssertifikatet nr.",
    notifiedBodySectionLabel: "Informasjon om teknisk kontrollorgan",
    notifiedBodyLabel: "Navn på teknisk kontrollorgan",
    notifiedBodyNumberLabel: "Teknisk kontrollorgan nr.",
    issuedByLabel: "utstedt av",
    signatureTitle: "Produktsjef Sikkerhet",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Dato",
    backToFormButton: "Tilbake til skjema",
    downloadPdfButton: "Last ned PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Norwegian translations
    simpleCertificateLabel: "Sertifikat:",
    text_theNotifiedBody: "Det tekniske kontrollorganet",
    text_performedEUExam:
      "utførte EU-typeprøvingen (Modul B) og utstedte EU-typeprøvingssertifikatet",
    text_ppeSubjectToModuleC2:
      "PVU er underlagt samsvarsvurderingsprosedyren basert på intern produksjonskontroll pluss overvåkede produktkontroller med tilfeldige intervaller (Modul C2) under tilsyn av det tekniske kontrollorganet",
    text_ppeSubjectToModuleD:
      "PVU er underlagt samsvarsvurderingsprosedyren basert på kvalitetssikring av produksjonsprosessen (Modul D) under tilsyn av det tekniske kontrollorganet",
  },
  da: {
    docTitle: "EU-overensstemmelseserklæring",
    categoryLabel: "Kategori",
    responsibilityStatement:
      "Denne overensstemmelseserklæring udstedes på fabrikantens eget ansvar:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Fabrikanten erklærer hermed, at følgende personlige værnemiddel (PV):",
    ppeNameLabel: "Produktnavn",
    itemNumberLabel: "med varenummer",
    conformityLegislationLabel:
      "er i overensstemmelse med relevant EU-harmoniseringslovgivning:",
    harmonisedStandardsLabel:
      "og opfylder de gældende væsentlige sundheds- og sikkerhedskrav i bilag II og de relevante harmoniserede standarder eller andre tekniske specifikationer, nr.:",
    euCertificateLabel:
      "EU-typeafprøvningsattest (Modul B) og udstedte EU-typeafprøvningsattesten nr.",
    notifiedBodySectionLabel: "Oplysninger om bemyndiget organ",
    notifiedBodyLabel: "Navn på bemyndiget organ",
    notifiedBodyNumberLabel: "Bemyndiget organ nr.",
    issuedByLabel: "udstedt af",
    signatureTitle: "Produktchef Sikkerhed",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Dato",
    backToFormButton: "Tilbage til formular",
    downloadPdfButton: "Download PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Danish translations
    simpleCertificateLabel: "Certifikat:",
    text_theNotifiedBody: "Det bemyndigede organ",
    text_performedEUExam:
      "udførte EU-typeafprøvningen (Modul B) og udstedte EU-typeafprøvningsattesten",
    text_ppeSubjectToModuleC2:
      "PV er underlagt overensstemmelsesvurderingsproceduren baseret på intern produktionskontrol plus overvågede produktkontroller med tilfældige intervaller (Modul C2) under tilsyn af det bemyndigede organ",
    text_ppeSubjectToModuleD:
      "PV er underlagt overensstemmelsesvurderingsproceduren baseret på kvalitetssikring af produktionsprocessen (Modul D) under tilsyn af det bemyndigede organ",
  },
  // Add entries for 'fi', 'pl', 'et', 'de', 'fr', 'it', 'nl', 'pt', 'lv'
  // Example:
  // no: { ... },
  // da: { ... },
};

// Function to get translations for a specific language, falling back to English
export const getTranslations = (lang: string): Translations => {
  const langTranslations = translations[lang] || {};
  const defaultTranslations = translations["en"] as Translations; // Assume 'en' is always complete

  // Merge language-specific translations with English fallback
  // Ensure all keys from the interface are present
  const merged = { ...defaultTranslations };
  for (const key in defaultTranslations) {
    if (Object.prototype.hasOwnProperty.call(defaultTranslations, key)) {
      const typedKey = key as keyof Translations;
      if (
        langTranslations[typedKey] !== undefined &&
        langTranslations[typedKey] !== null
      ) {
        merged[typedKey] = langTranslations[typedKey] as string;
      }
    }
  }
  return merged;
};

// List of available languages based on the keys in the translations object
export const availableLanguages: { code: string; name: string }[] = [
  { code: "en", name: "English" },
  { code: "sv", name: "Swedish" },
  { code: "no", name: "Norwegian" },
  { code: "da", name: "Danish" },
  { code: "fi", name: "Finnish" },
  { code: "pl", name: "Polish" },
  { code: "et", name: "Estonian" },
  { code: "de", name: "German" },
  { code: "fr", name: "French" },
  { code: "it", name: "Italian" },
  { code: "nl", name: "Dutch" },
  { code: "pt", name: "Portuguese" }, // Corrected spelling
  { code: "lv", name: "Latvian" },
  { code: "is", name: "Icelandic" },
];
