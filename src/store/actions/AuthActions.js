import axios from 'axios';
import { SET_LOADER, SET_TOKEN, CLOSE_LOADER, REGISTER_ERRORS, LOGIN_ERRORS } from '../Types/userTypes';

export const registerAction =  (user) =>
{
    return async (dispatch) => {
        const config = {
            header : {
              'Content-Type' : "application/json"
            }
          }

          // Dispatch the action over here.
          dispatch({ type : SET_LOADER });

          try {
            const { data }  = await axios.post('/register', user, config);
            dispatch({ type : CLOSE_LOADER });
            localStorage.setItem('myToken', data.token);
            dispatch({ type : SET_TOKEN, payload : data.token });
          }
          catch(error) {
            dispatch({ type : CLOSE_LOADER });
            dispatch({
              type : REGISTER_ERRORS,
              payload : error.response.data.errors
            });
          }
    }
}

export const loginAction = (user) =>
{
    return async (dispatch) => {
        const config = {
          headers : {
            "Content-Type" :'application/json'
          }
        }

        dispatch({ type : SET_LOADER });

        try {
          const { data } = await axios.post("/login", user, config);
          dispatch({ type : CLOSE_LOADER });
          localStorage.setItem("myToken", data.token);
          dispatch({ type : SET_TOKEN, payload : data.token });
        }
        catch(error) {
          dispatch({ type : CLOSE_LOADER });
          dispatch({
            type : LOGIN_ERRORS,
            payload : error.response.data.errors
          });
        }
    }
}