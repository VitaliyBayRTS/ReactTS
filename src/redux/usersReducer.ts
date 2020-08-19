import { unfollowFollowChanging } from './../utilities/objectHelpers/objectHelper';
import { usersAPI, unfollowFollowTypes } from "../dal/dal";
import { usersType } from '../types/types';
import { ThunkAction } from 'redux-thunk';
import { Dispatch } from 'redux';
import { InferActionsTypes } from './redux-store';

type ActionsTypes = InferActionsTypes<typeof userActions>

export const userActions = {
    follow: (userId: number) => ({ type: 'FOLLOW', userId } as const),
    unfollow: (userId: number) => ({ type: 'UNFOLLOW', userId } as const),
    setUsers: (users: Array<usersType>) => ({ type: 'SET_USERS', users } as const),
    setCurrentPage: (page: number) => ({ type: 'SET_CURRENT_PAGE', page } as const),
    setUsersCount: (count: number) => ({ type: 'SET_USERS_COUNT', count } as const),
    setFetching: (value: boolean) => ({ type: 'SET_FETCHING', value } as const),
    setDisableUsers: (isDisable: boolean, usersId: number) => ({ type: 'DISABLE_USERS', isDisable, usersId } as const)
}


type ThunkType = ThunkAction<Promise<void>, userStateType, unknown, ActionsTypes>
type DispatchType = Dispatch<ActionsTypes>

export const getUsersThunk =
(currentPage: number, pageSize: number): ThunkType => async (dispatch) => {
    dispatch(userActions.setFetching(true)) // Enable Preloader component
    const data = await usersAPI.getUsers(currentPage, pageSize);
    if (data.error === null) {
        dispatch(userActions.setUsers(data.items))
        dispatch(userActions.setUsersCount(data.totalCount))
        dispatch(userActions.setCurrentPage(currentPage))
        dispatch(userActions.setFetching(false)) // Disable Preloader component
    } 
}

const followUnfollowFlow = async (dispatch: DispatchType, 
                                userId: number, 
                                userAPI: (userId: number) => Promise<unfollowFollowTypes>, 
                                actionCreator: (userId: number) => ActionsTypes) => {
    dispatch(userActions.setDisableUsers(true, userId))
    const data = await userAPI(userId)
    if (data.resultCode == 0) {
        dispatch(userActions.setDisableUsers(false, userId))
        dispatch(actionCreator(userId))
    }
} 

export const unfollowThunk = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.unfollow, userActions.unfollow);
}
export const followThunk = (userId: number): ThunkType => async (dispatch) => {
    await followUnfollowFlow(dispatch, userId, usersAPI.follow, userActions.follow);
}


let initialState = {
    users: [] as Array<usersType>,
    usersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
    disableUsers: [] as Array<number> // Aray of users id
}

export type userStateType = typeof initialState;


let usersReducer = (state = initialState, action: ActionsTypes): userStateType => {
    switch (action.type) {
        case 'FOLLOW':
            return {
                ...state,
                users: unfollowFollowChanging(state.users, ["id"], action.userId, {followed: true})
            }
        case 'UNFOLLOW':
            return {
                ...state,
                users: unfollowFollowChanging(state.users, ["id"], action.userId, {followed: false})
            }
        case 'SET_USERS':
            return {
                ...state,
                users: action.users
            }
        case 'SET_CURRENT_PAGE':
            return {
                ...state,
                currentPage: action.page
            }
        case 'SET_USERS_COUNT':
            return {
                ...state,
                usersCount: action.count
            }
        case 'SET_FETCHING':
            return {
                ...state,
                isFetching: action.value
            }
        case 'DISABLE_USERS':
            return {
                ...state,
                disableUsers: action.isDisable ? [...state.disableUsers, action.usersId]
                    : state.disableUsers.filter((id: number) => id !== action.usersId)
            }
        default:
            return state;
    }
}

export default usersReducer;