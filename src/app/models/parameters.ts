import {Language} from './language';

export class Parameters {
  plans: string;
  location: string;
  distanceFromYourAddress: string;
  specialization: string[];
  acceptingNew = false;
  firstName: string;
  lastName: string;
  extendedHrsWeek = false;
  extendedHrsSat = false;
  gender: string;
  handicapAccessible = false;
  languageSponeken: string[];
  languageMap: Map<string, boolean> = new Map<string, boolean>();
  specializationMap: Map<string, boolean> = new Map<string, boolean>();
}
