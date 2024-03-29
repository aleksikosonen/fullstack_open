import patientData from '../../data/patients'
import {
  Patient,
  NonSensitivePatient,
  NewPatientEntry,
  Entry,
} from '../types'
import { v4 as uuid } from 'uuid'

const patients: Array<Patient> = patientData

const getPatientEntries = (): Array<Patient> => {
  return patients
}

const getNonSensitivePatientEntries = (): NonSensitivePatient[] => {
  return patients.map(({ name, dateOfBirth, gender, occupation, entries, id }) => ({
    name,
    dateOfBirth,
    gender,
    occupation,
    entries,
    id
  }))
}

const getPatientsById = (id: string): Patient => {
  const patient = patients.find(patient => patient.id === id)
  if (typeof(patient) === undefined) {
    throw new Error('no patient with id')
  } else {
    return patient as Patient
  }
}

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  }

  patients.push(newPatientEntry)
  return newPatientEntry
}

const addEntry = (entry: Entry, id: string): Entry => {
  const patientForEntry = patients.find(patient => patient.id === id)
  if (patientForEntry !== undefined) {
    patientForEntry.entries.push(entry)
  } else {
    throw new Error('Missing patient ID')
  }
  return entry
}

export default {
  getPatientEntries,
  getNonSensitivePatientEntries,
  addPatient,
  getPatientsById,
  addEntry
}
