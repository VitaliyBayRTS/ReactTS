import { usersAPI, profileAPI } from "../dal/dal";

const ADD_POST: string = 'ADD-POST';
const SET_PROFILE_INFO: string = 'SET_PROFILE_INFO';
const SET_STATUS: string = 'SET_STATUS';
const DELETE_POST: string = 'DELETE_POST';

export const addPostActionCreator = (postBody: string) => ({ type: ADD_POST, postBody });
export const setPofileInfo = (profile: any) => ({ type: SET_PROFILE_INFO, profile });
export const setUserStatus = (status: any) => ({ type: SET_STATUS, status });
export const deletePost = (postId: any) => ({ type: DELETE_POST, postId });

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
            return {...state, PostData: state.PostData.filter( (p: any) => p.id != action.postId)}
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
        default:
            return state;
    }
}

export default profileReducer;