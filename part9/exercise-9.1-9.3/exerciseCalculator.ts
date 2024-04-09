interface Result {
    period: number;
    training: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
}

const exerciseCalculator = (exerciseInfo: number[] = [...process.argv.slice(2).map(Number)], target: number = Number(process.argv[2])): void => {

    console.log()

    const defaultPeriod: number = exerciseInfo.length

    const averageDaysExercising: number = Number((exerciseInfo.reduce((acc, num) => acc + num, 0) / defaultPeriod).toFixed(2))

    const trainingDays = exerciseInfo.filter((num) => num > 0).length

    let failure = Math.random() * 1 + 1

    let success = averageDaysExercising >= target ? 3 : Math.random() * 2 + 1

    let calculateRating = Number((averageDaysExercising >= target ? success : failure).toFixed(2))

    const ratingComment = calculateRating >= target ? 'Very Good.' : calculateRating < target - 2 ? 'Not acceptable, git good son.' : 'Moderate, but can be improved.'


    let result: Result = {
        period: defaultPeriod,
        training: trainingDays,
        success: averageDaysExercising >= target,
        rating: calculateRating,
        ratingDescription: ratingComment,
        target,
        average: averageDaysExercising
    }

    return console.log(result)
}

exerciseCalculator()

// target 3

// days 2 3 1 0 5 1 4