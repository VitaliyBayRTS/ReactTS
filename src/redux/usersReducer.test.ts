import usersReducer, { userStateType, userActions } from './usersReducer';
let state: userStateType;

beforeEach(() => {
    state = {
        users: [
            {id: 0, name: 'Vitaliy 0', photos: {small: '', large: ''}, followed: false, status: 'status 0'},
            {id: 1, name: 'Vitaliy 1', photos: {small: '', large: ''}, followed: false, status: 'status 1'},
            {id: 2, name: 'Vitaliy 2', photos: {small: '', large: ''}, followed: true, status: 'status 2'},
            {id: 3, name: 'Vitaliy 3', photos: {small: '', large: ''}, followed: true, status: 'status 3'},
        ],
        usersCount: 0,
        pageSize: 5,
        currentPage: 1,
        isFetching: true,
        disableUsers: []
    }
})

test("Follow Seccess", () => {
    const newState = usersReducer(state, userActions.follow(1))

    expect(newState.users[0].followed).toBeFalsy()
    expect(newState.users[1].followed).toBeTruthy()
})

test("Unfollow Seccess", () => {
    const newState = usersReducer(state, userActions.unfollow(2))

    expect(newState.users[2].followed).toBeFalsy()
    expect(newState.users[3].followed).toBeTruthy()
})

test("Set 5 new users", () => {

    const newUsers = [
        {id: 10, name: 'Vitaliy 10', photos: {small: '', large: ''}, followed: false, status: 'status 10'},
        {id: 11, name: 'Vitaliy 11', photos: {small: '', large: ''}, followed: false, status: 'status 11'},
        {id: 12, name: 'Vitaliy 12', photos: {small: '', large: ''}, followed: true, status: 'status 12'},
        {id: 13, name: 'Vitaliy 13', photos: {small: '', large: ''}, followed: true, status: 'status 13'},
        {id: 14, name: 'Vitaliy 14', photos: {small: '', large: ''}, followed: false, status: 'status 14'},
    ]

    const newState = usersReducer(state, userActions.setUsers(newUsers))

    expect(newState.users.length).toBe(5)
    expect(newState.users.length).not.toBe(4)
    expect(newState.users[0].id).toBe(10)
})

test("Set current page", () => {
    const newState = usersReducer(state, userActions.setCurrentPage(5))

    expect(newState.currentPage).not.toBe(1)
    expect(newState.currentPage).toBe(5)
})

test("Set amount of users", () => {
    const newState = usersReducer(state, userActions.setUsersCount(20))

    expect(newState.usersCount).not.toBe(0)
    expect(newState.usersCount).toBe(20)
})

test("Final of Fetching", () => {
    const newState = usersReducer(state, userActions.setFetching(false))

    expect(newState.isFetching).toBeFalsy()
})

test("Initializing of Fetching", () => {
    let newState = usersReducer(state, userActions.setFetching(false))
    expect(newState.isFetching).toBeFalsy()
    newState = usersReducer(state, userActions.setFetching(true))
    expect(newState.isFetching).toBeTruthy()
})

test("Adding disabled buttons of users (follow/unfollow buttons)", () => {
    const newState = usersReducer(state, userActions.setDisableUsers(true, 1))
    
    expect(newState.disableUsers.length).toBe(1)
    expect(newState.disableUsers[0]).toBe(1)
})

test("Remove disabled buttons of users (follow/unfollow buttons)", () => {
    let newState = usersReducer(state, userActions.setDisableUsers(true, 1))
    newState = usersReducer(newState, userActions.setDisableUsers(true, 2))

    expect(newState.disableUsers.length).toBe(2)

    newState = usersReducer(newState, userActions.setDisableUsers(false, 1))
    
    expect(newState.disableUsers.length).toBe(1)
    expect(newState.disableUsers[0]).toBe(2)
})