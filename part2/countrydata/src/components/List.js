import React from 'react';
import Country from './Country';

const List = (props) => {
    const {results, search} = props;
    //console.log('results', results);

    const mapResults = () =>{
        function searchByName(item) {
            return item.name.toLowerCase().includes(search);
        }

        if (search !== ""){//results when search bar is populated
           let searchedCountry = results.filter(searchByName);
           if(searchedCountry.length === 1){
               return <Country country={results[0]}/>
           }
           else if (searchedCountry.length > 10) {
            return limitResultsToTen(searchedCountry);
           } else {
            return searchedCountry.map((country) => <li key={country.name}>{country.name}</li>); 
           }
        }        
    }

    const limitResultsToTen =(arr) => {//if arr is more than 10 results
        let theTen = arr.filter((item,index) => index < 10 );
        console.log('arr of 10', theTen);
        return theTen.map((country) => <li key={country.name}>{country.name}</li>);        
    }    

    return(
        <div>
            {results.length > 10 ? <h2>too many results; be more specific</h2>: <p></p>}
            <ul>
                {mapResults()}
            </ul>

        </div>
        
    );
}

export default List;