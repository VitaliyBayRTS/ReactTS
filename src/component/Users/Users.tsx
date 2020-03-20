import React from "react";
import s from "./Users.module.scss";
import axios from "axios";
import userIcon from "../../assets/img/user.jpeg";

let Users = (props: any) => {
    let getUsers = () => {
        if (props.users.length == 0) {
            axios.get("https://social-network.samuraijs.com/api/1.0/users").then((response: any) => {
                props.setUsers(response.data.items);
            })
        }
    }
    

    let usersProfils = props.users.map((u: any) => {
    return <div key={u.id}>
        <div>
            <img src={u.photos.small != null ? u.photos.small : userIcon} alt="" className={s.avatar} />

            {u.followed ? <button onClick={() => props.unfollow(u.id)}>Unfollow</button> :
                <button onClick={() => props.follow(u.id)}>Follow</button>}
        </div>
        <div>
            <span>{u.name}</span>
            <span>{u.status}</span>
            <span>{"u.location.city"}</span>
            <span>{"u.location.country"}</span>
        </div>
    </div>
    })

    return <div>
        <button onClick={getUsers}>Get Users</button>
        {usersProfils}
    </div>
}

export default Users;