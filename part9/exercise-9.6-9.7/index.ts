import express from 'express';

const app = express();
const PORT = 3003;

app.use(express.json());

app.get('/hello', function(request, response) {
    console.log("request came from ip", request.ip, "with headers", request.headers);
    response.status(200).json({
        message: 'Hello Full Stack!'
    });
});

app.get('/bmi', function(request, response) {
    // console.log("request came from ip", request.ip, "with headers", request.headers)

    const heightQuery: number | null = request.query.height ? Number(request.query.height) : null;
    const weightQuery: number | null = request.query.weight ? Number(request.query.weight) : null;

    if (!heightQuery || !weightQuery) {
        return response.json({
            error: 'malformatted parameters.'
        });
    }

    console.log("height in centimetres", heightQuery, "weight in kilograms", weightQuery);

    const heightInMetres: number = heightQuery / 100;

    const BMI: number = Number((weightQuery / heightInMetres ** 2).toFixed(2));

    const result = function(bmi: number): string {
        return bmi < 18.5 ? 'Poor / Malnourised (unhealthy weight)' : bmi > 30 ? 'Poor / Obese (unhealthy weight)' : 'Normal (healthy weight)';
    };

    return response.status(200).json({
        weight: `${weightQuery} kg(s)`,
        height: `${heightQuery} cm(s)`,
        bmi: result(BMI)
    });
});

app.post("/exercises", function(request, response) {

    const daily_exercises: number[] = request.body["daily_exercises"];
    const target: number | null = request.body.target;

    if (!daily_exercises || !target) {
        return response.status(404).json({
            error: "parameters missing"
          });
    }

    if (!daily_exercises.map(Number) || !Array.isArray(daily_exercises) || isNaN(target)) {
        return response.status(404).json({
            error: "malformatted parameters"
          });
    }

    const periodLength: number = daily_exercises.length;

    const trainingDays: number = daily_exercises.filter((num: number) => num > 0).length;

    const average: number = Number((daily_exercises.reduce((acc: number, num: number) => acc + num, 0) / periodLength).toFixed(2));

    const success: number = average >= target ? 3 : Math.random() * 2 + 1;

    const failure: number = Math.random() * 1 + 1;

    const calculateRating: (number | string) = Number((average >= target ? success : failure).toFixed(2));

    const ratingComment: string = calculateRating >= target ? 'Very Good!' : calculateRating < target - 2 ? 'Very bad!' : 'Mid, you can do better!';

    const result = {
        periodLength,
        trainingDays,
        success: success >= target,
        rating : calculateRating,
        ratingDescription: ratingComment,
        target,
        average
    };

    return response.status(200).json(result);
});

app.listen(PORT, function() {
    console.log(`Server is running at port ${PORT}`);
});

/*

{
    "periodLength": 7,
    "trainingDays": 4,
    "success": false,
    "rating": 1,
    "ratingDescription": "bad",
    "target": 2.5,
    "average": 1.2142857142857142
}

*/