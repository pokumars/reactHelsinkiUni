import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
    console.log(props);
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
    console.log(props.parts[0]);
return (    
    <div>
        <Part part={props.parts[0].name} exercises={props.parts[0].exercises} />
        <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
        <Part part={props.parts[2].name} exercises={props.parts[2].exercises} />
        
    </div>
);
}

const Total = (props) => {
    console.log(props);
    return (
        <div>
            <p>Number of exercises {props.total[0].exercises +props.total[1].exercises + props.total[2].exercises}</p>
        </div>
    )
}

const App = () => {
    const course = {
        name: 'Half Stack application development',
        partsArr: [
          {
            name: 'Fundamentals of React',
            exercises: 10
          },
          {
            name: 'Using props to pass data',
            exercises: 7
          },
          {
            name: 'State of a component',
            exercises: 14
          }
        ]
      }
   
  return (
    <div>
        <Header course={course.name} />
        <Content parts={course.partsArr}/>
        <Total total={course.partsArr}/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))