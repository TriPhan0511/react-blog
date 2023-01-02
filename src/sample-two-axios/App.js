import React, { useContext, useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Layout from './components/Layout'
import About from './pages/About'
import Missing from './pages/Missing'
import PostContext from './context/PostContext'
import { api } from './api/postOperations'
import PostPage from './pages/PostPage'
import { useNavigate } from 'react-router-dom'
import { format } from 'date-fns'
import NewPost from './components/NewPost'
import EditPost from './components/EditPost'

const App = () => {
  const navigate = useNavigate()

  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  // const [editTitle, setEditTitle] = useState('')
  // const [editBody, setEditBody] = useState('')

  // Load data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
    }
    fetchPosts()
  }, [])

  // Delete a post
  const deletePost = async (id) => {
    try {
      await api.delete(`posts/${id}`)
      setPosts(posts.filter((post) => post.id !== id))
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  // Add a new post
  const addPost = async () => {
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'iiii, MMMM dd, yyyy pp')
    const post = { id, datetime, title: postTitle, body: postBody }
    setPostTitle('')
    setPostBody('')
    navigate('/')
    try {
      const response = await api.post('/posts', post)
      setPosts([...posts, response.data])
    } catch (error) {}
  }

  // Update a post
  const updatePost = async (id, editTitle, editBody) => {
    const datetime = format(new Date(), 'iiii, MMMM dd, yyyy pp')
    const post = { id, datetime, title: editTitle, body: editBody }
    try {
      const response = await api.put(`posts/${id}`, post)
      console.log('🚀 ~ response.data', response.data)
      setPosts(posts.map((post) => (post.id === id ? response.data : post)))

      // setEditTitle('')
      // setEditBody('')
      navigate('/')
    } catch (error) {}
  }

  return (
    <PostContext.Provider
      value={{
        posts,
        setPosts,
        filter,
        setFilter,
        postTitle,
        setPostTitle,
        postBody,
        setPostBody,
        deletePost,
        addPost,
        // editTitle,
        // setEditTitle,
        // editBody,
        // setEditBody,
        updatePost,
      }}
    >
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='*' element={<Missing />} />
          <Route path='about' element={<About />} />
          <Route path='post'>
            <Route index element={<NewPost />} />
            <Route path=':id' element={<PostPage />} />
          </Route>
          <Route path='edit'>
            <Route path=':id' element={<EditPost />} />
          </Route>
        </Route>
      </Routes>
    </PostContext.Provider>
  )
}

export default App
