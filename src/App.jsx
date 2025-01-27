import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Cart from './components/Cart'
import Pizza from './components/Pizza'
import Register from './components/Register'
import Login from './components/Login'
import Profile from './Pages/Profile'
import NotFound from './Pages/NotFound.jsx'

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/cart" component={Cart} />
        <Route path="/pizza/p001" component={Pizza} />
        <Route path="/profile" component={Profile} />
        <Route path="/404" component={NotFound} />
        {/* Ruta por defecto para cuando no se encuentra ninguna coincidencia */}
        <Route path="*" component={NotFound} />
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
