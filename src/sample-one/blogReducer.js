export const blogReducer = (state, action) => {
  switch (action.type) {
    case 'setPosts':
      return { ...state, posts: action.payload }
    case 'setFilter':
      return { ...state, filter: action.payload }
    case 'setFetchError':
      return { ...state, fetchError: action.payload }
    case 'setIsLoading':
      return { ...state, isLoading: action.payload }
    default:
      return state
  }
}

export const initialState = {
  posts: [],
  filter: '',
  fetchError: null,
  isLoading: true,
}
