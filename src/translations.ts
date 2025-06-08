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
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Framleiðandi lýsir því hér með yfir að eftirfarandi persónuhlífar:",
    ppeNameLabel: "Vöruheiti",
    itemNumberLabel: "Vörunúmer:",
    conformityLegislationLabel: "er í samræmi við löggjöf",
    harmonisedStandardsLabel: "og samræmda staðla",
    euCertificateLabel: "ESB-gerðarprófunarvottorð nr.",
    notifiedBodySectionLabel: "Upplýsingar um tilkynntan aðila",
    notifiedBodyLabel: "Nafn tilkynnts aðila",
    notifiedBodyNumberLabel: "Tilkynntur aðili nr.",
    issuedByLabel: "gefið út af",
    signatureTitle: "Ábyrgðarmaður vörugæða",
    signatureNamePlaceholder: "Nafn undirritaðs",
    signatureDateLabel: "Dagsetning",
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
  fi: {
    docTitle: "EU-vaatimustenmukaisuusvakuutus",
    categoryLabel: "Kategoria",
    responsibilityStatement:
      "Tämä vaatimustenmukaisuusvakuutus on annettu valmistajan yksinomaisella vastuulla:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Valmistaja vakuuttaa täten, että seuraava henkilönsuojain:",
    ppeNameLabel: "Tuotenimi",
    itemNumberLabel: "tuotenumerolla",
    conformityLegislationLabel:
      "on asiaa koskevan unionin yhdenmukaistamislainsäädännön mukainen:",
    harmonisedStandardsLabel:
      "ja täyttää liitteessä II säädetyt sovellettavat olennaiset terveys- ja turvallisuusvaatimukset sekä asiaankuuluvat yhdenmukaistetut standardit tai muut tekniset eritelmät, nro:",
    euCertificateLabel:
      "EU-tyyppitarkastustodistus (moduuli B) ja myönsi EU-tyyppitarkastustodistuksen nro.",
    notifiedBodySectionLabel: "Ilmoitetun laitoksen tiedot",
    notifiedBodyLabel: "Ilmoitetun laitoksen nimi",
    notifiedBodyNumberLabel: "Ilmoitettu laitos nro.",
    issuedByLabel: "myöntänyt",
    signatureTitle: "Tuotepäällikkö, Turvallisuus",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Päiväys",
    backToFormButton: "Takaisin lomakkeeseen",
    downloadPdfButton: "Lataa PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Finnish translations
    simpleCertificateLabel: "Todistus:",
    text_theNotifiedBody: "Ilmoitettu laitos",
    text_performedEUExam:
      "suoritti EU-tyyppitarkastuksen (moduuli B) ja myönsi EU-tyyppitarkastustodistuksen",
    text_ppeSubjectToModuleC2:
      "Henkilönsuojaimeen sovelletaan vaatimustenmukaisuuden arviointimenettelyä, joka perustuu sisäiseen tuotannonvalvontaan ja satunnaisin väliajoin tapahtuviin valvottuihin tuotetarkastuksiin (moduuli C2) ilmoitetun laitoksen valvonnassa",
    text_ppeSubjectToModuleD:
      "Henkilönsuojaimeen sovelletaan vaatimustenmukaisuuden arviointimenettelyä, joka perustuu tuotantoprosessin laadunvarmistukseen (moduuli D) ilmoitetun laitoksen valvonnassa",
  },
  pl: {
    docTitle: "Deklaracja zgodności UE",
    categoryLabel: "Kategoria",
    responsibilityStatement:
      "Niniejsza deklaracja zgodności wydana zostaje na wyłączną odpowiedzialność producenta:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Producent niniejszym oświadcza, że poniżej opisany środek ochrony indywidualnej (ŚOI):",
    ppeNameLabel: "Nazwa produktu",
    itemNumberLabel: "o numerze artykułu",
    conformityLegislationLabel:
      "jest zgodny z odpowiednimi wymaganiami unijnego prawodawstwa harmonizacyjnego:",
    harmonisedStandardsLabel:
      "i spełnia mające zastosowanie zasadnicze wymagania dotyczące zdrowia i bezpieczeństwa określone w załączniku II oraz odpowiednie normy zharmonizowane lub inne specyfikacje techniczne, nr:",
    euCertificateLabel:
      "Certyfikat badania typu UE (Moduł B) i wydał certyfikat badania typu UE nr",
    notifiedBodySectionLabel: "Informacje o jednostce notyfikowanej",
    notifiedBodyLabel: "Nazwa jednostki notyfikowanej",
    notifiedBodyNumberLabel: "Jednostka notyfikowana nr",
    issuedByLabel: "wydany przez",
    signatureTitle: "Kierownik Produktu ds. Bezpieczeństwa",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Data",
    backToFormButton: "Powrót do formularza",
    downloadPdfButton: "Pobierz PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Polish translations
    simpleCertificateLabel: "Certyfikat:",
    text_theNotifiedBody: "Jednostka notyfikowana",
    text_performedEUExam:
      "przeprowadziła badanie typu UE (Moduł B) i wydała certyfikat badania typu UE",
    text_ppeSubjectToModuleC2:
      "ŚOI podlega procedurze oceny zgodności w oparciu o wewnętrzną kontrolę produkcji oraz nadzorowane kontrole produktu w losowych odstępach czasu (Moduł C2) pod nadzorem jednostki notyfikowanej",
    text_ppeSubjectToModuleD:
      "ŚOI podlega procedurze oceny zgodności w oparciu o zapewnienie jakości procesu produkcji (Moduł D) pod nadzorem jednostki notyfikowanej",
  },
  et: {
    docTitle: "EL-i vastavusdeklaratsioon",
    categoryLabel: "Kategooria",
    responsibilityStatement:
      "Käesolev vastavusdeklaratsioon on väljastatud tootja ainuvastutusel:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Tootja kinnitab käesolevaga, et allpool kirjeldatud isikukaitsevahend:",
    ppeNameLabel: "Toote nimetus",
    itemNumberLabel: "artiklinumbriga",
    conformityLegislationLabel:
      "vastab asjakohasele liidu ühtlustamisõigusaktile:",
    harmonisedStandardsLabel:
      "ja vastab II lisas sätestatud kohaldatavatele olulistele tervisekaitse- ja ohutusnõuetele ning asjakohastele harmoneeritud standarditele või muudele tehnilistele spetsifikatsioonidele, nr:",
    euCertificateLabel:
      "EL-i tüübihindamistõend (moodul B) ja andis välja EL-i tüübihindamistõendi nr",
    notifiedBodySectionLabel: "Teavitatud asutuse teave",
    notifiedBodyLabel: "Teavitatud asutuse nimi",
    notifiedBodyNumberLabel: "Teavitatud asutus nr",
    issuedByLabel: "väljastatud",
    signatureTitle: "Tootejuht, Ohutus",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Kuupäev",
    backToFormButton: "Tagasi vormile",
    downloadPdfButton: "Laadi alla PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Estonian translations
    simpleCertificateLabel: "Sertifikaat:",
    text_theNotifiedBody: "Teavitatud asutus",
    text_performedEUExam:
      "teostas EL-i tüübihindamise (moodul B) ja väljastas EL-i tüübihindamistõendi",
    text_ppeSubjectToModuleC2:
      "Isikukaitsevahendi suhtes kohaldatakse vastavushindamismenetlust, mis põhineb tootmise sisekontrollil ning juhuslike ajavahemike järel toimuval toodete kontrollil (moodul C2) teavitatud asutuse järelevalve all",
    text_ppeSubjectToModuleD:
      "Isikukaitsevahendi suhtes kohaldatakse vastavushindamismenetlust, mis põhineb tootmisprotsessi kvaliteedi tagamisel (moodul D) teavitatud asutuse järelevalve all",
  },
  de: {
    docTitle: "EU-Konformitätserklärung",
    categoryLabel: "Kategorie",
    responsibilityStatement:
      "Diese Konformitätserklärung wird unter der alleinigen Verantwortung des Herstellers ausgestellt:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Der Hersteller erklärt hiermit, dass die nachfolgend beschriebene persönliche Schutzausrüstung (PSA):",
    ppeNameLabel: "Produktname",
    itemNumberLabel: "mit Artikelnummer",
    conformityLegislationLabel:
      "mit den einschlägigen Harmonisierungsrechtsvorschriften der Union konform ist:",
    harmonisedStandardsLabel:
      "und die geltenden grundlegenden Gesundheitsschutz- und Sicherheitsanforderungen gemäß Anhang II sowie die einschlägigen harmonisierten Normen oder anderen technischen Spezifikationen, Nr.:",
    euCertificateLabel:
      "EU-Baumusterprüfbescheinigung (Modul B) und stellte die EU-Baumusterprüfbescheinigung Nr. aus",
    notifiedBodySectionLabel: "Informationen zur notifizierten Stelle",
    notifiedBodyLabel: "Name der notifizierten Stelle",
    notifiedBodyNumberLabel: "Notifizierte Stelle Nr.",
    issuedByLabel: "ausgestellt durch",
    signatureTitle: "Produktmanager Sicherheit",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Datum",
    backToFormButton: "Zurück zum Formular",
    downloadPdfButton: "PDF herunterladen",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New German translations
    simpleCertificateLabel: "Zertifikat:",
    text_theNotifiedBody: "Die notifizierte Stelle",
    text_performedEUExam:
      "führte die EU-Baumusterprüfung (Modul B) durch und stellte die EU-Baumusterprüfbescheinigung aus",
    text_ppeSubjectToModuleC2:
      "Die PSA unterliegt dem Konformitätsbewertungsverfahren auf Grundlage einer internen Fertigungskontrolle mit überwachten Produktprüfungen in unregelmäßigen Abständen (Modul C2) unter Überwachung der notifizierten Stelle",
    text_ppeSubjectToModuleD:
      "Die PSA unterliegt dem Konformitätsbewertungsverfahren auf Grundlage einer Qualitätssicherung bezogen auf den Produktionsprozess (Modul D) unter Überwachung der notifizierten Stelle",
  },
  fr: {
    docTitle: "Déclaration UE de conformité",
    categoryLabel: "Catégorie",
    responsibilityStatement:
      "La présente déclaration de conformité est établie sous la seule responsabilité du fabricant :",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Le fabricant déclare par la présente que l'équipement de protection individuelle (EPI) décrit ci-dessous :",
    ppeNameLabel: "Nom du produit",
    itemNumberLabel: "avec numéro d'article",
    conformityLegislationLabel:
      "est conforme à la législation d'harmonisation de l'Union applicable :",
    harmonisedStandardsLabel:
      "et satisfait aux exigences essentielles de santé et de sécurité applicables énoncées à l'annexe II et aux normes harmonisées ou autres spécifications techniques pertinentes, n° :",
    euCertificateLabel:
      "Attestation d'examen UE de type (module B) et a délivré l'attestation d'examen UE de type n°",
    notifiedBodySectionLabel: "Informations sur l'organisme notifié",
    notifiedBodyLabel: "Nom de l'organisme notifié",
    notifiedBodyNumberLabel: "Organisme notifié n°",
    issuedByLabel: "délivré par",
    signatureTitle: "Responsable Produit Sécurité",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Date",
    backToFormButton: "Retour au formulaire",
    downloadPdfButton: "Télécharger le PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New French translations
    simpleCertificateLabel: "Certificat :",
    text_theNotifiedBody: "L'organisme notifié",
    text_performedEUExam:
      "a effectué l'examen UE de type (module B) et a délivré l'attestation d'examen UE de type",
    text_ppeSubjectToModuleC2:
      "L'EPI est soumis à la procédure d'évaluation de la conformité fondée sur le contrôle interne de la production et à des contrôles supervisés du produit à des intervalles aléatoires (module C2) sous la surveillance de l'organisme notifié",
    text_ppeSubjectToModuleD:
      "L'EPI est soumis à la procédure d'évaluation de la conformité fondée sur l'assurance de la qualité du mode de production (module D) sous la surveillance de l'organisme notifié",
  },
  it: {
    docTitle: "Dichiarazione di conformità UE",
    categoryLabel: "Categoria",
    responsibilityStatement:
      "La presente dichiarazione di conformità è rilasciata sotto la responsabilità esclusiva del fabbricante:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Il fabbricante dichiara con la presente che il seguente dispositivo di protezione individuale (DPI):",
    ppeNameLabel: "Nome del prodotto",
    itemNumberLabel: "con numero di articolo",
    conformityLegislationLabel:
      "è conforme alla pertinente normativa di armonizzazione dell'Unione:",
    harmonisedStandardsLabel:
      "e soddisfa i requisiti essenziali di salute e sicurezza applicabili di cui all'allegato II e le pertinenti norme armonizzate o altre specifiche tecniche, n.:",
    euCertificateLabel:
      "Certificato di esame UE del tipo (Modulo B) e ha rilasciato il certificato di esame UE del tipo n.",
    notifiedBodySectionLabel: "Informazioni sull'organismo notificato",
    notifiedBodyLabel: "Nome dell'organismo notificato",
    notifiedBodyNumberLabel: "Organismo notificato n.",
    issuedByLabel: "rilasciato da",
    signatureTitle: "Responsabile Prodotto Sicurezza",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Data",
    backToFormButton: "Torna al modulo",
    downloadPdfButton: "Scarica PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Italian translations
    simpleCertificateLabel: "Certificato:",
    text_theNotifiedBody: "L'organismo notificato",
    text_performedEUExam:
      "ha effettuato l'esame UE del tipo (Modulo B) e ha rilasciato il certificato di esame UE del tipo",
    text_ppeSubjectToModuleC2:
      "Il DPI è oggetto della procedura di valutazione della conformità basata sul controllo interno della produzione unito a prove del prodotto sotto controllo ufficiale effettuate ad intervalli casuali (Modulo C2) sotto la sorveglianza dell'organismo notificato",
    text_ppeSubjectToModuleD:
      "Il DPI è oggetto della procedura di valutazione della conformità basata sulla garanzia di qualità del processo di produzione (Modulo D) sotto la sorveglianza dell'organismo notificato",
  },
  nl: {
    docTitle: "EU-conformiteitsverklaring",
    categoryLabel: "Categorie",
    responsibilityStatement:
      "Deze conformiteitsverklaring wordt op eigen verantwoordelijkheid van de fabrikant verstrekt:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "De fabrikant verklaart hierbij dat het hieronder beschreven persoonlijk beschermingsmiddel (PBM):",
    ppeNameLabel: "Productnaam",
    itemNumberLabel: "met artikelnummer",
    conformityLegislationLabel:
      "in overeenstemming is met de relevante harmonisatiewetgeving van de Unie:",
    harmonisedStandardsLabel:
      "en voldoet aan de toepasselijke essentiële gezondheids- en veiligheidseisen zoals uiteengezet in bijlage II en de relevante geharmoniseerde normen of andere technische specificaties, nr.:",
    euCertificateLabel:
      "EU-typeonderzoekscertificaat (module B) en heeft het EU-typeonderzoekscertificaat nr. afgegeven",
    notifiedBodySectionLabel: "Informatie over de aangemelde instantie",
    notifiedBodyLabel: "Naam van de aangemelde instantie",
    notifiedBodyNumberLabel: "Aangemelde instantie nr.",
    issuedByLabel: "afgegeven door",
    signatureTitle: "Productmanager Veiligheid",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Datum",
    backToFormButton: "Terug naar formulier",
    downloadPdfButton: "PDF downloaden",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Dutch translations
    simpleCertificateLabel: "Certificaat:",
    text_theNotifiedBody: "De aangemelde instantie",
    text_performedEUExam:
      "heeft het EU-typeonderzoek (module B) uitgevoerd en het EU-typeonderzoekscertificaat afgegeven",
    text_ppeSubjectToModuleC2:
      "Het PBM is onderworpen aan de conformiteitsbeoordelingsprocedure op basis van interne productiecontrole plus productcontroles onder toezicht met willekeurige tussenpozen (module C2) onder toezicht van de aangemelde instantie",
    text_ppeSubjectToModuleD:
      "Het PBM is onderworpen aan de conformiteitsbeoordelingsprocedure op basis van kwaliteitsborging van het productieproces (module D) onder toezicht van de aangemelde instantie",
  },
  pt: {
    docTitle: "Declaração UE de conformidade",
    categoryLabel: "Categoria",
    responsibilityStatement:
      "A presente declaração de conformidade é emitida sob a exclusiva responsabilidade do fabricante:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "O fabricante declara pelo presente que o equipamento de proteção individual (EPI) descrito abaixo:",
    ppeNameLabel: "Nome do produto",
    itemNumberLabel: "com número de artigo",
    conformityLegislationLabel:
      "está em conformidade com a legislação de harmonização da União aplicável:",
    harmonisedStandardsLabel:
      "e cumpre os requisitos essenciais de saúde e segurança aplicáveis estabelecidos no Anexo II e nas normas harmonizadas relevantes ou outras especificações técnicas, N.º:",
    euCertificateLabel:
      "Certificado de exame UE de tipo (Módulo B) e emitiu o certificado de exame UE de tipo n.º",
    notifiedBodySectionLabel: "Informações sobre o organismo notificado",
    notifiedBodyLabel: "Nome do organismo notificado",
    notifiedBodyNumberLabel: "Organismo notificado n.º",
    issuedByLabel: "emitido por",
    signatureTitle: "Gestor de Produto Segurança",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Data",
    backToFormButton: "Voltar ao formulário",
    downloadPdfButton: "Descarregar PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Portuguese translations
    simpleCertificateLabel: "Certificado:",
    text_theNotifiedBody: "O organismo notificado",
    text_performedEUExam:
      "realizou o exame UE de tipo (Módulo B) e emitiu o certificado de exame UE de tipo",
    text_ppeSubjectToModuleC2:
      "O EPI está sujeito ao procedimento de avaliação de conformidade baseado no controlo interno da produção e nos controlos supervisionados do produto a intervalos aleatórios (Módulo C2) sob supervisão do organismo notificado",
    text_ppeSubjectToModuleD:
      "O EPI está sujeito ao procedimento de avaliação de conformidade baseado na garantia da qualidade do processo de produção (Módulo D) sob supervisão do organismo notificado",
  },
  lv: {
    docTitle: "ES atbilstības deklarācija",
    categoryLabel: "Kategorija",
    responsibilityStatement:
      "Šī atbilstības deklarācija ir izdota vienīgi uz ražotāja atbildību:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Ražotājs ar šo paziņo, ka zemāk aprakstītais individuālais aizsardzības līdzeklis (IAL):",
    ppeNameLabel: "Produkta nosaukums",
    itemNumberLabel: "ar preces numuru",
    conformityLegislationLabel:
      "atbilst attiecīgajiem Savienības saskaņošanas tiesību aktiem:",
    harmonisedStandardsLabel:
      "un atbilst II pielikumā noteiktajām piemērojamajām būtiskajām veselības aizsardzības un drošības prasībām un attiecīgajiem saskaņotajiem standartiem vai citām tehniskajām specifikācijām, Nr.:",
    euCertificateLabel:
      "ES tipa pārbaudes sertifikāts (B modulis) un izdevis ES tipa pārbaudes sertifikātu Nr.",
    notifiedBodySectionLabel: "Informācija par paziņoto struktūru",
    notifiedBodyLabel: "Paziņotās struktūras nosaukums",
    notifiedBodyNumberLabel: "Paziņotā struktūra Nr.",
    issuedByLabel: "izdevusi",
    signatureTitle: "Produktu drošības vadītājs",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Datums",
    backToFormButton: "Atpakaļ uz veidlapu",
    downloadPdfButton: "Lejupielādēt PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Latvian translations
    simpleCertificateLabel: "Sertifikāts:",
    text_theNotifiedBody: "Paziņotā struktūra",
    text_performedEUExam:
      "veica ES tipa pārbaudi (B modulis) un izsniedza ES tipa pārbaudes sertifikātu",
    text_ppeSubjectToModuleC2:
      "IAL ir pakļauts atbilstības novērtēšanas procedūrai, kas balstīta uz iekšējo ražošanas kontroli un uzraudzītām produkta pārbaudēm pēc nejauši izvēlētiem intervāliem (C2 modulis) paziņotās struktūras uzraudzībā",
    text_ppeSubjectToModuleD:
      "IAL ir pakļauts atbilstības novērtēšanas procedūrai, kas balstīta uz ražošanas procesa kvalitātes nodrošināšanu (D modulis) paziņotās struktūras uzraudzībā",
  },
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
