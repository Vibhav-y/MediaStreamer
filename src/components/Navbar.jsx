import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FiSearch, FiSun, FiMoon, FiMenu } from 'react-icons/fi'
import { BiVideoPlus } from 'react-icons/bi'
import { FaUser } from 'react-icons/fa'

export default function Navbar({ toggleSidebar }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${searchQuery}`);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-14 bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-4 z-50 transition-colors">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <button 
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          <FiMenu className="w-6 h-6 text-black dark:text-white" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="w-9 h-9 bg-red-600 rounded-lg flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
          <span className="text-xl font-semibold text-black dark:text-white">Streamix</span>
        </Link>
      </div>

      {/* Center Section - Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
        <div className="flex items-center">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full h-10 px-4 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-l-full text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
          <button
            type="submit"
            className="h-10 px-6 bg-gray-200 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 border-l-0 rounded-r-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <FiSearch className="w-5 h-5 text-black dark:text-white" />
          </button>
        </div>
      </form>

      {/* Right Section */}
      <div className="flex items-center gap-2">
        <Link to="/upload" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" title="Upload">
          <BiVideoPlus className="w-6 h-6 text-black dark:text-white" />
        </Link>
        <Link to="/profile" className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors" title="Profile">
          <FaUser className="w-6 h-6 text-black dark:text-white" />
        </Link>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
        >
          {isDarkMode ? (
            <FiSun className="w-6 h-6 text-black dark:text-white" />
          ) : (
            <FiMoon className="w-6 h-6 text-black dark:text-white" />
          )}
        </button>
      </div>
    </nav>
  )
}
