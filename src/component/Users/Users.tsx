import React, { Component, FunctionComponent } from "react";
import s from "./Users.module.scss";
import userIcon from "../../assets/img/user.jpeg";
import { NavLink } from "react-router-dom";

interface PropsInterface {
    users: any
    usersCount: any
    pageSize: any
    currentPage: any
    onPaginationClick: any
    disableUsers: any
    unfollowThunk: any
    followThunk: any
}

let Users: FunctionComponent<PropsInterface> = (props) => {

    let pageCount = Math.ceil(props.usersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map((p: any) => {
            return <span key={p} className={props.currentPage == p ?
                s.selectedPage + " " + s.paginationItem :
                s.paginationItem}
                onClick={(e) => { props.onPaginationClick(p) }}>{p}</span>
        })}
        {props.users.map((u: any) => {
            return <div key={u.id}>
                <div>
                    <NavLink to={"/profile/" + u.id}>
                        <img src={u.photos.small != null ? u.photos.small : userIcon} alt="" className={s.avatar} />
                    </NavLink>
                    {u.followed ?
                        <button disabled={props.disableUsers.some((id: any) => id == u.id)} onClick={() => {
                            props.unfollowThunk(u.id);
                        }}>Unfollow</button> :
                        <button disabled={props.disableUsers.some((id: any) => id == u.id)} onClick={() => {
                            props.followThunk(u.id);
                        }}>Follow</button>}
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

export default Users;