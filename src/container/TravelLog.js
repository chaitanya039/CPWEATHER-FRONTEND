import React, { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl, Popup } from "react-map-gl";
import { MAPBOX_ACCESS_TOKEN, MAPBOX_STYLE_URL2 } from '../Apis/MapboxApis';
import { useDispatch, useSelector } from 'react-redux';
import { getPins } from '../store/actions/PinActions';
import {  IoStar, IoStarOutline } from "react-icons/io5";
import moment from 'moment';
import { createPin } from '../store/actions/PinActions';
import { REMOVE_ERRORS, REMOVE_GET_ERRORS, REMOVE_MESSAGE } from '../store/Types/pinTypes';
import { FaMapMarkerAlt } from 'react-icons/fa';
import toast, { Toaster } from 'react-hot-toast';

const TravelLog = () => {
  
  const dispatch = useDispatch();
  const { user : {_id, firstName, lastName} } = useSelector(state => state.AuthReducer);
  const [viewport, setViewport] = useState({ latitude : 20.5937, longitude : 78.9629, zoom : 1 });
  const [currentPlaceId, setCurrentPlaceId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [pinDetails, setPinDetails] = useState({ title : "", description : "", ratings : 1 });
  
  // Getting State from Redux Store
  const {pins, getErrors} = useSelector(state => state.GetPinReducer);
  const {createErrors, message} = useSelector(state => state.PostPinReducer);
  
  useEffect(() => {
    dispatch(getPins());
  }, [newPlace]);
  
  const handleMarkerClicked = (id, lat, lon) =>
  {
    setCurrentPlaceId(id);
    console.log(lat, lon);
  }
  
  const handleAddClick = (e) => {
    console.log(e);
    let lat = e.lngLat.lat;
    let lon = e.lngLat.lng;
    setNewPlace({ lat, lon });
  }
  
  const handlePinDetails = (e) =>
  {
    setPinDetails({
      ...pinDetails,
      [e.target.name] : e.target.value
    });
  }
  
  const handlePinSubmit = (e) => {
    e.preventDefault();
    console.log("Clicked !");
    const newPin = {
      user : { _id, firstName, lastName },
      title : pinDetails.title,
      description : pinDetails.description,
      ratings : parseInt(pinDetails.ratings),
      lat : newPlace.lat,
      lon : newPlace.lon
    }
    console.log(newPin);
    if(!_id)
    {
      userNotLoggedIn();
    }
    else
    {
      dispatch(createPin(newPin));
      setNewPlace(null);
      setPinDetails({ title : "", description : "", ratings : 1 });
    }
  }
  
  const userNotLoggedIn = () => {
    toast.error("Login to account to set pins !")
  }
  
  useEffect(() => {
    if(createErrors.length > 0)
    {
      toast.error(createErrors[0].msg);
      dispatch({ type : REMOVE_ERRORS });
    }
    
    
  }, [createErrors]);
  
  useEffect(() => {
    if(message !== "")
    {
      toast.success(message);
      dispatch({ type : REMOVE_MESSAGE });
    }
  }, [message]);
  
  useEffect(() => {
    if(getErrors.length > 0)
    {
      toast.error(getErrors[0].msg);
      dispatch({ type : REMOVE_GET_ERRORS });
    }
  }, [getErrors]);
  
  useEffect(() => {
    setTimeout(() => {
      if(_id)
      {
        toast('Double tap to add new pins & orange markers is yours pins, others pins are blue !', {
          icon: '🔔',
        });
      }
    }, 600)
  }, []);
  
  return (
    <Map
        initialViewState={viewport}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        style={{ width : "100vw", height : "83vh" }}
        mapStyle={MAPBOX_STYLE_URL2}
        container = {"map"}
        projection={'globe'}
        onDblClick={handleAddClick}
        doubleClickZoom = {false}
    >
        <Toaster
            position='top-center'
            reverseOrder = "false"
            toastOptions={{
              style: {
                fontSize : "1.25rem",
                fontWeight : "700"
              },
            }}
          />
        
        <NavigationControl />
        
        { 
          pins.map((pin, index) => (
            <>
              <Marker
                key={index}
                latitude={pin.lat}
                longitude={pin.lon}
                anchor='center'
                onClick={() => { handleMarkerClicked(pin._id, pin.lat, pin.lon) }}
              >
                <FaMapMarkerAlt 
                  className='icon'
                  style={{ fontSize : '2.75rem', color : _id === pin.user._id ? "tomato" : 'slateblue', fontWeight : 900 }} />
              </Marker>
              {
                pin._id === currentPlaceId &&
                (
                  <Popup
                    latitude={pin.lat}
                    longitude={pin.lon}
                    closeOnClick = {false}
                    closeOnMove = {false}
                    anchor='left'
                  >
                    
                    <div className="marker-card">
                      <div className="title-desc">
                        <div className="title">Place</div>
                        <div className="desc"><i class="fa fa-globe me-2"></i>{pin.title}</div>
                      </div>
                      <div className="title-desc">
                        <div className="title">Description</div>
                        <div className="desc">{pin.description}</div>
                      </div>
                      <div className="title-desc">
                        <div className="title">Ratings</div>
                        <div className="desc">{
                          Array(pin.ratings).fill(<IoStar className='star' />).length < 5 ? 
                          Array(pin.ratings).fill(<IoStar className='star' />).concat(Array(5 - pin.ratings).fill(<IoStarOutline className='star' />)) :
                          Array(pin.ratings).fill(<IoStar className='star' />)
                          }</div>
                      </div>
                      <div className="title-desc">
                        <div className="title">Information</div>
                        <div className="desc">
                          <div>	<i class="fa fa-user-circle me-1"></i>{pin.user.firstName + ' ' + pin.user.lastName}</div>
                          <div>{moment(pin.updatedAt).fromNow()}</div>
                        </div>
                      </div>
                    </div>
                    
                  </Popup>
                )
              }
              {
                newPlace !== null &&
                <Popup
                  latitude={newPlace.lat}
                  longitude={newPlace.lon}
                  closeOnClick = {false}
                  closeOnMove = {false}
                  anchor='left'
                  onClose = {() => setNewPlace(null)}
                >
                
                <form action="" className="add-pin-form" onSubmit={handlePinSubmit}>
                  <div className="label-input">
                    <label htmlFor="title">Title</label>
                    <input value={pinDetails.title} onChange={handlePinDetails} placeholder='Enter name of place...' type="text" id='title' name='title'/>
                  </div>
                  <div className="label-input">
                    <label htmlFor="desc">Review</label>
                    <textarea value={pinDetails.description} onChange={handlePinDetails} placeholder='Enter your review...' rows={3.5} id='desc' name='description'/>
                  </div>
                  <div className="label-input">
                    <label htmlFor="ratings">Ratings</label>
                    <select value={pinDetails.ratings} onChange={handlePinDetails} id='ratings' name='ratings'>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  </div>
                  <div className="label-input">
                    <input type="submit" value={"Add Pin"} id='submit' name='submit'/>
                  </div>
                </form>
                  
                </Popup>
              }
            </>
          ))
        }
        
    </Map>
  )
}

export default TravelLog