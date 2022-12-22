import React from 'react'
import { useParams } from 'react-router-dom'
import Missing from './Missing'

const PostPage = ({ posts, handleDelete }) => {
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
            <button onClick={() => handleDelete(post.id)}>Delete Post</button>
          </article>
        </main>
      ) : (
        <Missing />
      )}
    </>
  )
}

export default PostPage
// -----------------------------------------------------------------------------
// import React from 'react'
// import { useParams, Link } from 'react-router-dom'

// const PostPage = ({ posts, handleDelete }) => {
//   const { id } = useParams()
//   const post = posts.find((post) => post.id.toString() === id)
//   return (
//     <main className='PostPage'>
//       <article className='post'>
//         {post ? (
//           <>
//             <h2>{post.title}</h2>
//             <p className='postDate'>{post.datetime}</p>
//             <p className='postBody'>{post.body}</p>
//             <button onClick={() => handleDelete(post.id)}>Delete Post</button>
//           </>
//         ) : (
//           <>
//             <h2>Post Not Found.</h2>
//             <p>Well, that's disappointing.</p>
//             <p>
//               <Link to='/'>Visit Our Homepage</Link>
//             </p>
//           </>
//         )}
//       </article>
//     </main>
//   )
// }

// export default PostPage