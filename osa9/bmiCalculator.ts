export const bmiCalculator = (height: number, weight: number): string => {
  /*The formula is BMI = kg/m2 where kg is a person's weight in kilograms and m2 is their height in metres squared */
  const bmiNumber: number = weight / (height / 100) ** 2;

  //to fix the function so that it returns a string always
  let bmiValue = '';
  
  if (bmiNumber > 40) bmiValue =  'Obese (Class III)';
  if (bmiNumber < 39.9) bmiValue =  'Obese (Class II)';
  if (bmiNumber < 34.9) bmiValue =  'Obese (Class I)';
  if (bmiNumber < 29.9) bmiValue =  'Overweight (Pre-obese)';
  if (bmiNumber < 24.9) bmiValue =  'Normal range';
  if (bmiNumber < 18.4) bmiValue =  'Underweight (Mild thinness)';
  if (bmiNumber < 16.9) bmiValue =  'Underweight (Moderate thinness)';
  if (bmiNumber < 16) bmiValue =  'Underweight (Severe thinness)';

  return bmiValue;
};

interface BmiValues {
  height: number
  weight: number
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(bmiCalculator(height, weight));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.';
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}