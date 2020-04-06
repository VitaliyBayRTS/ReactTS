const SET_USER_DATA = 'SET_USER_DATA';

export let setUserData = ({userId, email, login} : any) => ({type: SET_USER_DATA, data: {userId, email, login}})

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