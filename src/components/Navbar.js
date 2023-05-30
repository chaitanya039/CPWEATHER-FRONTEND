import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../images/logo1.png";
import { FaSearch, FaNewspaper, FaMapMarkerAlt, FaLanguage, FaSearchengin, FaMapSigns } from "react-icons/fa";
import { WiDayThunderstorm } from "react-icons/wi";
import Tippy from "@tippy.js/react";
import "tippy.js/dist/tippy.css";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT } from "../store/Types/userTypes";
import { WEATHER_API_KEY, WEATHER_API_URL } from "../Apis/OpenWeatherApis";
import { IoEarthSharp } from "react-icons/io5";


const Navbar = ({ openModal, lang }) => {

  const [language, setLanguage] = useState(null);
  const { user } = useSelector(state => state.AuthReducer);
  const dispatch = useDispatch();
  const [weatherForecast, setWeatherForecast] = useState(null);
  const [city, setCity] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const logout = () => {
    localStorage.removeItem("myToken");
    dispatch({ type : LOGOUT });
    console.log("BTN CLICKED");
  }
  
  useEffect( () =>
  {

    const navbar = document.querySelector(".header .header-2 .navbar");
    document.getElementById('menu-btn').onclick = () => {
      navbar.classList.toggle('active');
  }

    const searchForm = document.querySelector('.search-form');

    document.getElementById('search-btn').onclick = () => {
      searchForm.classList.toggle('active');
    }


    document.querySelectorAll(".nav-link").forEach((element) => {
      element.addEventListener('click', () => {
        navbar.classList.remove('active');
      });
    }, []);

    // Setup language.

    switch (lang) {
      case 'en':
        setLanguage("English");
      break;

      case 'hi':
        setLanguage("Hindi");
      break;

      case 'fr':
        setLanguage("French");
      break;

      case 'it':
        setLanguage("Italian");
      break;

      case 'ru':
        setLanguage("Russian");
      break;

      default:
        setLanguage("English");
      break;
    }

  });

  return (
    <div className= "header">

      {/* header 1 starts here */}
      <div className="header-1">
        <Link to="/" className="logo">
            <div className="logo-box">
              <img src={logo} alt="" />
            </div>
              <div className="logo-container">
                <h1 className="site-title">
                  {" "}
                  <span>CP</span>WEATHER
                </h1>
              <small className="site-desc">Your interior Weatherman</small>
            </div>
        </Link>
        <form action="" className="search-form">
          <input
            type="search"
            name="city"
            placeholder="Search here..."
            id="search-box"
          />
        </form>
        <div className="icons">
          <Tippy content = "Current Temperature" placement="bottom">
            <Link to="/current-temperature" className="fas fa-sun" id="temp-btn"></Link>
          </Tippy>
          
          {
            user ?
              <Link to={"/dashboard"}>
                <div className="profile_image_box">
                  <img src={require("../uploads/" + user.profilePicture)} alt="" /> 
                  <div>
                    <div class = "hoverNone">{ user.firstName}</div>
                    <div class = "hoverNone">{ user.lastName}</div>
                  </div>
                </div>
              </Link>
            :
            <Tippy content = "Current Location" placement="bottom">
              <a href={"/current-location"} className = 'fa fa-map-marker' id="location-btn"></a>
            </Tippy>
            
          }
          
          {
            user ?
            <Tippy content = "Logout" placement="bottom">
              <Link to={"#"} onClick={logout} className = 'fa fa-sign-out' id="logout-btn"></Link>
            </Tippy>
            :
            <Tippy content={"Sign up"} placement="bottom">
              <Link className="fas fa-user-plus" id="login-btn" to={"/register-login"}></Link>
            </Tippy>
          }
          
        </div>
      </div>
      {/* header 1 ends here */}




      {/* responsive navbar starts here */}

      <div className="responsive-navbar">
          <i id="menu-btn" className="fas fa-th-list"></i>
          <div className="icons-box">
            <Link to={"#"}><FaLanguage style={{ fontSize: "3rem", color: "white" }} onClick = { () => openModal(true) } /></Link>
            <Tippy content={"Travel Logging"} placement="bottom">
              <Link to={"/travel-log"}><IoEarthSharp style={{ fontSize: "2.4rem", color: "white" }}/></Link>
              </Tippy>
            <Link to={"#"} id="search-btn"><FaSearchengin style={{ fontSize: "2.5rem", color: "white" }} /></Link>
          </div>
      </div>

      {/* responsive navbar ends here */}

      {/* header 2 starts here */}
      <div className="header-2">

        <nav class="navbar">
          <ul>
            <li>
              <Link to="/" className = "nav-link">
                <i className="fas fa-home"></i>
                home
                </Link>
            </li>
            <li>
              <Link to="/news" className = "nav-link">
              <i className="fas fa-newspaper"></i>
                news
                </Link>
            </li>

            {/* <!-- here we have our dropdown menu --> */}
            <li>
              <Link to="#">
              <i className="fas fa-list"></i>
                features
                <i className="fa fa-angle-down dropdown"></i>{" "}
              </Link>
              <ul>
                <li>
                  <Link to="/current-temperature" className = "nav-link">temperature of city</Link>
                </li>
                <li>
                  <a href="/current-location" className = "nav-link">current location</a>
                </li>
                <li>
                  <Link to="#" className = "nav-link">Weather history</Link>
                </li>
                <li>
                  <Link to="/map" className = "nav-link"> <span style={{
                    color: "red",
                    textTransform: "uppercase",
                    fontWeight: "700"
                  }}>CP</span>weather map</Link>
                </li>
              </ul>
            </li>

            {/* <!-- here we also have another drop down menu --> */}
            <li>
              <Link to="#">
              <i className="fas fa-cloud"></i>
                forecast
                <i className="fa fa-angle-down dropdown"></i>
              </Link>
              <ul>
                <li>
                  <Link to="/weather-forecast-search" className = "nav-link">Weather forecast</Link>
                </li>
                <li>
                  <Link to="/air-pollution" className = "nav-link">Air pollution</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="#">
              <i className="fas fa-plane"></i>
                travel
                <i className="fa fa-angle-down dropdown"></i>
              </Link>
              <ul>
                <li>
                  <Link to="#" className = "nav-link">travel advisor</Link>
                </li>
                <li>
                  <Link to="/travel-log" className = "nav-link">travel log</Link>
                </li>
              </ul>
            </li>
            {
              user ?
              <li>
                <Link to="#">
                <i className="fas fa-blog"></i>
                  blogs
                  <i className="fa fa-angle-down dropdown"></i>
                </Link>
                  <ul>
                   <li>
                      <Link to="/create" className = "nav-link">Create Post</Link>
                    </li>
                    <li>
                      <Link to="#" className = "nav-link">{user.firstName + " " + user.lastName}</Link>
                    </li>
                    <li>
                      <Link to="#" className = "nav-link" onClick={logout}>logout</Link>
                    </li>
                  </ul>
            </li>
            :
            <li>
              <Link to="#">
              <i className="fas fa-blog"></i>
                blogs
              </Link>
            </li>
            }
            <li>
              <Link to="#" className = "nav-link">
              <i className="fas fa-address-book"></i>
                contact
                </Link>
            </li>
            <li>
              <Link to="#" className = "nav-link">
              <i className="fa fa-id-card-o"></i>
                about me
                </Link>
            </li>
            <li>
              <Link to="#" className = "nav-link" onClick = { () => openModal(true) } >
              <i className="fas fa-language"></i>
                { language }
                </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
