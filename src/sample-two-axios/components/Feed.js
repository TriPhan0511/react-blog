import React, { useContext } from 'react'
import PostContext from '../context/PostContext'
import Post from './Post'

const Feed = () => {
  const { posts, filter } = useContext(PostContext)
  const filteredPosts = posts
    .filter((post) => post.title.includes(filter) || post.body.includes(filter))
    .reverse()
  return (
    <>
      {filteredPosts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </>
  )
}

export default Feed
