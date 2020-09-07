import React, { useEffect } from "react";
import Paginator from "../../utilities/Paginator/Paginator";
import User from "./User/User";
import { usersType } from "../../types/types";
import UserSearchForm from "../UserSearchForm/UserSearchForm";
import { FilterType, getUsersThunk, unfollowThunk, followThunk } from "../../redux/usersReducer";
import { useSelector, useDispatch } from "react-redux";
import { getUsersSelector, getUserCount, getPageSize, getCurrentPage, isAuth, getDisableUsers, getFilter } from "../../redux/usersSelectors";

const Users: React.FC = () => {

    const users = useSelector(getUsersSelector)
    const usersCount = useSelector(getUserCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const isAuthValue = useSelector(isAuth)
    const disableUsers = useSelector(getDisableUsers)
    const filter = useSelector(getFilter)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsersThunk(currentPage, pageSize, filter))
    }, [])

    const onPaginationClick = (PageNumber: number) => {
        dispatch(getUsersThunk(PageNumber, pageSize, filter));
    }

    const onFilterApply = (filter: FilterType) => {
        dispatch(getUsersThunk(1, pageSize, filter))
    }

    const follow = (userId: number) => {
        dispatch(followThunk(userId))
    }
    const unfollow = (userId: number) => {
        dispatch(unfollowThunk(userId))
    }

    return <div>
        <UserSearchForm onFilterApply={onFilterApply}/>
        <Paginator itemCount={usersCount} 
                    pageSize={pageSize} 
                    currentPage={currentPage}
                    onPaginationClick={onPaginationClick}
                    />
        {users.map((u: usersType) => <User disableUsers={disableUsers}
                        isAuth={isAuthValue}
                        unfollowThunk={unfollow}
                        followThunk={follow}
                        key={u.id}
                        userData={u}
            /> 
        )}
    </div>
}

export default Users;