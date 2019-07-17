import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    return(
        <h1>{props.course}</h1>
    )    
}

const Part = (props) => {
    return (
        <div>
            <p>{props.part} {props.exercises}</p>
        </div>
    )
}

const Content = (props) => {
return (
    <div>
        <Part part={props.part1} exercises={props.exercises1} />
        <Part part={props.part2} exercises={props.exercises2} />
        <Part part={props.part3} exercises={props.exercises3} />
    </div>
)
}

const Total = (props) => {
    return (
        <div>
            <p>Number of exercises {props.total}</p>
        </div>
    )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
      name: 'Fundamentals of React',
      exercises : 10
  }
  const part2 = {
        name: 'Using props to pass data',
        exercises : 7
    }
    const part3 = {
        name: 'State of a component',
        exercises : 14
    }
  /*const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14*/

  return (
    <div>
        <Header course={course} />
        < Content part1={part1.name} part2={part2.name} part3={part3.name} 
        exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises} />
        <Total total={part1.exercises + part2.exercises + part3.exercises}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))