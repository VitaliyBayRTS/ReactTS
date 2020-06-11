import { meThunk, setUserFoto } from './authMeReducer';
import { getProfileThunk } from './profileReducer';
const SUCCESS_INITIALIZING: string = 'SUCCESS_INITIALIZING';

type ACSuccessInitializingType = {
    type: typeof SUCCESS_INITIALIZING
}

export const InitializedSuccess = (): ACSuccessInitializingType => ({type: SUCCESS_INITIALIZING })

export const initializeApp = () => (dispatch: any, getState: any) => {
    dispatch(meThunk())
    .then( (result: any) => {
        if(result !== 1) {
            let userId: number = getState().auth.userId;
            dispatch(getProfileThunk(userId)).then((result: any) => {
                dispatch(setUserFoto(result.data.photos.small))
            })
        }   
        dispatch(InitializedSuccess())     
    })
}

type stateType = {
    initialazed: boolean
}

let initialState: stateType = {
    initialazed: false
}

let appReducer = (state: stateType = initialState , action: any): stateType => {
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