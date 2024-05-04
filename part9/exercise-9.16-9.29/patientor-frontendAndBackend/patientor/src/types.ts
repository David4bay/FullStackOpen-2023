export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "Male",
  Female = "Female",
  Other = "Other"
}

export interface Patient {
  id?: string;
  name?: string;
  dateOfBirth?: string;
  ssn?: string;
  gender?: Gender.Male | Gender.Female | Gender.Other | string;
  occupation?: string;
  entries?: Array<Entry | null>;
}

interface HospitalEntry {
  id?: string;
  date?: string;
  type?: string;
  specialist?: string;
  description?: string;
  employerName?: string;
}

export interface Entry extends HospitalEntry, OccupationalHealthcareEntry {
  diagnosisCodes?: Array<DiagnosesCodes['code']> | string[] | string;
  discharge?: DischargeDetails | string;
  sickLeave?: SickLeave | string;
}

interface OccupationalHealthcareEntry {
    healthCheckRating?: number;
}

export interface Message {
  message: string;
}

export interface Diagnoses {
  map(arg0: ({ code }: { code: any; }) => any): any;
  code: string;
  name: string;
  latin?: string;
}

export interface DischargeDetails {
    date: string;
    criteria: string;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface Props {
  onCancel: () => void;
  onSubmit: (id: string, values: Entry) => Promise<void>;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface OnChange {
  preventDefault: () => void; 
  target: { 
      name: any; 
      value: any;
  } 
}

export interface AddDiagnosis {
  preventDefault: () => void;
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>;
export type DiagnosesCodes = Omit<Diagnoses, 'name' | 'latin'>;
export type PatientFormValues = Omit<Patient, "id" | "entries">;