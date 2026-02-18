import React, { useState, useEffect } from 'react'
import VideoCard from '../components/VideoCard'
import ShimmerCard from '../components/ShimerCard'

export default function Home() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageTokens, setPageTokens] = useState([null]); // Stores tokens for each page: [null, tokenP2, tokenP3...]

  const categories = ['All', 'Music', 'Gaming', 'News', 'Live', 'Sports', 'Learning'];

  useEffect(() => {
    // Reset pagination when category changes
    setCurrentPage(1);
    setPageTokens([null]);
  }, [activeCategory]);

  useEffect(() => {
    async function fetchVideos() {
      setLoading(true);
      setError(null);
      // Don't clear videos immediately to avoid layout shift, or do clear if preferred
      // setVideos([]); 
      
      try {
        const API_KEY = import.meta.env.VITE_VIDEO_API_KEY;
        const searchQuery = activeCategory === 'All' ? 'trending' : activeCategory;
        const pageToken = pageTokens[currentPage - 1]; // Get token for current page
        
        const url = new URL('https://www.googleapis.com/youtube/v3/search');
        url.searchParams.append('part', 'snippet');
        url.searchParams.append('maxResults', '24');
        url.searchParams.append('q', searchQuery);
        url.searchParams.append('type', 'video');
        url.searchParams.append('key', API_KEY);
        if (pageToken) {
          url.searchParams.append('pageToken', pageToken);
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }

        const data = await response.json();
        setVideos(data.items || []);
        
        // If we have a next page token and we haven't saved it yet for the next page, save it
        if (data.nextPageToken) {
          setPageTokens(prev => {
            const newTokens = [...prev];
            // Ensure we don't overwrite if we go back and forth (mostly relevant if we didn't slice)
            // But strict append is safer for linear navigation
            if (newTokens.length <= currentPage) {
               newTokens[currentPage] = data.nextPageToken;
            }
            return newTokens;
          });
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching videos:', err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchVideos();
  }, [activeCategory, currentPage, pageTokens.length]); // Dependencies to trigger fetch

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="text-black dark:text-white">
      {/* Category Filters */}
      <div className="mb-6 flex gap-3 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-colors ${
              activeCategory === category
                ? 'bg-gray-900 dark:bg-white text-white dark:text-black'
                : 'bg-gray-200 dark:bg-gray-800 text-black dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
          {Array.from({ length: 24 }).map((_, index) => (
            <ShimmerCard key={index} />
          ))}
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="text-center py-20">
          <p className="text-red-500 mb-2">Error loading videos</p>
          <p className="text-gray-600 dark:text-gray-400 text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      )}

      {/* Videos Grid */}
      {!loading && !error && videos.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 gap-y-8">
            {videos.map((video) => (
              <VideoCard key={video.id.videoId || video.id} video={video} />
            ))}
          </div>
          
          {/* Pagination Controls */}
          <div className="flex flex-wrap justify-center gap-2 mt-12 pb-10">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === 1
                  ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Prev
            </button>

            {/* Page Numbers */}
            {pageTokens.map((_, index) => {
              const pageNumber = index + 1;
              // Only show limited pages around current to avoid overflow if list gets long
              if (
                pageNumber === 1 ||
                pageNumber === pageTokens.length ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={pageNumber}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-10 h-10 rounded-full font-medium transition-all ${
                      currentPage === pageNumber
                        ? 'bg-black text-white dark:bg-white dark:text-black scale-110 shadow-lg'
                        : 'bg-gray-200 text-black dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700'
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return <span key={pageNumber} className="flex items-end px-1">...</span>;
              }
              return null;
            })}

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === pageTokens.length}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                currentPage === pageTokens.length
                  ? 'bg-gray-100 text-gray-400 dark:bg-gray-800 dark:text-gray-600 cursor-not-allowed'
                  : 'bg-gray-200 text-black dark:bg-gray-700 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* No Videos State */}
      {!loading && !error && videos.length === 0 && (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-2">No videos found</h2>
          <p className="text-gray-600 dark:text-gray-400">Try selecting a different category</p>
        </div>
      )}
    </div>
  )
}
