import { usersAPI, profileAPI } from "../dal/dal";
import { stopSubmit } from "redux-form";

const ADD_POST: string = 'ADD-POST';
const SET_PROFILE_INFO: string = 'SET_PROFILE_INFO';
const SET_STATUS: string = 'SET_STATUS';
const DELETE_POST: string = 'DELETE_POST';
const SAVE_PHOTO: string = 'SAVE_PHOTO';


export const addPostActionCreator = (postBody: string) => ({ type: ADD_POST, postBody });
export const setPofileInfo = (profile: any) => ({ type: SET_PROFILE_INFO, profile });
export const setUserStatus = (status: any) => ({ type: SET_STATUS, status });
export const deletePost = (postId: any) => ({ type: DELETE_POST, postId });
export const savePhotoSuccess = (photoFile: any) => ({ type: SAVE_PHOTO, photoFile });

export const getProfileThunk = (userId: any) => async (dispatch: any) => {
    const response = await usersAPI.getProfile(userId)
    dispatch(setPofileInfo(response.data));
    
}

export const getUserStatusThunk = (userId: any) => async (dispatch: any) => {
    const response = await profileAPI.getUserStatus(userId)
    dispatch(setUserStatus(response.data))
    
}

export const updateUserStatusThunk = (status: any) => async (dispatch: any) => {
    const response = await profileAPI.updateUserStatus(status)
    if(response.data.resultCode === 0) {
        dispatch(setUserStatus(status))
    }
}

export const savePhoto = (photo: any) => async (dispatch: any) => {
    const response = await profileAPI.savePhoto(photo)
    if(response.data.resultCode === 0) {
        dispatch(savePhotoSuccess(response.data.data.photos))
    }
}

export const saveProfileInfo = (profile: any) => async (dispatch: any, getState: any) => {
    const userId = getState().auth.userId;
    const response = await profileAPI.saveProfileInfo(profile)
    if(response.data.resultCode === 0) {
        dispatch(getProfileThunk(userId))
    } else {
        const errorMessage = response.data.messages[0]
        let field = errorMessage.indexOf("Contacts->") + 10
        let name = errorMessage.substr(field, errorMessage.length - field - 1).toLowerCase()
        debugger
        dispatch(stopSubmit('profileData', {_error: errorMessage}));
    }
}

let initialState = {
    PostData: [
        { id: 1, text: "Super puper ninja 1", like: 4 },
        { id: 2, text: "OMG I'm in Internet", like: 2 },
        { id: 3, text: "Join to my way of samurai", like: 13 }
    ],
    profileInfo: null,
    status: ""
}

let profileReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
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