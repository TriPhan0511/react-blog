import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogContext from './blogContext'

const NewPost = ({ addPost }) => {
  const {
    state: { postTitle, postBody },
    dispatch,
  } = useContext(BlogContext)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    addPost(postTitle, postBody)
    dispatch({
      type: 'setPostTitle',
      payload: '',
    })
    dispatch({
      type: 'setPostBody',
      payload: '',
    })
    navigate('/')
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
          onChange={(e) =>
            dispatch({
              type: 'setPostTitle',
              payload: e.target.value,
            })
          }
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea
          id='postBody'
          required
          value={postBody}
          onChange={(e) =>
            dispatch({
              type: 'setPostBody',
              payload: e.target.value,
            })
          }
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost
