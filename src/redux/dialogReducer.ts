const ADD_MESSAGE: string = 'ADD-MESSAGE';
const CHANGE_MESSAGE_TEXT: string = 'CHANGE-MESSAGE-TEXT';

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});

export const newMessageTextActionCreator = (text: string | undefined) => 
    ({type: CHANGE_MESSAGE_TEXT, messageText: text});

let initialState = {
    DialogItemData: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
        { id: 3, name: "User 3" },
        { id: 4, name: "User 4" },
        { id: 5, name: "User 5" },
        { id: 6, name: "User 6" }
    ],
    DialogMessageData: [
        { text: "PrePrePre" },
        { text: "PrePrePrePrePrePrePrePrePre" },
        { text: "OMG, i am in YouTube" }
    ],
    newMessageText: ""
}
    
let dialogReducer = (state:any = initialState, action: any): any => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                text: state.newMessageText
            }
            state.DialogMessageData.push(newMessage);
            state.newMessageText = "";
            return state;
        case CHANGE_MESSAGE_TEXT:
            state.newMessageText = action.messageText + "";
            return state;
        default:
            return state;
    }
}

export default dialogReducer;