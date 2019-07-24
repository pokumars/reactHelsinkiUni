import React from 'react';
import Part from './Part'


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

export default Content;