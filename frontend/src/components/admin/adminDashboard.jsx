import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from './adminNavbar';
import { ToastContainer } from 'react-toastify';

function adminDashboard() {
  return (
    <div>
        <AdminNavbar/>
        <ToastContainer />
        <Outlet />
      
    </div>
  )
}

export default adminDashboard
