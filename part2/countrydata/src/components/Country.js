import React from 'react';

const Country = (props) => {
    const { country } = props;
    console.log('country ...',country);

    const listLanguages = () => {
        return country.languages.map((lang)=> <li key={lang.name}>{lang.name}</li>)
    }

    return(
        <div>
            <h2>{country.name}</h2>
            <p>capital <strong>{country.capital}</strong></p>
            <p>population <strong>{country.population}</strong></p>
            <h3>Languages</h3>
            <ul>
                {listLanguages()}
            </ul>
            <img src={country.flag} alt={`flag of ${country.name}`} height="200" width="200"/>
           
        </div>
    );
}

export default Country;
//<strong>{}</strong>