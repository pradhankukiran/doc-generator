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
    docTitle: "EU-förklaring om överensstämmelse",
    categoryLabel: "Kategori",
    responsibilityStatement:
      "Denna förklaring om överensstämmelse utfärdas på tillverkarens eget ansvar:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Tillverkaren förklarar härmed att den nedan beskrivna personliga skyddsutrustningen (PPE):",
    ppeNameLabel: "Produktnamn",
    itemNumberLabel: "med artikelnummer",
    conformityLegislationLabel:
      "överensstämmer med tillämplig harmoniseringslagstiftning inom unionen:",
    harmonisedStandardsLabel:
      "och uppfyller de tillämpliga väsentliga hälso- och säkerhetskraven i bilaga II och de relevanta harmoniserade standarderna eller andra tekniska specifikationer, nr.:",
    euCertificateLabel: "EU-typprövningscertifikat (Modul B) och utfärdade certifikat nr.",
    notifiedBodySectionLabel: "Information om anmält organ",
    notifiedBodyLabel: "Namn på anmält organ",
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
    text_performedEUExam: "utförde EU-typprövningen (Modul B) och utfärdade EU-typprövningscertifikat",
    text_ppeSubjectToModuleC2: "Den personliga skyddsutrustningen omfattas av förfarandet för bedömning av överensstämmelse baserat på intern tillverkningskontroll plus övervakade produktkontroller med slumpvisa intervaller (Modul C2) under övervakning av det anmälda organet",
    text_ppeSubjectToModuleD: "Den personliga skyddsutrustningen omfattas av förfarandet för bedömning av överensstämmelse baserat på kvalitetssäkring av tillverkningsprocessen (Modul D) under övervakning av det anmälda organet",
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
      "er i samsvar med relevant harmoniseringslovgivning i Unionen:",
    harmonisedStandardsLabel:
      "og oppfyller de gjeldende grunnleggende helse- og sikkerhetskrav fastsatt i vedlegg II og de relevante harmoniserte standardene eller andre tekniske spesifikasjoner, nr.:",
    euCertificateLabel:
      "EU-typeprøvingssertifikat (Modul B) og utstedte EU-typeprøvingssertifikat nr.",
    notifiedBodySectionLabel: "Informasjon om notifisert organ",
    notifiedBodyLabel: "Navn på notifisert organ",
    notifiedBodyNumberLabel: "Notifisert organ nr.",
    issuedByLabel: "utstedt av",
    signatureTitle: "Produktsikkerhetsleder",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Dato",
    backToFormButton: "Tilbake til skjema",
    downloadPdfButton: "Last ned PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Norwegian translations
    simpleCertificateLabel: "Sertifikat:",
    text_theNotifiedBody: "Det notifiserte organet",
    text_performedEUExam:
      "utførte EU-typeprøvingen (Modul B) og utstedte EU-typeprøvingssertifikat",
    text_ppeSubjectToModuleC2:
      "PVU er underlagt samsvarsvurderingsprosedyren basert på intern produksjonskontroll pluss overvåkede produktkontroller med tilfeldige intervaller (Modul C2) under tilsyn av det notifiserte organet",
    text_ppeSubjectToModuleD:
      "PVU er underlagt samsvarsvurderingsprosedyren basert på kvalitetssikring av produksjonsprosessen (Modul D) under tilsyn av det notifiserte organet",
  },
  da: {
    docTitle: "EU-overensstemmelseserklæring",
    categoryLabel: "Kategori",
    responsibilityStatement:
      "Denne overensstemmelseserklæring udstedes på fabrikantens eget ansvar:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel:
      "Fabrikanten erklærer hermed, at følgende personlige værnemidler (PV):",
    ppeNameLabel: "Produktnavn",
    itemNumberLabel: "med artikelnummer",
    conformityLegislationLabel:
      "er i overensstemmelse med relevant harmoniseringslovgivning i EU:",
    harmonisedStandardsLabel:
      "og opfylder de gældende væsentlige sundheds- og sikkerhedskrav i bilag II og de relevante harmoniserede standarder eller andre tekniske specifikationer, nr.:",
    euCertificateLabel:
      "EU-typeafprøvningscertifikat (Modul B) og udstedte EU-typeafprøvningscertifikat nr.",
    notifiedBodySectionLabel: "Oplysninger om bemyndiget organ",
    notifiedBodyLabel: "Navn på bemyndiget organ",
    notifiedBodyNumberLabel: "Bemyndiget organ nr.",
    issuedByLabel: "udstedt af",
    signatureTitle: "Produktsikkerhedsleder",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Dato",
    backToFormButton: "Tilbage til formularen",
    downloadPdfButton: "Hent PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    // New Danish translations
    simpleCertificateLabel: "Certifikat:",
    text_theNotifiedBody: "Det bemyndigede organ",
    text_performedEUExam:
      "udførte EU-typeafprøvningen (Modul B) og udstedte EU-typeafprøvningscertifikat",
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
    signatureTitle: "Produkto drošības vadītājs",
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
    text_ppeSubjectToModuleC2: "IAL ir pakļauts atbilstības novērtēšanas procedūrai (C2 modulis) paziņotās struktūras uzraudzībā",
    text_ppeSubjectToModuleD: "IAL ir pakļauts atbilstības novērtēšanas procedūrai (D modulis) paziņotās struktūras uzraudzībā",
  },
  es: {
    docTitle: "Declaración de conformidad UE",
    categoryLabel: "Categoría",
    responsibilityStatement: "Esta declaración de conformidad se expide bajo la exclusiva responsabilidad del fabricante:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel: "El fabricante declara por la presente que el Equipo de Protección Individual (EPI) que se describe a continuación:",
    ppeNameLabel: "Nombre del producto",
    itemNumberLabel: "con número de artículo",
    conformityLegislationLabel: "es conforme con la legislación de armonización pertinente de la Unión:",
    harmonisedStandardsLabel: "y cumple los requisitos esenciales de salud y seguridad aplicables establecidos en el anexo II y las normas armonizadas pertinentes u otras especificaciones técnicas, n.º:",
    euCertificateLabel: "certificado de examen UE de tipo (módulo B) y ha expedido el certificado de examen UE de tipo n.º",
    notifiedBodySectionLabel: "Información del organismo notificado",
    notifiedBodyLabel: "Nombre del organismo notificado",
    notifiedBodyNumberLabel: "Organismo notificado n.º",
    issuedByLabel: "expedido por",
    signatureTitle: "Director de producto de seguridad",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Fecha",
    backToFormButton: "Volver al formulario",
    downloadPdfButton: "Descargar PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    simpleCertificateLabel: "Certificado:",
    text_theNotifiedBody: "El organismo notificado",
    text_performedEUExam: "ha realizado el examen UE de tipo (módulo B) y ha expedido el certificado de examen UE de tipo",
    text_ppeSubjectToModuleC2: "El EPI está sujeto al procedimiento de evaluación de la conformidad basado en el control interno de la producción más controles supervisados del producto a intervalos aleatorios (módulo C2) bajo la supervisión del organismo notificado",
    text_ppeSubjectToModuleD: "El EPI está sujeto al procedimiento de evaluación de la conformidad basado en el aseguramiento de la calidad del proceso de producción (módulo D) bajo la supervisión del organismo notificado",
  },
  sk: {
    docTitle: "EÚ vyhlásenie o zhode",
    categoryLabel: "Kategória",
    responsibilityStatement: "Toto vyhlásenie o zhode sa vydáva na výhradnú zodpovednosť výrobcu:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel: "Výrobca týmto vyhlasuje, že nižšie opísaný osobný ochranný prostriedok (OOP):",
    ppeNameLabel: "Názov výrobku",
    itemNumberLabel: "s číslom položky",
    conformityLegislationLabel: "je v zhode s príslušnými harmonizačnými právnymi predpismi Únie:",
    harmonisedStandardsLabel: "a spĺňa platné základné požiadavky na ochranu zdravia a bezpečnosť stanovené v prílohe II a príslušné harmonizované normy alebo iné technické špecifikácie, č.:",
    euCertificateLabel: "certifikát o typovej skúške EÚ (modul B) a vydal certifikát o typovej skúške EÚ č.",
    notifiedBodySectionLabel: "Informácie o notifikovanom orgáne",
    notifiedBodyLabel: "Názov notifikovaného orgánu",
    notifiedBodyNumberLabel: "Notifikovaný orgán č.",
    issuedByLabel: "vydal",
    signatureTitle: "Produktový manažér pre bezpečnosť",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Dátum",
    backToFormButton: "Späť na formulár",
    downloadPdfButton: "Stiahnuť PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    simpleCertificateLabel: "Certifikát:",
    text_theNotifiedBody: "Notifikovaný orgán",
    text_performedEUExam: "vykonal typovú skúšku EÚ (modul B) a vydal certifikát o typovej skúške EÚ",
    text_ppeSubjectToModuleC2: "OOP podlieha postupu posudzovania zhody založenému na internej kontrole výroby plus kontrolovaných kontrolách výrobku v náhodných intervaloch (modul C2) pod dohľadom notifikovaného orgánu",
    text_ppeSubjectToModuleD: "OOP podlieha postupu posudzovania zhody založenému na zabezpečení kvality výrobného procesu (modul D) pod dohľadom notifikovaného orgánu",
  },
  sl: {
    docTitle: "Izjava EU o skladnosti",
    categoryLabel: "Kategorija",
    responsibilityStatement: "Ta izjava o skladnosti je izdana na lastno odgovornost proizvajalca:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel: "Proizvajalec s tem izjavlja, da je spodaj opisana osebna varovalna oprema (OVO):",
    ppeNameLabel: "Ime izdelka",
    itemNumberLabel: "s številko artikla",
    conformityLegislationLabel: "je v skladu z ustrezno harmonizacijsko zakonodajo Unije:",
    harmonisedStandardsLabel: "in izpolnjuje veljavne bistvene zdravstvene in varnostne zahteve iz Priloge II ter ustrezne harmonizirane standarde ali druge tehnične specifikacije, št.:",
    euCertificateLabel: "certifikat o EU-pregledu tipa (modul B) in izdal certifikat o EU-pregledu tipa št.",
    notifiedBodySectionLabel: "Informacije o priglašenem organu",
    notifiedBodyLabel: "Ime priglašenega organa",
    notifiedBodyNumberLabel: "Priglašeni organ št.",
    issuedByLabel: "izdal",
    signatureTitle: "Vodja izdelkov za varnost",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Datum",
    backToFormButton: "Nazaj na obrazec",
    downloadPdfButton: "Prenesi PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    simpleCertificateLabel: "Certifikat:",
    text_theNotifiedBody: "Priglašeni organ",
    text_performedEUExam: "je opravil EU-pregled tipa (modul B) in izdal certifikat o EU-pregledu tipa",
    text_ppeSubjectToModuleC2: "OVO je predmet postopka ugotavljanja skladnosti, ki temelji na notranji kontroli proizvodnje in nadzorovanih pregledih izdelkov v naključnih presledkih (modul C2) pod nadzorom priglašenega organa",
    text_ppeSubjectToModuleD: "OVO je predmet postopka ugotavljanja skladnosti, ki temelji na zagotavljanju kakovosti proizvodnega procesa (modul D) pod nadzorom priglašenega organa",
  },
  cs: {
    docTitle: "EU prohlášení o shodě",
    categoryLabel: "Kategorie",
    responsibilityStatement: "Toto prohlášení o shodě se vydává na výhradní odpovědnost výrobce:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel: "Výrobce tímto prohlašuje, že níže popsaný osobní ochranný prostředek (OOP):",
    ppeNameLabel: "Název výrobku",
    itemNumberLabel: "s číslem položky",
    conformityLegislationLabel: "je ve shodě s příslušnými harmonizačními právními předpisy Unie:",
    harmonisedStandardsLabel: "a splňuje platné základní požadavky na ochranu zdraví a bezpečnost stanovené v příloze II a příslušné harmonizované normy nebo jiné technické specifikace, č.:",
    euCertificateLabel: "certifikát o přezkoušení typu EU (modul B) a vydal certifikát o přezkoušení typu EU č.",
    notifiedBodySectionLabel: "Informace o oznámeném subjektu",
    notifiedBodyLabel: "Název oznámeného subjektu",
    notifiedBodyNumberLabel: "Oznámený subjekt č.",
    issuedByLabel: "vydal",
    signatureTitle: "Produktový manažer pro bezpečnost",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Datum",
    backToFormButton: "Zpět na formulář",
    downloadPdfButton: "Stáhnout PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    simpleCertificateLabel: "Certifikát:",
    text_theNotifiedBody: "Oznámený subjekt",
    text_performedEUExam: "provedl přezkoušení typu EU (modul B) a vydal certifikát o přezkoušení typu EU",
    text_ppeSubjectToModuleC2: "OOP podléhá postupu posuzování shody založenému na vnitřní kontroli výroby plus kontrolovaných kontrolách výrobku v náhodných intervalech (modul C2) pod dohledem oznámeného subjektu",
    text_ppeSubjectToModuleD: "OOP podléhá postupu posuzování shody založenému na zabezpečování kvality výrobního procesu (modul D) pod dohledem oznámeného subjektu",
  },
  hu: {
    docTitle: "EU-megfelelőségi nyilatkozat",
    categoryLabel: "Kategória",
    responsibilityStatement: "Ezt a megfelelőségi nyilatkozatot a gyártó kizárólagos felelősségére adják ki:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel: "A gyártó ezennel kijelenti, hogy az alább leírt egyéni védőeszköz (EVE):",
    ppeNameLabel: "Termék neve",
    itemNumberLabel: "cikkszámmal",
    conformityLegislationLabel: "megfelel a vonatkozó uniós harmonizációs jogszabályoknak:",
    harmonisedStandardsLabel: "és teljesíti a II. mellékletben meghatározott alkalmazandó alapvető egészségvédelmi és biztonsági követelményeket, valamint a vonatkozó harmonizált szabványokat vagy egyéb műszaki előírásokat, sz.:",
    euCertificateLabel: "EU-típusvizsgálati tanúsítvány (B. modul) és kiadta az EU-típusvizsgálati tanúsítványt, sz.",
    notifiedBodySectionLabel: "A bejelentett szervezet adatai",
    notifiedBodyLabel: "A bejelentett szervezet neve",
    notifiedBodyNumberLabel: "Bejelentett szervezet sz.",
    issuedByLabel: "kiadta",
    signatureTitle: "Termékbiztonsági vezető",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Dátum",
    backToFormButton: "Vissza az űrlaphoz",
    downloadPdfButton: "PDF letöltése",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    simpleCertificateLabel: "Tanúsítvány:",
    text_theNotifiedBody: "A bejelentett szervezet",
    text_performedEUExam: "elvégezte az EU-típusvizsgálatot (B. modul) és kiadta az EU-típusvizsgálati tanúsítványt",
    text_ppeSubjectToModuleC2: "Az EVE a belső gyártásellenőrzésen és a bejelentett szervezet felügyelete mellett, véletlenszerű időközönként végzett felügyelt termékellenőrzéseken alapuló megfelelőségértékelési eljárás (C2. modul) hatálya alá tartozik",
    text_ppeSubjectToModuleD: "Az EVE a gyártási folyamat minőségbiztosításán alapuló megfelelőségértékelési eljárás (D. modul) hatálya alá tartozik a bejelentett szervezet felügyelete mellett",
  },
  lt: {
    docTitle: "ES atitikties deklaracija",
    categoryLabel: "Kategorija",
    responsibilityStatement: "Ši atitikties deklaracija išduodama tik gamintojo atsakomybe:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel: "Gamintojas šiuo dokumentu pareiškia, kad toliau aprašyta asmeninė apsaugos priemonė (AAP):",
    ppeNameLabel: "Gaminio pavadinimas",
    itemNumberLabel: "su prekės numeriu",
    conformityLegislationLabel: "atitinka atitinkamus derinamuosius Sąjungos teisės aktus:",
    harmonisedStandardsLabel: "ir atitinka II priede nustatytus taikytinus esminius sveikatos ir saugos reikalavimus bei atitinkamus darniuosius standartus ar kitas technines specifikacijas, Nr.:",
    euCertificateLabel: "ES tipo tyrimo sertifikatas (B modulis) ir išdavė ES tipo tyrimo sertifikatą Nr.",
    notifiedBodySectionLabel: "Notifikuotosios įstaigos informacija",
    notifiedBodyLabel: "Notifikuotosios įstaigos pavadinimas",
    notifiedBodyNumberLabel: "Notifikuotoji įstaiga Nr.",
    issuedByLabel: "išdavė",
    signatureTitle: "Produkto saugos vadybininkas",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Data",
    backToFormButton: "Atgal į formą",
    downloadPdfButton: "Atsisiųsti PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    simpleCertificateLabel: "Sertifikatas:",
    text_theNotifiedBody: "Notifikuotoji įstaiga",
    text_performedEUExam: "atliko ES tipo tyrimą (B modulis) ir išdavė ES tipo tyrimo sertifikatą",
    text_ppeSubjectToModuleC2: "AAP taikoma atitikties vertinimo procedūra, pagrįsta vidine gamybos kontrole ir prižiūrimais produkto patikrinimais atsitiktiniais intervalais (C2 modulis), prižiūrint notifikuotajai įstaigai",
    text_ppeSubjectToModuleD: "AAP taikoma atitikties vertinimo procedūra, pagrįsta gamybos proceso kokybės užtikrinimu (D modulis), prižiūrint notifikuotajai įstaigai",
  },
  el: {
    docTitle: "Δήλωση συμμόρφωσης ΕΕ",
    categoryLabel: "Κατηγορία",
    responsibilityStatement: "Η παρούσα δήλωση συμμόρφωσης εκδίδεται με αποκλειστική ευθύνη του κατασκευαστή:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel: "Ο κατασκευαστής δηλώνει δια του παρόντος ότι ο κατωτέρω περιγραφόμενος εξοπλισμός ατομικής προστασίας (ΕΑΠ):",
    ppeNameLabel: "Ονομασία προϊόντος",
    itemNumberLabel: "με αριθμό είδους",
    conformityLegislationLabel: "είναι σύμφωνος με τη σχετική ενωσιακή νομοθεσία εναρμόνισης:",
    harmonisedStandardsLabel: "και πληροί τις ισχύουσες βασικές απαιτήσεις υγείας και ασφάλειας που ορίζονται στο παράρτημα II και τα σχετικά εναρμονισμένα πρότυπα ή άλλες τεχνικές προδιαγραφές, αριθ.:",
    euCertificateLabel: "πιστοποιητικό εξέτασης τύπου ΕΕ (ενότητα Β) και εξέδωσε το πιστοποιητικό εξέτασης τύπου ΕΕ αριθ.",
    notifiedBodySectionLabel: "Πληροφορίες κοινοποιημένου οργανισμού",
    notifiedBodyLabel: "Ονομασία κοινοποιημένου οργανισμού",
    notifiedBodyNumberLabel: "Κοινοποιημένος οργανισμός αριθ.",
    issuedByLabel: "εκδόθηκε από",
    signatureTitle: "Διευθυντής Ασφάλειας Προϊόντων",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Ημερομηνία",
    backToFormButton: "Πίσω στη φόρμα",
    downloadPdfButton: "Λήψη PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    simpleCertificateLabel: "Πιστοποιητικό:",
    text_theNotifiedBody: "Ο κοινοποιημένος οργανισμός",
    text_performedEUExam: "πραγματοποίησε την εξέταση τύπου ΕΕ (ενότητα Β) και εξέδωσε το πιστοποιητικό εξέτασης τύπου ΕΕ",
    text_ppeSubjectToModuleC2: "Ο ΕΑΠ υπόκειται στη διαδικασία αξιολόγησης της συμμόρφωσης που βασίζεται στον εσωτερικό έλεγχο της παραγωγής συν εποπτευόμενους ελέγχους προϊόντων σε τυχαία διαστήματα (ενότητα C2) υπό την εποπτεία του κοινοποιημένου οργανισμού",
    text_ppeSubjectToModuleD: "Ο ΕΑΠ υπόκειται στη διαδικασία αξιολόγησης της συμμόρφωσης που βασίζεται στη διασφάλιση της ποιότητας της διαδικασίας παραγωγής (ενότητα D) υπό την εποπτεία του κοινοποιημένου οργανισμού",
  },
  hr: {
    docTitle: "EU izjava o sukladnosti",
    categoryLabel: "Kategorija",
    responsibilityStatement: "Ova izjava o sukladnosti izdaje se na isključivu odgovornost proizvođača:",
    manufacturerAddressLabel: "Båstadgruppen AB",
    ppeLabel: "Proizvođač ovime izjavljuje da je dolje opisana osobna zaštitna oprema (OZO):",
    ppeNameLabel: "Naziv proizvoda",
    itemNumberLabel: "s brojem artikla",
    conformityLegislationLabel: "u skladu s mjerodavnim zakonodavstvom Unije o usklađivanju:",
    harmonisedStandardsLabel: "i ispunjava primjenjive bitne zdravstvene i sigurnosne zahtjeve utvrđene u Prilogu II. i mjerodavne usklađene norme ili druge tehničke specifikacije, br.:",
    euCertificateLabel: "certifikat o EU ispitivanju tipa (modul B) i izdao certifikat o EU ispitivanju tipa br.",
    notifiedBodySectionLabel: "Informacije o prijavljenom tijelu",
    notifiedBodyLabel: "Naziv prijavljenog tijela",
    notifiedBodyNumberLabel: "Prijavljeno tijelo br.",
    issuedByLabel: "izdao",
    signatureTitle: "Voditelj sigurnosti proizvoda",
    signatureNamePlaceholder: "Anders Andersson",
    signatureDateLabel: "Datum",
    backToFormButton: "Natrag na obrazac",
    downloadPdfButton: "Preuzmi PDF",
    footerWebsite: "www.bastadgruppen.com",
    footerCompanyName: "Båstadgruppen AB",
    footerPhoneNumber: "0046123413445",
    simpleCertificateLabel: "Certifikat:",
    text_theNotifiedBody: "Prijavljeno tijelo",
    text_performedEUExam: "provelo je EU ispitivanje tipa (modul B) i izdalo certifikat o EU ispitivanju tipa",
    text_ppeSubjectToModuleC2: "OZO podliježe postupku ocjenjivanja sukladnosti koji se temelji na unutarnjoj kontroli proizvodnje i nadziranim provjerama proizvoda u nasumičnim razmacima (modul C2) pod nadzorom prijavljenog tijela",
    text_ppeSubjectToModuleD: "OZO podliježe postupku ocjenjivanja sukladnosti koji se temelji na osiguranju kvalitete proizvodnog procesa (modul D) pod nadzorom prijavljenog tijela",
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
  { code: "es", name: "Spanish" },
  { code: "sk", name: "Slovak" },
  { code: "sl", name: "Slovenian" },
  { code: "cs", name: "Czech" },
  { code: "hu", name: "Hungarian" },
  { code: "lt", name: "Lithuanian" },
  { code: "el", name: "Greek" },
  { code: "hr", name: "Croatian" },
];
