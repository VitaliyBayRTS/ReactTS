import { InferActionsTypes } from "./redux-store";

type ActionsType = InferActionsTypes<typeof sidebarActions>


export const sidebarActions = {
    addNoteActionCreator: () => ({type: 'ADD_NOTE' } as const),
    newNoteTextActionCreator: (text: string) => ({type: 'CHANGE_NOTE_MESSAGE', text: text} as const)
}

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

export type sidebarStateType = typeof initialState;

let sidebarReducer = (state = initialState, action: ActionsType): sidebarStateType => {
    switch (action.type) {
        case 'ADD_NOTE':
            return {...state,
            sidebarData: [...state.sidebarData, {
                id: state.sidebarData.length + 1,
                text: state.newNoteText
            }],
            newNoteText: ""
        }
        case 'CHANGE_NOTE_MESSAGE':
            return {...state,
                newNoteText: action.text
        }
        default:
            return state;
    }
}

export default sidebarReducer;