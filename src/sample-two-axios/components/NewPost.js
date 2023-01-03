import React, { useContext, useState } from 'react'
import PostContext from '../context/PostContext'
import { format } from 'date-fns'
import { api } from '../api/posts'
import { useNavigate } from 'react-router-dom'

const NewPost = () => {
  const {
    state: { posts },
    dispatch,
  } = useContext(PostContext)
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

  // Add a new post
  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts?.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'iiii, MMMM dd, yyyy pp')
    const post = { id, datetime, title: postTitle, body: postBody }
    try {
      await api.post('/posts', post)
      dispatch({
        type: 'setPosts',
        payload: [...posts, post],
      })
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
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
        <textarea
          id='postBody'
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default NewPost
// import React, { useContext } from 'react'
// import PostContext from '../context/PostContext'

// const NewPost = () => {
//   const { postTitle, setPostTitle, postBody, setPostBody, addPost } = useContext(PostContext)
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     addPost()
//   }
//   return (
//     <main className='NewPost'>
//       <h2>New Post</h2>
//       <form className='newPostForm' onSubmit={handleSubmit}>
//         <label htmlFor='postTitle'>Title:</label>
//         <input
//           type='text'
//           id='postTitle'
//           required
//           value={postTitle}
//           onChange={(e) => setPostTitle(e.target.value)}
//         />
//         <label htmlFor='postBody'>Post:</label>
//         <textarea id='postBody' value={postBody} onChange={(e) => setPostBody(e.target.value)} />
//         <button type='submit'>Submit</button>
//       </form>
//     </main>
//   )
// }

// export default NewPost
