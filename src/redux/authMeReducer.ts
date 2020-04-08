import { authApi } from './../dal/dal';
const SET_USER_DATA = 'SET_USER_DATA';

export const setUserData = ({userId, email, login} : any) => ({type: SET_USER_DATA, data: {userId, email, login}})

export const meThunk = () => (dispatch: any) => {
    authApi.me().then((response: any) => {
        if(response.data.resultCode == 0) {
            let {id, login, email} = response.data.data;
            dispatch(setUserData({id, login, email}));
        }
        
    })
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
                ...action.data,
                isAuth: true
            }
    
        default:
           return state
    }
}

export default authMeReducer;