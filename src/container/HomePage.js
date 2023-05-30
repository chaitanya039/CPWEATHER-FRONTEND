import React, { useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';

import { ScaleLoader } from "react-spinners";


import png1 from "../images/weather-2.png";
import png2 from "../images/illu.png";
import wave from "../images/wave.svg";
import currentWeather from "../images/services.svg";
import forecastWeather from "../images/weather-forecast.svg";
import temperature from "../images/temperature.svg";
import map from "../images/map.svg";
import travel from "../images/travel.svg";
import news from "../images/news-section.svg";


import { FaCloudSun, FaCloudversify, FaMapMarkedAlt, FaNewspaper, FaTemperatureHigh, FaTruckMonster } from 'react-icons/fa';
import WeatherApp from '../components/WeatherApp';
import { WEATHER_API_URL, WEATHER_API_KEY } from "../Apis/OpenWeatherApis";
import { MAPBOX_ACCESS_TOKEN } from "../Apis/MapboxApis";
import { Toaster, toast } from 'react-hot-toast';
import moment from 'moment';
import axios from 'axios';


const HomePage = ({ lang }) =>
{
 
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const handleOnSearchSubmit = async (e) => {
    e.preventDefault();
    setSearchData(null);
    setLoading(true);
    try
    {
        /*const response1 = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${search}.json?language=${lang}&access_token=${MAPBOX_ACCESS_TOKEN}`);
        const data1 = await response1.json();
        const response2 = await fetch(`${WEATHER_API_URL}/weather?lat=${data1.features[0].bbox[1]}&lon=${data1.features[0].bbox[0]}&appid=${WEATHER_API_KEY}`);
        const data2 = await response2.json();
        console.log(data2);*/
        const {data} = await axios.get(`${WEATHER_API_URL}/weather?units=metric&q=${search}&appid=${WEATHER_API_KEY}`);
        console.log(data);
        if(data)
        {
            setSearchData(data);
            setLoading(false);
        }
        else
        {
            setSearchData(null);
            setLoading(false);
        }
    }
    catch(error)
    {
        console.log(error);
        toast.error("City not found !");
        setSearchData(null);
        setLoading(false);
    }
    
  }
  return (
    <Layout>
     <section className='welcome-section'>

       <div className="row">

       <div className="content">
          <div className="icons">
              <img src={require("../images/c.png")} alt="cloud-rain" />
              <img src={require("../images/s.png")} alt="cloud-rain" />
              <img src={require("../images/c-s.png")} alt="cloud-rain" />
              <img src={require("../images/c-r.png")} alt="cloud-rain" />
              <img src={require("../images/c-s-r.png")} alt="cloud-rain" />
              <img src={require("../images/c-t.png")} alt="cloud-rain" />
          </div>
         <h3>welcome to
         <span><i className="fas fa-cloud-sun-rain"></i>CP</span><span style={{ color: "#710193" }}>WEATHER</span>
          &nbsp;&nbsp;by chaitanya pansare....</h3>
         <h1>
           Latest weather information with more feature by introducing <span>AI</span> in our platform..
         </h1>
         <p>
            Local, National & Global daily weather forecast as well as current weather information .CP WEATHER provides all things including, current weather, weather forecast & history data,
            current temperature of your city with geometric locations with more functionality.
         </p>
         <div>
            <Link to='/weather-forecast-search' className='primary-btn'>
            <i class="fa fa-bolt me-3"></i>Weather Forecast</Link>
            <Link to='#' className='secondary-btn'><i class="fa fa-file-image-o me-3"></i>Generate AI Image</Link>
         </div>
       </div>

       {/* <div className='images-slider'>
          <img src={png1} alt="" />
          <img src={png2} alt="" />
          <img src={png3} alt="" />
          <img src={png4} alt="" />
       </div> */}

         <div className='images-slider'>
            <img src={png1} alt="" />
        </div>


       </div>
     </section>
     
     {/* Banner Section starts here */}
    
     <section className="banner-section">
     <img className="wave" src={wave} alt="" />
     <Toaster
            position='top-center'
            reverseOrder = "false"
            toastOptions={{
              style: {
                fontSize : "1.25rem",
                fontWeight : "700",
              },
            }}
          />
        <div className="banner-container">
            <div className="banner-row">
                <div className="banner-col">
                    <p>Weather and Forecast</p>
                    <h1>Daily Weather</h1>
                    <h1>Forecast Update News</h1>
                    <div>Get the latest weather forecast for today with up-to-date information on temperature, precipitation, and more.</div>
                    <form action="" className='widget-search-form' onSubmit={handleOnSearchSubmit}>
                        <div className="box">
                            <input type="search" onChange={(e) => setSearch(e.target.value)} value={search} id='search' placeholder='Search for location' />
                            <label htmlFor="search" className='fa fa-search' onClick={handleOnSearchSubmit}></label>
                        </div>
                    </form>
                    {
                        loading ? 
                        <div style={{ width : "100%", textAlign : "center", marginTop : "3rem" }}><ScaleLoader color="#010806" /></div>
                        : null
                    }
                </div>
                
                {
                    searchData === null ?
                    <div className="banner-col">
                    <div className="display-container">
                        <div className="name-symbol">
                            <h4 className="name">London</h4>
                            <img src={require(`../images/sun-icon.png`)} alt="sun-icon" />
                        </div>
                        <div className="date">Today, 04 April</div>
                        <h1 className="temp">24°</h1>
                        <p className="status">Sunny</p>
                        <div className="wind-speed">
                            <span>Wind</span>
                            <span>19 km/h</span>
                        </div>
                        <div className="humidity">
                            <span>Humidity</span>
                            <span>22%</span>
                        </div>
                    </div>
                </div> :
                    <div className="banner-col">
                    <div className="display-container">
                        <div className="name-symbol">
                            <h4 className="name">{searchData.name}</h4>
                            <img src={require(`../icons/${searchData.weather[0].icon}.png`)} alt="sun-icon" />
                        </div>
                        <div className="date">{moment().calendar()}</div>
                        <h1 className="temp">{searchData.main.temp}°</h1>
                        <p className="status">{searchData.weather[0].description}</p>
                        <div className="wind-speed">
                            <span>Wind</span>
                            <span>{searchData.wind.speed} km/h</span>
                        </div>
                        <div className="humidity">
                            <span>Humidity</span>
                            <span>{searchData.main.humidity}%</span>
                        </div>
                    </div>
                </div>
                }
            </div>
        </div>
     </section>
     
     {/* Banner Section ends here */}
     
     {/* Weather Gallery Section */}

     <section className="weather-gallery">
            <div className="section-heading-2 pink">
                <h1 className="main-heading"> Weather in pictures </h1>
                <div className="heading-line">
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
            </div>
            <div className="box-container">
                <img src={require('../images/w-g-1.jpg') } alt="" />
                <img src={require('../images/w-g-2.jpg') } alt="" />
                <img src={require('../images/w-g-3.jpg') } alt="" />
                <img src={require('../images/w-g-4.jpg') } alt="" />
                <img src={require('../images/weather-gallery.jpg') } alt="" />
                <img src={require('../images/gallery.jpg') } alt="" />
            </div>
            <Link to={'/weather-gallery'} style = {{  }} className="secondary-btn">Explore now...!</Link>
     </section>


     {/* Services Section */}

      <section className="services">

            <div className="section-heading">
                <div className="desc">Top Quality</div>
                <div className="main-heading">Services that we Offer</div>
                <div className="heading-line"></div>
            </div>

            <div className="row">
                <div className="col">
                    <h1> <span><FaCloudSun className='me-1' /> Curr</span>ent Weather</h1>
                    <p>
                        CPWeather is a company that specializes in providing accurate and up-to-date weather information to its customers.
                        They offer a wide range of services, including current weather conditions and
                        severe weather alerts. Their state-of-the-art technology and team of meteorologists allow them to gather and analyze
                        weather data from around the globe, providing customers with the most accurate and reliable information.
                     </p>
                </div>
                <div className="col" align = "center">
                    <img src={currentWeather} alt="current weather" />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h1> <span><FaCloudversify className='me-1' /> wea</span>ther forecasting</h1>
                    <p>
                        Weather forecasting is the practice of predicting the atmospheric conditions, such as temperature, humidity
                        , wind speed, and precipitation, for a specific location and time in the future. This is done by analyzing data
                        from weather satellites, radar, and weather stations, as well as using computer models to simulate the behavior
                        of the atmosphere. Accurate weather
                       forecasting is important for a variety of activities, such as agriculture, transportation, and emergency management.
                     </p>
                </div>
                <div className="col" align = "center">
                    <img src={forecastWeather} alt="current weather" />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h1> <span><FaTruckMonster className='me-1' /> Tra</span>vel Advisor & Log</h1>
                    <p>
                        A travel advisor and map app is a software that helps users plan and navigate their trips.
                        It typically includes features such as recommending popular tourist destinations, providing
                        detailed information about transportation options, and displaying interactive maps.
                        Some apps also offer the ability to book accommodations and make reservations for activities,
                        such as tours or restaurant reservations. A travel advisor and map app can be a useful tool for
                        both leisure and business travelers, as it can help them plan and organize their trip, as well as
                        navigate unfamiliar destinations
                     </p>
                </div>
                <div className="col" align = "center">
                    <img src={travel} alt="current weather" />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h1> <span><FaTemperatureHigh className='me-1' /> Curr</span>ent Temperature & Location</h1>
                    <p>
                      Current temperature and location refer to the current weather conditions and geographic location
                      of a specific place. The current temperature can be measured using thermometers, and can be
                      expressed in units such as Celsius or Fahrenheit. Knowing the current temperature can be useful
                      for various activities, such as dressing appropriately, planning outdoor activities, and adjusting
                      energy consumption. The location can be determined using GPS technology, which can provide
                      coordinates and other location-related information. Knowing your current location can be important
                      for navigation, emergency response and many other activities.
                     </p>
                </div>
                <div className="col" align = "center">
                    <img src={temperature} alt="current weather" />
                </div>
            </div>

            <div className="row">
                <div className="col">
                    <h1> <span><FaMapMarkedAlt className='me-1' /> Rea</span>l time map</h1>
                    <p>
                      Real-time map service is a type of technology that allows users to view and interact with maps in
                      real-time. This means that the maps are constantly updated with the latest information, such as
                      traffic conditions, weather, and location-based points of interest. Real-time map services can be
                      accessed through various platforms, including web browsers, mobile apps, and in-vehicle navigation
                      systems. They are often used for navigation, location-based advertising, and other location-based
                      services.
                     </p>
                </div>
                <div className="col" align = "center">
                    <img src={map} alt="current weather" />
                </div>
            </div>
      </section>

      {/* News Section */}

      <section className="news-section">

        <div className="section-heading">
            <div className="desc">Track on real time</div>
            <div className="main-heading">News of world</div>
            <div className="heading-line"></div>
        </div>

        <div className="box">
            <div className="image-container">
                <img src={news} alt="news" />
            </div>
            <div className="content">
                <h1> <i className="fas fa-newspaper me-2"></i> Flexible Live News Experience...</h1>
                <p>
                    News is information about recent events, happenings, and developments in various fields
                    such as politics, business, sports, entertainment, and more. It is widely distributed
                    through various mediums such as newspapers, television, radio, and the internet. News
                    is typically organized into various categories, such as national news, international news,
                    sports news, entertainment news, etc., to make it easier for audiences to find news that is
                    relevant to their interests.
                </p>
                <Link to={'/news'} className="primary-btn">
                    Take a look now !
                </Link>
                <Link to={''} className="secondary-btn">
                    About API
                </Link>
            </div>
        </div>
      </section>

      {/* Weather App Section */}


    </Layout>
  )
}

export default HomePage
