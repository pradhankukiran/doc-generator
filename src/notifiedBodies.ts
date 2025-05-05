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
  // Placeholder Notified Bodies
  {
    id: 'notified_body_alpha',
    name: 'NotifiedBodyAlpha GmbH',
    number: '0123',
    address: 'Alpha Strasse 1',
    zipCode: 'DE-12345',
    country: 'Berlin'
  },
  {
    id: 'notified_body_bravo',
    name: 'Institut Bravo',
    number: '1122',
    address: 'Rue Bravo 2',
    zipCode: 'FR-75001',
    country: 'Paris'
  },
  {
    id: 'notified_body_charlie',
    name: 'Charlie Certification AB',
    number: '2233',
    address: 'Charliegatan 3',
    zipCode: 'SE-111 22',
    country: 'Stockholm'
  },
  // TODO: Replace placeholders and add more notified bodies based on client's list
  // Example format:
  // {
  //   id: 'another_body_id',
  //   name: 'Another Notified Body Name',
  //   number: '1234',
  //   address: '123 Sample St',
  //   zipCode: 'SE-123 45',
  //   country: 'Stockholm'
  // },
]; 