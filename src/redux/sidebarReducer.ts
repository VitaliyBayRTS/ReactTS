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
        case ADD_NOTE: {
            debugger;
            let newNote = {
                id: state.sidebarData.length,
                text: state.newNoteText
            }
            let stateCopy = {...state};
            stateCopy.sidebarData = [...state.sidebarData];
            stateCopy.sidebarData.push(newNote);
            stateCopy.newNoteText = "";
            return stateCopy;
        }
        case CHANGE_NOTE_MESSAGE: {
            let stateCopy = {...state};
            stateCopy.newNoteText = action.text;
            return stateCopy;
        }
        default:
            return state;
    }
}

export default sidebarReducer;