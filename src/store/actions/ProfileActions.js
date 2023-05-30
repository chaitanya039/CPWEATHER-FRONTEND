import axios from "axios";
import { CLOSE_LOADER, REDIRECT_TRUE, SET_LOADER, SET_MESSAGE } from "../Types/postTypes";
import { RESET_UPDATE_NAME_ERRORS, RESET_UPDATE_PASSWORD_ERRORS, RESET_UPDATE_PICTURE_ERRORS, SET_UPDATE_NAME_ERRORS, SET_UPDATE_PASSWORD_ERRORS, SET_UPDATE_PICTURE_ERRORS } from "../Types/profiletypes";
import { SET_TOKEN } from "../Types/userTypes";

export const updateNameAction = (updateData) =>
{
    return async (dispatch, getState) => 
    {
        const { AuthReducer : { token } } = getState();
        dispatch({ type : SET_LOADER });
        
        try
        {
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
            
            const { data } = await axios.post("/updateName", updateData, config);
            localStorage.setItem("myToken", data.token);
            dispatch({ type : SET_TOKEN, payload : data.token });
            dispatch({ type : SET_MESSAGE, payload : data.msg });
            dispatch({ type : CLOSE_LOADER }); 
            dispatch({ type : RESET_UPDATE_NAME_ERRORS });
            dispatch({ type : REDIRECT_TRUE });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            console.log(errors);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : SET_UPDATE_NAME_ERRORS, payload : errors });
        }
    }
}

export const updatePasswordAction = (updateData) =>
{
    return async (dispatch, getState) =>
    {
        const { AuthReducer : { token } } = getState();
        dispatch({ type : SET_LOADER });
        
        try
        {
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
            
            const { data } = await axios.post("/updatePassword", updateData, config);
            dispatch({ type : SET_MESSAGE, payload : data.msg });
            dispatch({ type : CLOSE_LOADER }); 
            dispatch({ type : RESET_UPDATE_PASSWORD_ERRORS });
            dispatch({ type : REDIRECT_TRUE });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            console.log(errors);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : SET_UPDATE_PASSWORD_ERRORS, payload : errors });
        }
    }
}

export const updateProfilePicture = (imageData) =>
{
    return async (dispatch, getState) => 
    {
        const { AuthReducer : { token } } = getState();
        dispatch({ type : SET_LOADER });
        
        try
        {
            const config = {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            }
            
            const { data } = await axios.post("/updateProfilePicture", imageData, config);
            dispatch({ type : RESET_UPDATE_PICTURE_ERRORS });
            dispatch({ type : SET_MESSAGE, payload : data.msg });
            dispatch({ type : CLOSE_LOADER }); 
            dispatch({ type : REDIRECT_TRUE });
            localStorage.setItem("myToken", data.token);
            dispatch({ type : SET_TOKEN, payload : data.token });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            console.log(errors);
            dispatch({ type : SET_UPDATE_PICTURE_ERRORS, payload : errors });
            dispatch({ type : CLOSE_LOADER });
        }
    }
    
}