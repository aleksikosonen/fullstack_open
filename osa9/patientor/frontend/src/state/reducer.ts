import { AddEntryFormValues } from './../AddPatientEntryModal/AddEntryForm';
import { State } from './state'
import { Patient, Diagnosis, Entry } from '../types'

export type Action =
  | {
      type: 'SET_PATIENT_LIST'
      payload: Patient[]
    }
  | {
      type: 'SET_DIAGNOSIS_LIST'
      payload: Diagnosis[]
    }
  | {
      type: 'UPDATE_PATIENT'
      payload: Patient
    }
  | {
      type: 'ADD_PATIENT'
      payload: Patient
    }

export const setPatientList = (patientListFromApi: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi,
  }
}

export const addPatient = (addedPatient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: addedPatient,
  }
}

export const updatePatientList = (patientFromApi: Patient): Action => {
  return {
    type: 'UPDATE_PATIENT',
    payload: patientFromApi,
  }
}

export const setDiagnosisList = (diagnosisFromApi: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosisFromApi,
  }
}

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      }
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({ ...memo, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.diagnosis,
        },
      }
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      }
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      }
    default:
      return state
  }
}
