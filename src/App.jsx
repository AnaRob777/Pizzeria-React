import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Footer from './components/Footer';
import Cart from './Pages/Cart';
import Pizza from './Pages/Pizza';
import Register from './Pages/Register';
import Login from './Pages/Login';
import Profile from './Pages/Profile';
import NotFound from './Pages/NotFound.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { UserProvider, ProtectedRoute, RedirectIfAuthenticated } from './context/UserContext';

function App() {
  return (
    <Router>
      <UserProvider>
        <CartProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={
              <RedirectIfAuthenticated>
                <Register />
              </RedirectIfAuthenticated>
            } />
            <Route path="/login" element={
              <RedirectIfAuthenticated>
                <Login />
              </RedirectIfAuthenticated>
            } />
            <Route path="/cart" element={<Cart />} />
            <Route path="/pizza/:id" element={<Pizza />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
            <Route path="/404" element={<NotFound />} />
          </Routes>
          <Footer />
        </CartProvider>
      </UserProvider>
    </Router>
  );
}

export default App;
