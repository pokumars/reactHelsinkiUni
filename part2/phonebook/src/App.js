import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Persons from './components/Persons';
import phoneService from './services/phoneService';
import Notification from './components/Notification';
import Error from './components/Error';


const App = () => {
  const [persons, setPersons] = useState([]);
  const [ filter, setFilter] = useState(''); 
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ notificationMessage, setnotificationMessage] = useState(null);
  const [ errorMessage, setErrorMessage ] = useState(null);
  
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

        //UPDATE
        phoneService
          .updateContact(objToUpdateID, nameObj)
          .then((returnedPerson) => {
            displayNotification(`${returnedPerson.name}'s new number ${returnedPerson.number} added successfully`, true);
            //setPersons to be all the persons except the one with the id we just changed.
          //That should be replaced by the updated one we got from the put request's response.
            return setPersons(persons.map((p) => p.id !== objToUpdateID? p : returnedPerson));
          }).catch((err) => {
            displayNotification(`${newName} has already been removed from server`, false)
          })        
      }

      

      return
    }

    //CREATE CONTACT
    console.log('names' , persons.concat(nameObj));
    phoneService
      .addContact(nameObj)
      .then((newPerson) => {
        console.log(newPerson);
        setPersons(persons.concat(newPerson));
        displayNotification(`${newPerson.name} added successfully`, true);
      });
  }

  //DELETE
  const deletePerson = (person) => {
    const agree = window.confirm(`Are you sure you want to delete ${person.name}`);

    if(agree){
      console.log('delete person', person.id);
    
      phoneService.deleteContact(person.id)
      displayNotification(`${person.name} deleted`, true);//notification
      
      
      //set persons to be all except the one we deleted
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  }

  const displayNotification = (msg, good) => {
    //is message an error or just a notification

    if (good) {
      setnotificationMessage(msg);
      setTimeout(()=>{
        setnotificationMessage(null);
      },3000);
    }else {
      setErrorMessage(msg);
      setTimeout(()=>{
        setErrorMessage(null);
      },3000);
    }
  }
 


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notificationMessage} />
      <Error message={errorMessage} />

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