// import React from 'react'

import { useEffect, useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import Layout from "../components/Layout";
import { NEWS_API_URL, NEWS_API_KEY } from "../Apis/NewsApis";
import { BeatLoader } from "react-spinners";
import { Helmet } from "react-helmet";


export const News = ({ onSearchChange, lang }) =>
{
    // Define state variables

    const [search, setSearch] = useState(null);
    // const [countrySearch, setCountrySearch] = useState(null);
    const [finalData, setFinalData] = useState(null);
    const [loading, setLoading] = useState(false);

    // Create Object contain Options key as Array of objects.

    const CategoryData =
    {
        options :
        [
            {
                value : "sports",
                label : "Sports"
            },
            {
                value : "business",
                label : "Business"
            },
            {
                value : "health",
                label : "Health"
            },
            {
                value : "entertainment",
                label : "Entertainment"
            },
            {
                value : "science",
                label : "Science"
            },
            {
                value : "general",
                label : "General"
            },
            {
                value : "technology",
                label : "Technology"
            }
        ]
    }

    // const CountryData =
    // {
    //     options :
    //     [
    //         {
    //             value : "in",
    //             label : "India"
    //         },
    //         {
    //             value : "au",
    //             label : "Australia"
    //         },
    //         {
    //             value : "hk",
    //             label : "Hong Kong"
    //         },
    //         {
    //             value : "ar",
    //             label : "Argentina"
    //         },
    //         {
    //             value : "za",
    //             label : "South Africa"
    //         },
    //         {
    //             value : "nz",
    //             label : "New Zealand"
    //         },
    //         {
    //             value : "ca",
    //             label : "Canada"
    //         },
    //         {
    //             value : "br",
    //             label : "Brazil"
    //         },
    //         {
    //             value : "de",
    //             label : "Germany"
    //         },
    //         {
    //             value : "cn",
    //             label : "China"
    //         }
    //     ]
    // }

    // Define some functions

    const handleOnChange = (searchData) =>
    {
        setSearch(searchData);
        onSearchChange(searchData);
    }

    // const handleOnCountryChange = (searchData) =>
    // {
    //     setCountrySearch(searchData);
    // }

    const loadOptions =  (inputValue) =>
    {
        return CategoryData;
    }

    // const loadOptionsForCountry = () =>
    // {
    //     return CountryData;
    // }

    // Custom styling to AsyncPaginate Component | Object of callback functions

    const customStyle =
    {
        container : (provided) =>
        (
            {
            ...provided,
            width : "100%",
            margin : "4rem 2rem 2rem 2rem",
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

    useEffect(() =>
    {
        if(search)
        {
            setLoading(true);
            setFinalData(null);
            fetch(`${NEWS_API_URL}?q=${search.value}&pageSize=48&sortBy=publishedAt&language=${lang}&apiKey=${NEWS_API_KEY}`)
            .then(res => res.json())
            .then(jsonData => { setFinalData(jsonData); setLoading(false); console.log(jsonData); })
        }
    }, [search, lang])

  return (
    <Layout>
        <Helmet>
            <title>Realtime News</title>
            <meta name="description" content="Realtime news with cpweather" />
        </Helmet>
        <div className="news-container">
            <section className="primary-section">
                <div className="content">
                    <h1 className="primary-heading">
                        <span><i className="fas fa-newspaper me-3"></i>LATE</span>st News
                    </h1>
                    <p className="description">
                        Get latest news on your phone with top headings...
                    </p>
                </div>
            </section>
            <section className="search-bar-container">
                <AsyncPaginate
                    placeholder = "Select your category"
                    debounceTimeout={600}
                    value = {search}
                    onChange = {handleOnChange}
                    styles = {customStyle}
                    loadOptions = {loadOptions}
                />
            </section>
            <div className="temp-body-section">
                <div className="head">
                    <p className="desc">Top Headlines</p>
                    <h1 className='main'> <img src={ require("../images/live-news.png") } alt="" /> <div>Live News</div> </h1>
                </div>
            </div>
            {
                loading &&

                <div align = "center">
                    <BeatLoader color="#7b009d" loading = {loading} size={12.5} cssOverride={{ margin: "2rem auto 5rem auto" }} />
                </div>
            }
            <section className="news-box-container">

                {
                    // const published = element.publishedAt.split("T", 2);
                    // const time = published[1].slice(0,-1);
                    finalData && finalData.articles.map((element, index) =>{
                    const published = element.publishedAt.split("T", 2);
                    const time = published[1].slice(0,-1);

                    return   (  <div className="box">
                        <div className="image">
                            <img src={ element.urlToImage ? element.urlToImage : require('../images/alter-news.jpg') } alt="News are heres" />
                        </div>
                        <div className="content">
                            <div className="first">
                                <div className="news-author"> { element.source.name } </div>
                                <div className="time"> { time } </div>
                                <div className="date"> { published[0] } </div>
                            </div>
                            <div className="title"> { element.title } </div>
                            <div className="second">
                                <a href={ element.url } target = "_blank" className="read-more primary-btn"> Read more </a>
                            </div>
                        </div>
                        </div>)

                })
                }
            </section>
        </div>
    </Layout>
  )
}
