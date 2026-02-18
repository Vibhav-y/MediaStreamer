import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function Watch() {
  const { id } = useParams();
  const [videoDetails, setVideoDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    async function fetchVideoDetails() {
      try {
        const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;
        const response = await fetch(
          `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${API_KEY}`
        );
        const data = await response.json();
        if (data.items && data.items.length > 0) {
          setVideoDetails(data.items[0]);
        }
      } catch (error) {
        console.error('Error fetching video details:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchVideoDetails();
  }, [id]);

  if (!id) {
    return (
      <div className="text-black dark:text-white">
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">Watch Page</h2>
          <p className="text-gray-600 dark:text-gray-400">Select a video to watch</p>
        </div>
      </div>
    );
  }

  return (
    <div className="text-black dark:text-white max-w-7xl mx-auto">
      {/* Video Player */}
      <div className="aspect-video bg-black rounded-lg overflow-hidden mb-4">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      {/* Video Details */}
      {loading ? (
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div>
        </div>
      ) : videoDetails ? (
        <div>
          <h1 className="text-xl font-semibold mb-2">
            {videoDetails.snippet.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span>{parseInt(videoDetails.statistics.viewCount).toLocaleString()} views</span>
            <span>{parseInt(videoDetails.statistics.likeCount).toLocaleString()} likes</span>
          </div>
          
          <div className="bg-gray-100 dark:bg-gray-900 rounded-lg p-4">
            <div className="font-semibold mb-2">{videoDetails.snippet.channelTitle}</div>
            <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-pre-wrap">
              {videoDetails.snippet.description}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  )
}
