import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './Home'
import Layout from './Layout'
import About from './About'
import Missing from './Missing'
import NewPost from './NewPost'
import PostPage from './PostPage'
import { format } from 'date-fns'

const App = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      datetime: 'November 5, 2022 10:10:10 AM',
      title: 'The First Post',
      body: 'This is the first post.',
    },
    {
      id: 2,
      datetime: 'November 6, 2022 10:10:10 AM',
      title: 'The Second Post',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit libero iure dicta dignissimos esse. Molestias neque architecto odio doloribus inventore exercitationem totam tenetur autem consequuntur nihil voluptatibus laudantium, enim nostrum.',
    },
    {
      id: 3,
      datetime: 'November 7, 2022 10:10:10 AM',
      title: 'The Third Post',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit libero iure dicta dignissimos esse. Molestias neque architecto odio doloribus inventore exercitationem totam tenetur autem consequuntur nihil voluptatibus laudantium, enim nostrum.',
    },
    {
      id: 4,
      datetime: 'November 8, 2022 10:10:10 AM',
      title: 'The Fouth Post',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit libero iure dicta dignissimos esse. Molestias neque architecto odio doloribus inventore exercitationem totam tenetur autem consequuntur nihil voluptatibus laudantium, enim nostrum.',
    },
    {
      id: 5,
      datetime: 'November 9, 2022 10:10:10 AM',
      title: 'The Fifth Post',
      body: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit libero iure dicta dignissimos esse. Molestias neque architecto odio doloribus inventore exercitationem totam tenetur autem consequuntur nihil voluptatibus laudantium, enim nostrum.',
    },
  ])
  const [postTitle, setPostTitle] = useState('')
  const [postBody, setPostBody] = useState('')
  const [filter, setFilter] = useState('')

  const reversedPosts = posts
    .filter(
      (post) =>
        post.title.toLowerCase().includes(filter.toLowerCase()) ||
        post.body.toLowerCase().includes(filter.toLowerCase())
    )
    .reverse()

  const addPost = (title, body) => {
    const id = posts?.length ? posts[posts.length - 1].id + 1 : 1
    const datetime = format(new Date(), 'MMMM dd, yyyy pp')
    setPosts([...posts, { id, title, body, datetime }])
  }

  const deletePost = (id) => {
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Layout filter={filter} setFilter={setFilter} />}>
          <Route index element={<Home posts={reversedPosts} />} />
          <Route path='*' element={<Missing />} />
          <Route path='about' element={<About />} />
          <Route path='post'>
            <Route
              index
              element={
                <NewPost
                  postTitle={postTitle}
                  setPostTitle={setPostTitle}
                  postBody={postBody}
                  setPostBody={setPostBody}
                  addPost={addPost}
                />
              }
            />
            <Route path=':id' element={<PostPage posts={posts} deletePost={deletePost} />} />
          </Route>
        </Route>
      </Routes>
    </div>
  )
}

export default App
