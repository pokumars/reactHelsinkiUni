import React , { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Statistics = (props) => <tr><td>{props.name}</td><td>{props.value}</td></tr>

const Button = (props) => <button onClick={() => props.handleClick(props.name)} >{props.name}</button>


const App = () => {
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    });
    const [sum, setSum] = useState(0);
    const [total, setTotal] = useState(0);


    const handleClick =(value) => {
        console.log(feedback);
        switch(value) {
            case 'good':
                setFeedback({...feedback, good: feedback.good + 1});
                setSum(sum + 1);
                setTotal(total + 1);
            break;
            case 'neutral':
                setFeedback({...feedback, neutral: feedback.neutral + 1})
                setTotal(total + 1);
            break;
            case 'bad':
                setFeedback({...feedback, bad: feedback.bad + 1})
                setSum(sum - 1);
                setTotal(total + 1);
            break;
        }
    }
    if(total === 0) {
        return (
            <div>
                <h2>Give feedback</h2>
                <Button name={'good'} handleClick={handleClick}/>
                <Button name={'neutral'} handleClick={handleClick}/>
                <Button name={'bad'} handleClick={handleClick}/>
                
                
                <h3>Statistics</h3>
                <p>No feedback given</p>
            </div>
        )
    }

    return (
        <div>
            <h2>Give feedback</h2>
            <Button name={'good'} handleClick={handleClick}/>
            <Button name={'neutral'} handleClick={handleClick}/>
            <Button name={'bad'} handleClick={handleClick}/>
            
            
            <h3>Statistics</h3>
            <table>
                <tbody>
                    <Statistics name="good" value= {feedback.good} />
                    <Statistics name="neutral" value= {feedback.neutral} />
                    <Statistics name="bad" value= {feedback.bad} />
                    <Statistics name="all" value= {total} />
                    <Statistics name="average" value= {sum/total} />
                    <Statistics name="positive" value= {(feedback.good / total) * 100 + '%'} />
                </tbody>
            </table>
            
            
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));

