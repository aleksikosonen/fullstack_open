import React from 'react'
import { HealthCheckEntry, HealthCheckRating } from '../types'
import MedicalServicesIcon from '@mui/icons-material/MedicalServices'
import './EntryStyle.css'
import FavoriteIcon from '@mui/icons-material/Favorite'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const HealthCheckEntryDetail: React.FC<{
  healthCheckEntry: HealthCheckEntry
}> = ({ healthCheckEntry }) => {
  const getRating = (rating: HealthCheckRating) => {
    switch (rating) {
      case 0:
        return <FavoriteIcon style={{ fill: 'green' }}></FavoriteIcon>
      case 1:
        return <FavoriteIcon style={{ fill: 'yellow' }}></FavoriteIcon>
      case 2:
        return <FavoriteIcon style={{ fill: 'orange' }}></FavoriteIcon>
      case 3:
        return <FavoriteIcon style={{ fill: 'red' }}></FavoriteIcon>
    }
  }
  return (
    <div>
      <div className='flex-row'>
        <div>{healthCheckEntry.date}</div>
        <MedicalServicesIcon></MedicalServicesIcon>
      </div>
      <div>{healthCheckEntry.description}</div>
      <div>{getRating(healthCheckEntry.healthCheckRating)}</div>
      <div>diagnose by {healthCheckEntry.specialist}</div>
    </div>
  )
}

export default HealthCheckEntryDetail
