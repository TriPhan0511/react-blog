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
import EditPost from './EditPost'
import useWindowSize from './hooks/useWindowSize'
import useAxiosFetch from './hooks/useAxiosFetch'

function App() {
  const [posts, setPosts] = useState([])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const navigate = useNavigate()
  const { width } = useWindowSize()
  const { data, fetchError, isLoading } = useAxiosFetch(' http://localhost:3500/posts')

  useEffect(() => {
    setPosts(data)
  }, [data])

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    )
    setSearchResults(filteredResults.reverse())
  }, [posts, search])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const newPost = { id, title: postTitle, body: postBody, datetime }
    try {
      const response = await api.post('/posts', newPost)
      const allPosts = [...posts, response.data]
      setPosts(allPosts)
      setPostTitle('')
      setPostBody('')
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  const handleEdit = async (id) => {
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    const updatedPost = { id, title: editTitle, body: editBody, datetime }
    try {
      const response = await api.put(`posts/${id}`, updatedPost)
      const updatedPosts = posts.map((post) => {
        if (post.id === id) {
          return response.data
        }
        return post
      })
      setPosts(updatedPosts)
      setEditTitle('')
      setEditBody('')
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  const handleDelete = async (id) => {
    try {
      await api.delete(`posts/${id}`)
      const remainingPosts = posts.filter((post) => post.id !== id)
      setPosts(remainingPosts)
      navigate('/')
    } catch (error) {
      console.log(`Error: ${error.message}`)
    }
  }

  return (
    <Routes>
      <Route path='/' element={<Layout search={search} setSearch={setSearch} width={width} />}>
        <Route
          index
          element={<Home posts={searchResults} fetchError={fetchError} isLoading={isLoading} />}
        />
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
        <Route
          path='edit/:id'
          element={
            <EditPost
              posts={posts}
              handleEdit={handleEdit}
              editTitle={editTitle}
              setEditTitle={setEditTitle}
              editBody={editBody}
              setEditBody={setEditBody}
            />
          }
        />
        <Route path='about' element={<About />} />
        <Route path='*' element={<Missing />} />
      </Route>
    </Routes>
  )
}

export default App

// import Layout from './Layout'
// import Home from './Home'
// import NewPost from './NewPost'
// import PostPage from './PostPage'
// import About from './About'
// import Missing from './Missing'
// import { Route, Routes, useNavigate } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { format } from 'date-fns'
// import api from './api/posts'
// import EditPost from './EditPost'
// import useWindowSize from './hooks/useWindowSize'
// import useAxiosFetch from './hooks/useAxiosFetch'

// function App() {
//   const [posts, setPosts] = useState([])
//   const [search, setSearch] = useState('')
//   const [searchResults, setSearchResults] = useState([])
//   const [postTitle, setPostTitle] = useState('')
//   const [postBody, setPostBody] = useState('')
//   const [editTitle, setEditTitle] = useState('')
//   const [editBody, setEditBody] = useState('')
//   const navigate = useNavigate()
//   const { width } = useWindowSize()
//   const { data, fetchError, isLoading } = useAxiosFetch(' http://localhost:3500/posts')

//   // Load data
//   useEffect(() => {
//     setPosts(data)
//   }, [data])

//   useEffect(() => {
//     const filteredResults = posts.filter(
//       (post) =>
//         post.body.toLowerCase().includes(search.toLowerCase()) ||
//         post.title.toLowerCase().includes(search.toLowerCase())
//     )
//     setSearchResults(filteredResults.reverse())
//   }, [posts, search])

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const id = posts.length ? posts[posts.length - 1].id + 1 : 1
//     const datetime = format(new Date(), 'MMMM dd, yyyy pp')
//     const newPost = { id, title: postTitle, body: postBody, datetime }
//     try {
//       const response = await api.post('/posts', newPost)
//       const allPosts = [...posts, response.data]
//       setPosts(allPosts)
//       setPostTitle('')
//       setPostBody('')
//       navigate('/')
//     } catch (error) {
//       console.log(`Error: ${error.message}`)
//     }
//   }

//   const handleEdit = async (id) => {
//     const datetime = format(new Date(), 'MMMM dd, yyyy pp')
//     const updatedPost = { id, title: editTitle, body: editBody, datetime }
//     try {
//       const response = await api.put(`posts/${id}`, updatedPost)
//       const updatedPosts = posts.map((post) => {
//         if (post.id === id) {
//           return response.data
//         }
//         return post
//       })
//       setPosts(updatedPosts)
//       setEditTitle('')
//       setEditBody('')
//       navigate('/')
//     } catch (error) {
//       console.log(`Error: ${error.message}`)
//     }
//   }

//   const handleDelete = async (id) => {
//     try {
//       await api.delete(`posts/${id}`)
//       const remainingPosts = posts.filter((post) => post.id !== id)
//       setPosts(remainingPosts)
//       navigate('/')
//     } catch (error) {
//       console.log(`Error: ${error.message}`)
//     }
//   }

//   return (
//     <Routes>
//       <Route path='/' element={<Layout search={search} setSearch={setSearch} width={width} />}>
//         <Route
//           index
//           element={<Home posts={searchResults} fetchError={fetchError} isLoading={isLoading} />}
//         />
//         <Route path='post'>
//           <Route
//             index
//             element={
//               <NewPost
//                 postTitle={postTitle}
//                 setPostTitle={setPostTitle}
//                 postBody={postBody}
//                 setPostBody={setPostBody}
//                 handleSubmit={handleSubmit}
//               />
//             }
//           />
//           <Route path=':id' element={<PostPage posts={posts} handleDelete={handleDelete} />} />
//         </Route>
//         <Route
//           path='edit/:id'
//           element={
//             <EditPost
//               posts={posts}
//               handleEdit={handleEdit}
//               editTitle={editTitle}
//               setEditTitle={setEditTitle}
//               editBody={editBody}
//               setEditBody={setEditBody}
//             />
//           }
//         />
//         <Route path='about' element={<About />} />
//         <Route path='*' element={<Missing />} />
//       </Route>
//     </Routes>
//   )
// }

// export default App
