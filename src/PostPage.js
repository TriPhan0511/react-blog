import React from 'react'
import { Link, useParams } from 'react-router-dom'
import Missing from './Missing'
import { useNavigate } from 'react-router-dom'

const PostPage = ({ posts, handleDelete, handleEdit }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const post = posts.find((post) => post.id.toString() === id)
  return (
    <>
      {post ? (
        <main className='PostPage'>
          <article className='post'>
            <h2>{post.title}</h2>
            <p className='postDate'>{post.datetime}</p>
            <p className='postBody'>{post.body}</p>
            <Link to={`/edit/${id}`}>
              <button className='editButton'>Edit Post</button>
            </Link>
            <button className='deleteButton' onClick={() => handleDelete(post.id)}>
              Delete Post
            </button>
            {/* <button
              style={{ marginLeft: '30px', backgroundColor: 'blueviolet' }}
              onClick={() => {
                navigate(`/edit/${id}`)
              }}
            >
              Edit Post
            </button> */}
          </article>
        </main>
      ) : (
        <Missing />
      )}
    </>
  )
}

export default PostPage
// import React from 'react'
// import { useParams } from 'react-router-dom'
// import Missing from './Missing'

// const PostPage = ({ posts, handleDelete }) => {
//   const { id } = useParams()
//   const post = posts.find((post) => post.id.toString() === id)
//   return (
//     <>
//       {post ? (
//         <main className='PostPage'>
//           <article className='post'>
//             <h2>{post.title}</h2>
//             <p className='postDate'>{post.datetime}</p>
//             <p className='postBody'>{post.body}</p>
//             <button onClick={() => handleDelete(post.id)}>Delete Post</button>
//           </article>
//         </main>
//       ) : (
//         <Missing />
//       )}
//     </>
//   )
// }

// export default PostPage
