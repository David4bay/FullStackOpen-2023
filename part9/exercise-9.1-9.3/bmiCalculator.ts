

// Calculates the body mass index of an individual with height in centimetres and weight in kilograms

const calculateBMI = (height: number = Number(process.argv[2]), weight: number = Number(process.argv[3])): void => {

    let centimetresToMetres: number = height / 100

    let bodyMassIndex: number = Number((weight / centimetresToMetres ** 2).toFixed(2))

    console.log('BMI is', bodyMassIndex)

    if (bodyMassIndex >= 30) return console.log('Obese (unhealthy weight)')

    if (bodyMassIndex <= 18.4) return console.log('Underweight (unhealthy weight)')

    console.log(process.argv[2], process.argv[3])
    console.log('Normal (healthy weight)')
}

calculateBMI()
// height 170 
// weight 65