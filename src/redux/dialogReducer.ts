import { DialogItemDataType, DialogMessageDataType } from './../types/types';
const ADD_MESSAGE: string = 'ADD-MESSAGE';

type ACaddMessageActionType = {
    type: typeof ADD_MESSAGE,
    messageBody: string
}

export const addMessageActionCreator = (messageBody: string): ACaddMessageActionType => ({ type: ADD_MESSAGE, messageBody });


type stateType = typeof initialState;

let initialState = {
    DialogItemData: [
        { id: 1, name: "User 1" },
        { id: 2, name: "User 2" },
        { id: 3, name: "User 3" },
        { id: 4, name: "User 4" },
        { id: 5, name: "User 5" },
        { id: 6, name: "User 6" }
    ] as Array<DialogItemDataType>,
    DialogMessageData: [
        { id: 1, text: "PrePrePre" },
        { id: 2, text: "PrePrePrePrePrePrePrePrePre" },
        { id: 3, text: "OMG, i am in YouTube" }
    ] as Array<DialogMessageDataType>
}

let dialogReducer = (state: stateType = initialState, action: any): stateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            return {
                ...state,
                DialogMessageData: [...state.DialogMessageData, {
                    id: state.DialogMessageData.length + 1,
                    text: action.messageBody                }],
            }
        default:
            return state;
    }
}

export default dialogReducer;