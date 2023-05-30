import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import AuthReducer from "./reducers/AuthReducer";
import { PostPinReducer, GetPinReducer } from "./reducers/PinReducer";
import {PostReducer, FetchPostsReducer, FetchPostByIdReducer, UpdatePostReducer, UpdatePostImageReducer} from './reducers/PostReducer';
import { updateNameReducer } from "./reducers/ProfileReducer";
import { composeWithDevTools } from "redux-devtools-extension";

const rootReducers = combineReducers({
    AuthReducer,
    PostReducer,
    FetchPostsReducer,
    FetchPostByIdReducer,
    UpdatePostReducer,
    UpdatePostImageReducer,
    updateNameReducer,
    PostPinReducer,
    GetPinReducer
});

const middlewares = [ thunkMiddleware ];
const Store = createStore(rootReducers, composeWithDevTools(applyMiddleware(...middlewares)));

export default Store;