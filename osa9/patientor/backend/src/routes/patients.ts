import express from 'express'
import patientService from '../services/patientService'
import { toNewPatientEntry, toNewEntry } from '../utils'

const patientRouter = express.Router()

patientRouter.get('/', (_req, res) => {
  res.send(patientService.getNonSensitivePatientEntries())
})

patientRouter.get('/:id', (_req, res) => {
  res.send(patientService.getPatientsById(_req.params.id))
})

patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400);
      let errorMessage = '';
      if (e instanceof Error) {
        errorMessage += e.message;
      }
      res.json({error: errorMessage});
  }
})

patientRouter.post('/:id/entries', (req, res) => {
  try {
    const newEntry = toNewEntry(req.body);
    const addedEntry = patientService.addEntry(newEntry, req.params.id);
    res.json(addedEntry);
  } catch (e) {
    res.status(400);
      let errorMessage = '';
      if (e instanceof Error) {
        errorMessage += e.message;
      }
      res.json({error: errorMessage});
  }
})

export default patientRouter
