import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneService from './services/phoneService'


const App = () => {
  const [persons, setPersons] = useState([]);
  const [ filter, setFilter] = useState(''); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  
  const getAllhook = () => {
   phoneService
    .getAll()
    .then((allContacts) => {
      setPersons(allContacts);
    });
  }
  //use effect hook here to fetch notes
  useEffect(getAllhook, []);
  

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
      //return window.alert(`Name ${nameObj.name} already exists in phonebook or number spot is empty`)
      const agree = window.confirm(`${newName} already exists. Do you want to update the number`);

      if (agree) {
        const objToUpdateID = persons.find((p)=> newName === p.name).id;
        console.log('objToUpudate', objToUpdateID);

        phoneService
          .updateContact(objToUpdateID, nameObj)
          .then((returnedPerson) => {
            return setPersons(persons.map((p) => p.id !== objToUpdateID? p : returnedPerson));
          });        
      }

      

      return
    }

    console.log('names' , persons.concat(nameObj));
    phoneService
      .addContact(nameObj)
      .then((newPerson) => {
        console.log(newPerson);
        setPersons(persons.concat(newPerson)); 
      });
  }

  const deletePerson = (person) => {
    const agree = window.confirm(`Are you sure you want to delete ${person.name}`);

    if(agree){
      console.log('delete person', person.id);
    
      phoneService.deleteContact(person.id)
      setPersons(persons.filter((p) => p.id !== person.id));
    }
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
      <Persons persons={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App