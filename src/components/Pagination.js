import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Pagination = ({ paginate }) => 
{

  const [active, setActive] = useState(0);

  const totalPosts = [];

  for(let i = 2; i <= 32; i += 2)
  {
    totalPosts.push(i);
  }

  const handleClick = (index, post) =>
  {
    paginate([ post - 1, post ]);
    setActive(index);
  }

  useEffect(() => {

    

  }, []);

  return (
    <section className='pagination'>
        <span> &laquo; </span>
        {
            totalPosts.map((post, index) => (
                <Link to={''} id="paginate-btn" className={active === index ? 'active' : ""} key={index} onClick = {() => handleClick(index, post) }>
                { 
                  ((post / 2 )<= 9) ?
                  ("0" + post / 2) :
                  (post / 2)
                }
                </Link>
            ))
        }
        <span> &raquo; </span>
    </section>
  )
}

export default Pagination;