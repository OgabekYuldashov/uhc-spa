import {Language} from './language';

export class Parameters {
  plans: string;
  location: string;
  distanceFromYourAddress: Number;
  specialization: string[];
  acceptingNew: boolean;
  firstName: string;
  lastName: string;
  extendedHrsWeek: string;
  extendedHrsSat: string;
  gender: string;
  handicapAccessible: boolean;
  languageSponeken: string[];
  languageMap: Map<string, boolean> = new Map<string, boolean>();
  specializationMap: Map<string, boolean> = new Map<string, boolean>();
}
