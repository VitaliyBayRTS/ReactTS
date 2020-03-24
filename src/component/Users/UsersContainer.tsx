import { connect } from "react-redux";
import Users from "./Users";
import { follow, unfollow, setUsers, setCurrentPage, setUsersCount, setFetching } from "../../redux/usersReducer";
import Axios from "axios";
import React from "react";
import Preloader from "../common/Preloader/Preloader";

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
}

class UsersClassComponent extends React.Component<MyProps>{

    componentDidMount() {
        this.props.setFetching(true);
        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then((response: any) => {
            this.props.setUsers(response.data.items);
            this.props.setUsersCount(response.data.totalCount);
            this.props.setFetching(false);
        })
    }

    onPaginationClick = (p: any) => {
        this.props.setFetching(true);
        this.props.setCurrentPage(p);
        Axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`).then((response: any) => {
            this.props.setUsers(response.data.items);
            this.props.setFetching(false);
        })
    }

    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : <Users users={this.props.users}
        unfollow={this.props.unfollow}
        follow={this.props.follow}
        usersCount={this.props.usersCount}
        pageSize={this.props.pageSize}
        currentPage={this.props.currentPage}
        onPaginationClick={this.onPaginationClick}/>}
        </>
    }
}



let mapStateToProps = (state: any) => {
    return {
        users: state.usersPage.users,
        usersCount: state.usersPage.usersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching
    }
}

let UserContainer = connect(mapStateToProps, {follow, unfollow, setUsers, 
    setCurrentPage, setUsersCount, setFetching})(UsersClassComponent);

export default UserContainer;