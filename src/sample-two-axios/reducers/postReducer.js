const postReducer = (state, action) => {
  switch (action.type) {
    case 'setPosts':
      return { ...state, posts: action.payload }
    case 'setFilter':
      return { ...state, filter: action.payload }
    default:
      return state
  }
}

export default postReducer
