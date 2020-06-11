const ADD_NOTE: string = "ADD-NOTE";
const CHANGE_NOTE_MESSAGE: string = "CHANGE-NOTE-MESSAGE";

type addNoteActionCreatorType = {
    type: typeof ADD_NOTE
}
export const addNoteActionCreator = (): addNoteActionCreatorType => ({ type: ADD_NOTE });

type newNoteTextActionCreatorType = {
    type: typeof CHANGE_NOTE_MESSAGE,
    text: string | undefined
}
export const newNoteTextActionCreator = (text: string | undefined): newNoteTextActionCreatorType => (
    { type: CHANGE_NOTE_MESSAGE, text: text }
)

type sidebarDataType = {
    id: number,
    text: string
}

let initialState = {
    sidebarData: [
        { id: 1, text: "Hay que terminar React.ts" }
    ] as Array<sidebarDataType>,
    newNoteText: ""
}

type stateType = typeof initialState;

let sidebarReducer = (state: stateType = initialState, action: any): stateType => {
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