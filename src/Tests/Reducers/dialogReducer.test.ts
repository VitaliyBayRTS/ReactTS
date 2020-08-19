import dialogReducer, { dialogStateType, DialogActions } from './../../redux/dialogReducer';

let state: dialogStateType;

beforeEach(() => {
    state = {
        DialogItemData: [
            { id: 1, name: "User 1" },
            { id: 2, name: "User 2" },
            { id: 3, name: "User 3" },
            { id: 4, name: "User 4" },
            { id: 5, name: "User 5" },
            { id: 6, name: "User 6" }
        ],
        DialogMessageData: [
            { id: 1, text: "First message" },
            { id: 2, text: "This part of social network is just simulation" },
            { id: 3, text: "This is static message" }
        ]
    }
    
})

test("Add message success", () => {
    const newState = dialogReducer(state, DialogActions.addMessageActionCreator("New Message"))

    expect(newState.DialogMessageData.length).toBe(4)
})

