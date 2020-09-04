import React, { FunctionComponent } from "react";
import Paginator from "../../utilities/Paginator/Paginator";
import User from "./User/User";
import { usersType } from "../../types/types";
import UserSearchForm from "../UserSearchForm/UserSearchForm";
import { FilterType } from "../../redux/usersReducer";

type PropsInterface = {
    users: Array<usersType>,
    usersCount: number,
    pageSize: number,
    currentPage: number,
    isAuth: boolean,
    onPaginationClick: (p: number) => void,
    disableUsers: Array<number>,
    unfollowThunk: (userId: number) => void,
    followThunk: (userId: number) => void,
    onFilterApply: (filter: FilterType) => void
}

let Users: FunctionComponent<PropsInterface> = (props) => {

    return <div>
        <UserSearchForm onFilterApply={props.onFilterApply}/>
        <Paginator itemCount={props.usersCount} 
                    pageSize={props.pageSize} 
                    currentPage={props.currentPage}
                    onPaginationClick={props.onPaginationClick}
                    />
        {props.users.map((u: any) => <User disableUsers={props.disableUsers}
                        isAuth={props.isAuth}
                        unfollowThunk={props.unfollowThunk}
                        followThunk={props.followThunk}
                        key={u.id}
                        userData={u}
            /> 
        )}
    </div>
}

export default Users;