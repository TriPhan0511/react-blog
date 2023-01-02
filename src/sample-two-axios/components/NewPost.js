import React, { useContext } from 'react'
import PostContext from '../context/PostContext'

const NewPost = () => {
  const { postTitle, setPostTitle, postBody, setPostBody, addPost } = useContext(PostContext)
  const handleSubmit = async (e) => {
    e.preventDefault()
    addPost()
  }
  return (
    <main className='NewPost'>
      <h2>New Post</h2>
      <form className='newPostForm' onSubmit={handleSubmit}>
        <label htmlFor='postTitle'>Title:</label>
        <input
          type='text'
          id='postTitle'
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea id='postBody' value={postBody} onChange={(e) => setPostBody(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost
