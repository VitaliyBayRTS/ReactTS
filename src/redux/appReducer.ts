import { meThunk, authMeActions } from './authMeReducer';
import { getProfileThunk } from './profileReducer';
import { stateType, InferActionsTypes } from './redux-store';

type ActionsType = InferActionsTypes<typeof appActions>

export const appActions = {
    InitializedSuccess: () => ({type: 'SUCCESS_INITIALIZING' } as const)
}

type getStateType = () => stateType
// type dispatchType = Dispatch<ActioType>

export const initializeApp = () => async (dispatch: any, getState: getStateType) => {
    let result = await dispatch(meThunk())
    if(result !== 1) { // If user is authorized
        let userId = getState().auth.userId;
        let profile = await dispatch(getProfileThunk(userId))
        dispatch(authMeActions.setUserFoto(profile.photos.small)) //Add foto of aythorized user to store
    }   
    dispatch(appActions.InitializedSuccess()) 
}

 export type inicialStateType = {
    initialazed: boolean
}

let initialState: inicialStateType = {
    initialazed: false
}

let appReducer = (state = initialState , action: ActionsType): inicialStateType => {
    switch (action.type) {
        case 'SUCCESS_INITIALIZING':
            return {
                ...state,
                initialazed: true
            }
        default:
           return state
    }
}

export default appReducer;