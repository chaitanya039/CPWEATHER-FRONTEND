import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PostPagination = ({ page, count, perPage }) => {

    let totalPages = Math.ceil(count / perPage);   // 9 / 3 = 3 pages are required.
    let startLoop = page;
    let diff = totalPages - page;
    if(diff <= 3)
    {
        startLoop = totalPages - 3;
    }
    let endLoop = startLoop + 3;
    if(startLoop <= 0)
    {
        startLoop = 1;
    }
    
    const links = () => {
        const store = [];
        for(let i = startLoop; i <= endLoop; i++)
        {
            store.push(
            <li key={i} className={ i == page ? "active" : "" }>
                <Link to={`/dashboard/${i}`}>{i}</Link>
            </li>
            );
        }
        return store;
    }
    
    const next = () =>
    {
        if(page < totalPages)
        {
            return(
                <li>
                    <Link to={`/dashboard/${parseInt(page) + 1}`}><i class="fa fa-angle-double-right"></i></Link>
                </li>
            )
        }
    }
    
    const prev = () => 
    {
        if(page > 1)
        {
            return(
                <li>
                    <Link to={`/dashboard/${parseInt(page) - 1}`}><i class="fa fa-angle-double-left"></i></Link>
                </li>
            )
        }
    }
    
    return totalPages && count > 3 ? (
        <div className="postpagination">
            {prev()}
            {links()}
            {next()}
        </div>
    ) : ""
}

export default PostPagination;