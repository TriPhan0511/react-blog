import React, { useContext } from 'react'
import BlogContext from './blogContext'
import Post from './Post'
import { filterPosts } from './postsOperations'

const Home = () => {
  const {
    state: { isLoading, fetchError, posts, filter },
  } = useContext(BlogContext)

  return isLoading ? (
    <p>Loading data...</p>
  ) : fetchError ? (
    <p style={{ color: 'red' }}>Error: {fetchError}</p>
  ) : (
    <main className='Home'>
      {posts?.length ? (
        filterPosts(posts, filter)
          .reverse()
          .map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>No posts to display.</p>
      )}
    </main>
  )
}

export default Home
// import React, { useContext } from 'react'
// import Post from './Post'

// const Home = ({ posts }) => {
//   return (
//     <main className='Home'>
//       {posts?.length ? (
//         posts.map((post) => <Post key={post.id} post={post} />)
//       ) : (
//         <p>No posts to display.</p>
//       )}
//     </main>
//   )
// }

// export default Home
