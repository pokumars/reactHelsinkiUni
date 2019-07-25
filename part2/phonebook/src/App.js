import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('klm');

  const handleNameChange =(event) => {
    //console.log(event.target.value);
    
    setNewName(event.target.value);
    console.log(newName);
  }

  const addName= (event) => {
    event.preventDefault();

    const nameObj = { name: newName };

    const nameExistsAlready = () => {
      //if name isnt found, it returns undefined, 
      //if it is then it returns that obj
      return persons.find( (object) => object.name === nameObj.name);
    }
    console.log('undefined means name doesnt already exist', nameExistsAlready());

    if(nameExistsAlready() === undefined) {//name doesnt exist, set name
      console.log('names' , persons.concat(nameObj));
      setPersons(persons.concat(nameObj)); 
    } 
    else{ //name already exists, so give error alert
      window.alert(`${nameObj.name} already exists in phone book`)
    }

    setNewName('');
  }

  const displayNumbers =() => {
    return persons.map((person)=> <p key={person.name}>{person.name}</p>)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input  value= {newName} onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
        <div>debug: {newName}</div>
      </form>
      <h2>Numbers</h2>
      <div>
      {displayNumbers()}
      </div>
    </div>
  )
}

export default App