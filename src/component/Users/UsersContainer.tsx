import { connect } from "react-redux";
import Users from "./Users";
import { followAC, unfollowAC, setUsersAC, setCurrentPageAC, setUsersCountAC } from "../../redux/usersReducer";

let mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        usersCount: state.usersPage.usersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
    }
}

let mapDispatchToProps = (dispatch: any) => {
    return {
        follow: (userId: number) => {
            dispatch(followAC(userId));
        },
        unfollow: (userId: number) => {
            dispatch(unfollowAC(userId))
        },
        setUsers: (users: any) => {
            dispatch(setUsersAC(users));
        },
        setCurrentPage: (page: any) => {
            dispatch(setCurrentPageAC(page));
        },
        setUsersCount: (count: any) => {
            dispatch(setUsersCountAC(count));
        }
    }
}

let UserContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UserContainer;