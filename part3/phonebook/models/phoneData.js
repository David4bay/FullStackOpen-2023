require('dotenv').config()
const mongoose = require('mongoose')

const url = `mongodb+srv://${process.env.MONGO_USER}:${encodeURIComponent(process.env.MONGO_PASS)}@cluster0.7fmaegp.mongodb.net/noteApp?retryWrites=true&w=majority`

mongoose.connect(url).then(() => {
    console.log(`Successfully connected to ${url}`)
}).catch((e) => {
    console.log(`Failed to connect, returned ${e?.message}`)
})

const phoneNumberSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: String
})

module.exports = mongoose.model('PhonebookEntry', phoneNumberSchema)

