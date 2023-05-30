// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl, { AttributionControl, GeolocateControl, ScaleControl } from '!mapbox-gl';
import { FullscreenControl } from 'mapbox-gl';
import React, { useEffect, useState } from 'react';
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL2 } from '../Apis/MapboxApis';

export const Location = () => 
{
    
    useEffect(() => {
      if(navigator.geolocation)
      {
          navigator.geolocation.getCurrentPosition((position) =>
          {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            // Rendering the map when response is generated using mapbox-gl library and loading became false.

              mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
                      
              var map = new mapboxgl.Map({
                  container: 'map',
                  style: MAPBOX_STYLE_URL2,
                  center: [78.96288, 20.593684],
                  zoom: 1.25
              });
              

              map.addControl(new FullscreenControl());
              map.addControl(new GeolocateControl());
              map.addControl(new AttributionControl({ compact : true, customAttribution : "CPWEATHERMAP" }), 'top-left');
              map.addControl(new ScaleControl());          
                map.on('load', () => {
                new mapboxgl.Marker({
                    color : 'purple'
                  }).setLngLat([lon, lat]).addTo(map);

                  map.flyTo({
                      center : [lon, lat],
                      zoom : 12,  // zooming level
                      bearing : 120,  // rotate
                      pitch: 70,   // tilt
                      duration: 2000,  // duration of animation
                      speed: 3,  // speed of animation
                      curve: 1,  
                      easing: function (t) { return t; },
                      essential: true
                  });
                });
          }, showError);
          
      }
      else
      {
        console.log("Geolocation is not supported by your browser & it does not contain any sensor to track your location !");
      }
    }, []);
    
    const showError = (positionError) =>
    {
        console.log(positionError);
        alert("Give permission to access your location !!");
    }

  return (
        <div id='map' style={{ width: '100vw', height: '83vh' }}>
        </div> 
  )
}
