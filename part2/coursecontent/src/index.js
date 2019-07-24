import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Course = ({ course }) => {
    return (
        <div>
            <Header course={course.name} />
            <Content parts={course.parts}/>
            <Total total={course.parts}/>
        </div>
    )
}

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
    
 const total = () => {
     //console.log('total\'s props ',props.total)
     return props.total.reduce((acc, cur) => acc + cur.exercises, 0)
 }

    console.log(props);
    return (
        <div>
            <p><b>Number of exercises {total()}</b></p>
        </div>
    )
}

const App = () => {
    const course = {
      name: 'Half Stack application development',
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        }
      ]
    }
  
    return (
      <div>
        <Course course={course} />
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));


