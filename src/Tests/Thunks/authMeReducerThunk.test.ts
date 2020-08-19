
import { stopSubmit } from 'redux-form';
import { meThunk, authMeActions, login, getCaptchaUrl, logout } from './../../redux/authMeReducer';
import { authApi, meType, resultCodeEnum, loginType, resultCodeForCaptcha, securityAPI, getCaptchaType } from './../../dal/dal';

//Fake result that API should return
const resultMe: meType = {
    data: {
        id: 1,
        email: 'email',
        login: 'login'
    },
    messages: [],
    resultCode: resultCodeEnum.Success
}

const resultLogin: loginType = {
    data: {},
    messages: [],
    resultCode: resultCodeEnum.Error
}

const resultLogout: loginType = {
    data: {},
    messages: [],
    resultCode: resultCodeEnum.Success
}

const resultCaptcha: getCaptchaType = {
    url: 'captcha'
}

// Mock for API
jest.mock('../../dal/dal')
const authAPImock = authApi as jest.Mocked<typeof authApi>
const securityAPImock = securityAPI as jest.Mocked<typeof securityAPI>
authAPImock.me.mockReturnValue(Promise.resolve(resultMe))
authAPImock.login.mockReturnValue(Promise.resolve(resultLogin))
authAPImock.logout.mockReturnValue(Promise.resolve(resultLogout))
securityAPImock.getCaptcha.mockReturnValue(Promise.resolve(resultCaptcha))

// Creating Fake Function for dispatch and getState
const dispatchFF = jest.fn()
const getStateFF = jest.fn()


beforeEach(() => {
    dispatchFF.mockClear()
    getStateFF.mockClear()
    authAPImock.me.mockClear()
    authAPImock.login.mockClear()
    authAPImock.logout.mockClear()
})

test("User should be identificated", async () => {
    const thunk = meThunk()

    await thunk(dispatchFF, getStateFF, {})

    let {id, login, email} = resultMe.data

    expect(dispatchFF).toBeCalledTimes(1)
    expect(dispatchFF).toHaveBeenNthCalledWith(1, authMeActions.setUserData(id, login, email, true))
})

// First of all we need to change result code in resultMe object (Warring: prev test is going to crash)
// test("User should not be identificated and thunk should return code of Error", async () => {
//     const thunk = meThunk()

//     const resultCode = await thunk(dispatchFF, getStateFF, {})

//     expect(resultCode).toBe(1)
// })

test("User should / should not be logined", async () => {
    const thunk = login("", "", true, "")

    await thunk(dispatchFF, getStateFF, {})

    switch (resultLogin.resultCode) {
        case resultCodeEnum.Success:
            expect(dispatchFF).toBeCalledTimes(1)
            break;
        case resultCodeForCaptcha.CaptchaRequired:
            expect(dispatchFF).toBeCalledTimes(2)
            break
        case resultCodeEnum.Error:
        default:
            expect(dispatchFF).toBeCalledTimes(1)
            expect(dispatchFF).toHaveBeenNthCalledWith(1, stopSubmit('login', {_error: resultLogin.messages}))
    }
})

test("User should be logouted", async () => {
    const thunk = logout()

    await thunk(dispatchFF, getStateFF, {})

    if(resultLogout.resultCode === resultCodeEnum.Success) {
        expect(dispatchFF).toBeCalledTimes(1)
        expect(dispatchFF).toHaveBeenNthCalledWith(1, authMeActions.setUserData(null, null, null, false))
    } else {
        expect(dispatchFF).toBeCalledTimes(0)
    }
})

test("Should dispatch captcha that we get from server", async () => {
    const thunk = getCaptchaUrl()

    await thunk(dispatchFF, getStateFF, {})

    expect(dispatchFF).toBeCalledTimes(1)
})