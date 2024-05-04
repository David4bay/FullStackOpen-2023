import type { DiagnosesCodes } from '../data/diagnoses'

export interface DischargeDetails {
    date: string;
    criteria: string;
}

export enum Gender {
    Male = 'Male',
    Female = 'Female',
    Other = 'Other'
}

export interface OccupationalHealthcareEntry {
    healthCheckRating?: number;
}

export interface SickLeave {
    startDate: string;
    endDate: string;
}

export interface HospitalEntry {
    id: string;
    date: string;
    type: string;
    specialist: string;
    description: string;
    employerName?: string;
}


export interface PatientType {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender?: Gender.Male | Gender.Female | Gender.Other | Gender | string;
    occupation: string;
    entries?: Array<Entry | null> | null;
}

export interface Entry extends HospitalEntry, OccupationalHealthcareEntry {
    diagnosisCodes?: Array<DiagnosesCodes['code']>;
    discharge?: DischargeDetails;
    sickLeave?: SickLeave;
}

export type NonSensitivePatient = Omit<PatientType, 'ssn' | 'entries'>;