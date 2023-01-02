import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import PostContext from '../context/PostContext'

const Header = () => {
  const { filter, setFilter } = useContext(PostContext)
  return (
    <>
      <header className='Header'>
        <h1>React Blog</h1>
      </header>
      <nav className='Nav'>
        <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
          <label htmlFor='search'>Search Posts</label>
          <input
            type='text'
            id='search'
            placeholder='Search Posts'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </form>
        <ul>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/post'>Post</Link>
          </li>
          <li>
            <Link to='/about'>About</Link>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default Header
