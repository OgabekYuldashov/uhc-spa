export class ResultItem {
  classification: string;
  fullAddress: string;
  fullMailingAddress: string;
  fullName:string;
  public npi: string;
  extendedHrsSat: string;
  midName: string;
  city: string;
  mailingPhone: string;
  zip: string;
  nameSuffix: string;
  languages: string[];
  state: string;
  location: string;
  lat: number;
  long: number;
  handicapAccessible: string;
  latConfidence: number;
  mailingFax: string;
  credential: string;
  fax: string;
  officeTimings: string[];
  plans: string[];
  lastUpdated: string;
  phone: string;
  namePrefix: string;
  organizationName: string;
  acceptingNew: string;
  specialization: string;
  displayName: string;
  firstName: string;
  gender: string;
  licenseNumber: string;
  extendedHrsWeek: string;
  lastName: string;


  constructor() {
  }

  public getNPI(): string {
    return this.npi;
  }
}
