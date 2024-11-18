import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

const MessNavbar = () => {
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false);
  const navigate = useNavigate();

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    // Logic for logout functionality
    alert('You have been logged out.');
    navigate('/');
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Mess Entry', path: '/mess/mess-entry' },
    { id: 2, text: 'Mess Overall', path: '/mess/mess-overall' },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setNav(false); // Close the mobile menu on navigation
  };

  return (
    <div className='bg-black flex fixed top-0 left-0 z-50 w-full justify-between items-center h-16 max-w-[1440px] mx-auto px-2 mt-2 text-white'>
      {/* Logo */}
      <h1 className='w-1/3 text-2xl font-bold text-[#00df9a] whitespace-nowrap'>Mess Dashboard</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map(item => (
          <li
            key={item.id}
            className='flex items-center p-2 hover:bg-[#00df9a] rounded-xl m-4 cursor-pointer duration-300 hover:text-black'
            onClick={() => handleNavigation(item.path)}
          >
            {item.text}
          </li>

          
        ))}

        <li
          className='rounded-xl m-4 cursor-pointer duration-300 hover:text-black items-center'
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
        <h1 className='w-full text-xl font-bold text-[#00df9a] m-4'>Mess Dashboard</h1>

        {/* Mobile Navigation Items */}
        {navItems.map(item => (
          <li
            key={item.id}
            className='p-2 border-b rounded-xl hover:bg-[#00df9a] m-2 duration-300 hover:text-black cursor-pointer border-gray-600'
            onClick={() => handleNavigation(item.path)}
          >
            {item.text}
          </li>
        ))}

        <li className='p-4'>
          <button
            onClick={handleLogout}
            className='w-full bg-[#e34141] text-white px-4 py-2 rounded-xl hover:bg-red-700 duration-300'
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default MessNavbar;