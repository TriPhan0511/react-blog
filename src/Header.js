import React from 'react'
import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa'

const Header = ({ title, width }) => {
  return (
    <header className='Header'>
      <h1>{title}</h1>
      {width < 768 ? <FaMobileAlt /> : width < 992 ? <FaTabletAlt /> : <FaLaptop />}
    </header>
  )
}

Header.defaultProps = {
  title: 'My Blog',
}

export default Header
