import React, { useState } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [ filter, setFilter] = useState(''); 
  const [ newName, setNewName ] = useState('klm');
  const [ newNumber, setNewNumber ] = useState('011');

  const handleNameChange =(event) => {
    //console.log(event.target.value);
    setNewName(event.target.value);
    console.log(newName);
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value);
    setNewNumber(event.target.value)
  }

  const handleFilterChange= (event) => {
    setFilter(event.target.value);
}

  

  const addContact= (event) => {
    event.preventDefault();

    const nameObj = { name: newName, number: newNumber };

    const nameExistsAlready = () => {
      //if name isnt found, it returns undefined, 
      //if it is then it returns that obj
      return persons.find( (object) => object.name === nameObj.name);
    }
    console.log('undefined means name doesnt already exist', nameExistsAlready());

    if(nameExistsAlready() === undefined && newNumber !== "") {//name doesnt exist, set name
      
      console.log('names' , persons.concat(nameObj));
      setPersons(persons.concat(nameObj)); 
    } 
    else{ //name already exists, so give error alert
      window.alert(`Name ${nameObj.name} already exists in phonebook or number spot is empty`)
    }

    setNewName('');
    setNewNumber('');
  }

 


  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleChange={handleFilterChange} filter={filter}/>

      <h2>Add a new contact</h2>
      <PersonForm  submitter={addContact} 
       newName={newName} handleNameChange={handleNameChange}
       newNumber = {newNumber} handleNumberChange= {handleNumberChange}
      />      

      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  )
}

export default App