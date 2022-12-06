"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parsePatientName = (patientName) => {
    if (!patientName || !isString(patientName)) {
        throw new Error('Incorrect or missing patientName');
    }
    return patientName;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('Incorrect or missing ssn: ' + ssn);
    }
    return ssn;
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    return Object.values(types_1.Gender).includes(param);
};
const parsePatientGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing Gender: ' + gender);
    }
    return gender;
};
const parsePatientOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('Incorrect or missing occupation: ' + occupation);
    }
    return occupation;
};
const toNewPatientEntry = ({ name, dateOfBirth, ssn, gender, occupation }) => {
    const newEntry = {
        name: parsePatientName(name),
        dateOfBirth: parseDate(dateOfBirth),
        ssn: parseSsn(ssn),
        gender: parsePatientGender(gender),
        occupation: parsePatientOccupation(occupation)
    };
    return newEntry;
};
exports.default = toNewPatientEntry;
