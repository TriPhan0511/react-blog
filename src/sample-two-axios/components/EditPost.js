import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import PostContext from '../context/PostContext'
import { format } from 'date-fns'
import { api } from '../api/posts'

const EditPost = () => {
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const {
    state: { posts },
    dispatch,
  } = useContext(PostContext)
  const navigate = useNavigate()
  const { id } = useParams()
  const post = posts.find((post) => post.id.toString() === id)

  useEffect(() => {
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [post])

  // Update a post
  const handleSubmit = async (e) => {
    e.preventDefault()
    const datetime = format(new Date(), 'iiii, MMMM dd, yyyy pp')
    const post = { id: Number(id), datetime, title: editTitle, body: editBody }
    try {
      const { data } = await api.put(`/posts/${id}`, post)
      dispatch({
        type: 'setPosts',
        payload: posts.map((post) => (post.id.toString() === id ? data : post)),
      })
    } catch (error) {}
    setEditTitle('')
    setEditBody('')
    navigate('/')
  }

  return (
    <main className='NewPost'>
      {post ? (
        <>
          <h2>Edit Post</h2>
          <form className='newPostForm' onSubmit={handleSubmit}>
            <label htmlFor='postTitle'>Title:</label>
            <input
              type='text'
              id='postTitle'
              required
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <label htmlFor='postBody'>Post:</label>
            <textarea
              id='postBody'
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
            />
            <button type='submit'>Submit</button>
          </form>
        </>
      ) : (
        <>
          <h2>Page Not Found.</h2>
          <p>Well, that's disappointing.</p>
          <p style={{ marginTop: '1rem' }}>
            <Link to='/'>Visit Our HomePage</Link>
          </p>
        </>
      )}
    </main>
  )
}

export default EditPost
// import React, { useContext, useEffect } from 'react'
// import { useNavigate, useParams, Link } from 'react-router-dom'
// import PostContext from '../context/PostContext'

// const EditPost = () => {
//   const { posts, updatePost, editTitle, setEditTitle, editBody, setEditBody } =
//     useContext(PostContext)
//   const navigate = useNavigate()
//   const { id } = useParams()
//   const post = posts.find((post) => post.id.toString() === id)

//   useEffect(() => {
//     if (post) {
//       setEditTitle(post.title)
//       setEditBody(post.body)
//     }
//   }, [post, setEditTitle, setEditBody])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     updatePost(Number(id))
//     setEditTitle('')
//     setEditBody('')
//     navigate('/')
//   }

//   return (
//     <main className='NewPost'>
//       <h2>Edit Post</h2>
//       {post ? (
//         <form className='newPostForm' onSubmit={handleSubmit}>
//           <label htmlFor='postTitle'>Title:</label>
//           <input
//             type='text'
//             id='postTitle'
//             required
//             value={editTitle}
//             onChange={(e) => setEditTitle(e.target.value)}
//           />
//           <label htmlFor='postBody'>Post:</label>
//           <textarea id='postBody' value={editBody} onChange={(e) => setEditBody(e.target.value)} />
//           <button type='submit'>Submit</button>
//         </form>
//       ) : (
//         <>
//           <h2>Page Not Found.</h2>
//           <p>Well, that's disappointing.</p>
//           <p style={{ marginTop: '1rem' }}>
//             <Link to='/'>Visit Our HomePage</Link>
//           </p>
//         </>
//       )}
//     </main>
//   )
// }

// export default EditPost
