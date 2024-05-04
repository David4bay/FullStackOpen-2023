import { Router } from 'express'
import diagnoses from '../data/diagnoses'
import patients from '../data/patients'
import { Entry, PatientType } from '../types/patientType'
import { v4 as uuidv4 } from 'uuid'

import checker from './typeCheckers/typeCheckers'

const appRouter = Router()

appRouter.get('/ping', function(_, response) {
    return response.status(200).json({
        message: 'Pong!'
    })
})

appRouter.get('/diagnoses', function(_, response) {
    return response.status(200).json(diagnoses)
})

appRouter.get('/patients', function(_, response) {
    return response.status(200).json(patients)
})

appRouter.post('/patients', function(request, response) {

    let id = uuidv4()
    
    const {
        name,
        occupation,
        ssn,
        dateOfBirth,
        gender,
    } = request.body

    let newEntry: PatientType = request.body

    try {
        
        newEntry = {
        id: checker.checkId(id),
        name: checker.checkName(name),
        occupation: checker.checkOccupation(occupation),
        ssn: checker.checkSSN(ssn),
        dateOfBirth: checker.parseDate(dateOfBirth),
        gender: checker.checkGender(gender),
        }

        patients.push(newEntry)
    
    } catch (error) {

        let errorMessage = 'Something went wrong.'

        let formattedErrorMessage = `${errorMessage} ${error.message}`

        return response.status(404).json(formattedErrorMessage)

    }

    return response.status(201).json(newEntry)
})

appRouter.get('/patients/:id', function(request, response) {

    const patientId = request.params?.id

    let foundPatient

    try {

        console.log("patientId", typeof patientId)

        const searchedPatient = patients.find((singlePatient) => singlePatient.id === patientId)

        console.log("searchedPatient", searchedPatient)

        if (!searchedPatient) {

            throw new Error('Patient with the provided id does not exist.')
        } 

        foundPatient = searchedPatient   
         
    } catch(err) {
        let errorMessage = 'Something went wrong.'
        
        let formattedErrorMessage = `${errorMessage} ${err.message}`
        
        return response.status(404).json(formattedErrorMessage)
    }
    return response.status(200).json(foundPatient)
})

appRouter.post('/patients/:id/entries', function(request, response) {

    let id = uuidv4()

    const paramId = request.params.id

    let updatedPatientEntry

    console.log("latest entry and id", request.params.id, request.body.entry)

    let patientNewEntry: Entry[] | null = [request.body?.entry]
    
    try {
        
        const findPatientEntry = patients.find((patientData) => patientData.id === paramId)
        
        if (!findPatientEntry) throw new Error(`Patient with id of ${id} cannot be found.`)

        patientNewEntry[0].id = id
        
        let newEntry: Entry[] | null= checker.checkEntries(patientNewEntry)

        updatedPatientEntry = newEntry
         
        patients.map((patientData) => {
            if (patientData.id === paramId) {
                patientData.entries = patientData.entries?.concat(newEntry)
            }
        })
        
    } catch(error) {

        let errorMessage = 'Something went wrong.'

        let formattedErrorMessage = `${errorMessage} ${error.message}`

        return response.status(404).json(formattedErrorMessage)
    }

    return response.status(201).json(updatedPatientEntry)
})

export default appRouter