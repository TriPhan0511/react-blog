import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import Missing from './Missing'
import { useNavigate } from 'react-router-dom'
import BlogContext from './blogContext'
import { deletePost } from './postsOperations'

const PostPage = () => {
  const navigate = useNavigate()
  const {
    state: { posts },
    dispatch,
  } = useContext(BlogContext)
  const { id } = useParams()
  const post = posts.find((p) => p.id.toString() === id)

  const handleDelete = () => {
    deletePost(posts, post.id, dispatch)
    navigate('/') // Go back to Home
  }

  return (
    <main className='PostPage'>
      {post ? (
        <article className='post'>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <button type='button' onClick={handleDelete}>
            Delete
          </button>
        </article>
      ) : (
        <Missing />
      )}
    </main>
  )
}

export default PostPage
