import { CREATE_ERRORS, SET_LOADER, CLOSE_LOADER, REDIRECT_TRUE, REDIRECT_FALSE, SET_MESSAGE, REMOVE_MESSAGE, REMOVE_ERRORS, SET_POSTS, SET_POST, POST_REQUEST, POST_RESET, SET_UPDATE_ERRORS, RESET_UPDATE_ERRORS, SET_UPDATE_IMAGE_ERRORS, RESET_UPDATE_IMAGE_ERRORS } from "../Types/postTypes";

const intialState = {
    loading : false,
    createErrors : [],
    redirect : false,
    message : "",
    posts : [],
    count : 0,
    perPage : 0,
    post : {},
    postStatus : false,
    editErrors : [],
    editImageErrors : []
}

export const PostReducer = (state = intialState, action) => {
    
        // Write switch case statement to handle the action according their types.
        switch(action.type)
        {
            case SET_LOADER :
                state = {
                    ...state,
                    loading : true,
                }
                break;

            case CLOSE_LOADER :
                state = {
                    ...state,
                    loading : false,
                }
                break;

            case CREATE_ERRORS :
                state = {
                    ...state,
                    createErrors : action.payload
                }
                break;
                
            case REMOVE_ERRORS :
                state = {
                    ...state,
                    createErrors : []
                }
                break;
                
            case REDIRECT_TRUE :
                state = {
                    ...state,
                    redirect : true
                }
                break;    
            
            case REDIRECT_FALSE :
                state = {
                    ...state,
                    redirect : false
                }
                break;
                    
            case SET_MESSAGE :
                state = {
                    ...state,
                    message : action.payload
                }
                break;
                        
            case REMOVE_MESSAGE :
                state = {
                    ...state,
                    message : ""
                }
                break;
                
            default :
                return state;
        }
        
    return state;
}

export const FetchPostsReducer = (state = intialState, action) =>
{
    switch(action.type)
    {
        case SET_POSTS :
            state = {
                ...state,
                posts : action.payload.response,
                count : action.payload.count,
                perPage : action.payload.perPage
            }
            break;
        
        default :
            return state;
    }
    
    return state;
}

export const FetchPostByIdReducer = (state = intialState, action) =>
{
    switch(action.type)
    {
        case SET_POST : 
            state = {
                ...state,
                post : action.payload
            }
            break;
            
        case POST_REQUEST : 
            state = {
                ...state,
                postStatus : true
            }
            break;
            
        case POST_RESET : 
            state = {
                ...state,
                postStatus : false
            }
            break;
            
        default :
            return state;
    }
    
    return state;
}

export const UpdatePostReducer = (state = intialState, action) =>
{
    switch(action.type)
    {
        case SET_UPDATE_ERRORS : 
            state = {
                ...state,
                editErrors : action.payload
            }
            break;
            
        case RESET_UPDATE_ERRORS : 
            state = {
                ...state,
                editErrors : []
            }
            break;
            
        default :
            return state;
    }
    
    return state;
}

export const UpdatePostImageReducer = (state = intialState, action) =>
{
    switch(action.type)
    {
        case SET_UPDATE_IMAGE_ERRORS : 
            state = {
                ...state,
                editImageErrors : action.payload
            }
            break;
            
        case RESET_UPDATE_IMAGE_ERRORS : 
            state = {
                ...state,
                editImageErrors : []
            }
            break;
            
        default :
            return state;
    }
    
    return state;
}