import { format } from 'date-fns'
import { apiRequest } from './apiRequest'
import { BLOG_API_URL } from './apiUrls'

export const filterPosts = (posts, filter) =>
  posts.filter(
    (post) =>
      post.title.toLowerCase().includes(filter.toLowerCase()) ||
      post.body.toLowerCase().includes(filter.toLowerCase())
  )

export const addPost = async (posts, title, body, dispatch) => {
  const id = posts?.length ? posts[posts.length - 1].id + 1 : 1
  const datetime = format(new Date(), 'MMMM dd, yyyy pp')
  const newPost = { id, title, body, datetime }
  const postOption = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newPost),
  }
  const result = await apiRequest(BLOG_API_URL, postOption)
  if (result) {
    dispatch({
      type: 'setFetchError',
      payload: result,
    })
  } else {
    dispatch({
      type: 'setPosts',
      payload: [...posts, newPost],
    })
  }
}

export const deletePost = async (posts, id, dispatch) => {
  const deleteOption = {
    method: 'DELETE',
  }
  const result = await apiRequest(`${BLOG_API_URL}/${id}`, deleteOption)
  if (result) {
    dispatch({
      type: 'setFetchError',
      payload: result,
    })
  } else {
    dispatch({
      type: 'setPosts',
      payload: posts.filter((post) => post.id !== id),
    })
  }
}
