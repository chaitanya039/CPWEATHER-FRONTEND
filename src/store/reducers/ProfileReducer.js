import { RESET_UPDATE_NAME_ERRORS, RESET_UPDATE_PASSWORD_ERRORS, RESET_UPDATE_PICTURE_ERRORS, SET_UPDATE_NAME_ERRORS, SET_UPDATE_PASSWORD_ERRORS, SET_UPDATE_PICTURE_ERRORS } from "../Types/profiletypes";

const intialState = {
    updateNameErrors : [],
    updatePasswordErrors : [],
    updatePictureErrors : []
}

export const updateNameReducer = (state = intialState, action) =>
{
    switch(action.type)
    {
        case SET_UPDATE_NAME_ERRORS : 
            state = {
                ...state,
                updateNameErrors : action.payload
            }
            break;
            
        case RESET_UPDATE_NAME_ERRORS : 
            state = {
                ...state,
                updateNameErrors : []
            }
            break;
            
        case SET_UPDATE_PASSWORD_ERRORS : 
        state = {
            ...state,
            updatePasswordErrors : action.payload
        }
        break;
            
        case RESET_UPDATE_PASSWORD_ERRORS : 
            state = {
                ...state,
                updatePasswordErrors : []
            }
            break;
            
        case SET_UPDATE_PICTURE_ERRORS : 
            state = {
                ...state,
                updatePictureErrors : action.payload
            }
            break;
            
        case RESET_UPDATE_PICTURE_ERRORS : 
            state = {
                ...state,
                updatePictureErrors : []
            }
            break;
            
        default :
            return state;
    }
    
    return state;
}