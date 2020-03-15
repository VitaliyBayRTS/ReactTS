import {createStore, combineReducers} from 'redux';
import dialogReducer from './dialogReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';

let reducers = combineReducers({    
    dialogPage: dialogReducer,
    profilePage: profileReducer,
    sidebarPage: sidebarReducer
});

let store = createStore(reducers);

export default store;