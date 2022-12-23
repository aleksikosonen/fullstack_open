import React from 'react'
import { Grid, Button } from '@material-ui/core'
import { Field, Formik, Form } from 'formik'

import {
  TextField,
  SelectField,
  FormOption,
  DiagnosisSelection,
} from '../AddPatientModal/FormField'
import { HealthCheckEntry, HealthCheckRating } from '../types'
import { useStateValue } from '../state'

/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 * 
 * Did the same for Entry
 */
export type AddEntryFormValues = Omit<HealthCheckEntry, 'id'>

interface Props {
  onSubmit: (values: AddEntryFormValues) => void
  onCancel: () => void
}

const healthRatingOptions: FormOption[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
]

export const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue()
  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: undefined,
        type: "HealthCheck",
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const requiredError = 'Field is required'
        const errors: { [field: string]: string } = {}
        if (!values.description) {
          errors.name = requiredError
        }
        if (!values.date) {
          errors.ssn = requiredError
        }
        if (!values.specialist) {
          errors.dateOfBirth = requiredError
        }
        if (!values.diagnosisCodes) {
          errors.dateOfBirth = requiredError
        }
        if (!values.healthCheckRating) {
          errors.dateOfBirth = requiredError
        }
        return errors
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return (
          <Form className='form ui'>
            <Field
              label='Entry description'
              placeholder='Entry description'
              name='description'
              component={TextField}
            />
            <Field
              label='Date (YYYY-MM-DD)'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field
              label='Entry specialist'
              placeholder='Entry specialist'
              name='specialist'
              component={TextField}
            />
            <DiagnosisSelection
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <SelectField label='Healthcheck rating' name='healthCheckRating' options={healthRatingOptions} />
            <Grid>
              <Grid item>
                <Button
                  color='secondary'
                  variant='contained'
                  style={{ float: 'left' }}
                  type='button'
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  style={{
                    float: 'right',
                  }}
                  type='submit'
                  variant='contained'
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}

export default AddEntryForm
