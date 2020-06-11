import { unfollowFollowChanging } from './../utilities/objectHelpers/objectHelper';
import { usersAPI } from "../dal/dal";
import { usersType } from '../types/types';

const FOLLOW: string = "FOLLOW";
const UNFOLLOW: string = "UNFOLLOW";
const SET_USERS: string = "SET-USERS";
const SET_CURRENT_PAGE: string = "SET_CURRENT_PAGE";
const SET_USERS_COUNT: string = "SET_USERS_COUNT";
const SET_FETCHING: string = "SET_FETCHING";
const DISABLE_USERS: string = "DISABLE_USERS";

type followType = {
    type: typeof FOLLOW,
    userId: number 
}
export const follow = (userId: number): followType => ({ type: FOLLOW, userId });
type unfollowType = {
    type: typeof UNFOLLOW,
    userId: number 
}
export const unfollow = (userId: number): unfollowType => ({ type: UNFOLLOW, userId });
type setUsersType = {
    type: typeof SET_USERS,
    users: usersType 
}
export const setUsers = (users: usersType): setUsersType => ({ type: SET_USERS, users });
type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE,
    page: number 
}
export const setCurrentPage = (page: number): setCurrentPageType => ({ type: SET_CURRENT_PAGE, page });
type setUsersCountType = {
    type: typeof SET_USERS_COUNT,
    count: number 
}
export const setUsersCount = (count: number): setUsersCountType => ({ type: SET_USERS_COUNT, count });
type setFetchingType = {
    type: typeof SET_FETCHING,
    value: boolean 
}
export const setFetching = (value: boolean): setFetchingType => ({ type: SET_FETCHING, value });
type setDisableUsersType = {
    type: typeof DISABLE_USERS,
    isDisable: boolean,
    usersId: number
}
export const setDisableUsers = (isDisable: boolean, usersId: number): setDisableUsersType => ({ type: DISABLE_USERS, isDisable, usersId });

export const getUsersThunk = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    if (data.error === null) {
        dispatch(setUsers(data.items));
        dispatch(setUsersCount(data.totalCount));
        dispatch(setFetching(false));
        dispatch(setCurrentPage(currentPage));
    }
}

const followUnfollowFlow = async (dispatch: any, usersId: number, dal: any, actionCreator: any) => {
    dispatch(setDisableUsers(true, usersId));
    const data = await dal(usersId);
    if (data.error == null) {
        dispatch(setDisableUsers(false, usersId));
        dispatch(actionCreator(usersId));
    }
}

export const unfollowThunk = (userId: number) => (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollow);
}
export const followThunk = (userId: number) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow, follow);
}


let initialState = {
    users: [] as Array<usersType>,
    usersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
    disableUsers: [] as Array<number>
}

type stateType = typeof initialState;


let usersReducer = (state: stateType = initialState, action: any): stateType => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: unfollowFollowChanging(state.users, ["id"], action.userId, {followed: true})
            }
        case UNFOLLOW:
            return {
                ...state,
                users: unfollowFollowChanging(state.users, ["id"], action.userId, {followed: false})
            }
        case SET_USERS:
            return {
                ...state,
                users: action.users
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.page
            }
        case SET_USERS_COUNT:
            return {
                ...state,
                usersCount: action.count
            }
        case SET_FETCHING:
            return {
                ...state,
                isFetching: action.value
            }
        case DISABLE_USERS:
            return {
                ...state,
                disableUsers: action.isDisable ? [...state.disableUsers, action.usersId]
                    : state.disableUsers.filter((id: any) => id !== action.usersId)
            }
        default:
            return state;
    }
}

export default usersReducer;