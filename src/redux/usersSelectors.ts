import { createSelector } from 'reselect';

const getUsers = (state: any) => {
    return state.usersPage.users
}

export const getUsersSelector = createSelector(getUsers, (users) => {
    return users.filter((a: any) => true)
})

export const getUserCount = (state: any) => {
    return state.usersPage.usersCount
}
export const getPageSize = (state: any) => {
    return state.usersPage.pageSize
}
export const getCurrentPage = (state: any) => {
    return state.usersPage.currentPage
}
export const getIsFetching = (state: any) => {
    return state.usersPage.isFetching
}
export const getDisableUsers = (state: any) => {
    return state.usersPage.disableUsers
}