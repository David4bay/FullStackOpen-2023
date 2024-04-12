import express from 'express'

const app = express()
const PORT = 3003

app.use(express.json())

app.get('/hello', function(request, response) {
    console.log("request came from ip", request.ip, "with headers", request.headers)
    response.status(200).json({
        message: 'Hello Full Stack!'
    })
})

app.get('/bmi', function(request, response) {
    // console.log("request came from ip", request.ip, "with headers", request.headers)

    const heightQuery: number | null = request.query.height ? Number(request.query.height) : null
    const weightQuery: number | null = request.query.weight ? Number(request.query.weight) : null

    if (!heightQuery || !weightQuery) {
        return response.json({
            error: 'malformatted parameters.'
        })
    }

    console.log("height in centimetres", heightQuery, "weight in kilograms", weightQuery)

    let heightInMetres: number = heightQuery / 100

    let BMI: number = Number((weightQuery / heightInMetres ** 2).toFixed(2))

    let result = function(bmi: number): string {
        return bmi < 18.5 ? 'Poor / Malnourised (unhealthy weight)' : bmi > 30 ? 'Poor / Obese (unhealthy weight)' : 'Normal (healthy weight)'
    }

    return response.status(200).json({
        weight: `${weightQuery} kg(s)`,
        height: `${heightQuery} cm(s)`,
        bmi: result(BMI)
    })
})

app.listen(PORT, function() {
    console.log(`Server is running at port ${PORT}`)
})