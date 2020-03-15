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
            let newNote = {
                id: state.sidebarData.length,
                text: state.newNoteText
            }
            state.sidebarData.push(newNote);
            state.newNoteText = "";
            return state;
        case CHANGE_NOTE_MESSAGE:
            state.newNoteText = action.text;
            return state;
        default:
            return state;
    }
}

export default sidebarReducer;