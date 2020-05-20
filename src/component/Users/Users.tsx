import React, { FunctionComponent } from "react";
import Paginator from "../../utilities/Paginator/Paginator";
import User from "./User/User";

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

    return <div>
        <Paginator usersCount={props.usersCount} 
                    pageSize={props.pageSize} 
                    currentPage={props.currentPage}
                    onPaginationClick={props.onPaginationClick}
                    />
        {props.users.map((u: any) => <User disableUsers={props.disableUsers}
                        unfollowThunk={props.unfollowThunk}
                        followThunk={props.followThunk}
                        key={u.id}
                        userData={u}
            /> 
        // {
            // let user = u;
            // const propsInterface = {
            //     disableUsers: props.disableUsers,
            //     unfollowThunk: props.unfollowThunk,
            //     followThunk: props.followThunk,
            //     key: u.id,
            //     userData: u
            // }
            // return <User disableUsers={props.disableUsers}
            //             unfollowThunk={props.unfollowThunk}
            //             followThunk={props.followThunk}
            //             key={u.id}
            //             algo={u}
            // /> 
        //     return <div key={u.id}>
        //     <div>
        //         <NavLink to={"/profile/" + u.id}>
        //             <img src={u.photos.small != null ? u.photos.small : userIcon} alt="" className={s.avatar} />
        //         </NavLink>
        //         {u.followed ?
        //             <button disabled={props.disableUsers.some((id: any) => id === u.id)} onClick={() => {
        //                 props.unfollowThunk(u.id);
        //             }}>Unfollow</button> :
        //             <button disabled={props.disableUsers.some((id: any) => id === u.id)} onClick={() => {
        //                 props.followThunk(u.id);
        //             }}>Follow</button>}
        //     </div>
        //     <div>
        //         <span>{u.name}</span>
        //         <span>{u.status}</span>
        //         <span>{"props.u.location.city"}</span>
        //         <span>{"props.u.location.country"}</span>
        //     </div>
        // </div>
    
        // }
        )}
    </div>
}

export default Users;