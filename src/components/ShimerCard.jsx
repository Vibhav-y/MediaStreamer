import React from 'react'

export default function ShimmerCard() {
  return (
    <div className="animate-pulse">
      {/* Thumbnail Skeleton */}
      <div className="w-full aspect-video bg-gray-200 dark:bg-gray-800 rounded-xl"></div>

      {/* Video Info Skeleton */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar Skeleton */}
        <div className="shrink-0">
          <div className="w-9 h-9 rounded-full bg-gray-200 dark:bg-gray-800"></div>
        </div>

        {/* Video Details Skeleton */}
        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div>
          
          {/* Channel name */}
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div>
          
          {/* Views and date */}
          <div className="h-3 bg-gray-200 dark:bg-gray-800 rounded w-2/3"></div>
        </div>
      </div>
    </div>
  )
}
