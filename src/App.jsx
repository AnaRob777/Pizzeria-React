import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Cart from './components/Cart'
// import Register from './components/Register'
// import Login from './components/Login'

function App() {
 return (
    <>
      <Navbar></Navbar>
      {/* <Home></Home>*/}
      {/* <Register></Register> */}
      {/*<Login></Login>*/}
      <Cart></Cart>
      <Footer></Footer>
    </>
  )
}

export default App
