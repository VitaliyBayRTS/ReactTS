import { authMeActions } from './authMeReducer';
import { ThunkAction } from 'redux-thunk';
import { profileInfoType, photosType, postDataType } from './../types/types';
import { usersAPI, profileAPI, resultCodeEnum } from "../dal/dal";
import { stopSubmit } from "redux-form";
import { InferActionsTypes, stateType } from './redux-store';
import { AxiosResponse } from 'axios';

type ActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
    addPostActionCreator: (postBody: string) => ({ type: 'ADD_POST', postBody } as const),
    setPofileInfo: (profile: profileInfoType) => ({ type: 'SET_PROFILE_INFO', profile } as const),
    setUserStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
    savePhotoSuccess: (photoFile: photosType) => ({ type: 'SAVE_PHOTO', photoFile } as const),
    setUserFoto: authMeActions.setUserFoto
}

type DispatchType = ThunkAction<Promise<void | resultCodeEnum | null | AxiosResponse<profileInfoType>>, stateType, unknown, ActionsTypes >

export const getProfileThunk = (userId: number | null): DispatchType => async (dispatch) => {
    const response = await usersAPI.getProfile(userId);
    dispatch(profileActions.setPofileInfo(response.data));
    return response;
}

export const getUserStatusThunk = (userId: number): DispatchType => async (dispatch) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(profileActions.setUserStatus(response.data))
    
}

export const updateUserStatusThunk = (status: string): DispatchType => async (dispatch) => {
    const response = await profileAPI.updateUserStatus(status)
    if(response.data.resultCode === resultCodeEnum.Success) {
        dispatch(profileActions.setUserStatus(status))
    }
}

export const savePhoto = (photo: File): DispatchType => async (dispatch) => { //Update image of user account
    const responseData = await profileAPI.savePhoto(photo)
    if(responseData.resultCode === resultCodeEnum.Success) {
        dispatch(profileActions.savePhotoSuccess(responseData.data.photos))
        dispatch(authMeActions.setUserFoto(responseData.data.photos.small))
    }
}


export const saveProfileInfo = (profile: profileInfoType): DispatchType => async (dispatch, getState) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfileInfo(profile)
    if(response.data.resultCode === resultCodeEnum.Success) {
        dispatch(getProfileThunk(userId))
    } else {
        const errorMessage = response.data.messages[0];
        let field = errorMessage.indexOf("Contacts->") + 10;
        if(field === 9) { // Handle general error
            //@ts-ignore
            dispatch(stopSubmit("profileData", {_error: errorMessage}));
        } else { // Handle error of some social network link
            let socialNetworkName = errorMessage.substr(field, errorMessage.length - field - 1).toLowerCase();
            let objError: Record<string, any> = {};
            objError[socialNetworkName] = errorMessage;
            const object = {"contacts": objError}
            //@ts-ignore
            dispatch(stopSubmit("profileData", object));
        }
        return Promise.reject(errorMessage)
    }
}


type profileStateType = typeof initialState;

let initialState = {
    PostData: [
        { id: 1, text: "Super puper ninja 1", like: 4 },
        { id: 2, text: "OMG I'm in Internet", like: 2 },
        { id: 3, text: "Join to my way of samurai", like: 13 }
    ] as Array<postDataType>,
    profileInfo: null as profileInfoType | null,
    status: ""
}

let profileReducer = (state = initialState, action: ActionsTypes): profileStateType => {
    switch (action.type) {
        case 'ADD_POST': {
            let newPost: postDataType = {
                id: state.PostData.length + 1,
                text: action.postBody,
                like: 0
            };
            return { ...state,
                PostData: [...state.PostData, newPost]
            }
        }
        case 'DELETE_POST': 
            return {...state, PostData: state.PostData.filter( (p: any) => p.id !== action.postId)}
        case 'SET_PROFILE_INFO': 
            return {
                ...state,
                profileInfo: {...action.profile}
            }
        case 'SET_STATUS': 
            return {
                ...state,
                status: action.status
            }
        case 'SAVE_PHOTO': 
            return {
                ...state,
                //@ts-ignore
                profileInfo: {...state.profileInfo, photos: action.photoFile}
            }
        default:
            return state;
    }
}

export default profileReducer;