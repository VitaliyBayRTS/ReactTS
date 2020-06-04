import { createStore, combineReducers, applyMiddleware } from 'redux';
import dialogReducer from './dialogReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authMeReducer from './authMeReducer';
import thunkMiddleware from 'redux-thunk';
import {reducer as formReducer} from 'redux-form';
import appReducer from './appReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

let reducers = combineReducers({    
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authMeReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));


export default store;