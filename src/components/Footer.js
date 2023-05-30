import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/logo1.png";


export const Footer = () => {

  return (
    <>
        <div className="section-heading" style={{ paddingTop : "5rem" }}>
                <div className="desc">Special thanks..</div>
                <div className="main-heading">Data Support</div>
                <div className="heading-line"></div>
        </div>
    <section className="support__container">
        <div className="support__container__item">
            <img src={require("../images/open-weather.png")} alt="" />
        </div>
        <div className="support__container__item">
            <img src={require("../images/map-box.png")} alt="" />
        </div>
        <div className="support__container__item">
            <img src={require("../images/open-ai.png")} alt="" />
        </div>
        <div className="support__container__item">
            <img src={require("../images/news-api.png")} alt="" />
        </div>
        <div className="support__container__item">
            <img src={require("../images/alan-ai.png")} alt="" />
        </div>
    </section>
    <div className='footer'>
        <div className="row">
            <div className="col">
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
                <div className="dev-photo">
                    <img src={require("../images/mypic.jpg")} alt="brand-pic" />
                </div>
                <div className="desc">
                    <i class="fas fa-laptop-code"></i>&nbsp;&nbsp;Designed & Developed by Chaitanya Pansare...
                </div>
                <div className="brand-logo">
                    <img src={require('../images/brand-logo.png')} alt="brand-logo" />
                </div>
            </div>
            <div className="col">
                <h3>Office <div className="underline"><span></span></div> </h3>
                <address>
                <i class="fas fa-truck me-1"></i> Visit :
                    Chaitanya Softwares,
                    Shivajanmbhumi Junnar,
                    Pune - 410502 MH-14 Maharastra
                </address>
                <div className='email'>
                    chaitanyapansare039@gmail.com
                </div>
                <div className="phone">
                    +91 - 9075843674
                </div>
            </div>
            <div className="col">
                <h3>Links <div className="underline"><span></span></div> </h3>
                <Link to={"/"}>Home <i class="fas fa-arrow-right ms-1"></i> </Link>
                <Link to={"/news"}>News <i class="fas fa-arrow-right ms-1"></i> </Link>
                <Link to={"/travel-log"}>Travel Logging <i class="fas fa-arrow-right ms-1"></i> </Link>
                <Link to={"/current-temperature"}>Temperature <i class="fas fa-arrow-right ms-1"></i> </Link>
                <Link to={""}>Contact <i class="fas fa-arrow-right ms-1"></i> </Link>
                <Link to={""}>About <i class="fas fa-arrow-right ms-1"></i> </Link>
            </div>
            <div className="col">
                <h3>Newsletter <div className="underline"><span></span></div> </h3>
                <form action="">
                    <i class="fas fa-envelope"></i>
                    <input type="email" placeholder='Enter your email' required />
                    <button type="submit"><i class="fas fa-arrow-right"></i></button>
                </form>
                <div className="social-icons">
                    <a href = {"https://www.facebook.com/chaitanya.pansare.965/"}  target="_blank" className='fa fa-facebook-square'></a>
                    <a href = {"https://www.instagram.com/chaitanya_pansare/"}  target="_blank" className='fa fa-instagram'></a>
                    <a href = {"https://www.linkedin.com/in/chaitanya-pansare-74ab40211/"}  target="_blank" className='fa fa-linkedin'></a>
                    <a href = {"https://github.com/chaitanya039"}  target="_blank" className='fa fa-github'></a>
                </div>
            </div>
        </div>
        <div className="copyright">Copyright © www.cpweather.com | All rights are reserved!</div>
    </div>
    </>
  )
}
