import jwt_decode from 'jwt-decode';
import { SET_LOADER, SET_TOKEN, CLOSE_LOADER, REGISTER_ERRORS, LOGOUT, LOGIN_ERRORS } from '../Types/userTypes';


const intialState = {
    loading : false,
    registerErrors : [],
    loginErrors : [],
    token : "",
    user : ""
};

const verifyToken = (token) => {
    const decodeToken = jwt_decode(token);
    console.log(decodeToken);
    const expiresIn = new Date(decodeToken.exp * 1000);

    if(new Date() > expiresIn)
    {
        localStorage.removeItem("myToken");
        return null;
    }
    else
    {
        return decodeToken;
    }
}

// Accessing token from localstorage for authentication when page is reload.
const token = localStorage.getItem("myToken");
if (token)
{
    const decodeToken = verifyToken(token);
    if(decodeToken)
    {
        intialState.token = token;
        const { user } = decodeToken;
        intialState.user = user;
    }
}

const AuthReducer = (state = intialState, action) => {

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

        case REGISTER_ERRORS :
            state = {
                ...state,
                registerErrors : action.payload
            }
            break;

        case LOGIN_ERRORS :
            state = {
                ...state,
                loginErrors : action.payload
            }
            break;

        case SET_TOKEN :
            const decode = verifyToken(action.payload);
            const { user } = decode;
            state = {
                ...state,
                token : action.payload,
                user : user,
                loginErrors : [],
                registerErrors : []
            }
            break;

        case LOGOUT :
            state = {
                ...state,
                token : "",
                user : ""
            }
            break;
        default :
            return state;
    }

    return state;
}

export default AuthReducer;