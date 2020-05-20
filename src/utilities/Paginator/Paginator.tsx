import React, { FunctionComponent } from "react";
import s from "./Paginator.module.scss";

interface PropsInterface {
    usersCount: any
    pageSize: any
    currentPage: any
    onPaginationClick: any
}

let Paginator: FunctionComponent<PropsInterface> = (props) => {

    let pageCount = Math.ceil(props.usersCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }

    return <div>
        {pages.map((p: any) => {
            return <span key={p} className={props.currentPage === p ?
                s.selectedPage + " " + s.paginationItem :
                s.paginationItem}
                onClick={(e) => { props.onPaginationClick(p) }}>{p}</span>
        })}
    </div>
}

export default Paginator;