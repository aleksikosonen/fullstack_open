import express from 'express';
const app = express();
import { bmiCalculator } from './bmiCalculator';

app.get('/ping', (_req, res) => {
  res.send('pong');
});

app.get('/bmi', (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!height || !height || isNaN(Number(height)) || isNaN(Number(weight))) {
    res.status(400);
    res.send({error: 'malformatted parameters'});
  } else {
    try {
      const bmi = bmiCalculator(Number(height), Number(weight));
      const response = {
        weight: weight,
        height: height,
        bmi: bmi,
      };
      res.json(response);
    } catch (e: unknown) {
      res.status(400);
      let errorMessage = 'Error calculating body mass index';
      if (e instanceof Error) {
        errorMessage += ' Error: ' + e.message;
      }
      res.json({error: errorMessage});
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});