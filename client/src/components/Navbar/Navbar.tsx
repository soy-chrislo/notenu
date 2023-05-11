import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  return (
    <>
      <ul>
        <li>
          <Link to={'/'}>Landing</Link>
        </li>
        <li>
          <Link to={'/login'}>Login</Link>
        </li>
        <li>
          <Link to={'/register'}>Register</Link>
        </li>
        <li>
          <Link to={'/dashboard'}>Dashboard</Link>
        </li>
        <li>
          <Link to={'/panel'}>Panel</Link>
        </li>
      </ul>
    </>
  )
}

export default Navbar