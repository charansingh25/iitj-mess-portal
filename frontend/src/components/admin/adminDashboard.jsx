import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from './adminNavbar';

function adminDashboard() {
  return (
    <div>
        <AdminNavbar/>
        <Outlet />
      
    </div>
  )
}

export default adminDashboard
