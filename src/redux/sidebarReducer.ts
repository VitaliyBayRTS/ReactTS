const ADD_NOTE = "ADD-NOTE";
const CHANGE_NOTE_MESSAGE = "CHANGE-NOTE-MESSAGE";

export const addNoteActionCreator = () => ({ type: ADD_NOTE });

export const newNoteTextActionCreator = (text: string | undefined) => (
    { type: CHANGE_NOTE_MESSAGE, text: text }
)

let initialState = {
    sidebarData: [
        { id: 1, text: "Hay que terminar React.ts" }
    ],
    newNoteText: ""
}

let sidebarReducer = (state: any = initialState, action: any): any => {
    switch (action.type) {
        case ADD_NOTE:
            return {...state,
            sidebarData: [...state.sidebarData, {
                id: state.sidebarData.length + 1,
                text: state.newNoteText
            }],
            newNoteText: ""
        }
        case CHANGE_NOTE_MESSAGE:
            return {...state,
                newNoteText: action.text
        }
        default:
            return state;
    }
}

export default sidebarReducer;