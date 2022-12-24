import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found.</h2>
      <p>Well, that's dissapointing.</p>
      <Link to='/'>Visit Our Homepage</Link>
    </main>
  )
}

export default Missing
