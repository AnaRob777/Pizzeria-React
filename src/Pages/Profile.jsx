import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

function Profile() {
  const { logout, getProfile } = useUser();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setUser(data);
      } catch (error) {
        console.error("Error al obtener el perfil:", error);
      }
    };
    fetchProfile();
  }, [getProfile]);

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    localStorage.removeItem("email");
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      {user ? (
        <div className="card shadow-lg" style={{ width: '18rem' }}>
          <div className="card-body text-center">
            <h5 className="card-title">Perfil de Usuario</h5>
            <p className="card-text">Correo electrónico: {user.email}</p>
            <button onClick={handleLogout} className="btn btn-danger mt-3">
              Cerrar sesión
            </button>
          </div>
        </div>
      ) : (
        <p>Por favor, inicia sesión para ver tu perfil.</p>
      )}
      <Link to="/" className="btn btn-link mt-4">
        Volver a la página principal
      </Link>
    </div>
  );
}

export default Profile;
