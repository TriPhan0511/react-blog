import React from 'react'
import { useParams } from 'react-router-dom'
import Missing from './Missing'
import { useNavigate } from 'react-router-dom'

const PostPage = ({ posts, deletePost }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const post = posts.find((p) => p.id.toString() === id)
  return (
    <main className='PostPage'>
      {post ? (
        <article className='post'>
          <h2>{post.title}</h2>
          <p className='postDate'>{post.datetime}</p>
          <p className='postBody'>{post.body}</p>
          <button
            type='button'
            onClick={() => {
              deletePost(post.id)
              navigate('/') // Go back to Home
            }}
          >
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
