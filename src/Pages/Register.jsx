import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrorMessage('');
        setSuccessMessage('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password, confirmPassword } = formData;

        if (!email || !password || !confirmPassword) {
            setErrorMessage('Todos los campos son obligatorios.');
            return;
        }

        if (password.length < 6) {
            setErrorMessage('La contraseña debe tener al menos 6 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('La contraseña y la confirmación deben ser iguales.');
            return;
        }

        setSuccessMessage('Registro exitoso.');
    };

    return (
        <div className="vh-100 d-flex flex-column">
            <nav className="navbar navbar-dark bg-dark"></nav>
            <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h2 className="card-title text-center mb-4">Registro</h2>
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
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirmar Contraseña:</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Enviar</button>
                            </form>

                            {errorMessage && <div className="alert alert-danger mt-3">{errorMessage}</div>}
                            {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
