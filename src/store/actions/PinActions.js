import axios from "axios";
import { CLOSE_LOADER, CREATE_ERRORS, GET_ERRORS, REMOVE_ERRORS, REMOVE_GET_ERRORS, SET_CREATE_PIN_MESSAGE, SET_GET_PIN_MESSAGE, SET_LOADER, SET_PINS } from "../Types/pinTypes";

export const createPin = (pinData) =>
{
    return async (dispatch, getState) => {
        const { AuthReducer : { token } } = getState();
        // Now, here our code going to be executed.
        dispatch({ type : SET_LOADER });
        try
        {
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
            
            const { data, data : { msg } } = await axios.post("/pins", pinData, config);
            console.log(data);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : REMOVE_ERRORS });
            dispatch({ type : SET_CREATE_PIN_MESSAGE, payload : msg });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            console.log(errors);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : CREATE_ERRORS, payload : errors });
            dispatch({ type : SET_CREATE_PIN_MESSAGE, payload : "" });
        }
    }
}

export const getPins = () =>
{
    return async (dispatch, getState) => {
        const { AuthReducer : { token } } = getState();
        // Now, here our code going to be executed.
        dispatch({ type : SET_LOADER });
        try
        {
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
            
            const { data : {msg, pins}  } = await axios.get("/pins", config);
            dispatch({ type : SET_PINS, payload : pins});
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : REMOVE_GET_ERRORS });
            dispatch({ type : SET_GET_PIN_MESSAGE, payload : msg });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            console.log(errors);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : GET_ERRORS, payload : errors })
            dispatch({ type : SET_GET_PIN_MESSAGE, payload : "" });
        }
    }
}