import patientData from '../../data/patients'
import {
  PatientEntry,
  NonSensitivePatienEntry,
  NewPatientEntry,
} from '../types'
import { v4 as uuid } from 'uuid'

const patients: Array<PatientEntry> = patientData

const getPatientEntries = (): Array<PatientEntry> => {
  return patients
}

const getNonSensitivePatientEntries = (): NonSensitivePatienEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = (entry: NewPatientEntry): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient,
}
