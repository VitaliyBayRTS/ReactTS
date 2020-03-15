const ADD_POST: string = 'ADD-POST';
const CHANGE_POST_TEXT: string = 'CHANGE-POST-TEXT';

export const addPostActionCreator = () => ({type: ADD_POST});

export const newPostTextActionCreator = (text: string | undefined) => 
    ({type: CHANGE_POST_TEXT, postText: text });

let profileReducer = (state: any, action: any): any => {
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: 4,
                text: state.newPostText,
                like: 0
            };
            state.PostData.push(newPost);
            state.newPostText = "";
            return state;
        case CHANGE_POST_TEXT:
            state.newPostText = action.postText + "";
            return state;
        default:
            return state;
    }
}

export default profileReducer;