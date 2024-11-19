import React, { useState, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from './../GlobalContext.jsx';

const AdminNavbar = () => {
  // State to manage the navbar's visibility
  const { globalVariable, setGlobalVariable } = useGlobalContext();
  const [nav, setNav] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const navigate = useNavigate();

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    // Logic for logout functionality
    // alert('You have been logged out.');
    setGlobalVariable('');
    navigate('/');
  };

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Register', path: '/admin/register' },
    { id: 2, text: 'Manage Students',
        subItems: [
            { id: 1, text: 'Overall Data', path: '/admin/manage-students/overall-data' },
            { id: 2, text: 'Search Date', path: '/admin/manage-students/search-by-date' },
            { id: 3, text: 'Search Roll', path: '/admin/manage-students/search-by-roll' },
          ],
    },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setNav(false); // Close the mobile menu on navigation
  };

  return (
    <div className='bg-black flex fixed top-0 left-0 z-50 w-full justify-between items-center h-16 max-w-[1440px] mx-auto px-2 mt-2 text-white'>
      {/* Logo */}
      <h1 className='w-1/3 text-2xl font-bold text-[#00df9a] whitespace-nowrap'>Admin Dashboard</h1>

      {/* Desktop Navigation */}
      <ul className='hidden md:flex'>
        {navItems.map((item) =>
          item.subItems ? (
            // Dropdown Menu for "Manage Students"
            <li
              key={item.id}
              className="relative flex items-center p-2 m-4 cursor-pointer duration-300"
              onMouseEnter={() => setDropdown(true)}
              onMouseLeave={() => setDropdown(false)}
            >
              <span className="hover:bg-[#00df9a] rounded-xl px-4 py-2 hover:text-black">
                {item.text}
              </span>
              {dropdown && (
                <ul className="absolute top-full left-0 mt-0 bg-white text-black rounded-xl shadow-lg">
                  {item.subItems.map((subItem) => (
                    <li
                      key={subItem.id}
                      className="px-4 py-2 hover:bg-[#00df9a] hover:text-black cursor-pointer rounded-xl"
                      onClick={() => handleNavigation(subItem.path)}
                    >
                      {subItem.text}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ) : (
            <li
              key={item.id}
              className="flex items-center p-2 hover:bg-[#00df9a] rounded-xl m-4 cursor-pointer duration-300 hover:text-black"
              onClick={() => handleNavigation(item.path)}
            >
              {item.text}
            </li>
          )
        )}

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
        <h1 className='w-full text-xl font-bold text-[#00df9a] m-4'>Admin Dashboard</h1>

        {/* Mobile Navigation Items */}
        {navItems.map((item) =>
          item.subItems ? (
            <li
              key={item.id}
              className="p-2 border-b rounded-xl hover:bg-[#00df9a] m-2 duration-300 hover:text-black cursor-pointer border-gray-600"
            >
              <span>{item.text}</span>
              <ul className="ml-4">
                {item.subItems.map((subItem) => (
                  <li
                    key={subItem.id}
                    className="p-2 hover:bg-[#00df9a] rounded-xl m-2 duration-300 hover:text-black cursor-pointer"
                    onClick={() => handleNavigation(subItem.path)}
                  >
                    {subItem.text}
                  </li>
                ))}
              </ul>
            </li>
          ) : (
            <li
              key={item.id}
              className="p-2 border-b rounded-xl hover:bg-[#00df9a] m-2 duration-300 hover:text-black cursor-pointer border-gray-600"
              onClick={() => handleNavigation(item.path)}
            >
              {item.text}
            </li>
          )
        )}

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

export default AdminNavbar;