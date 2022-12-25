export const apiRequest = async (url = '', optionsObj = null, errMsg = null) => {
  try {
    const response = await fetch(url, optionsObj)
    if (!response.ok) {
      throw new Error('Something went wrong. Please reload the app.')
    }
  } catch (error) {
    errMsg = error.message
  } finally {
    return errMsg
  }
}

export const fetchData = async (url, dispatch) => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Did not receive expected data.')
    }
    const data = await response.json()
    dispatch({
      type: 'setPosts',
      payload: data,
    })
    dispatch({
      type: 'setFetchError',
      payload: null,
    })
  } catch (error) {
    dispatch({
      type: 'setFetchError',
      payload: error.message,
    })
  } finally {
    dispatch({
      type: 'setIsLoading',
      payload: false,
    })
  }
}
