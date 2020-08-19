import authMeReducer, { authStateType, authMeActions } from './../../redux/authMeReducer';

let state: authStateType

beforeEach(() => {
    state = {
        userId: 0,
        email: "",
        login: "",
        isAuth: false,
        captchaUrl: "",
        userImage: ""
    }
})

test("Set authorization user information (userId, login, email, isAuth)", () => {
    let newState = authMeReducer(state, authMeActions.setUserData(1, "login", "email", true))

    expect(newState.userId).toBe(1)
    expect(newState.email).toBe("email")
    expect(newState.login).toBe("login")
    expect(newState.isAuth).toBeTruthy()
})

test("Set captcha from server to state", () => {
    let newState = authMeReducer(state, authMeActions.getCaptchaUrlSuccess("captcha"))

    expect(newState.captchaUrl).toBe("captcha")
})

test("Set user image to state", () => {
    let newState = authMeReducer(state, authMeActions.setUserFoto("New image"))

    expect(newState.userImage).toBe("New image")
})