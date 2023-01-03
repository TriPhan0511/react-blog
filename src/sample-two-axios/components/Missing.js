import React from 'react'
import { Link } from 'react-router-dom'

const Missing = () => {
  return (
    <main className='Missing'>
      <h2>Page Not Found.</h2>
      <p>Well, that's disapoiting.</p>
      <p style={{ marginTop: '1rem' }}>
        <Link to='/'>Visit Our HomePage</Link>
      </p>
    </main>
  )
}

export default Missing
