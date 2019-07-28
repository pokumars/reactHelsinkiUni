import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Country = (props) => {
    const { country, show } = props;
    const [ showCountry, setShowCountry ] = useState(show);
    const [ weather, setWeather ]= useState({});
    const apiKey= '8bdf1ceaeec64ea99c982100191506';

    const getWeatherHook = ()=> {
        axios
        .get(`http://api.apixu.com/v1/current.json?key=${apiKey}&q=${country.capital}`)
        .then((response) => {
            console.log(response.data);
            setWeather(response.data.current);
        });
    }
    useEffect(getWeatherHook,[country]);
    
    //console.log('country ...',country);

    const listLanguages = () => {
        return country.languages.map((lang)=> <li key={lang.name}>{lang.name}</li>)
    }

    if(showCountry === false){
       return <div key={country.name}> 
            {country.name} <button onClick={() => setShowCountry(!showCountry)}>{showCountry ? 'show less': 'show more'}</button>
        </div>
    }else {
        return(
            <div>
                <h2>{country.name}</h2> <button onClick={() => setShowCountry(!showCountry)} >{showCountry ? 'show less': 'show more'} </button>
                <p>capital <strong>{country.capital}</strong></p>
                <p>population <strong>{country.population}</strong></p>
                <h3>Languages</h3>
                <ul>
                    {listLanguages()}
                </ul>
                <img src={country.flag} alt={`flag of ${country.name}`} height="200" width="200"/>
                <h2>Weather in {country.capital}</h2>
                <p><b>temperature</b> {weather.temp_c} celsius</p>
                <img src= {weather.condition.icon} alt={weather.condition.text} height="80" width="80"/>
                
                <p><b>wind</b> {weather.wind_kph} kph <b>{weather.wind_dir}</b></p>

            </div>
        );
    }  
}

export default Country;
