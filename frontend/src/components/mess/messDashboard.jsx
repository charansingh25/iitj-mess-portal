import React from 'react'
import { Outlet } from 'react-router-dom';
import MessNavbar from './messNavbar';
import { ToastContainer } from 'react-toastify';

function messDashboard() {
  return (
    <div>
        <MessNavbar/>
        <ToastContainer />
        <Outlet />
      
    </div>
  )
}

export default messDashboard
