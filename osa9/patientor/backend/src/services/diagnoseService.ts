import diagnoseData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const diagnoses: Array<DiagnoseEntry> = diagnoseData;

const getDiagnoseEntries = (): Array<DiagnoseEntry> => {
  return diagnoses;
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoseEntries,
  addDiagnose
};