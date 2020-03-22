import React, { Component } from "react";
import s from "./Users.module.scss";
import axios from "axios";
import userIcon from "../../assets/img/user.jpeg";

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
}

class Users extends React.Component<MyProps>{

    componentDidMount() {
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${this.props.currentPage}&count=${this.props.pageSize}`).then((response: any) => {
            this.props.setUsers(response.data.items);
            this.props.setUsersCount(response.data.totalCount);
        })
    }

    onPaginationClick(p: any) {
        this.props.setCurrentPage(p);
        axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${p}&count=${this.props.pageSize}`).then((response: any) => {
            this.props.setUsers(response.data.items);
        })
    }

    render() {
        debugger;
        let pageCount = Math.ceil(this.props.usersCount / this.props.pageSize);

        let pages = [];
        for (let i = 1; i <= pageCount; i++) {
            pages.push(i);
        }


        return <div>
            {pages.map((p: any) => {
                return <span className={this.props.currentPage == p ? s.selectedPage + " " + s.paginationItem : s.paginationItem}
                    onClick={(e) => { this.onPaginationClick(p) }}>{p}</span>
            })}
            {this.props.users.map((u: any) => {
                return <div key={u.id}>
                    <div>
                        <img src={u.photos.small != null ? u.photos.small : userIcon} alt="" className={s.avatar} />

                        {u.followed ? <button onClick={() => this.props.unfollow(u.id)}>Unfollow</button> :
                            <button onClick={() => this.props.follow(u.id)}>Follow</button>}
                    </div>
                    <div>
                        <span>{u.name}</span>
                        <span>{u.status}</span>
                        <span>{"u.location.city"}</span>
                        <span>{"u.location.country"}</span>
                    </div>
                </div>
            })}
        </div>
    }
}

export default Users;