import React from 'react'

const Persons = (props) => {
    const { persons, filter, deletePerson } = props


    const displayNumbers =() => {
        function filterByName(item) {
          return item.name.toLowerCase().includes(filter);
        }
    
        if(filter !== ""){
          let filteredPersons = persons.filter(filterByName);
          return filteredPersons.map((person)=>  <p key={person.name}>{person.name} {person.number} <button onClick={()=> deletePerson(person)}>delete</button></p>)
        } 
        return persons.map((person)=> <p key={person.name}>{person.name} {person.number} <button onClick={()=> deletePerson(person)}>delete</button></p>)
    }

    return (
        <div>
            {displayNumbers()}
        </div>
    )
}
export default Persons