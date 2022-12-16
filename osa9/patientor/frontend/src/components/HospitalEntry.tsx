import React from "react";
import {HospitalEntry} from '../types';

const HospitalEntryDetail: React.FC<{hospitalEntry: HospitalEntry}> = ({hospitalEntry}) => {
    return (
        <div>
          <div>{hospitalEntry.date}</div>
          <div>{hospitalEntry.description}</div>
          <div>diagnose by {hospitalEntry.specialist}</div>
        </div>
      )
}

export default HospitalEntryDetail