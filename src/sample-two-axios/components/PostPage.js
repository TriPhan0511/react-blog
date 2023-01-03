import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import PostContext from '../context/PostContext'
import { Link, useNavigate } from 'react-router-dom'
import { api } from '../api/posts'

const PostPage = () => {
  const navigate = useNavigate()
  const {
    state: { posts },
    dispatch,
  } = useContext(PostContext)
  const { id } = useParams()
  const post = posts.find((post) => post.id.toString() === id)

  // Delete a specific post
  const deletePost = async (id) => {
    try {
      await api.delete(`posts/${id}`)
      dispatch({
        type: 'setPosts',
        payload: posts.filter((post) => post.id !== id),
      })
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  return (
    <main className='PostPage'>
      {post ? (
        <>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <button className='editButton' onClick={() => navigate(`/edit/${post.id}`)}>
            Edit Post
          </button>
          <button className='deleteButton' onClick={() => deletePost(post.id)}>
            Delete Post
          </button>
        </>
      ) : (
        <>
          <h2>Page Not Found.</h2>
          <p>Well, that's disapoiting.</p>
          <p style={{ marginTop: '1rem' }}>
            <Link to='/'>Visit Our HomePage</Link>
          </p>
        </>
      )}
    </main>
  )
}

export default PostPage
// import React, { useContext } from 'react'
// import { useParams } from 'react-router-dom'
// import PostContext from '../context/PostContext'
// import { Link, useNavigate } from 'react-router-dom'

// const PostPage = () => {
//   const navigate = useNavigate()
//   const { posts, deletePost } = useContext(PostContext)
//   const { id } = useParams()
//   const post = posts.find((post) => post.id.toString() === id)
//   return (
//     <main className='PostPage'>
//       {post ? (
//         <>
//           <h2>{post.title}</h2>
//           <p className='postDate'>{post.datetime}</p>
//           <p className='postBody'>{post.body}</p>
//           <button className='editButton' onClick={() => navigate(`/edit/${post.id}`)}>
//             Edit Post
//           </button>
//           <button className='deleteButton' onClick={() => deletePost(post.id)}>
//             Delete Post
//           </button>
//         </>
//       ) : (
//         <>
//           <h2>Page Not Found.</h2>
//           <p>Well, that's disapoiting.</p>
//           <p style={{ marginTop: '1rem' }}>
//             <Link to='/'>Visit Our HomePage</Link>
//           </p>
//         </>
//       )}
//     </main>
//   )
// }

// export default PostPage
