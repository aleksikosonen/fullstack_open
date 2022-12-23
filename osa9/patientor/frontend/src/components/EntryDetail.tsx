import React from 'react'
import { Entry, Patient } from '../types'
import HospitalEntryDetail from './HospitalEntry'
import OccupationalHealthcareEntryDetail from './OccupationalHealthcareEntry'
import HealthCheckEntryDetail from './HealthCheckEntry'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const EntryDetails: React.FC<{ entry: Entry, patient: Patient }> = ({ entry, patient }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalEntryDetail hospitalEntry={entry} />
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareEntryDetail occupationalEntry={entry} patient={patient} />
    case 'HealthCheck':
      return <HealthCheckEntryDetail healthCheckEntry={entry} />
    default:
      return assertNever(entry)
  }
}

export default EntryDetails
