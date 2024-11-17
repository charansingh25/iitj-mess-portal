import React from 'react'
import { Outlet } from 'react-router-dom';
import StudentNavbar from './StudentNavbar';

function studentDashboard() {
  return (
    <div>
        <StudentNavbar/>
        <Outlet />
    </div>
  )
}

export default studentDashboard
