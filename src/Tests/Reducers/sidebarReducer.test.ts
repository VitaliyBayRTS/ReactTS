import sidebarReducer, { sidebarStateType, sidebarActions } from './../../redux/sidebarReducer';

let state: sidebarStateType;

beforeEach(() => {
    state = {
        sidebarData: [
            { id: 1, text: "Hay que terminar React.ts" }
        ],
        newNoteText: ""
    }
})

test("Add note", () => {
    let newState = sidebarReducer(state, sidebarActions.newNoteTextActionCreator("New note"))
    
    expect(newState.newNoteText).toBe("New note")

    newState = sidebarReducer(newState, sidebarActions.addNoteActionCreator())

    expect(newState.sidebarData.length).toBeGreaterThan(1)
    expect(newState.sidebarData.length).toBe(2)
})