import React from 'react'

export default function Profile() {
  return (
    <div className="text-black dark:text-white">
      <div className="max-w-4xl mx-auto py-10">
        <h2 className="text-2xl font-semibold mb-6">Profile</h2>
        <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-6 transition-colors">
          <p className="text-gray-600 dark:text-gray-400">User profile will be displayed here</p>
        </div>
      </div>
    </div>
  )
}
