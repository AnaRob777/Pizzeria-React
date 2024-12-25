import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Footer from './components/Footer'
import Register from './components/Register'
import Login from './components/Login'

function App() {
 return (
    <>
      <Navbar></Navbar>
      {/* <Home></Home>*/}
      <Register></Register>
      {/*<Login></Login>*/}
      <Footer></Footer>
    </>
  )
}

export default App
