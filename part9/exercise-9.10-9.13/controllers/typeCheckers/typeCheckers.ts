import { Gender } from "../../types/patientType"

function isString(object: unknown): object is string {
    return typeof object === 'string' || object instanceof String
}

function isGender(gender: string): gender is Gender {
    return Object.values(Gender).map((g) => g.toString()).includes(gender)
}

function isDate(date: string): boolean {
    return Boolean(Date.parse(date));
  }

function checkId(id: unknown): string {
    if (!isString(id)) {
        throw new Error('Id is not a valid string.')
    } 
    return id
}

function checkName(name: unknown): string {
    if (!isString(name)) {
        throw new Error('Name is not a valid string.')
    }
    return name
}

function checkSSN(ssn: unknown): string {
    if (!isString(ssn)) {
        throw new Error('SSN is not a valid string.')
    }
    return ssn
}

function parseDate(dateString: unknown): string {
    if (!dateString || !isString(dateString) || !isDate(dateString)) {
        throw new Error('date is not recognized as a valid date')
    }
    return dateString
}

function checkGender(gender: unknown): Gender {
    if (!gender || !isString(gender) || !isGender(gender)) {
        throw new Error(`Gender not recognized. ${gender}`)
    } 
    return gender
}

function checkOccupation(occupation: unknown): string {
    if (!occupation || !isString(occupation)) {
        throw new Error('Occupation is invalid')
    }
    return occupation
}

module.exports = {
    checkId,
    checkGender,
    checkName,
    parseDate,
    checkSSN,
    checkOccupation
}