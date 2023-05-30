import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';

import { SiGooglemaps } from "react-icons/si";
import { WiHumidity } from 'react-icons/wi';
import { GiDew, GiSunset, GiWhirlwind, GiWindpump, GiWindSlap } from 'react-icons/gi';
import { BsCloudLightningRain, BsFillCloudFog2Fill, BsFillSunriseFill } from 'react-icons/bs';
import { BiCloudLightRain } from 'react-icons/bi';
import { GoLocation } from 'react-icons/go';
import { AiOutlineAntCloud } from 'react-icons/ai';
import { RiMoonClearFill, RiMoonCloudyFill } from 'react-icons/ri';
import { FaTemperatureHigh } from 'react-icons/fa';

import { Autoplay, Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getCurrentDate, getCurrentTime } from '../Apis/Day_dateApis';
import { Navigate, useLocation } from 'react-router-dom';
import moment from 'moment/moment';
import { BeatLoader } from 'react-spinners';

const WeatherForecast = () =>
{

    const [time, setTime] = useState(null);
    let weatherData = useState(useLocation().state);
    
    weatherData = weatherData[0];
    //setWeatherData();
    const [highlight, setHighlight] = useState(0);
    const [loading, setLoading] = useState(false);

    setInterval(() => {
        setTime(getCurrentTime());
    }, 1000);

    useEffect(() => {
        
        console.log(weatherData);

        if(highlight === 0)
        {
            document.querySelector('.today').classList.add('active');
            document.querySelector('.tmr').classList.remove('active');
        }
        else
        {
            document.querySelector('.tmr').classList.add('active');
            document.querySelector('.today').classList.remove('active');
        }
    });

    const { humidity, pressure, sunrise, sunset, wind_speed, dew_point } = weatherData.current; // Destructing of an object...

  return (
    <Layout>
    { weatherData ?
            <div>
            <section className="weatherForecastContainer">
            <div className="col">
                <img src= {require('../images/weather-forecasting-homepage.png')} alt="png" />
                <div className="time">{ time }</div>
                <div className="lat-lon"> { weatherData.lat }N&nbsp;&nbsp; { weatherData.lon }E</div>
                <div className="details">
                        <div className="row">
                            <h2><WiHumidity className='icon' /> Humidity</h2> <h2 className='value'>{ humidity }%</h2>
                        </div>
                        <div className="row">
                            <h2><BiCloudLightRain className='icon' />  Pressure</h2> <h2 className='value'>{ pressure }</h2>
                        </div>
                        <div className="row">
                            <h2> <GiWindSlap className='icon' /> Wind Speed</h2> <h2 className='value'>{ wind_speed }</h2>
                        </div>
                        <div className="row">
                            <h2> <GiDew className='icon' /> Dew Point</h2> <h2 className='value'>{ dew_point }</h2>
                        </div>
                        <div className="row">
                            <h2> <BsFillSunriseFill className='icon' /> Sunrise</h2> <h2 className='value'>{ moment(sunrise * 1000).format("HH:mm a") }</h2>
                        </div>
                        <div className="row">
                            <h2> <GiSunset className='icon' /> Sunset</h2> <h2 className='value'>{ moment(sunset * 1000).format("HH:mm a") }</h2>
                        </div>
                </div>
            </div>
            <div className="col">
                <h1> <SiGooglemaps className = "me-1" />{ weatherData.city }</h1>
                <p>( { weatherData.timezone } )</p>
                <div className="date">{ getCurrentDate() }</div>
                <div className="image">
                    <img src= { require('../images/weather-for.png') } alt="weather" />
                </div>
            </div>
        </section>

        <section className="hourly-forecast">
            <h1>Hourly</h1>
           <Swiper
                breakpoints = {{
                    0 : {
                        slidesPerView : 2,
                        spaceBetween : 15
                    },
                    450 : {
                        slidesPerView : 3,
                        spaceBetween : 20
                    },
                    768 : {
                        slidesPerView : 4 ,
                        spaceBetween : 20
                    },
                    1100 : {
                        slidesPerView : 5,
                        spaceBetween : 20
                    }
                }}
                grabCursor = {{
                    clickable : true
                }}
                className="images-slider"
                modules={[ Autoplay, Navigation ]}
                autoplay={{
                    delay: 4000,
                    disableOnInteraction: false,
                }}

                navigation = { true }

            >
                    {
                        weatherData.hourly.map((element, index) => (
                            index <= 12 &&
                            <SwiperSlide key={index}>
                                    <div className="box">
                                        <div className="time"> { moment(element.dt * 1000).format("LT") } </div>
                                        <img src= { require(`../icons/${element.weather[0].icon}.png`) } alt="" />
                                        <div className="temp">{ element.temp }°C</div>
                                        <div className="desc">{ element.weather[0].description }</div>
                                    </div>
                            </SwiperSlide>
                        ))

                    }
            </Swiper>
         </section>

         <section className="weekly-forecast">
                <div className="content">
                    <h1>Weekly Weather Forecast</h1>
                    <div className='line'>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                        <div className="dot"></div>
                    </div>
                </div>
                <div className="row">
                   {
                        weatherData.daily.map((element, index) => (
                            <div className="col" key={index}>
                                <div className="day">{ moment(element.dt * 1000).format('ddd') }</div>
                                <img src= { require(`../icons/${element.weather[0].icon}.png`) } alt="" />
                                <div className="temp">Night : { element.temp.night }°C</div>
                                <div className="temp">Day : { element.temp.day }°C</div>
                            </div>
                        ))
                   }
                </div>
                <div className="highlight">
                   <div className="highlight-btns">

                        <div className="today" onClick={() => {
                            setLoading(true);
                            setTimeout(() => {
                                setLoading(false);
                            }, 250);
                            setHighlight(0);

                        }}> Today </div>

                        <div className="tmr" onClick={() => {
                            setLoading(true);
                            setTimeout(() => {
                                setLoading(false);
                            }, 250);
                            setHighlight(1);

                        }}> Tomorrow </div>

                   </div>
                   {
                        highlight === 0
                        ?  <div className="highlight-heading"> Today's Highlight </div> :
                        <div className="highlight-heading"> Tomarrow's Highlight </div>
                    }
                    <BeatLoader color="#fff" loading = {loading} size={13.5} cssOverride={{ marginBottom: "2rem" }} />

                   { !loading &&
                    <div className="details-container">
                        <div className="main">
                            <img src={ require('../images/hightlight.png') } alt="hightlight" />
                            <div className="head"> { weatherData.daily[highlight].feels_like.day }°C <sup> Feels Like </sup> </div>
                            <div className="location-date">
                                <div className="location"> <GoLocation className='me-1' /> { weatherData.city } </div>
                                <div className="date"> { moment(weatherData.daily[highlight].dt * 1000).format('dddd, MMM D') } </div>
                            </div>
                            <div className="desc"> <AiOutlineAntCloud className = "me-1" /> { weatherData.daily[highlight].weather[0].main } <sub>{ " (" + weatherData.daily[0].weather[0].description + ")" }</sub> </div>
                            <div className="pop"> <BsCloudLightningRain className='me-1' /> { weatherData.daily[highlight].pop }% <sub>(Chances of rain)</sub></div>
                        </div>
                        <div className="info">
                            <div className="col">
                                <h1> UV Index </h1>
                                <img src= { require('../images/uv.png') } alt="uvindex" />
                                <div className="desc"> { weatherData.daily[highlight].uvi }% <div>(Alert to sun protection)</div> </div>

                            </div>
                            <div className="col">
                                <h1> Wind deg & gust <div>(Rotation & sudden increase in speed of wind)</div> </h1>
                                <div className="desc"> <GiWindpump className='me-1' />{ weatherData.daily[highlight].wind_deg }% </div>
                                <div className="desc"> <GiWhirlwind className='me-1' /> { weatherData.daily[highlight].wind_gust } km/h </div>
                            </div>
                            <div className="col">
                                <h1> Moonrise & Moonset <div> (Moonrise & Moonset time) </div> </h1>
                                <div className="desc"> <RiMoonClearFill className='me-1' /> { moment(weatherData.daily[highlight].moonrise * 1000).format('HH:mm A') } </div>
                                <div className="desc"> <RiMoonCloudyFill className='me-1' /> { moment(weatherData.daily[highlight].moonset * 1000).format('HH:mm A') } </div>
                            </div>
                            <div className="col">
                                <h1> Morning temperature </h1>
                                <div className="desc"> <FaTemperatureHigh className='me-1' /> { weatherData.daily[highlight].temp.morn }°C </div>
                            </div>
                            <div className="col">
                                <h1> Evening temperature </h1>
                                <div className="desc"> <FaTemperatureHigh className='me-1' /> { weatherData.daily[highlight].temp.eve }°C </div>
                            </div>
                            <div className="col">
                                <h1> Cloud Percentage </h1>
                                <div className="desc"> <BsFillCloudFog2Fill className='me-1' /> { weatherData.daily[highlight].clouds }% </div>
                            </div>
                        </div>
                    </div>

                    }
                </div>

         </section>
        </div>

        :
        <Navigate to={'/weather-forecast-search'} replace = {true} />
        }
    </Layout>
  )
}

export default WeatherForecast;