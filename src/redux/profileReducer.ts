import { profileInfoType, photosType, postDataType } from './../types/types';
import { usersAPI, profileAPI } from "../dal/dal";
import { stopSubmit } from "redux-form";
import { InferActionsTypes } from './redux-store';

type ActionsTypes = InferActionsTypes<typeof profileActions>

export const profileActions = {
    addPostActionCreator: (postBody: string) => ({ type: 'ADD_POST', postBody } as const),
    setPofileInfo: (profile: profileInfoType) => ({ type: 'SET_PROFILE_INFO', profile } as const),
    setUserStatus: (status: string) => ({ type: 'SET_STATUS', status } as const),
    deletePost: (postId: number) => ({ type: 'DELETE_POST', postId } as const),
    savePhotoSuccess: (photoFile: photosType) => ({ type: 'SAVE_PHOTO', photoFile } as const)
}


export const getProfileThunk = (userId: number | null) => async (dispatch: any) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(profileActions.setPofileInfo(response.data));
    return response;
}

export const getUserStatusThunk = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(profileActions.setUserStatus(response.data))
    
}

export const updateUserStatusThunk = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateUserStatus(status)
    if(response.data.resultCode === 0) {
        dispatch(profileActions.setUserStatus(status))
    }
}

export const savePhoto = (photo: photosType) => async (dispatch: any) => {
    const responseData = await profileAPI.savePhoto(photo)
    if(responseData.resultCode === 0) {
        dispatch(profileActions.savePhotoSuccess(responseData.data.photos))
    }
}


export const saveProfileInfo = (profile: profileInfoType) => async (dispatch: any, getState: any) => {
    const userId: number = getState().auth.userId;
    const response = await profileAPI.saveProfileInfo(profile)
    if(response.data.resultCode === 0) {
        dispatch(getProfileThunk(userId))
    } else {
        const errorMessage = response.data.messages[0];
        let field: number = errorMessage.indexOf("Contacts->") + 10;
        if(field === 9) {
            dispatch(stopSubmit("profileData", {_error: errorMessage}));
        } else {
            let socialNetworkName: string = errorMessage.substr(field, errorMessage.length - field - 1).toLowerCase();
            let objError: Record<string, any> = {};
            objError[socialNetworkName] = errorMessage;
            const object = {"contacts": objError}
            dispatch(stopSubmit("profileData", object));
        }
        return Promise.reject(errorMessage)
    }
}


type stateType = typeof initialState;

let initialState = {
    PostData: [
        { id: 1, text: "Super puper ninja 1", like: 4 },
        { id: 2, text: "OMG I'm in Internet", like: 2 },
        { id: 3, text: "Join to my way of samurai", like: 13 }
    ] as Array<postDataType>,
    profileInfo: null as profileInfoType | null,
    status: ""
}

let profileReducer = (state = initialState, action: ActionsTypes): stateType => {
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