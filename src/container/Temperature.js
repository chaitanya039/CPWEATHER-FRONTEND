// Here We are Going to create a page which displays the Current Temperature of your city.

import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Search from '../components/Search';
import { WEATHER_API_URL, WEATHER_API_KEY } from "../Apis/OpenWeatherApis";
import CircleLoader from "react-spinners/CircleLoader";

// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from '!mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL } from '../Apis/MapboxApis';
import { getCurrentDay, getCurrentDate } from "../Apis/Day_dateApis";

// import ReactMapGL from "react-map-gl";

export const Temperature = ({ lang }) => 
{

    // Define states.
    const [city, setCity] = useState("");
    const [currentWeather, setCurrentWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    /* const [viewport, setViewport] = useState({
        width: "    ",
        height: "100%",
        latitude: 78.96288,
        longitude: 20.593684,
        zoom: 2
    }); */

  // Defining Some Functions ->

  const handleOnSearchChange = (searchData) =>
  {
      setLoading(true);
      console.log(searchData);
      const [lat, lon] = searchData.value.split(' ');
      setCity(searchData.label.split(",")[0] + " " + searchData.label.split(",")[1])

      const currentWeatherFetch = fetch(`${WEATHER_API_URL}/weather?units=metric&lang=${lang}&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
      // Resolve the promises returned by fetch

      Promise.all([currentWeatherFetch])
      .then(
        async (response) =>
        {
            const weatherResponse = await response[0].json();
            
            // Setting data to state variables.

            setCurrentWeather(weatherResponse);

            // Setting loading of loader to false.
            setLoading(false);

            // Rendering the map when response is generated using mapbox-gl library and loading became false.

            mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
            const map = new mapboxgl.Map({
                container: 'map',
                style: MAPBOX_STYLE_URL,
                center: [78.96288, 20.593684],
                zoom: 1.25
            });

            map.on('load', () => {
                
                if(map.loaded)
                {
                    setTimeout(() => 
                    {
                        let color = "skyblue";

                        if (weatherResponse.main.temp >= 35 && weatherResponse.main.temp <= 38)
                        {
                            // normal
                            color = "green";
                        }
                        else if(weatherResponse.main.temp < 35)
                        {
                            // low
                            color = "blue";
                        }
                        else if(weatherResponse.main.temp > 38)
                        {
                        // high
                        color = "red";
                        }
                        
                        // Create a Marker of city and add it to the map.
                        new mapboxgl.Marker({
                            color: color
                        }).setLngLat([lon, lat]).addTo(map);

                        map.flyTo({
                            center: [lon, lat],
                            zoom: 13,
                            bearing : 90,
                            pitch: 60,
                            duration: 2000,
                            speed: 2,
                            curve: 1,
                            easing: function (t) { return t; },
                            essential: true
                        });

                    }, 500);
                }
            });
        }
      )
      .catch(error => console.log(error));
  }


  return (
    <Layout>
        
      {/* Let's Create Some Heading with dark background */}

      <section className="primary-section">
            <div className="content">
                <h1 className="primary-heading">
                    <span><i className="fas fa-sun me-1"></i>TEMP</span>erature
                </h1>
                <p className="description">
                    Get current temperature of city now with details information & location of your city on map ...
                </p>
            </div>
      </section>
      
      <div className="note">
          <marquee behavior="sliding" direction="left" scrollamount = "12" hspace = "30%"> 
            <i class="fas fa-flag me-1"></i> Note &nbsp;-&nbsp; 
            <i class="fa fa-map-marker me2" style={{ color : "blue" }}></i> Temperature less than 35°C&nbsp;&nbsp;|&nbsp;&nbsp;  
            <i class="fa fa-map-marker me2" style={{ color : "green" }}></i> Temperature between 35°C & 38°C&nbsp;&nbsp;|&nbsp;&nbsp;  
            <i class="fa fa-map-marker me2" style={{ color : "red" }}></i> Temperature greater than 38°C 
          </marquee>
      </div>

      <div className="temp-body-section">
          <div className="head">
              <p className="desc">Current temperature and location of city</p>
              <h1 className='main'>Search Here</h1>
          </div>
          {/* When we pass the function as prop then it becomes callback function means function act as a argument to another function */} 
          <Search onSearchChange={handleOnSearchChange} lang = { lang } />

           
        {       
            (currentWeather !== null && loading === false)
            ?
            <div className="main-body">
                <div className="content">
                    <div className="day-date">
                        <div className="day"><i className="fa fa-calendar-o me-2"></i>{ getCurrentDay() }</div>
                        <div className="date">{ getCurrentDate() }</div>
                    </div>
                    <div className="name-icon">
                        <div className="name"><i className="fas fa-street-view me-4"></i>{city + ", " + currentWeather.sys.country}</div>
                        <img src={require(`../icons/${currentWeather.weather[0].icon}.png`)} alt="weather" className='weather-icon' />
                    </div>
                    <div className="temp-desc">
                        <h1 className="temp">{currentWeather.main.temp} °C</h1>
                        <div className="desc">
                            {currentWeather.weather[0].description}
                        </div>
                    </div>
                    <div className="details">
                        <div className="detail-1">
                            <p> Feels Like temp : {currentWeather.main.feels_like ? currentWeather.main.feels_like : "unknown"} °C </p>
                            <p> Min Temperature : {currentWeather.main.temp_min ? currentWeather.main.temp_min : "unknown"} °C </p>
                            <p> Max Temperature : {currentWeather.main.temp_max ? currentWeather.main.temp_max : "unknown"} °C </p>
                            <p> Wind Speed : {currentWeather.wind.speed ? currentWeather.wind.speed : "unknown"} </p>
                        </div>
                        <div className="detail-2">
                            <p> Average Humidity : {currentWeather.main.humidity ? currentWeather.main.humidity : "unknown"}% </p>
                            <p> Sea_level Humidity : {currentWeather.main.sea_level ? currentWeather.main.sea_level : "unknown"} </p>
                            <p> Ground_level Humidity : {currentWeather.main.grnd_level ? currentWeather.main.grnd_level : "unknown"} </p>
                            <p> Pressure : {currentWeather.main.pressure ? currentWeather.main.pressure : "unknown"} </p>
                        </div>
                    </div>
                </div>
                    <div className="map" id='map' style={{ width : '100%', height : '500px' }}> 
                    
                    </div>
            </div>
            :
            <div align = "center" style={{ padding: '2rem' }}>
                <CircleLoader
                    color = "#5e007b"
                    size = {40}
                    loading = {loading}
                />
            </div>
        }
             
        </div>

    </Layout>
  );
}
