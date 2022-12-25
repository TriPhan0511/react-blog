import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import BlogContext from './blogContext'

const Nav = () => {
  const {
    state: { filter },
    dispatch,
  } = useContext(BlogContext)
  return (
    <nav className='Nav'>
      <form className='searchForm' onSubmit={(e) => e.preventDefault}>
        <label htmlFor='search'>Search Posts</label>
        <input
          type='text'
          id='search'
          placeholder='Search Post'
          value={filter}
          onChange={(e) => {
            dispatch({
              type: 'setFilter',
              payload: e.target.value,
            })
          }}
        />
      </form>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='post'>Post</Link>
        </li>
        <li>
          <Link to='about'>About</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Nav
