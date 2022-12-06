import patientData from '../../data/patients';
import { PatientEntry, NonSensitivePatienEntry } from '../types';

const patients: Array<PatientEntry> = patientData;

const getPatientEntries = (): Array<PatientEntry> => {
  return patients;
};

const getNonSensitivePatientEntries = (): NonSensitivePatienEntry[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    }));
  };

const addPatient = () => {
  return null;
};

export default {
    getPatientEntries,
    getNonSensitivePatientEntries,
    addPatient
};