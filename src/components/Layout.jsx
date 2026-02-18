import React, { useState } from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen transition-colors">
      <Navbar toggleSidebar={toggleSidebar} />
      <Sidebar isOpen={sidebarOpen} />
      <main 
        className={`pt-14 transition-all duration-300 ${
          sidebarOpen ? 'ml-60' : 'ml-20'
        }`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  )
}
