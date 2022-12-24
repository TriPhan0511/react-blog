import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import Nav from './Nav'

const Layout = ({ filter, setFilter }) => {
  return (
    <>
      <Header />
      <Nav filter={filter} setFilter={setFilter} />
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
