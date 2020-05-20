import profileReducer, { addPostActionCreator, deletePost, setUserStatus, setPofileInfo } from './profileReducer';

let state = {
    PostData: [
        { id: 1, text: "Super puper ninja 1", like: 4 },
        { id: 2, text: "OMG I'm in Internet", like: 2 },
        { id: 3, text: "Join to my way of samurai", like: 13 }
    ],
    profileInfo: null,
    status: ""
}

it("Length of post should be incremented", () => {
    let action = addPostActionCreator("OMG");

    let newState = profileReducer(state, action);

    expect(newState.PostData.length).toBe(4);
})

it("Length of post should be decremented", () => {
    let action = deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.PostData.length).toBe(2);
})

it("Length of post shouldn't be changed", () => {
    let action = deletePost(23);
    let newState = profileReducer(state, action);

    expect(newState.PostData.length).toBe(state.PostData.length);
})

it("Success changing of status", () => {
    let newStatus = "OMG";
    let action = setUserStatus(newStatus);
    let newState = profileReducer(state, action);
    expect(newState.status).toBe(newStatus)
})

it("Adding of profile information", () => {
    let UserInfo = {
        name: "Vitaliy",
        age: 21,
        city: "Malaga"
    }
    let action = setPofileInfo(UserInfo);
    let newState = profileReducer(state, action);
    expect(newState.profileInfo).toStrictEqual(UserInfo);
})