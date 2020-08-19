import { getUserStatusThunk, updateUserStatusThunk, savePhoto, saveProfileInfo } from './../../redux/profileReducer';
import { profileInfoType } from './../../types/types';
import { profileAPI, updateUserStatusType, resultCodeEnum, savePhotoType, saveProfileInfoType } from './../../dal/dal';
import { getProfileThunk, profileActions } from "../../redux/profileReducer"
// Result for mock API
const resultProfile: profileInfoType = {
    aboutMe: "",
    fullName: "Vitaliy Bay",
    userId: 1,
    lookingForAJob: true,
    lookingForAJobDescription: "",
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
    photos: {
        small: "",
        large: ""
    }
};
const resultStatus: string = "";
const resultUpdateStatus: updateUserStatusType = {
    data: {},
    messages: [],
    resultCode: resultCodeEnum.Success
}
const resultSavePhoto: saveProfileInfoType = {
    data: {},
    messages: ['Invalid url format (Contacts->Twitter)'],
    resultCode: resultCodeEnum.Error
}

//Mock for API
jest.mock('./../../dal/dal')
const profileAPImock = profileAPI as jest.Mocked<typeof profileAPI>
profileAPImock.getUserStatus.mockReturnValue(Promise.resolve(resultStatus))
profileAPImock.getProfile.mockReturnValue(Promise.resolve(resultProfile))
profileAPImock.updateUserStatus.mockReturnValue(Promise.resolve(resultUpdateStatus))
// profileAPImock.savePhoto.mockReturnValue(Promise.resolve(resultSavePhoto))
profileAPImock.saveProfileInfo.mockReturnValue(Promise.resolve(resultSavePhoto))

//Creating fake functions for dispatch and getState
const dispatchFF = jest.fn()
const getStateFF = jest.fn()
const getStateFF_UserId = jest.fn()
getStateFF_UserId.mockReturnValue({
    auth: {
        userId: 1
    }
})
// Clearing of all mocks 
beforeEach(() => {
    dispatchFF.mockClear()
    getStateFF.mockClear()
    getStateFF_UserId.mockClear()
    profileAPImock.getProfile.mockClear()
    profileAPImock.getUserStatus.mockClear()
    profileAPImock.updateUserStatus.mockClear()
    profileAPImock.savePhoto.mockClear()
    profileAPImock.saveProfileInfo.mockClear()
})


test("Get profile data from server", async () => {
    const thunk = getProfileThunk(1)

    await thunk(dispatchFF, getStateFF, {})

    expect(dispatchFF).toBeCalledTimes(1)
    expect(dispatchFF).toHaveBeenNthCalledWith(1, profileActions.setPofileInfo(resultProfile))
})

test("Get User Status", async () => {
    const thunk = getUserStatusThunk(1)

    await thunk(dispatchFF, getStateFF, {})

    expect(dispatchFF).toBeCalledTimes(1)
    expect(dispatchFF).toHaveBeenNthCalledWith(1, profileActions.setUserStatus(resultStatus))
})

test("User status should be updated", async () => {
    const thunk = updateUserStatusThunk("New Status")

    await thunk(dispatchFF, getStateFF, {})

    expect(dispatchFF).toBeCalledTimes(1)
    expect(dispatchFF).toHaveBeenNthCalledWith(1, profileActions.setUserStatus("New Status"))
})


test("User profile information should be saved", async () => {
    const  thunk = saveProfileInfo(resultProfile)
    
    try {
        await thunk(dispatchFF, getStateFF_UserId, {})
    } catch {
        expect(dispatchFF).toBeCalledTimes(1)
    }
    
})