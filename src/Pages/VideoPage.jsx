import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import { Comments } from '../Components/Comments'; // Import Comments component

function VideoPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: video, loading, error } = useFetch(`https://youtube-backend-iukm.onrender.com/videos/${id}`);
  const { data: allVideos, loading: allVideosLoading, error: allVideosError } = useFetch('https://youtube-backend-iukm.onrender.com/videos');

  const userName = localStorage.getItem("userName"); // Check if the user is logged in
  const handleVideoClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };

  if (loading || allVideosLoading) return <div className="flex justify-center items-center h-screen">
    <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>;
  if (error || allVideosError) return <div className="text-white">Error loading video data</div>;

  return (
    <div className="bg-black text-white flex flex-row pt-20 gap-6">
      {/* Left Video Player (Fixed) */}
      <div className="flex-3 sticky top-20 w-full lg:w-[65vw] h-full lg:h-auto">
        <iframe
          width="100%"
          height="500px"
          src={`${video.url}?autoplay=1`}  // Ensure autoplay is enabled
          title={video.title}
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="video-info mt-4">
          <h1 className="text-2xl font-semibold">{video.title}</h1>
          <div className="video-description mt-2">{video.description}</div>
          <div className="video-stats mt-2 text-gray-500">
            <span>{video.views} views</span> • <span>{video.likes} likes</span>
          </div>
          <div className="subscribe-section mt-4">
            <button className="bg-red-600 text-white py-2 px-4 rounded">
              Subscribe
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments mt-8">
          <h2 className="text-xl font-semibold">Comments</h2>
          {/* Pass video ID and logged-in userName to Comments component */}
          {userName && <Comments id={id} />}
        </div>
      </div>

      {/* Right Side (All Videos - Scrollable) */}
      <div className="flex-1 ml-4 overflow-y-auto max-h-screen hidden md:block lg:block">
        <h2 className="text-xl font-bold">All Videos</h2>
        {allVideos.map((item) => (
          <div key={item._id} className="related-video mt-4 cursor-pointer" onClick={() => handleVideoClick(item._id)}>
            <img
              className="w-full h-44 object-cover rounded-md"
              src={`/${item.thumbnail}`}
              alt={item.title}
            />
            <div className="mt-2">{item.title}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoPage;
