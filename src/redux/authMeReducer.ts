import { authApi } from './../dal/dal';
import { stopSubmit } from 'redux-form';
const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = (userId: string  | null, login: string  | null, email: string  | null, isAuth: boolean) =>
 ({type: SET_USER_DATA, payload: {userId, login, email, isAuth} })

export const meThunk = () => async (dispatch: any) => {
    const response = await authApi.me();
    if(response.data.resultCode === 0) {
        let {id, login, email} = response.data.data;
        dispatch(setUserData(id, login, email, true));
    }
}

export const login = (email: string, password: string, rememberMe: boolean) => async (dispatch: any) => {
    const response = await authApi.login(email, password, rememberMe);
    if(response.data.resultCode === 0) {
        dispatch(meThunk());
    } else {
        let errorMessage = response.data.messages
        dispatch(stopSubmit('login', {_error: errorMessage}));
    }
}

export const logout = () => async (dispatch: any) => {
    const response = await authApi.logout();
    if(response.data.resultCode === 0) {
        dispatch(setUserData(null, null, null, false));
    } else {
        console.log(response.data.messages);
    }
}

let initialState = {
    userId: null,
    email: null,
    login: null,
    isAuth: false
}

let authMeReducer = (state: any = initialState , action: any) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload
            }
    
        default:
           return state
    }
}

export default authMeReducer;