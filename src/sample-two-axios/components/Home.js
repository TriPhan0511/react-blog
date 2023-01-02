import React, { useContext } from 'react'
import PostContext from '../context/PostContext'
import { Link } from 'react-router-dom'
import Feed from './Feed'

const Home = () => {
  const { posts } = useContext(PostContext)
  return (
    <main className='Home'>
      {posts.length ? (
        <Feed />
      ) : (
        <>
          <h2>Nothing to show.</h2>
          <p>Well, that's disapoiting.</p>
          <p style={{ marginTop: '1rem' }}>
            <Link to='/'>Visit Our HomePage</Link>
          </p>
        </>
      )}
    </main>
  )
}

export default Home
