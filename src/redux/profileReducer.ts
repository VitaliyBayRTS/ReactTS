const ADD_POST: string = 'ADD-POST';
const CHANGE_POST_TEXT: string = 'CHANGE-POST-TEXT';

export const addPostActionCreator = () => ({ type: ADD_POST });

export const newPostTextActionCreator = (text: string | undefined) =>
    ({ type: CHANGE_POST_TEXT, postText: text });

let initialState = {
    PostData: [
        { id: 1, text: "Super puper ninja 1", like: 4 },
        { id: 2, text: "OMG I'm in Internet", like: 2 },
        { id: 3, text: "Join to my way of samurai", like: 13 }
    ],
    newPostText: ""
}

let profileReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 4,
                text: state.newPostText,
                like: 0
            };
            let stateCopy = { ...state };
            stateCopy.PostData = [...state.PostData];
            stateCopy.PostData.push(newPost);
            stateCopy.newPostText = "";
            return stateCopy;
        }
        case CHANGE_POST_TEXT: {
            let stateCopy = { ...state };
            stateCopy.newPostText = action.postText + "";
            return stateCopy;
        }
        default:
            return state;
    }
}

export default profileReducer;