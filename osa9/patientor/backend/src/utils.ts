import { NewPatientEntry, Gender, BaseEntry, Entry, NonSensitiveEntry, HealthCheckRating } from './types';
import { v1 as uuid } from 'uuid'

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parsePatientName = (patientName: unknown): string => {
  if (!patientName || !isString(patientName)) {
    throw new Error('Incorrect or missing patientName');
  }

  return patientName;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
  };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parsePatientGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing Gender: ' + gender);
  }
  return gender;
};

const parsePatientOccupation = (occupation: unknown): string => {
  if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation: ' + occupation);
  }
  return occupation;
};

type Fields = { name : unknown, dateOfBirth: unknown, ssn: unknown, gender: unknown, occupation: unknown };

export const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation } : Fields): NewPatientEntry => {
  const newPatientEntry: NewPatientEntry = {
    name: parsePatientName(name),
    dateOfBirth: parseDate(dateOfBirth),
    ssn: parseSsn(ssn),
    gender: parsePatientGender(gender),
    occupation: parsePatientOccupation(occupation),
    entries: []
  };

  return newPatientEntry;
};

const parseEntryDescription = (description: unknown): string => {
  if (!description || !isString(description)) {
      throw new Error('Incorrect or missing description: ' + description);
  }
  return description;
};

const parseEntryCriteria = (criteria: unknown): string => {
  if (!criteria || !isString(criteria)) {
      throw new Error('Incorrect or missing criteria: ' + criteria);
  }
  return criteria;
};

const parseSpecialist = (specialist: unknown): string => {
  if (!specialist || !isString(specialist)) {
      throw new Error('Incorrect or missing specialist: ' + specialist);
  }
  return specialist;
};

const parseEmployerName = (employerName: unknown): string => {
  if (!employerName || !isString(employerName)) {
      throw new Error('Incorrect or missing employerName: ' + employerName);
  }
  return employerName;
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const parseHealthRating = (rating: unknown): HealthCheckRating => {
  if (!isHealthCheckRating(rating)) {
      throw new Error('Incorrect or missing HealthCheckRating: ' + rating);
  }
  return rating;
};

const parseDiagnosisCode = (diagnosisCodes: unknown): string[] => {
  if (!diagnosisCodes) {
      throw new Error('Incorrect or missing diagnosisCodes: ' + diagnosisCodes);
  }
  if (!Array.isArray(diagnosisCodes)) {
    throw new Error('Not an array');
  }

  diagnosisCodes.forEach(diagnosisCode => {
    if (!isString(diagnosisCode)) {
      throw new Error('Array item should be string');
    }
  })

  return diagnosisCodes;
};

export const toNewEntry = ( entry : any): Entry => {
  const entryFromRouter = entry as NonSensitiveEntry

  const newEntry: BaseEntry = {
    id: uuid(),
    description: parseEntryDescription(entry.description),
    date: parseDate(entry.date),
    specialist: parseSpecialist(entry.specialist),
    diagnosisCodes: parseDiagnosisCode(entry.diagnosisCodes)
  };

  switch(entryFromRouter.type) {
    case 'HealthCheck': {
      return {
        ...newEntry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthRating(entry.healthCheckRating)
      };
    }
    case 'Hospital': {
      return {
        ...newEntry,
        type: 'Hospital',
        discharge: {
          date: parseDate(entry.date),
          criteria: parseEntryCriteria(entry.criteria)
        }
      };
    }
    case 'OccupationalHealthcare': {
      return {
        ...newEntry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(entry.employerName),
        sickLeave: {
          startDate: entry.sickLeave.startDate,
          endDate: entry.sickLeave.endDate,
        },
      };
    }
    default: 
      throw new Error('something went wrong adding entry')
  }
};