const Course = ({ course }) => {
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

  export default Course