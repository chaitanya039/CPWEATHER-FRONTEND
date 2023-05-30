import React, { useEffect, useState } from 'react';
import { AsyncPaginate } from 'react-select-async-paginate';
import Layout from './Layout';
import { ACCU_WEATHER_API_URL, ACCU_WEATHER_API_KEY } from '../Apis/AccuWeatherApis';
import CountrySearch from './CountrySearch';

const StateSearch = ({ onSearchChange , lang}) => 
{

  const [search, setSearch] = useState(null);
  const [countryCode, setCountryCode] = useState('');
  

  const handleOnChange = (searchData) => 
  {
        setSearch(searchData);
        onSearchChange(searchData);
  }

  const handleOnSearchChange = (searchData) =>
  {
    setCountryCode(searchData.value);
  }


  const loadOptions =  (inputValue) => 
  {
    
      return fetch(`${ACCU_WEATHER_API_URL}/locations/v1/adminareas/${countryCode}?apikey=${ACCU_WEATHER_API_KEY}&language=${lang}`)
               .then(res => res.json())
               .then((jsonData) => {
                
                return {
                    options : jsonData.map((element, index) => {
                        return {
                            value : `${element.ID}`,
                            label : `${element.LocalizedName} , ${element.ID}`
                        }
                    })
                }

               });
  };

  useEffect(() => {
    console.log('hii');
  }, [ countryCode ]);   

  // Custom styling to AsyncPaginate Component | Object of callback functions

  const customStyle = 
  { 
      container : (provided) => 
      (
          {
          ...provided,
          width : "25%",
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
    <Layout>
        <section>
            <CountrySearch onSearchChange={handleOnSearchChange} lang = { lang } />
            <AsyncPaginate
                placeholder = "Find your State"
                debounceTimeout={600}
                value = {search}
                onChange = { handleOnChange }
                loadOptions = { loadOptions }
                styles = {customStyle}
                isSearchable = {false}
                key = {countryCode}  // key prop uniquely identify the each component and rerender
                // the component when it's value changes , that's why we assign it's some unique value
            />
        </section>
    </Layout>
  )
}

export default StateSearch;