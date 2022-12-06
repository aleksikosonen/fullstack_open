import React from 'react'

interface ContentProps {
  name: string
  exerciseCount: number
}

const Content: React.FC<{ content: ContentProps[] }> = ({ content }) => {
  return (
    <div>
      {content.map(({ name, exerciseCount }, index) => (
        <div key={index}>
          {name} {exerciseCount}
        </div>
      ))}
    </div>
  )
}

export default Content
