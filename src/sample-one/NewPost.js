import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import BlogContext from './blogContext'
import { addPost } from './postsOperations'

const NewPost = () => {
  const navigate = useNavigate()
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')

  const {
    state: { posts },
    dispatch,
  } = useContext(BlogContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const result = await addPost(posts, postTitle, postBody, dispatch)
    if (result) {
      dispatch({
        type: 'setFetchError',
        payload: result,
      })
    }
    resetAndNavigate()
  }

  const resetAndNavigate = () => {
    setPostTitle('')
    setPostBody('')
    navigate('/') // Go back to Home
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
// import { useNavigate } from 'react-router-dom'
// import BlogContext from './blogContext'
// import { addPost } from './postsOperations'

// const NewPost = () => {
//   const navigate = useNavigate()

//   const {
//     state: { posts, postTitle, postBody },
//     dispatch,
//   } = useContext(BlogContext)

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     addPost(posts, postTitle, postBody, dispatch)
//     resetAndNavigate()
//   }

//   const resetAndNavigate = () => {
//     dispatch({
//       type: 'setPostTitle',
//       payload: '',
//     })
//     dispatch({
//       type: 'setPostBody',
//       payload: '',
//     })
//     navigate('/') // Go back to Home
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
//           onChange={(e) =>
//             dispatch({
//               type: 'setPostTitle',
//               payload: e.target.value,
//             })
//           }
//         />
//         <label htmlFor='postBody'>Post:</label>
//         <textarea
//           id='postBody'
//           required
//           value={postBody}
//           onChange={(e) =>
//             dispatch({
//               type: 'setPostBody',
//               payload: e.target.value,
//             })
//           }
//         />
//         <button type='submit'>Submit</button>
//       </form>
//     </main>
//   )
// }

// export default NewPost
// ---------------------------------------------------------------------------------
// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// import BlogContext from './blogContext'

// const NewPost = ({ addPost }) => {
//   const {
//     state: { postTitle, postBody },
//     dispatch,
//   } = useContext(BlogContext)
//   const navigate = useNavigate()
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     addPost(postTitle, postBody)
//     dispatch({
//       type: 'setPostTitle',
//       payload: '',
//     })
//     dispatch({
//       type: 'setPostBody',
//       payload: '',
//     })
//     navigate('/')
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
//           onChange={(e) =>
//             dispatch({
//               type: 'setPostTitle',
//               payload: e.target.value,
//             })
//           }
//         />
//         <label htmlFor='postBody'>Post:</label>
//         <textarea
//           id='postBody'
//           required
//           value={postBody}
//           onChange={(e) =>
//             dispatch({
//               type: 'setPostBody',
//               payload: e.target.value,
//             })
//           }
//         />
//         <button type='submit'>Submit</button>
//       </form>
//     </main>
//   )
// }

// export default NewPost
