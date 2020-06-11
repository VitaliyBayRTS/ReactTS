import { profileInfoType, photosType, postDataType } from './../types/types';
import { usersAPI, profileAPI } from "../dal/dal";
import { stopSubmit } from "redux-form";

const ADD_POST: string = 'ADD-POST';
const SET_PROFILE_INFO: string = 'SET_PROFILE_INFO';
const SET_STATUS: string = 'SET_STATUS';
const DELETE_POST: string = 'DELETE_POST';
const SAVE_PHOTO: string = 'SAVE_PHOTO' ;

type addPostActionCreatorType = {
    type: typeof ADD_POST,
    postBody: string
}
export const addPostActionCreator = (postBody: string): addPostActionCreatorType => ({ type: ADD_POST, postBody });
export type setPofileInfoType = {
    type: typeof SET_PROFILE_INFO,
    profile: profileInfoType
}
export const setPofileInfo = (profile: profileInfoType): setPofileInfoType => ({ type: SET_PROFILE_INFO, profile });
type setUserStatusType = {
    type: typeof SET_STATUS,
    status: string
}
export const setUserStatus = (status: any): setUserStatusType => ({ type: SET_STATUS, status });
type deletePostType = {
    type: typeof DELETE_POST,
    postId: number
}
export const deletePost = (postId: number): deletePostType => ({ type: DELETE_POST, postId });
type savePhotoSuccessType = {
    type: typeof SAVE_PHOTO,
    photoFile: string
}
export const savePhotoSuccess = (photoFile: string): savePhotoSuccessType => ({ type: SAVE_PHOTO, photoFile });

export const getProfileThunk = (userId: number) => async (dispatch: any) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setPofileInfo(response.data));
    return response;
}

export const getUserStatusThunk = (userId: number) => async (dispatch: any) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(response.data))
    
}

export const updateUserStatusThunk = (status: string) => async (dispatch: any) => {
    const response = await profileAPI.updateUserStatus(status)
    if(response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const savePhoto = (photo: photosType) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(photo)
    if(response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
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

let profileReducer = (state: any = initialState, action: any): stateType => {
    switch (action.type) {
        case ADD_POST: {
            let newPost: postDataType = {
                id: state.PostData.length + 1,
                text: action.postBody,
                like: 0
            };
            return { ...state,
                PostData: [...state.PostData, newPost]
            }
        }
        case DELETE_POST: 
            return {...state, PostData: state.PostData.filter( (p: any) => p.id !== action.postId)}
        case SET_PROFILE_INFO: 
            return {
                ...state,
                profileInfo: {...action.profile}
            }
        case SET_STATUS: 
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO: 
            return {
                ...state,
                profileInfo: {...state.profileInfo, photos: action.photoFile}
            }
        default:
            return state;
    }
}

export default profileReducer;