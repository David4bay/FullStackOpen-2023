

// Calculates the body mass index of an individual with height in centimetres and weight in kilograms

const calculateBMI = (height: number, weight: number):void => {

    let centimetresToMetres: number = height / 100

    let bodyMassIndex: number = Number((weight / centimetresToMetres ** 2).toFixed(2))

    console.log('BMI is', bodyMassIndex)

    if (bodyMassIndex >= 30) return console.log('Obese (unhealthy weight)')

    if (bodyMassIndex <= 18.4) return console.log('Underweight (unhealthy weight)')

    console.log('Normal (healthy weight)')
}

calculateBMI(170, 65)