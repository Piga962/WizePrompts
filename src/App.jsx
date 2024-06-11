import React, {useState} from 'react'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home/Home'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import './App.css'

function App() {

  const [user, setUser] = useState(null)

  return (
    <Routes>
      <Route path="/" element={<Home user={user} setUser={setUser}/>} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setUser={setUser}/>} />
    </Routes>
  )
}

export default App
