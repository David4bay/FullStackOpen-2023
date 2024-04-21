export enum Gender {
    male = 'male',
    female = 'female',
    other = 'other'
}

export interface PatientType {
    id?: string
    name: string
    dateOfBirth: string
    ssn: string
    gender?: string
    occupation: string
}