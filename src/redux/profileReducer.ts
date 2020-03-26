const ADD_POST: string = 'ADD-POST';
const CHANGE_POST_TEXT: string = 'CHANGE-POST-TEXT';
const SET_PROFILE_INFO: string = 'SET_PROFILE_INFO';

export const addPostActionCreator = () => ({ type: ADD_POST });
export const setPofileInfo = (profile: any) => ({ type: SET_PROFILE_INFO, profile });
export const newPostTextActionCreator = (text: string | undefined) =>
    ({ type: CHANGE_POST_TEXT, postText: text });

let initialState = {
    PostData: [
        { id: 1, text: "Super puper ninja 1", like: 4 },
        { id: 2, text: "OMG I'm in Internet", like: 2 },
        { id: 3, text: "Join to my way of samurai", like: 13 }
    ],
    profileInfo: null,
    newPostText: ""
}

let profileReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: state.PostData.length + 1,
                text: state.newPostText,
                like: 0
            };
            return { ...state,
                PostData: [...state.PostData, newPost],
                newPostText: ""
            }
        }
        case CHANGE_POST_TEXT:
            return { ...state,
                newPostText: action.postText
            }
        case SET_PROFILE_INFO: 
            return {
                ...state,
                profileInfo: {...action.profile}
            }
        default:
            return state;
    }
}

export default profileReducer;