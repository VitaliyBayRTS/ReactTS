import React, { FunctionComponent } from "react";
import s from "../Users.module.scss";
import userIcon from "../../../assets/img/user.jpeg";
import { NavLink } from "react-router-dom";
import { usersType } from "../../../types/types";

interface PropsType {
    userData: usersType,
    disableUsers: Array<number>,
    isAuth: boolean,
    unfollowThunk: (userId: number) => void,
    followThunk: (userId: number) => void
}

let User: FunctionComponent<PropsType> = (props) => {

    return <div className={s.userBox}>
        <div>
            <NavLink to={"/profile/" + props.userData.id}>
                <img src={props.userData.photos.small != null ? props.userData.photos.small : userIcon} alt="" className={s.avatar} />
            </NavLink>
            {props.userData.followed ?
                <button disabled={props.disableUsers.some((id: number) => id === props.userData.id )} onClick={() => {
                    props.unfollowThunk(props.userData.id);
                }}>Unfollow</button> :
                <button disabled={props.disableUsers.some((id: number) => id === props.userData.id) && props.isAuth} onClick={() => {
                    props.followThunk(props.userData.id);
                }}>Follow</button>}
        </div>
        <div>
            <span><b>User name:</b> {props.userData.name}</span>
            <span><b>Satus:</b> {props.userData.status || "-----" }</span>
        </div>
    </div>
}

export default User;