import React from 'react'
import Post from './Post'

const Home = ({ posts }) => {
  return (
    <main className='Home'>
      {posts?.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts to display.</p>
      )}
    </main>
  )
}

export default Home
