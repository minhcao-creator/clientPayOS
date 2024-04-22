import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './view/home';
import Success from './view/success';
import Cancel from './view/cancel';
import setAuthToken from './utils/setAuthToken';
import axios from 'axios'
import Login from './view/login';
import Register from './view/register';
import Order from './view/order';

function App() {
  const [user, setUser] = useState()

  const loadUser = async () => {
    if (localStorage["payOSUserToken"]) {
      setAuthToken(localStorage["payOSUserToken"])
    }
    try {
      const response = await axios.get("https://payos.onrender.com/auth")
      if (response.data.success) {
        setUser(response.data.user)
      }
    } catch (error) {
      localStorage.removeItem("payOSUserToken")
      setAuthToken(null)
      setUser(null)
    }
  }

  useEffect(() => {
    loadUser()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path='/login' element={user ? <Home /> : <Login />} />
        <Route path='/register' element={user ? <Home /> : <Register />} />
        <Route path='/success' element={<Success />} />
        <Route path='/cancel' element={<Cancel />} />
        <Route path='/order' element={<Order />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>

  );
}

export default App;
