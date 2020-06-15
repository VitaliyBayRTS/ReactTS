import React, { FunctionComponent, useState } from "react";
import s from "./Paginator.module.scss";
import cn from 'classnames';

interface PropsInterface {
    itemCount: number,
    pageSize: number,
    currentPage: number,
    onPaginationClick: (p: number) => void
}

let Paginator: FunctionComponent<PropsInterface> = (props) => {

    let pageCount = Math.ceil(props.itemCount / props.pageSize);

    let pages = [];
    for (let i = 1; i <= pageCount; i++) {
        pages.push(i);
    }
    let portionSize = 10;
    let portionCount = Math.ceil(pageCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionNumber = (portionNumber -1) * portionSize + 1;
    let rightPortionNumber = portionNumber * portionSize;

    return <div className={s.paginatorBox}>
        <button className={s.btn} disabled={portionNumber <= 1}
        onClick={() => {setPortionNumber(portionNumber - 1)}
        }>Prev</button>
        {pages.filter((p: any) => p >= leftPortionNumber && p <= rightPortionNumber).map((p: any) => {
            return <span key={p} className={cn(s.paginationItem, {
                    [s.selectedPage]: props.currentPage === p
                })}
                onClick={(e) => { 
                    props.onPaginationClick(p)
                 }}>{p}</span>
        })}
        <button className={s.btn} onClick={() => {setPortionNumber(portionNumber + 1)}}
        disabled={portionNumber >= portionCount}>Next</button>
    </div>
}

export default Paginator;