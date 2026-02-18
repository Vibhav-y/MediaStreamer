import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AiFillHome } from 'react-icons/ai'
import { MdOndemandVideo, MdUpload } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'

export default function Sidebar({ isOpen }) {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: AiFillHome, label: 'Home' },
    { path: '/watch', icon: MdOndemandVideo, label: 'Watch' },
    { path: '/upload', icon: MdUpload, label: 'Upload' },
    { path: '/profile', icon: FaUser, label: 'Profile' },
  ];

  return (
    <aside 
      className={`fixed left-0 top-14 bottom-0 bg-white dark:bg-black border-r border-gray-200 dark:border-gray-800 transition-all duration-300 z-40 overflow-y-auto ${
        isOpen ? 'w-60' : 'w-20'
      }`}
    >
      <div className="py-3">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-6 px-6 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                isActive ? 'bg-gray-100 dark:bg-gray-800' : ''
              }`}
            >
              <Icon className={`w-6 h-6 shrink-0 ${
                isActive ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`} />
              {isOpen && (
                <span className={`text-sm font-medium ${
                  isActive ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-300'
                }`}>
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </aside>
  )
}
