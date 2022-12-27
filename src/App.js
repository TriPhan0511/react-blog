import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import api from './api/posts'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await api.get('/posts')
        setPosts(response.data)
      } catch (error) {
        if (error.response) {
          // Not in the 200 response range
          console.log('🚀 ~ error.response.data', error.response.data)
          console.log('🚀 ~ error.response.status', error.response.status)
          console.log('🚀 ~ error.response.headers', error.response.headers)
        } else {
          console.log('🚀 ~ error.message', `Error: ${error.message}`)
        }
      }
    }
    fetchPosts()
  }, [])

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    )
    setSearchResults(filteredResults.reverse())
  }, [posts, search])

  // // Save post to server
  // const savePost = async (post) => {
  //   const response = await fetch('http://localhost:3500/posts', {
  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify(post),
  //   })
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const id = posts.length ? posts[posts.length - 1].id + 1 : 1
  //   const datetime = format(new Date(), 'MMMM dd, yyyy pp')
  //   const newPost = { id, title: postTitle, body: postBody, datetime }
  //   savePost(newPost)
  //   setPosts([...posts, newPost])
  //   setPostTitle('')
  //   setPostBody('')
  //   navigate('/')
  // }
  const handleSubmit = (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    setPosts([...posts, { id, title: postTitle, body: postBody, datetime }])
    setPostTitle('')
    setPostBody('')
    navigate('/')
  }

  const handleDelete = (id) => {
    const remainingPosts = posts.filter((post) => post.id !== id)
    setPosts(remainingPosts)
    navigate('/')
  }

  return (
    <Routes>
      <Route path='/' element={<Layout search={search} setSearch={setSearch} />}>
        <Route index element={<Home posts={searchResults} />} />
        <Route path='post'>
          <Route
            index
            element={
              <NewPost
                postTitle={postTitle}
                setPostTitle={setPostTitle}
                postBody={postBody}
                setPostBody={setPostBody}
                handleSubmit={handleSubmit}
              />
            }
          />
          <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
        </Route>
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App
