import { profileInfoType } from './../types/types';
import profileReducer, { profileActions } from './profileReducer';

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
    let action = profileActions.addPostActionCreator("OMG");
    let newState = profileReducer(state, action);

    expect(newState.PostData.length).toBe(4);
})

it("Length of post should be decremented", () => {
    let action = profileActions.deletePost(1);
    let newState = profileReducer(state, action);

    expect(newState.PostData.length).toBe(2);
})

it("Length of post shouldn't be changed", () => {
    let action = profileActions.deletePost(23);
    let newState = profileReducer(state, action);

    expect(newState.PostData.length).toBe(state.PostData.length);
})

it("Success changing of status", () => {
    let newStatus = "OMG";
    let action = profileActions.setUserStatus(newStatus);
    let newState = profileReducer(state, action);
    expect(newState.status).toBe(newStatus)
})

it("Adding of profile information", () => {
    let UserInfo: profileInfoType = {
        aboutMe: "",
        contacts: {
            github: "",
            vk: "",
            facebook: "",
            instagram: "",
            twitter: "",
            website: "",
            youtube: "",
            mainLink: ""
        },
        fullName: "Vitaliy",
        lookingForAJob: true,
        lookingForAJobDescription: "",
        photos: {
            small: "",
            large: ""
        },
        userId: 123
    }
    let action = profileActions.setPofileInfo(UserInfo);
    let newState = profileReducer(state, action);
    expect(newState.profileInfo).toStrictEqual(UserInfo);
})