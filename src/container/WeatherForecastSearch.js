import React, { useState } from 'react';
import Layout from '../components/Layout';
import Search from '../components/Search';
import { Navigate } from 'react-router-dom';
import { WEATHER_API_KEY, WEATHER_API_URL } from '../Apis/OpenWeatherApis';
import { CircleLoader } from 'react-spinners';

const WeatherForecastSearch = (props) => 
{
  const { lang } = props;

  // State Variables

  const [weatherForecast, setWeatherForecast] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleOnSearchChange = async (searchData) => 
  {
    // Set Loading true.
    setLoading(true);

    const [lat, lon] = searchData.value.split(' ');
    const city = searchData.label.split(",")[0] + " , " + searchData.label.split(",")[1];

    try 
    {
      const response = await fetch(`${WEATHER_API_URL}/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely&lang=${lang}&appid=${WEATHER_API_KEY}`);
      const forecastWeatherFetch = await response.json();
      console.log(forecastWeatherFetch);
      setWeatherForecast({...forecastWeatherFetch, city});
      setLoading(false);
    } 
    catch (error) 
    {
      console.log(error);
    }

  }

  return (
    <Layout>
      {  (weatherForecast !== null && !loading)
         ? 
         <Navigate to={'/weather-forecast'}  replace = { true } state = { weatherForecast } />
         :
        <div className="forecast-search-container">
          <section className="primary-section">
            <div className="content">
                <h1 className="primary-heading">
                    <span><i className="fas fa-cloud-rain me-2"></i>WEAT</span>her forecasting
                </h1>
                <p className="description">
                    Get weather forecasting of city now with details information hourly & weekly forecast ...
                </p>
            </div>
          </section>
          <div className="note">
            <marquee behavior="sliding" direction="left" scrollamount = "12" hspace = "30%"> <i class="fas fa-flag me-1"></i> Note &nbsp;-&nbsp; CPWEATHER is under development , if there is any bug in our application let me know by filling our contact form or sending email on : <u  style={{ margin : '0 1rem', textTransform : "none", fontWeight : 900, fontFamily : "'lato', sans-serif", textDecoration : 'underline' }}>chaitanyapansare33607@gmail.com</u> </marquee>
          </div>
          <div className="temp-body-section">
              <div className="head">
                  <p className="desc">Weather forecasting for your city</p>
                  <h1 className='main'>Search Here</h1>
              </div>
              {/* When we pass the function as prop then it becomes callback function means function act as a argument to another function */} 
              <Search onSearchChange={ handleOnSearchChange } lang = { lang } />
          </div>
          <div align = "center" style={{ paddingBottom: '5rem' }}>
                <CircleLoader
                    color = "#5e007b"
                    size = {40}
                    loading = {loading}
                />
            </div>
        </div>
      }

    </Layout>
  )
}

export default WeatherForecastSearch;