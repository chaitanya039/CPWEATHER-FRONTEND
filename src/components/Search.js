import React, { useEffect, useState } from 'react'
import { AsyncPaginate } from 'react-select-async-paginate';
import {  MAPBOX_ACCESS_TOKEN } from "../Apis/MapboxApis";
// import { geoApisOptions , GEO_API_URL } from '../Apis/geoApis';

const Search = ({ onSearchChange, lang }) =>
{

    // Define state variables

    const [search, setSearch] = useState(null);

    // Define some functions

    const handleOnChange = (searchData) => 
    {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    const loadOptions = async (inputValue) => 
    {
        // return await fetch(`${GEO_API_URL}/cities?minPopulation=10&namePrefix=${inputValue}`, geoApisOptions)
        return await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${inputValue}.json?language=${lang}&access_token=${MAPBOX_ACCESS_TOKEN}`)
                .then(res => res.json())
                .then((jsonData) => {
                /* Format we need :  { options : [ { value , label } , { value , label } , { value , label } ] }  */

               /* return {
                    options : jsonData.data.map((city) => {
                        return {
                            value : `${city.latitude} ${city.longitude}`,
                            label : `${city.name} , ${city.regionCode} ${city.countryCode}`
                        }
                    })
                } */
                return {
                    options : jsonData.features.map((place) => {
                        return {
                            value : `${place.center[1]} ${place.center[0]}`,  // 0th element is long and 1th is latt
                            label : `${place.place_name}`
                        }
                    })
                }
                })
                .catch(err => console.error('error : ' + err));
    }

    // Custom styling to AsyncPaginate Component | Object of callback functions

    const customStyle = 
    { 
        container : (provided) => 
        (
            {
            ...provided,
            width : "80%",
            margin : "2rem auto",
            fontSize : "1.15rem",
            }
        ),

        control: (provided) => 
        ({
            ...provided,
            border: '1px solid gray 1px solid white 1px solid white 1px solid gray',
            boxShadow : ".2rem .2rem .1rem .05rem rgba(0, 0, 0, 0.2)",
            minHeight: '40px',
            height: '50px',
            padding : '0 0 0 1rem',
            fontSize : '1.45rem',
            fontFamily : "'Montserrat', sans-serif",
            fontWeight : '500',
        }),

        option: (provided) => 
        ({
            ...provided,
            minHeight: '40px',
            height: '50px',
            padding : '1.8rem 0 0 1rem',
            fontSize : '1.45rem',
            fontFamily : "'Montserrat', sans-serif",
            fontWeight : '500'
        }),
    }


  return (
        <AsyncPaginate
            key={lang}
            placeholder = "Search for city"
            debounceTimeout={300}
            value = {search}
            onChange = {handleOnChange}
            styles = {customStyle}
            loadOptions = {loadOptions}
        /> 
  )
}

export default Search;