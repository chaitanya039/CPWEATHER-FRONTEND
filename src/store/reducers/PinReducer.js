import { CLOSE_LOADER, CREATE_ERRORS, GET_ERRORS, REMOVE_ERRORS, REMOVE_GET_ERRORS, REMOVE_MESSAGE, SET_CREATE_PIN_MESSAGE, SET_GET_PIN_MESSAGE, SET_LOADER, SET_PINS } from "../Types/pinTypes";

const intialState = {
    loading : false,
    createErrors : [],
    getErrors : [],
    redirect : false,
    message : "",
    pins : []
}

export const PostPinReducer = (state = intialState, action) => {
    
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
                    
            case SET_CREATE_PIN_MESSAGE :
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


export const GetPinReducer = (state = intialState, action) => {
    
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
            
        case SET_PINS :
            state = {
                ...state,
                pins : action.payload,
            }
            break;
                
        case SET_GET_PIN_MESSAGE :
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
            
        case GET_ERRORS :
            state = {
                ...state,
                getErrors : action.payload
            }
            break;
                        
        case REMOVE_GET_ERRORS :
            state = {
                ...state,
                getErrors : []
            }
            break;
            
        default :
            return state;
    }
    
return state;
}
