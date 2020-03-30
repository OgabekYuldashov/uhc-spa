import {Language} from './language';

export class Parameters {
  plans: string;
  location: string;
  distanceFromYourAddress: Number;
  specialization: string[];
  acceptingNew: boolean;
  firstName: string;
  lastName: string;
  extendedHrsWeek: boolean;
  extendedHrsSat: boolean;
  gender: string;
  handicapAccessible: boolean;
  languageSponeken: string[];
  languageMap: Map<string, boolean> = new Map<string, boolean>();
  specializationMap: Map<string, boolean> = new Map<string, boolean>();
}
