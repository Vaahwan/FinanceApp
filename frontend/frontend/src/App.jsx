import { useState } from 'react'
import './App.css'
import Navbar from './pages/navbar/Navbar'
import Home from './pages/home/Home'
import Personal from './pages/personal/Personal'
import Group from './pages/group/Group'
import Netwealth from './pages/netwealth/Netwealth'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import AuthRequired from './auth/AuthRequired'
import {Route,Routes} from 'react-router-dom'

function App() {

  const isLoggedIn = localStorage.getItem('jwtToken')===null;
  console.log(isLoggedIn);

  return (
    <>
      <Navbar lassName="navbar" />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route element={<AuthRequired/>} >
          <Route path='/expense' element={<Personal/>}></Route>
        </Route>
        <Route element={<AuthRequired/>} >
          <Route path='/group' element={<Group/>} />
        </Route>
        <Route element={<AuthRequired/>} >
          <Route path='/netwealth' element={<Netwealth/>} />
        </Route>
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </>
  )
}

export default App
