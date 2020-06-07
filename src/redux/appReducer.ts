import { meThunk } from './authMeReducer';
import { getProfileThunk } from './profileReducer';
const SUCCESS_INITIALIZING = 'SUCCESS_INITIALIZING';

export const InitializedSuccess = () =>
 ({type: SUCCESS_INITIALIZING })

export const initializeApp = () => (dispatch: any, getState: any) => {
    let promise = dispatch(meThunk());
    Promise.all([promise]).then( () => {
        let userId = getState().auth.userId;
        dispatch(getProfileThunk(userId)).then(() => {
            dispatch(InitializedSuccess())
        })
        
    })
}

let initialState = {
    initialazed: false
}

let appReducer = (state: any = initialState , action: any) => {
    switch (action.type) {
        case SUCCESS_INITIALIZING:
            return {
                ...state,
                initialazed: true
            }
        default:
           return state
    }
}

export default appReducer;