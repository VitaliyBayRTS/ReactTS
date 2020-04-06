import { connect } from "react-redux";
import Users from "./Users";
import { follow, unfollow, setUsers, setCurrentPage, setUsersCount, setFetching, setDisableUsers } from "../../redux/usersReducer";
import React from "react";
import Preloader from "../common/Preloader/Preloader";
import { getUsers } from "../../dal/dal";

interface MyProps {
    setUsers: any
    users: any
    unfollow: any
    follow: any
    usersCount: any
    pageSize: any
    currentPage: any
    setCurrentPage: any
    setUsersCount: any
    setFetching: any
    isFetching: any
    setDisableUsers: any
    disableUsers: any
}

class UsersClassComponent extends React.Component<MyProps>{

    componentDidMount() {
        this.props.setFetching(true);
        getUsers(this.props.currentPage, this.props.pageSize).then((data: any) => {
            if (data.error == null) {
                this.props.setUsers(data.items);
                this.props.setUsersCount(data.totalCount);
                this.props.setFetching(false);
            }
        })
    }

    onPaginationClick = (p: any) => {
        this.props.setFetching(true);
        this.props.setCurrentPage(p);
        getUsers(p, this.props.pageSize).then((data: any) => {
            if (data.error == null) {
                this.props.setUsers(data.items);
                this.props.setFetching(false);
            }
        })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : <Users users = {this.props.users}
                unfollow = {this.props.unfollow}
                follow = {this.props.follow}
                usersCount = {this.props.usersCount}
                pageSize = {this.props.pageSize}
                currentPage = {this.props.currentPage}
                onPaginationClick = {this.onPaginationClick}
                setDisableUsers ={this.props.setDisableUsers}
                disableUsers = {this.props.disableUsers} />}
        </>
    }
}



let mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        usersCount: state.usersPage.usersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        disableUsers: state.usersPage.disableUsers
    }
}

let UserContainer = connect(mapStateToProps, {
    follow, unfollow, setUsers,
    setCurrentPage, setUsersCount, setFetching, setDisableUsers
})(UsersClassComponent);

export default UserContainer;