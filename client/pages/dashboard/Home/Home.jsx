import React from 'react'
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <>
      <h1>Welcome to IKUALO</h1>
      <p>La súper APP Financiera de los Inmigrantes</p>
      <p><Link to={'/registro'} >Regístrate</Link></p>
      <p><Link to={'/login'} >Login</Link></p>
    </>
  )
}
