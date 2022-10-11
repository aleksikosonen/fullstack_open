const Course = ({course}) => {
  return (
    <div>
      <Header name={course.name}></Header>
      <Content course={course}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

const Header = ({name}) => {
  return <h1>{name}</h1>
}

const Total = ({parts}) => {
  const total = parts.reduce((s,p) => {
     return s + p.exercises
  }, 0)
  return <div>Total {total}</div>
}

const Part = ({part, exercises}) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({course}) => {
  return course.parts.map((element) => {
    return (
      <Part
        key={element.id}
        part={element.name}
        exercises={element.exercises}
      />
    )
  })
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1,
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2,
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3,
      },
    ],
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
