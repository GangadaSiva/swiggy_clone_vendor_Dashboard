import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <>
    <Link to="/">
        <p>Go Back</p>
    </Link>
    <div>
        <h1>404</h1>
        <h1>Page Not Found</h1>
    </div>
    </>

  )
}

export default NotFound