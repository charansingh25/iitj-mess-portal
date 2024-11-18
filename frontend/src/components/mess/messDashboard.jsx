import React from 'react'
import { Outlet } from 'react-router-dom';
import MessNavbar from './messNavbar';

function messDashboard() {
  return (
    <div>
        <MessNavbar/>
        <Outlet />
      
    </div>
  )
}

export default messDashboard
