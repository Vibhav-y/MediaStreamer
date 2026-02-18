import React from 'react'
import { Link } from 'react-router-dom'

export default function VideoCard({ video }) {
  const { id, snippet } = video;
  const videoId = id.videoId || id;
  const { title, thumbnails, channelTitle, publishedAt } = snippet;

  // Format view count and published time
  const formatPublishedTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'Today';
    if (diffInDays === 1) return '1 day ago';
    if (diffInDays < 7) return `${diffInDays} days ago`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} weeks ago`;
    if (diffInDays < 365) return `${Math.floor(diffInDays / 30)} months ago`;
    return `${Math.floor(diffInDays / 365)} years ago`;
  };

  return (
    <Link to={`/watch/${videoId}`} className="group cursor-pointer">
      <div className="relative">
        {/* Thumbnail */}
        <img
          src={thumbnails.medium.url}
          alt={title}
          className="w-full aspect-video object-cover rounded-xl"
        />
        {/* Duration badge - placeholder for now */}
        <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
          0:00
        </div>
      </div>

      {/* Video Info */}
      <div className="flex gap-3 mt-3">
        {/* Channel Avatar - placeholder */}
        <div className="shrink-0">
          <div className="w-9 h-9 rounded-full bg-linear-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-semibold">
            {channelTitle.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Video Details */}
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-sm line-clamp-2 text-black dark:text-white group-hover:text-gray-700 dark:group-hover:text-gray-300">
            {title}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {channelTitle}
          </p>
          <div className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400">
            <span>801K views</span>
            <span>•</span>
            <span>{formatPublishedTime(publishedAt)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
