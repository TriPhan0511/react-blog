import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostContext from '../context/PostContext'
import { format } from 'date-fns'

const EditPost = () => {
  const { posts, updatePost } = useContext(PostContext)
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const post = posts.find((post) => post.id.toString() === id)
    if (post) {
      setEditTitle(post.title)
      setEditBody(post.body)
    }
  }, [id, posts])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const datetime = format(new Date(), 'iiii, MMMM dd, yyyy pp')
    const post = { id: Number(id), datetime, title: editTitle, body: editBody }
    updatePost(post)
    setEditTitle('')
    setEditBody('')
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
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
        />
        <label htmlFor='postBody'>Post:</label>
        <textarea id='postBody' value={editBody} onChange={(e) => setEditBody(e.target.value)} />
        <button type='submit'>Submit</button>
      </form>
    </main>
  )
}

export default EditPost
