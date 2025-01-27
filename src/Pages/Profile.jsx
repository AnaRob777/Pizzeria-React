import React from 'react'
import { Link } from 'react-router-dom'

function Profile() {
  
  const userEmail = "usuario@ejemplo.com";

  const handleLogout = () => {
    
    console.log("Sesión cerrada");
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <div className="card shadow-lg" style={{ width: '18rem' }}>
        <div className="card-body text-center">
          <h5 className="card-title">Perfil de Usuario</h5>
          <p className="card-text">Correo electrónico: {userEmail}</p>
          <button onClick={handleLogout} className="btn btn-danger mt-3">Cerrar sesión</button>
        </div>
      </div>
      <Link to="/" className="btn btn-link mt-4">Volver a la página principal</Link>
    </div>
  );
}

export default Profile;
