import { InferActionsTypes, stateType } from './redux-store';
import { authApi, securityAPI, resultCodeEnum, resultCodeForCaptcha } from './../dal/dal';
import { stopSubmit } from 'redux-form';
import { ThunkAction } from 'redux-thunk';
import { initializeApp } from './appReducer';

type ActionsTypes = InferActionsTypes<typeof authMeActions>;

export const authMeActions = {
    setUserData: (userId: number | null, login: string  | null, email: string  | null, isAuth: boolean) =>
    ({type: 'SET_USER_DATA', payload: {userId, login, email, isAuth} } as const),
    getCaptchaUrlSuccess: (captchaUrl: string) =>
    ({type: 'GET_CAPTCHA_URL', payload: {captchaUrl} } as const),
    setUserFoto: (userImage: string) => ({type: 'GET_USER_IMAGE', userImage} as const)
}


type DispatchType = ThunkAction<Promise<void | resultCodeEnum | null>, stateType, unknown, ActionsTypes>

export const meThunk = (): DispatchType => async (dispatch) => {
    const responsData = await authApi.me();
    if(responsData.resultCode === resultCodeEnum.Success) {
        let {id, login, email} = responsData.data;
        dispatch(authMeActions.setUserData(id, login, email, true));
    } else {
        return responsData.resultCode;
    }
}

export const login = 
(email: string, password: string, rememberMe: boolean, captcha: string): DispatchType => 
async (dispatch) => {
    const data = await authApi.login(email, password, rememberMe, captcha);
    if(data.resultCode === resultCodeEnum.Success) {
        // dispatch(meThunk());
        dispatch(initializeApp());
    } else {
        if(data.resultCode === resultCodeForCaptcha.CaptchaRequired) {
            dispatch(getCaptchaUrl());
        }
        let errorMessage = data.messages
        //@ts-ignore
        dispatch(stopSubmit('login', {_error: errorMessage}));
    }
}

export const logout = (): DispatchType => async (dispatch: any) => {
    const data = await authApi.logout();
    if(data.resultCode === resultCodeEnum.Success) {
        dispatch(authMeActions.setUserData(null, null, null, false));
    } else {
        console.log(data.messages);
    }
}

export const getCaptchaUrl = (): DispatchType => async (dispatch: any) => {
    const data = await securityAPI.getCaptcha();
    const url = data.url;
    dispatch(authMeActions.getCaptchaUrlSuccess(url))
}

export type authStateType = typeof initialState;

let initialState = {
    userId: null as number | null,
    email: null as string | null,
    login: null as string | null,
    isAuth: false as boolean,
    captchaUrl: null as string | null,
    userImage: null as string | null
}

let authMeReducer = (state = initialState , action: ActionsTypes): authStateType => {
    switch (action.type) {
        case 'SET_USER_DATA':
        case 'GET_CAPTCHA_URL':
            return {
                ...state,
                ...action.payload
            }
        case 'GET_USER_IMAGE':
            return {...state, userImage: action.userImage}
        default:
           return state
    }
}

export default authMeReducer;