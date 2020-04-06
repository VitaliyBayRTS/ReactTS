import {createStore, combineReducers} from 'redux';
import dialogReducer from './dialogReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';
import usersReducer from './usersReducer';
import authMeReducer from './authMeReducer';

let reducers = combineReducers({    
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    sidebarPage: sidebarReducer,
    usersPage: usersReducer,
    auth: authMeReducer
});

let store = createStore(reducers);


export default store;