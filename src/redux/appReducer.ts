import { meThunk } from './authMeReducer';
const SUCCESS_INITIALIZING = 'SUCCESS_INITIALIZING';

export const InitializedSuccess = () =>
 ({type: SUCCESS_INITIALIZING })

export const initializeApp = () => (dispatch: any) => {
    let promise = dispatch(meThunk());
    Promise.all([promise]).then( () => {
        dispatch(InitializedSuccess())
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