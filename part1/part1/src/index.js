import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Display = ({ counter }) => <div>{counter}</div>;

const Button = (props) => {
    return(
        <button onClick={props.onClick}>{props.text}</button>
    )
}

const App = (props) => {
    const [counter, setCounter ] = useState(0);
   
    const setToValue = (value) => ()=> setCounter(value);         

    return (<div>
        <Display counter = {counter}/>
        <Button text="plus" onClick={setToValue(counter + 1)} />
        <Button text="minus" onClick={setToValue(counter - 1)} />
        <Button text="zero" onClick={setToValue(0)} />
    </div>
    )
  }
  let counter = 0;
  

ReactDOM.render(<App counter={counter} />,
     document.getElementById('root'));