import { useState } from 'react'
import './App.css'
import { Outlet, Route, Routes } from 'react-router'
import Home from './components/Home'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <Outlet/>
  )
}

export default App
