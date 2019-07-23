import React , { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const App = () => {
    const [feedback, setFeedback] = useState({
        good: 0,
        neutral: 0,
        bad: 0
    });
    const [sum, setSum] = useState(0);
    const [total, setTotal] = useState(0);

    

    const handleClick =(value) => {
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

    return (
        <div>
            <h2>Give feedback</h2>
            <button onClick={() => handleClick('good')} >good</button>
            <button onClick={() => handleClick('neutral')}>neutral</button>
            <button onClick={() => handleClick('bad')} >bad</button>
            <h3>Statistics</h3>
            <p>good {feedback.good}</p>
            <p>neutral {feedback.neutral}</p>
            <p>bad {feedback.bad}</p>
            <p>all {total}</p>
            <p>average {sum/total}</p>
            <p>positive {(feedback.good / total) * 100}%</p>
        </div>
    );
}


ReactDOM.render(<App />, document.getElementById('root'));

