const bmiCalculator = (height: number, weight: number) => {
    /*The formula is BMI = kg/m2 where kg is a person's weight in kilograms and m2 is their height in metres squared */
    const bmiNumber: number = weight / ((height / 100) ** 2)

    if (bmiNumber < 16) return 'Underweight (Severe thinness)'
    if (bmiNumber < 16.9) return 'Underweight (Moderate thinness)'
    if (bmiNumber < 18.4) return 'Underweight (Mild thinness)'
    if (bmiNumber < 24.9) return 'Normal range'
    if (bmiNumber < 29.9) return 'Overweight (Pre-obese)'
    if (bmiNumber < 34.9) return 'Obese (Class I)'
    if (bmiNumber < 39.9) return 'Obese (Class II)'
    if (bmiNumber > 40) return 'Obese (Class III)'
  }

  console.log(bmiCalculator(180, 46))
  console.log(bmiCalculator(180, 54))
  console.log(bmiCalculator(180, 56))
  console.log(bmiCalculator(180, 60))
  console.log(bmiCalculator(180, 66))
  console.log(bmiCalculator(180, 76))
  console.log(bmiCalculator(180, 86))
  console.log(bmiCalculator(180, 100))
  console.log(bmiCalculator(180, 106))
  console.log(bmiCalculator(180, 116))
  console.log(bmiCalculator(180, 126))
  console.log(bmiCalculator(180, 136))
