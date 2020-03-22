const FOLLOW: string = "FOLLOW";
const UNFOLLOW: string = "UNFOLLOW";
const SET_USERS: string = "SET-USERS";
const SET_CURRENT_PAGE: string = "SET_CURRENT_PAGE";
const SET_USERS_COUNT: string = "SET_USERS_COUNT";

export let followAC = (userId: number) => ({type: FOLLOW, userId});
export let unfollowAC = (userId: number) => ({type: UNFOLLOW, userId});
export let setUsersAC = (users: any) => ({type: SET_USERS, users});
export let setCurrentPageAC = (page: any) => ({type: SET_CURRENT_PAGE, page});
export let setUsersCountAC = (count: any) => ({type: SET_USERS_COUNT, count});

let initialState = {
    users: [],
    usersCount: 0,
    pageSize: 5,
    currentPage: 1
}


let usersReducer = (state: any = initialState, action: any) => {
    // debugger;
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
        default:
            return state;
    }
}

export default usersReducer;