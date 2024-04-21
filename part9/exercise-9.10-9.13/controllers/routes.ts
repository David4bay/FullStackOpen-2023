import { Router } from 'express'
import diagnoses from '../data/diagnoses'
import patients from '../data/patients'
import { PatientType } from '../types/patientType'
import { v4 as uuidv4 } from 'uuid'

const checker = require('./typeCheckers/typeCheckers')

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
        gender
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
    
    } catch (error) {

        let errorMessage = 'Something went wrong.'

        let formattedErrorMessage = `${errorMessage} ${error.message}`

        response.status(404).json(formattedErrorMessage)

    }

    return response.status(201).json(newEntry)
})

module.exports = appRouter
