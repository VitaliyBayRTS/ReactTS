import { connect } from "react-redux";
import Users from "./Users";
import { getUsersThunk, unfollowThunk, followThunk, FilterType } from "../../redux/usersReducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import { getUsersSelector, getUserCount, getPageSize, 
        getCurrentPage, getIsFetching, getDisableUsers, 
        isAuth, getFilter } from "../../redux/usersSelectors";
import { usersType } from "../../types/types";
import { stateType } from "../../redux/redux-store";

type mapStateToPropsType = {
    users: Array<usersType>,
    usersCount: number,
    pageSize: number,
    currentPage: number,
    isFetching: boolean,
    disableUsers: Array<number>,
    isAuth: boolean,
    filter: FilterType
}

type mapDispatchToPropsType = {
    getUsersThunk: (currentPage: number, pageSize: number, filter: FilterType) => void,
    unfollowThunk: (userId: number) => void,
    followThunk: (userId: number) => void
}

type MyProps = mapStateToPropsType & mapDispatchToPropsType

class UsersClassComponent extends React.Component<MyProps>{

    componentDidMount() {
        let {currentPage, pageSize} = this.props;
        this.props.getUsersThunk(currentPage, pageSize, this.props.filter);
    }

    onPaginationClick = (PageNumber: number) => {
        this.props.getUsersThunk(PageNumber, this.props.pageSize, this.props.filter);
    }

    onFilterApply = (filter: FilterType) => {
        this.props.getUsersThunk(1, this.props.pageSize, filter);
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : <Users users={this.props.users}
                usersCount={this.props.usersCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                isAuth = {this.props.isAuth}
                onPaginationClick={this.onPaginationClick}
                disableUsers={this.props.disableUsers}
                unfollowThunk={this.props.unfollowThunk}
                followThunk={this.props.followThunk}
                onFilterApply={this.onFilterApply} />}
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
        disableUsers: getDisableUsers(state),
        isAuth: isAuth(state),
        filter: getFilter(state)
    }
}

let UserContainer = connect<mapStateToPropsType, mapDispatchToPropsType, {}, stateType>
(mapStateToProps, {getUsersThunk, unfollowThunk, followThunk})(UsersClassComponent);

export default UserContainer;