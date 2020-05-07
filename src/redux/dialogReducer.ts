const ADD_MESSAGE: string = 'ADD-MESSAGE';

export const addMessageActionCreator = (messageBody: string) => ({ type: ADD_MESSAGE, messageBody });


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
        { id: 1, text: "PrePrePre" },
        { id: 2, text: "PrePrePrePrePrePrePrePrePre" },
        { id: 3, text: "OMG, i am in YouTube" }
    ]
}

let dialogReducer = (state: any = initialState, action: any): any => {
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