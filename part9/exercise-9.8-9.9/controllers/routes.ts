import { Router } from 'express'

const appRouter = Router()

appRouter.get('/ping', function(_, response) {
    return response.status(200).json({
        message: 'Pong!'
    })
})

module.exports = appRouter