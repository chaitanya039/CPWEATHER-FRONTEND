import './App.css';
import "./main.scss";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './container/HomePage';
import RegisterLogin from './container/RegisterLogin';

import 'swiper/scss';
import 'swiper/scss/navigation';
import 'swiper/scss/pagination';
import "react-toastify/dist/ReactToastify.css";
import { Temperature } from './container/Temperature';
import { Location } from './container/Location';
import { WeatherMap } from './container/WeatherMap';
import { useEffect, useState } from 'react';
import Modal from './components/Modal';
import Navbar from './components/Navbar';
import WeatherForecast from './container/WeatherForecast';
import WeatherForecastSearch from './container/WeatherForecastSearch';
import WeatherGallery from './container/WeatherGallery';
import ScrollToTop from './components/ScrollToTop.js';
import AirPollution from './container/AirPollution';
import StateSearch from './components/StateSearch';
import { ClimbingBoxLoader } from 'react-spinners';
import { News } from './container/News';
import Store from './store/index.js';
import { Provider } from 'react-redux';
import Dashboard from './container/Dashboard';
import PrivateRoute from './private/PrivateRoute';
import NotFound from './container/NotFound';
import CreatePost from './container/CreatePost';
import EditPost from './container/EditPost';
import EditImage from './container/EditImage';
import UpdateName from './container/UpdateName';
import UpdatePassword from './container/UpdatePassword';
import TravelLog from './container/TravelLog';

// https://preview.themeforest.net/item/citybook-directory-listing-wordpress-theme/full_screen_preview/21694727

// background-image: linear-gradient(to left top, #e7e7e7, #e0e4f1, #d0e4fb, #b6e6ff, #97e9ff);

// https://api.unsplash.com/search/photos?query=computer&client_id=S4g2XgVyKGJ9eQ1GRU5sHb4bsBUrk3Gp_feeTowhWX0
// https://dataservice.accuweather.com/locations/v1/adminareas/in?apikey=kLEuedwDFjaE6J3WKD67IWlo1sGRGAZI&language=mr

function App()
{

  // Create state variable

  const [modal, openModal] = useState(false);
  const [lang, setLang] = useState(`en`);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);


  return (
      
      <div>
      { modal ? <Modal openModal = { openModal } setLang = { setLang } lang = { lang } /> : null }
        <Provider store = { Store }>
          <Router>
            <Navbar openModal={ openModal } lang = { lang } />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<HomePage lang = { lang }  />} />
              <Route path="/travel-log" element={<TravelLog  />} />
              <Route path="/register-login" element={<RegisterLogin  />} />
              <Route path="/current-temperature" element={<Temperature  lang = { lang } />} />
              <Route path="/current-location" element={<Location  />} />
              <Route path="/map" element={<WeatherMap  />} />
              <Route path="/weather-forecast" element={<WeatherForecast  />} />
              <Route path="/weather-forecast-search" element={<WeatherForecastSearch  lang = { lang } />} />
              <Route path="/weather-gallery" element={<WeatherGallery  />} />
              <Route path="/air-pollution" element={<AirPollution lang = { lang } />} />
              <Route path="/news" element={ <News lang = { lang } /> } />
              <Route path="/top-city-search" element={<StateSearch  lang = { lang } />} />
              <Route path="/updateName" element={<PrivateRoute Component = { UpdateName }  />} />
              <Route path="/updatePassword" element={<PrivateRoute Component = { UpdatePassword }  />} />
              <Route path="/dashboard/:page" element={<PrivateRoute Component = { Dashboard }  />} />
              <Route path="/dashboard" element={<PrivateRoute Component = { Dashboard }  />} />
                { /* Calling like a function to check user logged in or not */}
              <Route path="/create" element={<PrivateRoute Component={ CreatePost } />} />
              <Route path="/edit/:id" element={<PrivateRoute Component={ EditPost } />} />
              <Route path="/updateImage/:id" element={<PrivateRoute Component={ EditImage } />} />
              <Route path='*' exact = {true} element = { <NotFound /> } />
            </Routes>
          </Router>
        </Provider>
      </div>

  );
}

export default App;