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

type RootReducerType = typeof reducers;
export type stateType = ReturnType<RootReducerType>;

type PropertieesType<T> = T extends {[key: string]: infer U} ? U : never

export type InferActionsTypes<T extends {[key: string]: (...args: any[]) => any}> = ReturnType<PropertieesType<T>>

let store = createStore(reducers, composeWithDevTools(applyMiddleware(thunkMiddleware)));


export default store;