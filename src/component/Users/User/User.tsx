import React, { FunctionComponent } from "react";
import s from "../Users.module.scss";
import userIcon from "../../../assets/img/user.jpeg";
import { NavLink } from "react-router-dom";

interface PropsInterface {
    userData: any
    disableUsers: any
    unfollowThunk: any
    followThunk: any
    key: any
}

let User: FunctionComponent<PropsInterface> = (props) => {

    return <div>
        <div>
            <NavLink to={"/profile/" + props.userData.id}>
                <img src={props.userData.photos.small != null ? props.userData.photos.small : userIcon} alt="" className={s.avatar} />
            </NavLink>
            {props.userData.followed ?
                <button disabled={props.disableUsers.some((id: any) => id === props.userData.id)} onClick={() => {
                    props.unfollowThunk(props.userData.id);
                }}>Unfollow</button> :
                <button disabled={props.disableUsers.some((id: any) => id === props.userData.id)} onClick={() => {
                    props.followThunk(props.userData.id);
                }}>Follow</button>}
        </div>
        <div>
            <span>{props.userData.name}</span>
            <span>{props.userData.status}</span>
            <span>{"props.userData.location.city"}</span>
            <span>{"props.userData.location.country"}</span>
        </div>
    </div>
}

export default User;