import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import axios from 'axios';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [ filter, setFilter] = useState(''); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  
  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
      console.log('axios response', response.data);
      setPersons(response.data);
    });
  }
  //use effect hook here to fetch notes
  useEffect(hook, []);
  

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
      //if it is found then it returns that obj
      return persons.find( (object) => object.name === nameObj.name);
    }
    console.log('undefined means name doesnt already exist', nameExistsAlready());

    setNewName('');
    setNewNumber('');
    
    if(newName === "") {//no name
      return window.alert(`Name spot is empty`)
    } else if (newNumber === ""){//no number
      return window.alert(`Number spot is empty`)
    } else if(nameExistsAlready() !== undefined) {//name exists
      //undefine means name doesnt exist already
      return window.alert(`Name ${nameObj.name} already exists in phonebook or number spot is empty`)
    }

    console.log('names' , persons.concat(nameObj));
    axios.post('http://localhost:3001/persons', nameObj)
      .then((response) => {
        console.log(response.data);
        setPersons(persons.concat(response.data)); 
      });
        
    
    //setPersons(persons.concat(nameObj)); 
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