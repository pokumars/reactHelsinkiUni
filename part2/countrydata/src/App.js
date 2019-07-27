import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import List from './components/List';
import axios from 'axios';

function App() {
  const [ search, setSearch] = useState('greece');
  const [ results, setResults ] = useState([]);

  const searchHook = ()=> {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${search}`)
      .then((response)=> {
        console.log('full response Array',response.data);
        setResults(response.data);
      });

  }
  useEffect(searchHook,[search]);

  
 

  const handleSearchChange = (event) => {
    //console.log('handlesearch called',event.target.value)
    setSearch(event.target.value);
  }

  return (
    <div>
      <SearchBar search= {search} handleSearchChange={handleSearchChange} />
      <List results={results} search={search}/>

      
    </div>
  );
}

export default App;
//<List results={res} search={search}/>