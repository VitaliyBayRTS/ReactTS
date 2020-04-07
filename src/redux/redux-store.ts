import {createStore, combineReducers, applyMiddleware} from 'redux';
import dialogReducer from './dialogReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authMeReducer from './authMeReducer';
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({    
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authMeReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));


export default store;