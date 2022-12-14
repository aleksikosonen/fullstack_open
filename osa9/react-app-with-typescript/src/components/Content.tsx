import React from 'react'
import Part from './Part'
import { CoursePart } from '../types'

const Content = ({ content }: {content: CoursePart[]}): JSX.Element =>  {
  return (
    <div>
      {content.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  )
}

export default Content