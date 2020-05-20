import { unfollowFollowChanging } from './../utilities/objectHelpers/objectHelper';
import { usersAPI } from "../dal/dal";

const FOLLOW: string = "FOLLOW";
const UNFOLLOW: string = "UNFOLLOW";
const SET_USERS: string = "SET-USERS";
const SET_CURRENT_PAGE: string = "SET_CURRENT_PAGE";
const SET_USERS_COUNT: string = "SET_USERS_COUNT";
const SET_FETCHING: string = "SET_FETCHING";
const DISABLE_USERS: string = "DISABLE_USERS";

export const follow = (userId: number) => ({ type: FOLLOW, userId });
export const unfollow = (userId: number) => ({ type: UNFOLLOW, userId });
export const setUsers = (users: any) => ({ type: SET_USERS, users });
export const setCurrentPage = (page: any) => ({ type: SET_CURRENT_PAGE, page });
export const setUsersCount = (count: any) => ({ type: SET_USERS_COUNT, count });
export const setFetching = (value: any) => ({ type: SET_FETCHING, value });
export const setDisableUsers = (isDisable: any, usersId: any) => ({ type: DISABLE_USERS, isDisable, usersId });

export const getUsersThunk = (currentPage: any, pageSize: any) => async (dispatch: any) => {
    dispatch(setFetching(true));
    const data = await usersAPI.getUsers(currentPage, pageSize);
    if (data.error === null) {
        dispatch(setUsers(data.items));
        dispatch(setUsersCount(data.totalCount));
        dispatch(setFetching(false));
        dispatch(setCurrentPage(currentPage));
    }
}

const followUnfollowFlow = async (dispatch: any, usersId: any, dal: any, actionCreator: any) => {
    dispatch(setDisableUsers(true, usersId));
    const data = await dal(usersId);
    if (data.error == null) {
        dispatch(setDisableUsers(false, usersId));
        dispatch(actionCreator(usersId));
    }
}

export const unfollowThunk = (userId: any) => (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.unfollow, unfollow);
}
export const followThunk = (userId: any) => async (dispatch: any) => {
    followUnfollowFlow(dispatch, userId, usersAPI.follow, follow);
}

let initialState = {
    users: [],
    usersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true,
    disableUsers: []
}


let usersReducer = (state: any = initialState, action: any) => {
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