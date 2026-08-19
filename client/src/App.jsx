import React from 'react'
import {Route, Routes} from "react-router-dom"
import Landing from './pages/Landing'
import Dresses from './pages/Dresses'
import DressesInfo from './pages/DressesInfo'
import Login from './pages/Login'
import Register from './pages/Register'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Orders from './pages/Orders'
import AboutUs from './pages/AboutUs'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/dresses' element={<Dresses />}></Route>
      <Route path='/dresses-info' element={<DressesInfo />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/cart' element={<Cart />}></Route>
      <Route path='/checkout' element={<Checkout />}></Route>
      <Route path='/orders' element={<Orders />}></Route>
      <Route path='/about' element={<AboutUs />}></Route>
    </Routes>
  )
}

export default App
