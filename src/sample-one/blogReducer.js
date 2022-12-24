const blogReducer = (state, action) => {
  switch (action.type) {
    case 'setPosts':
      return { ...state, posts: action.payload }
    case 'setFilter':
      return { ...state, filter: action.payload }
    case 'setPostTitle':
      return { ...state, postTitle: action.payload }
    case 'setPostBody':
      return { ...state, postBody: action.payload }
    default:
      return state
  }
}

export default blogReducer
