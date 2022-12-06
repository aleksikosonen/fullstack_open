import React from 'react'

interface TotalProps {
  name: string
  exerciseCount: number
}

const Total: React.FC<{ total: TotalProps[] }> = ({ total }) => {
  return (
    <div>
      Number of exercises {total.reduce((a, b) => a + b.exerciseCount, 0)}
    </div>
  )
}

export default Total
