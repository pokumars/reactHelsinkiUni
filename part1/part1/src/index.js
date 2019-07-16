import React from 'react';
import ReactDOM from 'react-dom';


const Hello = (props) => {
    return(
        <div>
            <p>Hello {props.name}, you are {props.age} years old</p>
        </div>
    )
}

const App = () => {
    const age = 12;
    const name = "Pete";

    return(
        <div>
            <h1>Greetings</h1>
            <Hello name="John" age={3 + 21}/>
            <Hello name={name} age ={age} />
        </div>
    )
}

ReactDOM.render(<App />, document.getElementById('root'));
