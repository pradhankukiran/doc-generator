export interface DocFormData {
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
  selectedNotifiedBodyId: string;
  showCertificateNumber?: boolean;
} 