const FOLLOW: string = "FOLLOW";
const UNFOLLOW: string = "UNFOLLOW";
const SET_USERS: string = "SET-USERS";

export let followAC = (userId: number) => ({type: FOLLOW, userId});
export let unfollowAC = (userId: number) => ({type: UNFOLLOW, userId});
export let setUsersAC = (users: any) => ({type: SET_USERS, users});

let initialState = {
    users: []
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
                users: [...state.users, ...action.users]
            }
        default:
            return state;
    }
}

export default usersReducer;