import { Box, Typography } from '@material-ui/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../constants'
import { useStateValue, updatePatientList, setDiagnosisList } from '../state'
import { Gender, Patient, Entry, Diagnosis } from '../types'
import './PatientPage.css'
import MaleIcon from '@mui/icons-material/Male'
import TransgenderIcon from '@mui/icons-material/Transgender'
import FemaleIcon from '@mui/icons-material/Female'
import EntryDetails from '../components/EntryDetail'

const PatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const [{ patients, diagnosis }, dispatch] = useStateValue()
  const [patientById, setPatientById] = useState<Patient | undefined>(undefined)
  const [diagnosisState, setDiagnosisState] = useState<Diagnosis[] | undefined>(
    undefined
  )

  const fetchPatient = async () => {
    // to make sure patient is not re-fetched
    console.log('fetchPatient')
    try {
      const { data: patient } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`
      )
      setPatientById(patient)
      dispatch(updatePatientList(patient))
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error')
      } else {
        console.error('Unknown error', e)
      }
    }
  }

  const fetchPatientDiagnosisList = async () => {
    // to make sure diagnosis is not re-fetched
    console.log('fetchPatientDiagnosis')
    try {
      const { data: diagnosis } = await axios.get<Diagnosis[]>(
        `${apiBaseUrl}/diagnoses/`
      )
      dispatch(setDiagnosisList(diagnosis))
      setDiagnosisState(diagnosis)
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        console.error(e?.response?.data || 'Unrecognized axios error')
      } else {
        console.error('Unknown error', e)
      }
    }
  }

  useEffect(() => {
    if (id === undefined) {
      throw new Error('id undefined')
    }
    if (patients[id]?.ssn) {
      setPatientById(patients[id])
    } else {
      fetchPatient()
      fetchPatientDiagnosisList()
    }
  }, [dispatch])

  const getIconForGender = (gender: Gender) => {
    if (gender === Gender.Male) {
      return <MaleIcon />
    }
    if (gender === Gender.Female) {
      return <FemaleIcon />
    }
    if (gender === Gender.Other) {
      return <TransgenderIcon />
    }
  }

  const searchDiagnosisFromCode = (code: string) => {
    if (diagnosisState === undefined) {
      return diagnosis[code]?.name
    } else {
      const diagnosisForCode = diagnosisState?.find(
        (diagnosis) => diagnosis.code === code
      )
      if (diagnosisForCode) {
        return diagnosisForCode.name
      }
    }
  }

  const patientEntryDetails = (patientEntry: Entry, patientById: Patient) => {
    return (
      <div className='entry-box' key={patientEntry.id}>
        <EntryDetails entry={patientEntry} patient={patientById}/>
        {patientEntry.diagnosisCodes && (
          <div>
            <ul>
              {patientEntry.diagnosisCodes.map((diagnosisCode) => {
                return (
                  <li key={diagnosisCode}>
                    {diagnosisCode} {searchDiagnosisFromCode(diagnosisCode)}
                  </li>
                )
              })}
            </ul>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      {patientById !== undefined ? (
        <div className='patient'>
          <div className='bold'>
            {patientById.name} {getIconForGender(patientById.gender as Gender)}
          </div>
          <div>ssh: {patientById.ssn}</div>
          <div className='padding-bottom'>
            occupation: {patientById?.occupation}
          </div>
          {patientById.entries && (
            <div>
              <h3>Entries</h3>
              {patientById.entries.map((entry) => {
                return patientEntryDetails(entry, patientById)
              })}
            </div>
          )}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  )
}

export default PatientPage
