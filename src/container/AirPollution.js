import React, { useEffect, useState } from 'react';
import CircleLoader from 'react-spinners/CircleLoader';
import Layout from '../components/Layout';
import Search from '../components/Search';
import { BiHealth } from 'react-icons/bi';
import { WEATHER_API_URL, WEATHER_API_KEY } from '../Apis/OpenWeatherApis';

const AirPollution = ({ lang }) => 
{
  const [ pollutionData, setPollutionData ] = useState(null);
  const [loading, setLoading] = useState(false);
  const [airStatus, setAirStatus] = useState("");

  const handleOnSearchChange = async (searchData) => 
  {

    console.log(searchData);
    setLoading(true);
    const [lat, lon] = searchData.value.split(' ');
    const city = searchData.label.split(",")[0] + " , " + searchData.label.split(",")[1];

    const response = await fetch(`${WEATHER_API_URL}/air_pollution?units=metric&lang=${lang}&lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`);
    const currentData = await response.json();
    
   let airQuality = currentData.list[0].main.aqi;

   switch (airQuality) 
    {
        case 1:
            airQuality = "Good";
            setAirStatus("good");
            break;

        case 2:
            airQuality = "Fair";
            setAirStatus("fair");
            break;

        case 3:
            airQuality = "Moderate";
            setAirStatus('moderate');
            break;

        case 4:
            airQuality = "Poor";
            setAirStatus("poor");
            break;

        case 5:
            airQuality = "Very Poor";
            setAirStatus('verypoor');
            break;

        default:
            airQuality = "Fine";
            setAirStatus("moderate");
            break;
    }
    
    const pollutants = currentData.list[0].components;

    setPollutionData({pollutants, airQuality, city});
    setLoading(false);

  }

  useEffect(() => {
    console.log(pollutionData);
  }, [ pollutionData ]);

  return (
    <Layout>
        
      <div className="air-pollution-section">

            {/* Let's Create Some Heading with dark background */}

            <section className="primary-section">
                <div className="content">
                    <h1 className="primary-heading">
                        <span><i className="fa fa-mixcloud me-3"></i>Air</span> pollution
                    </h1>
                    <p className="description">
                        Check the quality of air for your city now & their predictions !!
                    </p>
                </div>
            </section>

            <div className="temp-body-section">
                <div className="head">
                    <p className="desc">Air Pollution of City</p>
                    <h1 className='main'>Search Here</h1>
                </div>
                {/* When we pass the function as prop then it becomes callback function means function act as a argument to another function */} 
                <Search onSearchChange={handleOnSearchChange} lang = { lang } />

                
            {       
                (pollutionData !== null && loading === false)
                ?
            <div>
                <table>

                <thead>
                    <tr>
                        <th>Sr No.</th>
                        <th>Pollutants</th>
                        <th>Quantity of pollutants</th>
                    </tr>
                </thead>

                <tbody>

                        <tr>
                            <td data-label = "Sr No." >1</td>
                            <td data-label = "Pollutants">Carbon Monoxide</td>
                            <td data-label = "Qty of pollutants" >{ pollutionData.pollutants.co + " μg/m" }<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td data-label = "Sr No." >2</td>
                            <td data-label = "Pollutants">Ammonia</td>
                            <td data-label = "Qty of pollutants" >{ pollutionData.pollutants.nh3 + " μg/m" }<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td data-label = "Sr No." >3</td>
                            <td data-label = "Pollutants">Nitrogen Monoxide</td>
                            <td data-label = "Qty of pollutants" >{ pollutionData.pollutants.no + " μg/m" }<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td data-label = "Sr No." >4</td>
                            <td data-label = "Pollutants">Nitrogen dioxide</td>
                            <td data-label = "Qty of pollutants" >{ pollutionData.pollutants.no2 + " μg/m" }<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td data-label = "Sr No." >5</td>
                            <td data-label = "Pollutants">Ozone</td>
                            <td data-label = "Qty of pollutants" >{ pollutionData.pollutants.o3 + " μg/m" }<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td data-label = "Sr No." >6</td>
                            <td data-label = "Pollutants">Particulates PM <sub>2.5</sub></td>
                            <td data-label = "Qty of pollutants" >{ pollutionData.pollutants.pm2_5 + " μg/m" }<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td data-label = "Sr No." >7</td>
                            <td data-label = "Pollutants">Particulates PM <sub>10</sub></td>
                            <td data-label = "Qty of pollutants" >{ pollutionData.pollutants.pm10 + " μg/m" }<sup>3</sup></td>
                        </tr>
                        <tr>
                            <td data-label = "Sr No." >8</td>
                            <td data-label = "Pollutants">Sulphur dioxide</td>
                            <td data-label = "Qty of pollutants" >{ pollutionData.pollutants.so2 + " μg/m" }<sup>3</sup></td>
                        </tr>
                    
                </tbody>

            </table>
            <div className="note">
                <marquee behavior="sliding" direction="left" scrollamount = "12" hspace = "30%" className = {airStatus} > <i class="fas fa-flag me-1"></i> Air Quality of&nbsp;&nbsp;'{ pollutionData.city }' is { pollutionData.airQuality }</marquee>
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
      </div>

    </Layout>
  )
}

export default AirPollution;