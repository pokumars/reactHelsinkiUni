import React from 'react';
import ReactDOM from 'react-dom';



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

export default Total;