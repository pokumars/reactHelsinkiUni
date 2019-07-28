import React from 'react';
import Country from './Country';

const List = (props) => {
    const {results, search} = props;
    
    const mapResults = () =>{
        function searchByName(item) {
            return item.name.toLowerCase().includes(search);
        }

        if (search !== ""){//results when search bar is populated
           let searchedCountry = results.filter(searchByName);
           /*if(searchedCountry.length === 1){//1 result
                console.log('lone country...', results[0]);
                //return <p>one country</p>
               return <Country country={results[0]} show={true}/>
           }
           else*/ if (searchedCountry.length > 10) {
            return limitResultsToTen(searchedCountry);
           } else {
            return searchedCountry.map((country) => <div key={country.name}> 
                <Country country={country} show={false}/>
            </div>); 
           }
        }        
    }


    const limitResultsToTen =(arr) => {//if arr is more than 10 results
        let theTen = arr.filter((item,index) => index < 10 );
        console.log('arr of 10', theTen);
        return theTen.map((country) => <div key={country.name}> 
            <Country country={country} show={false}/>
        </div>);        
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