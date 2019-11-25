import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const History = (props) =>{
    if (props.allClicks.length === 0) {
        return(
            <div>
                the app is used by pressing the buttons
            </div>
        )
    }

    return (
        <div>
            button press history: {props.allClicks.join(' ')}
        </div>
      )

}

const Button = ({onClick, text}) => {
    return(
        <button onClick={onClick}>{text}</button>
    )
}

//customhook
const useCounter = () => {
  const [value, setValue] = useState(0);

  const decrease = () => {
    setValue(value -1);
  }

  const increase = () => {
    setValue(value +1);
  }

  const zero = () => {
    setValue(0);
  }

  return{
    value,
    increase,
    decrease,
    zero
  }
}


const App = (props) => {
  //const [left, setLeft] = useState(0)
  //const [right, setRight] = useState(0)
  const right = useCounter()
  const left = useCounter()
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    //setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    //setRight(right + 1)
  }
  /**{left}
        <Button onClick={handleLeftClick} text='left' />
        <Button onClick={handleRightClick} text='right' />
        {right} */

  return (
    <div>
      <div>
        {left.value}
        <Button onClick={left.increase} text='left' />
        <Button onClick={right.increase} text='right' />
        {right.value}
        <History allClicks={allClicks} />
      </div>
    </div>
  )
}  

ReactDOM.render(<App />,
     document.getElementById('root'));