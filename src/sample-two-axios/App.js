import React, { useEffect, useReducer } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Layout from './components/Layout'
import About from './components/About'
import Missing from './components/Missing'
import PostContext from './context/PostContext'
import { api } from './api/posts'
import PostPage from './components/PostPage'
import NewPost from './components/NewPost'
import EditPost from './components/EditPost'
import postReducer from './reducers/postReducer'

const App = () => {
  const [state, dispatch] = useReducer(postReducer, {
    posts: [],
    filter: '',
  })

  // Load data
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data } = await api.get('/posts')
        dispatch({
          type: 'setPosts',
          payload: data,
        })
      } catch (error) {
        console.log(`Error: ${error.message}`)
      }
    }
    fetchPosts()
  }, [])

  return (
    <PostContext.Provider
      value={{
        state,
        dispatch,
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
