import { Gender } from "../../types/patientType"
import { Entry } from "../../types/patientType";

function isString(object: unknown): object is string {
    return typeof object === 'string' || object instanceof String;
}

function isGender(gender: string): gender is Gender {
    return Object.values(Gender).map((g) => g.toString()).includes(gender);
}

function isDate(date: string): boolean {
    return Boolean(Date.parse(date));
  }

function checkId(id: unknown): string {
    if (!isString(id)) {
        throw new Error('Id is not a valid string.')
    } 
    return id;
}

function checkName(name: unknown): string {
    if (!isString(name)) {
        throw new Error('Name is not a valid string.')
    }
    return name;
}

function checkSSN(ssn: unknown): string {
    if (!isString(ssn)) {
        throw new Error('SSN is not a valid string.')
    }
    return ssn;
}

function parseDate(dateString: unknown): string {
    if (!dateString || !isString(dateString) || !isDate(dateString)) {
        throw new Error('date is not recognized as a valid date')
    }
    return dateString;
}

function checkGender(gender: unknown): Gender {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Gender not recognized. ${gender}`)
    } 
    return gender;
}

function checkOccupation(occupation: unknown): string {
    if (!occupation || !isString(occupation)) {
        throw new Error('Occupation is invalid')
    }
    return occupation;
}

function checkEntries(entry: unknown): Entry[] {
    console.log("entry in checker", entry)
    if (!Array.isArray(entry)) throw new Error('Is not a valid array.')

    let patientEntry: Entry = entry[0]

    if (!patientEntry.hasOwnProperty('id') && typeof patientEntry.id !== 'string') throw new Error('Invalid id.')

    if (!patientEntry.hasOwnProperty('date') && typeof patientEntry.date !== 'string' && !Date.parse(patientEntry.date)) throw new Error('Invalid date.')

    if (!patientEntry.hasOwnProperty('specialist') && typeof patientEntry.specialist !== 'string') throw new Error('Invalid specialist entry.')

    if (!patientEntry.hasOwnProperty('description') && typeof patientEntry.description !== 'string') throw new Error('Invalid description entry.')

    if (!patientEntry.hasOwnProperty('type') && patientEntry.type !== 'string') throw new Error('Invalid type entry.')

    if (!patientEntry.hasOwnProperty('discharge')) throw new Error('Invalid discharge entry.')

    if (!patientEntry.hasOwnProperty('sickLeave')) throw new Error('Invalid sickLeave entry.')

    if (!patientEntry.hasOwnProperty('healthCheckRating') && typeof patientEntry.healthCheckRating !== 'number') throw new Error('Invalid healthCheckRating entry.')

    if (!patientEntry.hasOwnProperty('diagnosisCodes') && !Array.isArray(patientEntry.diagnosisCodes)) throw new Error('Invalid diagnosisCodes entry.')

    if (!patientEntry.hasOwnProperty('employerName') && typeof patientEntry.employerName !== 'string') throw new Error('Invalid employerName entry.')

    return entry
}

export default {
    checkId,
    checkGender,
    checkName,
    parseDate,
    checkSSN,
    checkOccupation,
    checkEntries
}