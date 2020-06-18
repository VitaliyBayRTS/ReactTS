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
        dispatch(authMeActions.setUserFoto(profile.data.photos.small)) //Add foto of ayhorized user to store
    }   
    dispatch(appActions.InitializedSuccess()) 
}

type InicialStateType = {
    initialazed: boolean
}

let initialState: InicialStateType = {
    initialazed: false
}

let appReducer = (state = initialState , action: ActionsType): InicialStateType => {
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