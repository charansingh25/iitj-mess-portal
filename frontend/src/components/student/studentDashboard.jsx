import React from 'react'
import { Outlet } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';
import { ToastContainer } from 'react-toastify';


function studentDashboard() {
  return (
    <div>
        <StudentNavbar/>
        <ToastContainer />
        <Outlet />
    </div>
  )
}

export default studentDashboard
