import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
      <div className="text-center">
        <h1 className="display-4 text-danger">🥺 No encontramos la página</h1>
        <p className="lead text-muted">Puedes volver a la página principal.</p>
        <Link to="/" className="btn btn-primary btn-lg mt-4">Ir a la página principal</Link>
      </div>
    </div>
  )
}

export default NotFound
