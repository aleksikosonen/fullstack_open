import React from 'react'
import { CoursePart } from '../types'
import './Part.css'

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  )
}

const Part = ({ part }: { part: CoursePart }): JSX.Element => {
  console.log(part.type)
  switch (part.type) {
    case 'normal':
      return (
        <div>
          <h3 className='part-header'>
            {part.name}: {part.exerciseCount}
          </h3>
          <p className='padding-bottom-1em'>{part.description}</p>
        </div>
      )
      break
    case 'groupProject':
      return (
        <div>
          <h3>
            {part.name}: {part.exerciseCount}
          </h3>
          <p className='padding-bottom-1em'>group project count {part.groupProjectCount}</p>
        </div>
      )
      break
    case 'submission':
      return (
        <div>
          <h3>
            {part.name}: {part.exerciseCount}
          </h3>
          <p>{part.description}</p>
          <p className='padding-bottom-1em'>submit to: {part.exerciseSubmissionLink}</p>
        </div>
      )
      break
    case 'special':
      return (
        <div>
          <h3>
            {part.name}: {part.exerciseCount}
          </h3>
          <div>{part.description}</div>
          <div className='padding-bottom-1em'>required skills {part.requirements.join(', ')}</div>
        </div>
      )
      break
    default:
      return assertNever(part)
  }
}

export default Part
