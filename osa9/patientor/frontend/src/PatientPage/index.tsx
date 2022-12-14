import { Box, Typography } from '@material-ui/core'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiBaseUrl } from '../constants'
import { useStateValue, updatePatientList } from '../state'
import { Gender, Patient } from '../types'
import './PatientPage.css'
import MaleIcon from '@mui/icons-material/Male';
import TransgenderIcon from '@mui/icons-material/Transgender';
import FemaleIcon from '@mui/icons-material/Female';

const PatientPage = () => {
  const { id } = useParams<{ id: string }>()
  const [{ patients }, dispatch] = useStateValue()
  const [patientById, setPatientById] = useState<Patient>()

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

  useEffect(() => {
    if (id === undefined) {
      throw new Error('id undefined')
    }
    if (patients[id].ssn) {
      setPatientById(patients[id])
    } else {
      fetchPatient()
    }
  }, [dispatch])

  const getIconForGender = (gender: Gender) => {
    if (gender === Gender.Male) {
        return <MaleIcon/>
    }
    if (gender === Gender.Female) {
        return <FemaleIcon/>
    }
    if (gender === Gender.Other) {
        return <TransgenderIcon/>
    }
  }

  return (
    <div className='patient'>
      <div className='bold'>{patientById?.name} {getIconForGender(patientById?.gender as Gender)}</div>
      <div>ssh: {patientById?.ssn}</div>
      <div>occupation: {patientById?.occupation}</div>
    </div>
  )
}

export default PatientPage
