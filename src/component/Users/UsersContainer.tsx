import { connect } from "react-redux";
import Users from "./Users";
import { getUsersThunk, unfollowThunk, followThunk } from "../../redux/usersReducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import { getUsersSelector, getUserCount, getPageSize, getCurrentPage, getIsFetching, getDisableUsers } from "../../redux/usersSelectors";
import { usersType } from "../../types/types";
import { stateType } from "../../redux/redux-store";

type mapStateToPropsType = {
    users: Array<usersType>,
    usersCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    disableUsers: Array<number>
}

type mapDispatchToPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number) => void,
    unfollowThunk: (userId: number) => void,
    followThunk: (userId: number) => void
}

type MyProps = mapStateToPropsType & mapDispatchToPropsType

class UsersClassComponent extends React.Component<MyProps>{

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsersThunk(currentPage, pageSize);
    }

    onPaginationClick = (p: number) => {
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

let mapStateToProps = (state: stateType): mapStateToPropsType => {
    return {
        users: getUsersSelector(state),
        usersCount: getUserCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        disableUsers: getDisableUsers(state)
    }
}

let UserContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, stateType>
(mapStateToProps, {getUsersThunk, unfollowThunk, followThunk})(UsersClassComponent);

export default UserContainer;