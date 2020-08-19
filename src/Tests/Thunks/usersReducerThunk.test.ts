import { usersAPI, unfollowFollowTypes, resultCodeEnum, getUsersType } from './../../dal/dal';
import { unfollowThunk, followThunk, userActions, getUsersThunk } from './../../redux/usersReducer';

//Mock for usersAPI
jest.mock('./../../dal/dal')
const usersAPImock = usersAPI as jest.Mocked<typeof usersAPI> // add types for mocked usersAPI

const resultFollowUnfollow: unfollowFollowTypes = { // Fake result that API should return
    resultCode: resultCodeEnum.Success,
    messages: [],
    data: []
}
const resultUsers: getUsersType = { 
    items: [],
    error: null,
    totalCount: 100
}


usersAPImock.follow.mockReturnValue(Promise.resolve(resultFollowUnfollow))
usersAPImock.unfollow.mockReturnValue(Promise.resolve(resultFollowUnfollow))
usersAPImock.getUsers.mockReturnValue(Promise.resolve(resultUsers))

//Creating fake functions for dispatch and getState
const dispatchFF = jest.fn()
const getStateFF = jest.fn()

beforeEach(() => {
    dispatchFF.mockClear()
    getStateFF.mockClear()
    usersAPImock.follow.mockClear()
    usersAPImock.unfollow.mockClear()
    usersAPImock.getUsers.mockClear()
})

test("Follow success", async () => {
    const thunk = followThunk(1)

    await thunk(dispatchFF, getStateFF, {})

    expect(dispatchFF).toBeCalledTimes(3)
    expect(dispatchFF).toHaveBeenNthCalledWith(1, userActions.setDisableUsers(true, 1))
    expect(dispatchFF).toHaveBeenNthCalledWith(2, userActions.setDisableUsers(false, 1))
    expect(dispatchFF).toHaveBeenNthCalledWith(3, userActions.follow(1))
})

test("Unfollow success", async () => {
    const thunk = unfollowThunk(1)
    await thunk(dispatchFF, getStateFF, {})

    expect(dispatchFF).toBeCalledTimes(3)
    expect(dispatchFF).toHaveBeenNthCalledWith(1, userActions.setDisableUsers(true, 1))
    expect(dispatchFF).toHaveBeenNthCalledWith(2, userActions.setDisableUsers(false, 1))
    expect(dispatchFF).toHaveBeenNthCalledWith(3, userActions.unfollow(1))
})

test("Get users from server", async () => {
    const thunk = getUsersThunk(1, 10)
    await thunk(dispatchFF, getStateFF, {})

    expect(dispatchFF).toBeCalledTimes(5)
    expect(dispatchFF).toHaveBeenNthCalledWith(1, userActions.setFetching(true))
    expect(dispatchFF).toHaveBeenNthCalledWith(2, userActions.setUsers(resultUsers.items))
    expect(dispatchFF).toHaveBeenNthCalledWith(3, userActions.setUsersCount(resultUsers.totalCount))
    expect(dispatchFF).toHaveBeenNthCalledWith(4, userActions.setCurrentPage(1))
    expect(dispatchFF).toHaveBeenNthCalledWith(5, userActions.setFetching(false))
})