import React, { useState } from 'react'

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

  const displayNumbers =() => {
    function filterByName(item) {
      return item.name.toLowerCase().includes(filter);
    }

    if(filter !== ""){
      let filteredPersons = persons.filter(filterByName);
      return filteredPersons.map((person)=> <p key={person.name}>{person.name} {person.number}</p>)
    }
    return persons.map((person)=> <p key={person.name}>{person.name} {person.number}</p>)
  }


  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange}/>
      </div>

      <h2>Add a new</h2>
      <form onSubmit={addContact}>
        <div>
          name: <input  value= {newName}
           onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} 
          onChange={handleNumberChange}/>
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