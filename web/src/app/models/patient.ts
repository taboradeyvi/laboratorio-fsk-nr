import { Symptom } from './symptom';

export interface Patient {
  _id: string;
  firstName: string;
  lastName: string;
  address: string;
  birthday: string;
  phoneNumbers: string[];
  emails: string[];
  symptoms: Symptom[];
}
