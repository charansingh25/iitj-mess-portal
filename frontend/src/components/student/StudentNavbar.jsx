import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';

const StudentNavbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    // Logic for logout functionality
    alert('You have been logged out.');
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Select Mess' },
    { id: 2, text: 'Previous Data' },
    { id: 3, text: 'Selected Mess' },
    { id: 4, text: 'Generate New QR' },
  ];

  return (
    <div className='bg-black flex justify-between items-center h-16 max-w-[1440px] mx-auto px-2 mt-2 text-white'>
      {/* Logo */}
      <h1 className='w-1/3 text-2xl font-bold text-[#00df9a]'>Student Dashboard</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='flex items-center p-2 hover:bg-[#00df9a] rounded-xl m-4 cursor-pointer duration-300 hover:text-black'
          >
            {item.text}
          </li>

          
        ))}

        <li
          className=' hover:bg-[#00df9a] rounded-xl m-4 cursor-pointer duration-300 hover:text-black items-center'
        >
          <button
            onClick={handleLogout}
            className='ml-4 bg-[#e34141] text-white px-4 py-2 my-2 mx-4 rounded-xl hover:bg-[#e34141] duration-300'
          >
            Logout
          </button>
        </li>
      </ul>

      {/* Mobile Navigation Icon */}
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>

      {/* Mobile Navigation Menu */}
      <ul
        className={
          nav
            ? 'fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500'
            : 'ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]'
        }
      >
        {/* Mobile Logo */}
        <h1 className='w-full text-xl font-bold text-[#00df9a] m-4'>Student Dashboard</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600'
          >
            {item.text}
          </li>
        ))}

        <li className='p-4'>
          <button
            onClick={handleLogout}
            className='w-full bg-red-600 text-white px-4 py-2 rounded-xl hover:bg-red-700 duration-300'
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default StudentNavbar;