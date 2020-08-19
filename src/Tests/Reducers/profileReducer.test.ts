import { profileInfoType, photosType } from './../../types/types';
import profileReducer, { profileActions, profileStateType } from './../../redux/profileReducer';

let state : profileStateType;
let UserInfo: profileInfoType;

beforeEach(() => {
    state = {
        PostData: [
            { id: 1, text: "Super puper ninja 1", like: 4 },
            { id: 2, text: "OMG I'm in Internet", like: 2 },
            { id: 3, text: "Join to my way of samurai", like: 13 }
        ],
        profileInfo: null,
        status: ""
    }

    UserInfo = {
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
})


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
    let action = profileActions.setPofileInfo(UserInfo);
    let newState = profileReducer(state, action);
    expect(newState.profileInfo).toStrictEqual(UserInfo);
})

test("Save main photo (avatar) of authorized user", () => {
    let stateWithUserInfo = profileReducer(state, profileActions.setPofileInfo(UserInfo))

    expect(stateWithUserInfo.profileInfo?.photos.small).toBe("")
    expect(stateWithUserInfo.profileInfo?.photos.large).toBe("")

    let userPhotos: photosType = {
        small: "smallPhoto", large: "largePhoto"
    }
    let newState = profileReducer(stateWithUserInfo, profileActions.savePhotoSuccess(userPhotos))

    expect(newState.profileInfo?.photos.small).toBe("smallPhoto")
    expect(newState.profileInfo?.photos.large).toBe("largePhoto")
})