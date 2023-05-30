// eslint-disable-next-line import/no-webpack-loader-syntax
import mapboxgl from "!mapbox-gl";

import React, { useEffect } from "react";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL } from "../Apis/MapboxApis";
//import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';


export const WeatherMap = ({ setProgress }) =>
{
    useEffect(() => {

        getRoute();

    }, []);


    const getRoute = () =>
    {
        mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;
        const map = new mapboxgl.Map({
            container: 'map',
            style: MAPBOX_STYLE_URL,
            center: [78.96288, 20.593684],
            zoom: 1.25
        });

        map.addControl(
            // eslint-disable-next-line no-undef 
            new MapboxDirections({
                accessToken: MAPBOX_ACCESS_TOKEN
            }),
            'top-left'
        );

        // Add zoom and rotation controls to the map.
        map.addControl(new mapboxgl.NavigationControl());

    }
    return(
        <div>
            <div id="map" style={{ width : '100vw', height : "595px" }}>
                <div className="street">Street</div>
                <div className="satellite">Satellite</div>
            </div>
        </div>
    )
}