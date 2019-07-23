import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Anecdote = (props) => {
    
    return (
        <div>
            {props.anecdote}
        </div>
    );
}

const Score = (props) => <p>{props.score}</p>


const App = (props) => {
    const [selected, setSelected] = useState(0);
    const [ scores, setScores] = useState(Array(anecdotes.length).fill(0));
    const [index, setIndex] = useState(0);

    const handleNextClick = () => {
        console.log('scores',scores);
        const getRandom = (min, max) => {//generate random number between a specified range
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        let rand = getRandom(0, props.anecdotes.length - 1); //use random number and select next thing in array
        setSelected(rand);
        setIndex(rand);
    }

    const handleVoteClick = () => {
        const copy = [...scores];// copy vote array, add new vote and set it as the new state
        copy[index] += 1;
        setScores(copy);
        mostLiked();
    }
    const mostLiked= () =>{
        const arr1= [...scores];//make a copy arry for the sorting purpose
        //console.log('score',scores);
        let re = arr1.sort((a,b) => a-b);//sort and use the last value there as the biggest number
        let biggest = re[re.length -1]
        let bigIndex = scores.indexOf(biggest);//index of that anecdote

        return bigIndex;
    }


    return (
        <div>
            <p>{index}</p>
            <Anecdote anecdote= {props.anecdotes[selected]} />
            <button onClick={handleNextClick}>next anecdote</button>
            <button onClick={handleVoteClick}>vote</button>
            <Score score={scores[index]}/>

            <h3>Most liked Anecdote</h3>
            <Anecdote anecdote= {props.anecdotes[mostLiked()]} />
            

        </div>
    )   
}

const anecdotes = [
    `Brooks Law: "Adding manpower to a late software project makes it later!"`, 
    `The first 90 percent of the code accounts for the first 90 percent of the development time...
    The remaining 10 percent of the code accounts for the other 90 percent of the development time. 
    -- Tom Cargill `,
    `How does a project get to be a year late?... One day at a time. 
    -- Fred Brooks`,
    `The bearing of a child takes nine months, no matter how many women are assigned. 
    Many software tasks have this characteristic because of the sequential nature of debugging. 
    -- Fred Brooks`,
    `Plan to throw one (implementation) away; you will, anyhow.
    -- Fred Brooks`,
    `Perfection (in design) is achieved not when there is nothing more to add, but rather when there is nothing more to take away
    --Antoine de Saint-Exupery`,
    `Any fool can write code that a computer can understand. Good programmers write code that humans can understand.
    --Martin Fowler`,
    `Program testing can be used to show the presence of bugs, 
    but never to show their absence! 
    --Edsger Dijkstra`,
    `We try to solve the problem by rushing through the design process so that
     enough time is left at the end of the project to uncover the errors that were made because we rushed through the design process
    --Glenford Myers`,
    `Time pressure gradually corrupts an engineer’s standard of quality and perfection. 
    It has a detrimental effect on people as well as products 
    --Niklaus Wirth`,
    `Most of you are familiar with the virtues of a programmer. There are three,
     of course: laziness, impatience, and hubris.
    -- Larry Wall`,
    `Documentation is the castor oil of programming. Managers think it is good for programmers and programmers hate it!.
    --Gerald Weinberg`,
    `A common mistake that people make when trying to design something completely foolproof was to underestimate the ingenuity of complete fools. 
    -- Douglas Adams`,
    `Programming today is a race between software engineers striving to build bigger and better idiot-proof programs,
     and the Universe trying to produce bigger and better idiots. So far, the Universe is winning. 
    --Rich Cook`,
    `Wirth's law: Software gets slower faster than hardware gets faster. 
    --Niklaus Wirth`,
    `It's OK to figure out murder mysteries, but you shouldn't need to figure out code. You should be able to read it.
    --Steve McConnell `,
    
    ];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

