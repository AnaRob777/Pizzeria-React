import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useUser } from '../context/UserContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const { login } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrorMessage('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (data.error) {
        setErrorMessage(data.error);
        return;
      }

      alert("¡Autenticación exitosa!");
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);

      await login({ email, password });
    } catch (error) {
      setErrorMessage('Error en el inicio de sesión. Verifica tus credenciales.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="col-md-6">
        <div className="card">
          <div className="card-body">
            <h2 className="card-title text-center mb-4">Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className="form-control"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" className="btn btn-primary w-100">Enviar</button>
            </form>
            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
