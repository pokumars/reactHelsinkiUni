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
    //console.log('props to header', props);
    return(
        <h2>{props.course}</h2>
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
    //console.log(props.parts);

    const mapParts = () => {
        return props.parts.map((part)=> <Part key ={part.id} part={part.name} exercises={part.exercises} />)
    }
    
return (    
    <div>
        {mapParts()}
        
    </div>
);
}

const Total = (props) => {
    
 const total = () => {
     //console.log('total\'s props ',props.total)
     return props.total.reduce((acc, cur) => acc + cur.exercises, 0)
 }

    //console.log(props);
    return (
        <div>
            <p><b>Number of exercises {total()}</b></p>
        </div>
    )
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
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
    ]

    const getCourses = () => {
        console.log('all courses', courses )

        return courses.map((course)=> {
            console.log('mapped course', course);
            return (<Course key={course.id} course={course} />);
        })
    }
  
    return (
      <div>
        {getCourses()}
      </div>
    )
  }

ReactDOM.render(<App />, document.getElementById('root'));


