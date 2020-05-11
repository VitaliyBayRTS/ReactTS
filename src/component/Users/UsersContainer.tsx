import { connect } from "react-redux";
import Users from "./Users";
import { getUsersThunk, unfollowThunk, followThunk } from "../../redux/usersReducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import { getUsersSelector, getUserCount, getPageSize, getCurrentPage, getIsFetching, getDisableUsers } from "../../redux/usersSelectors";

interface MyProps {
    users: any
    usersCount: any
    pageSize: any
    currentPage: any
    isFetching: any
    disableUsers: any
    getUsersThunk: any
    unfollowThunk: any
    followThunk: any
}

class UsersClassComponent extends React.Component<MyProps>{

    componentDidMount() {
        this.props.getUsersThunk(this.props.currentPage, this.props.pageSize);
    }

    onPaginationClick = (p: any) => {
        this.props.getUsersThunk(p, this.props.pageSize);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : <Users users={this.props.users}
                usersCount={this.props.usersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                onPaginationClick={this.onPaginationClick}
                disableUsers={this.props.disableUsers}
                unfollowThunk={this.props.unfollowThunk}
                followThunk={this.props.followThunk} />}
        </>
    }
}

let mapStateToProps = (state: any) => {
    return {
        users: getUsersSelector(state),
        usersCount: getUserCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        disableUsers: getDisableUsers(state)
    }
}

let UserContainer = connect(mapStateToProps, {getUsersThunk, unfollowThunk, followThunk})(UsersClassComponent);

export default UserContainer;