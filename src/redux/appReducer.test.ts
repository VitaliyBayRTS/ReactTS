import appReducer, { inicialStateType, appActions } from './appReducer';

let state: inicialStateType

beforeEach(() => {
    state = {
        initialazed: false
    } 
})

test("Initialize app", () => {
    let newState = appReducer(state, appActions.InitializedSuccess())

    expect(newState.initialazed).toBeTruthy()
})