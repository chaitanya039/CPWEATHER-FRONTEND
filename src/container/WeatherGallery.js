import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { IMAGE_API_URL, IMAGE_API_KEY } from '../Apis/UnsplashApis';
import { IoMdImages } from 'react-icons/io';
import Pagination from '../components/Pagination';
import { BeatLoader } from 'react-spinners';

const WeatherGallery = () => 
{
    const [imageData, setImageData] = useState([]);
    const [loading, setLoading] = useState(false);

    const getImages =  async (posts = [1, 2]) =>
    {
        // Set Loading true.
        setLoading(true);

        const res1 = await fetch(`${IMAGE_API_URL}?query=weather&page=${posts[0]}&per_page=50&client_id=${IMAGE_API_KEY}&orientation=landscape`)
        const data1 = await res1.json();

        const res2 = await fetch(`${IMAGE_API_URL}?query=weather&page=${posts[1]}&per_page=50&client_id=${IMAGE_API_KEY}&orientation=landscape`)
        const data2 = await res2.json();

        const data = 
        [
            ...data1.results.map((image) => {
                return {
                    url : image.urls.small,
                    desc : image.alt_description,
                    hd : image.urls.raw
                }
            }),
            ...data2.results.map((image) => {
                return {
                    url : image.urls.small,
                    desc : image.alt_description,
                    hd : image.urls.raw
                }
            })
        ]

        console.log(data);
        setImageData(data);

       setTimeout(() => {
        setLoading(false);
       }, 0);  
                     
    }

    useEffect(() => {
       
        getImages();
        
    }, [])

  return (
    <Layout>
        <div className="gallery">
            <section className="primary-section">
                <div className="content">
                    <h1 className="primary-heading">
                        <span><i className="fa fa-envira me-2"></i>WEAT</span>her gallery
                    </h1>
                    <p className="description">
                        Explore the best and delightful images of weather & let's enjoy it a lot...
                    </p>
                </div>
            </section>
        </div>

        <div className="section-heading">
            <div className="desc">Explore the</div>
            <div className="main-heading"> <IoMdImages className='me-1' /> Weather in Pictures</div>
            <div className="heading-line"></div>
        </div>

        <div className="pagination">
            <Pagination paginate={getImages}/>
        </div> 

        <div align = "center">
            <BeatLoader color="#302831" loading = {loading} size={12.5} cssOverride={{ margin: "2rem auto 5rem auto" }} />
        </div>
        
        {
            (imageData !== [] && !loading ) ?

            <section className="gallery-section">
                {
                    imageData.map((element, index) => (
                        <a href={ `${element.hd}` } target = "blank" className="box" key={index}>
                            <img src={ element.url } alt="" />
                            <div className="desc">{ element.desc }</div>
                        </a>
                    ))
                }
            </section>

            : null
        }
    </Layout>
  )
}

export default WeatherGallery;