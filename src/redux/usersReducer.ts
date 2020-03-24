const FOLLOW: string = "FOLLOW";
const UNFOLLOW: string = "UNFOLLOW";
const SET_USERS: string = "SET-USERS";
const SET_CURRENT_PAGE: string = "SET_CURRENT_PAGE";
const SET_USERS_COUNT: string = "SET_USERS_COUNT";
const SET_FETCHING: string = "SET_FETCHING";

export let follow = (userId: number) => ({type: FOLLOW, userId});
export let unfollow = (userId: number) => ({type: UNFOLLOW, userId});
export let setUsers = (users: any) => ({type: SET_USERS, users});
export let setCurrentPage = (page: any) => ({type: SET_CURRENT_PAGE, page});
export let setUsersCount = (count: any) => ({type: SET_USERS_COUNT, count});
export let setFetching = (value: any) => ({type: SET_FETCHING, value});

let initialState = {
    users: [],
    usersCount: 0,
    pageSize: 5,
    currentPage: 1,
    isFetching: true
}


let usersReducer = (state: any = initialState, action: any) => {
    switch (action.type) {
        case FOLLOW:
            return {
                ...state,
                users: state.users.map( (u: any) => {
                    if(u.id == action.userId) {
                        return {...u, followed: true};
                    }
                    return u;
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map( (u: any) => {
                    if(u.id == action.userId) {
                        return {...u, followed: false};
                    }
                    return u;
                })
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
        default:
            return state;
    }
}

export default usersReducer;