// src/notifiedBodies.ts
export interface NotifiedBody {
  id: string; // Unique identifier (e.g., lowercase name with underscores)
  name: string;
  number: string;
  address: string;
  zipCode: string;
  country: string;
}

export const notifiedBodies: NotifiedBody[] = [
  {
    id: 'sgs_fimko',
    name: 'SGS Fimko Ltd.',
    number: '0598',
    address: 'Takomotie 8',
    zipCode: 'FI - 00380',
    country: 'Helsinki'
  },
  {
    id: 'inspec_international_bv',
    name: 'INSPEC International B.V.',
    number: '2849',
    address: 'Beechavenue 54, 1119 PW',
    zipCode: 'Schiphol-Rijk',
    country: 'Netherlands'
  },
  {
    id: 'ricotest',
    name: 'RICOTEST',
    number: '0498',
    address: 'Via Tione, 9',
    zipCode: '37010 - Pastrengo (VR)',
    country: 'Italy'
  },
  {
    id: 'tuv_rheinland_lga_products_gmbh',
    name: 'TÜV Rheinland LGA Products GmbH',
    number: '0197',
    address: 'Tillystraße 2',
    zipCode: '90431 Nürnberg',
    country: 'Germany'
  },
  {
    id: 'ccqs_certification_services_limited',
    name: 'CCQS Certification Services Limited',
    number: '2834',
    address: 'Block 1 Blanchardstown Corporate Park, Ballycoolin Road, Blanchardstown, Dublin 15 D15 AKK1',
    zipCode: 'Dublin',
    country: 'Ireland'
  },
  {
    id: 'din_certco_gesellschaft_fur_konformitatsbewertung_mbh',
    name: 'DIN CERTCO GESELLSCHAFT FÜR KONFORMITÄTSBEWERTUNG MBH',
    number: '0196',
    address: 'Alboinstraße 56',
    zipCode: '12103 BERLIN',
    country: 'Germany'
  }
]; 