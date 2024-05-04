import express from 'express'
import cors from 'cors'

import handleRoutes from './controllers/routes'

const app = express()
const PORT = 3001

app.use(cors())

app.use(express.json())

app.use('/api', handleRoutes)

app.listen(PORT, function() {
    console.log(`Server is running on port ${PORT}`)
})