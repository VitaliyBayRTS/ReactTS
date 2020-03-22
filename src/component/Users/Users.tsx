import React, { Component } from "react";
import s from "./Users.module.scss";
import axios from "axios";
import userIcon from "../../assets/img/user.jpeg";

interface MyProps {
    setUsers: any
    users: any
    unfollow: any
    follow: any
}

class Users extends React.Component<MyProps>{

    // constructor(props: any) {
    //     super(props);
       
    // }

    componentDidMount() {
        axios.get("https://social-network.samuraijs.com/api/1.0/users").then((response: any) => {
            this.props.setUsers(response.data.items);
        })
    }

    render() {
        return <div>
            { this.props.users.map((u: any) => { return <div key={u.id}>
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
                }) }
            </div>
    }
}

export default Users;