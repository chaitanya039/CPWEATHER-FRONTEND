import axios from "axios";
import { CREATE_ERRORS, SET_LOADER, CLOSE_LOADER, SET_MESSAGE, REDIRECT_TRUE, REDIRECT_FALSE, REMOVE_ERRORS, SET_POSTS, SET_POST, POST_REQUEST, SET_UPDATE_ERRORS, RESET_UPDATE_ERRORS, SET_UPDATE_IMAGE_ERRORS, RESET_UPDATE_IMAGE_ERRORS } from "../Types/postTypes";

export const createAction = (postData) => {
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
            
            const { data, data : { msg } } = await axios.post("/create-post", postData, config);
            console.log(data);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : REMOVE_ERRORS });
            dispatch({ type : REDIRECT_TRUE });
            dispatch({ type : SET_MESSAGE, payload : msg });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            console.log(errors);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : CREATE_ERRORS, payload : errors });
            dispatch({ type : REDIRECT_FALSE });
            dispatch({ type : SET_MESSAGE, payload : "" });
        }
    }
}

export const fetchPostsAction = (id, page) =>
{
    return async (dispatch, getState) => {
        const { AuthReducer : { token } } = getState();
        dispatch({ type : SET_LOADER });
        
        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        
        try
        {
            
            const { data : { response, count, perPage } }  = await axios.get(`/posts/${id}/${page}`, config);
            console.log({ response, count, perPage });
            
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : SET_POSTS, payload : { response, count, perPage } });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            dispatch({ type : CLOSE_LOADER });
        }
    }
}

export const fetchPostByIdAction = (id) =>
{
    return async (dispatch, getState) =>
    {
        const {
            AuthReducer : { token }
        } = getState();
        dispatch({ type : SET_LOADER });
        
        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        
        try
        {
            const { data : {post} } = await axios.get(`/post/${id}`, config);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : SET_POST, payload : post });
            dispatch({ type : POST_REQUEST });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            dispatch({ type : CLOSE_LOADER });
        }
        
    }
}

export const updatePostAction = (editData) => {
    
    return async (dispatch, getState) =>
    {
        const {
            AuthReducer : { token }
        } = getState();
        dispatch({ type : SET_LOADER });
        
        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        
        try
        {
            const { data } = await axios.post(`/post/update`, editData, config);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : RESET_UPDATE_ERRORS });
            dispatch({ type : REDIRECT_TRUE });
            dispatch({ type : SET_MESSAGE, payload : data.msg });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            dispatch({ type : SET_UPDATE_ERRORS, payload : errors });
            dispatch({ type : CLOSE_LOADER });
        }
        
    }
    
}

export const updatePostImageAction = (imageData) =>
{
    return async (dispatch, getState) => {
        const {
            AuthReducer : { token }
        } = getState();
        
        dispatch({ type : SET_LOADER });
        
        const config = {
            headers : {
                Authorization : `Bearer ${token}`
            }
        }
        
        try
        {
            const { data } = await axios.post("/post/updateImage", imageData, config);
            console.log(data);
            dispatch({ type : CLOSE_LOADER });
            dispatch({ type : REDIRECT_TRUE });
            dispatch({ type : RESET_UPDATE_IMAGE_ERRORS });
            dispatch({ type : SET_MESSAGE, payload : data.msg });
        }
        catch(error)
        {
            const { errors } = error.response.data;
            dispatch({ type : SET_UPDATE_IMAGE_ERRORS, payload : errors });
            dispatch({ type : CLOSE_LOADER });
        }
        
        
    }
}