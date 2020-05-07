import { usersAPI, profileAPI } from "../dal/dal";

const ADD_POST: string = 'ADD-POST';
const SET_PROFILE_INFO: string = 'SET_PROFILE_INFO';
const SET_STATUS: string = 'SET_STATUS';

export const addPostActionCreator = (postBody: string) => ({ type: ADD_POST, postBody });
export const setPofileInfo = (profile: any) => ({ type: SET_PROFILE_INFO, profile });
export const setUserStatus = (status: any) => ({ type: SET_STATUS, status });

export const getProfileThunk = (userId: any) => (dispatch: any) => {
    usersAPI.getProfile(userId).then((response: any) => {
        dispatch(setPofileInfo(response.data));
    })
}

export const getUserStatusThunk = (userId: any) => (dispatch: any) => {
    profileAPI.getUserStatus(userId).then((response: any) => {
        dispatch(setUserStatus(response.data))
    })
}

export const updateUserStatusThunk = (status: any) => (dispatch: any) => {
    profileAPI.updateUserStatus(status).then((response: any) => {
        if(response.data.resultCode === 0) {
            dispatch(setUserStatus(status))
        }
    })
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