import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import AdminOverAll from './functions/adminOverAll';
import SearchByDate from './functions/searchByDate';
import SearchByRoll from './functions/searchByRoll';

const ManageStudents = () => {
  return (
    <div>
      {/* <h2>Manage Students</h2> */}
      <Routes>
        <Route path="overall-data" element={<AdminOverAll />} />
        <Route path="search-by-date" element={<SearchByDate />} />
        <Route path="search-by-roll" element={<SearchByRoll />} />
      </Routes>
      <Outlet />
    </div>
  );
};

export default ManageStudents;
