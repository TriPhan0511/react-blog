import React, { useContext } from 'react'
import BlogContext from './blogContext'
import Post from './Post'
import { filterPosts } from './postsOperations'

const Home = () => {
  const {
    state: { isLoading, fetchError, posts, filter },
  } = useContext(BlogContext)

  const content = isLoading ? (
    <p>Loading data...</p>
  ) : fetchError ? (
    <p style={{ color: 'red' }}>Error: {fetchError}</p>
  ) : posts?.length ? (
    filterPosts(posts, filter)
      .reverse()
      .map((post) => <Post key={post.id} post={post} />)
  ) : (
    <p>No posts to display.</p>
  )
  return <main className='Home'>{content}</main>
}

export default Home
