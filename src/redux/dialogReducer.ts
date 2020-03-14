const ADD_MESSAGE: string = 'ADD-MESSAGE';
const CHANGE_MESSAGE_TEXT: string = 'CHANGE-MESSAGE-TEXT';

export const addMessageActionCreator = () => ({type: ADD_MESSAGE});

export const newMessageTextActionCreator = (text: string | undefined) => 
    ({type: CHANGE_MESSAGE_TEXT, messageText: text})

    
let dialogReducer = (state: any, action: any): any => {
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