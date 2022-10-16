/*
Kopioimalla tämän App.js tiedostoon saa 2.5 kurssitiedot-tehtävän vastaukset toimimaan.
 */const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}></Header>
      <Content course={course}></Content>
      <Total parts={course.parts}></Total>
    </div>
  )
}

const Header = ({ name }) => {
  return <h2>{name}</h2>
}

const Total = ({ parts }) => {
  const total = parts.reduce((s, p) => {
    return s + p.exercises
  }, 0)
  return <h3>Total of {total} exercises</h3>
}

const Part = ({ part, exercises }) => {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

const Content = ({ course }) => {
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
  const courses = [
    {
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
        {
          name: 'Redux',
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1,
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2,
        },
      ],
    },
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map((course) => {
        return <Course key={course.id} course={course} />
      })}
    </div>
  )
}

export default App