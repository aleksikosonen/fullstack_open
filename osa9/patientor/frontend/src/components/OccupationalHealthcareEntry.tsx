import React from "react";
import {OccupationalHealthcareEntry, Patient} from '../types';
import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntryDetail: React.FC<{occupationalEntry: OccupationalHealthcareEntry, patient: Patient}> = ({occupationalEntry, patient}) => {
    return (
        <div>
            <div className='flex-row'>
            <div>{occupationalEntry.date}</div>  
            <WorkIcon></WorkIcon>
            <div>{patient.occupation}</div>
            </div>
          <div>{occupationalEntry.description}</div>
          <div>diagnose by {occupationalEntry.specialist}</div>
        </div>
      )
}

export default OccupationalHealthcareEntryDetail