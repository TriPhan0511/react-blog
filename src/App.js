import Layout from './Layout'
import Home from './Home'
import NewPost from './NewPost'
import PostPage from './PostPage'
import About from './About'
import Missing from './Missing'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { format } from 'date-fns'

function App() {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: 'My First Post',
      datetime: 'July 01, 2021 11:17:36 AM',
      body: 'Post One',
    },
    {
      id: 2,
      title: 'My 2nd Post',
      datetime: 'July 02, 2021 11:17:36 AM',
      body: 'Post Two Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad facilis quam consequuntur et sed reprehenderit amet impedit! Numquam neque id quam impedit alias deserunt minus inventore voluptas! Vel, maiores dolor!',
    },
    {
      id: 3,
      title: 'My 3rd Post',
      datetime: 'July 03, 2021 11:17:36 AM',
      body: 'Post Three Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad facilis quam consequuntur et sed reprehenderit amet impedit! Numquam neque id quam impedit alias deserunt minus inventore voluptas! Vel, maiores dolor!',
    },
    {
      id: 4,
      title: 'My 4th Post',
      datetime: 'July 04, 2021 11:17:36 AM',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad facilis quam consequuntur et sed reprehenderit amet impedit! Numquam neque id quam impedit alias deserunt minus inventore voluptas! Vel, maiores dolor!',
    },
    {
      id: 5,
      title: 'My 5th Post',
      datetime: 'July 05, 2021 11:17:36 AM',
      body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad facilis quam consequuntur et sed reprehenderit amet impedit! Numquam neque id quam impedit alias deserunt minus inventore voluptas! Vel, maiores dolor!',
    },
  ])
  const [search, setSearch] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const filteredResults = posts.filter(
      (post) =>
        post.body.toLowerCase().includes(search.toLowerCase()) ||
        post.title.toLowerCase().includes(search.toLowerCase())
    )
    setSearchResults(filteredResults.reverse())
  }, [posts, search])

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
// ------------------------------------------------------------------------------------
// import Header from './Header'
// import Nav from './Nav'
// import Footer from './Footer'
// import Home from './Home'
// import NewPost from './NewPost'
// import PostPage from './PostPage'
// import About from './About'
// import Missing from './Missing'
// import { Route, Switch, useHistory } from 'react-router-dom'
// import { useState, useEffect } from 'react'
// import { format } from 'date-fns'

// function App() {
//   const [posts, setPosts] = useState([
//     {
//       id: 1,
//       title: 'My First Post',
//       datetime: 'July 01, 2021 11:17:36 AM',
//       body: 'Post One',
//     },
//     {
//       id: 2,
//       title: 'My 2nd Post',
//       datetime: 'July 02, 2021 11:17:36 AM',
//       body: 'Post Two Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad facilis quam consequuntur et sed reprehenderit amet impedit! Numquam neque id quam impedit alias deserunt minus inventore voluptas! Vel, maiores dolor!',
//     },
//     {
//       id: 3,
//       title: 'My 3rd Post',
//       datetime: 'July 03, 2021 11:17:36 AM',
//       body: 'Post Three Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad facilis quam consequuntur et sed reprehenderit amet impedit! Numquam neque id quam impedit alias deserunt minus inventore voluptas! Vel, maiores dolor!',
//     },
//     {
//       id: 4,
//       title: 'My 4th Post',
//       datetime: 'July 04, 2021 11:17:36 AM',
//       body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad facilis quam consequuntur et sed reprehenderit amet impedit! Numquam neque id quam impedit alias deserunt minus inventore voluptas! Vel, maiores dolor!',
//     },
//     {
//       id: 5,
//       title: 'My 5th Post',
//       datetime: 'July 05, 2021 11:17:36 AM',
//       body: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad facilis quam consequuntur et sed reprehenderit amet impedit! Numquam neque id quam impedit alias deserunt minus inventore voluptas! Vel, maiores dolor!',
//     },
//   ])
//   const [search, setSearch] = useState('')
//   const [searchResults, setSearchResults] = useState([])
//   const [postTitle, setPostTitle] = useState('')
//   const [postBody, setPostBody] = useState('')
//   const history = useHistory()

//   useEffect(() => {
//     const filteredResults = posts.filter(
//       (post) =>
//         post.body.toLowerCase().includes(search.toLowerCase()) ||
//         post.title.toLowerCase().includes(search.toLowerCase())
//     )
//     setSearchResults(filteredResults.reverse())
//   }, [posts, search])

//   const handleSubmit = (e) => {
//     e.preventDefault()
//     const id = posts.length ? posts[posts.length - 1].id + 1 : 1
//     const datetime = format(new Date(), 'MMMM dd, yyyy pp')
//     setPosts([...posts, { id, title: postTitle, body: postBody, datetime }])
//     setPostTitle('')
//     setPostBody('')
//     history.push('/')
//   }

//   const handleDelete = (id) => {
//     const remainingPosts = posts.filter((post) => post.id !== id)
//     setPosts(remainingPosts)
//     history.push('/')
//   }

//   return (
//     <div className='App'>
//       <Header title='React JS Blog' />
//       <Nav search={search} setSearch={setSearch} />
//       <Switch>
//         <Route exact path='/'>
//           <Home posts={searchResults} />
//         </Route>
//         <Route exact path='/post'>
//           <NewPost
//             postTitle={postTitle}
//             setPostTitle={setPostTitle}
//             postBody={postBody}
//             setPostBody={setPostBody}
//             handleSubmit={handleSubmit}
//           />
//         </Route>
//         <Route path='/post/:id'>
//           <PostPage posts={posts} handleDelete={handleDelete} />
//         </Route>
//         <Route path='/about' component={About} />
//         <Route path='*' component={Missing} />
//       </Switch>
//       <Footer />
//     </div>
//   )
// }

// export default App
