import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useFetch from '../utils/useFetch';
import { Comments } from '../Components/Comments'; // import Comments component
import Sidebar from '../Components/Sidebar';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

//videoPage component showcasing each video to be played with comments this page also have comment component
function VideoPage({ sideNavbar }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: video, loading, error } = useFetch(`https://youtube-backend-iukm.onrender.com/videos/${id}`);
  const { data: allVideos, loading: allVideosLoading, error: allVideosError } = useFetch('https://youtube-backend-iukm.onrender.com/videos');

  const [likes, setLikes] = useState(0);  
  const [thumbUpClicked, setThumbUpClicked] = useState(false);  // tracking if thumbs-up was clicked
  const [thumbDownClicked, setThumbDownClicked] = useState(false);  // tracking if thumbs-down was clicked

  const userName = localStorage.getItem("userName"); // checking if the user is logged in
  const handleVideoClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };

  useEffect(() => {
    
    if (video && video.likes !== undefined) {
      setLikes(video.likes);
    }
  }, [video]);

  const handleThumbUpClick = () => {
    if (thumbDownClicked) {
      setThumbDownClicked(false);
      setLikes(likes + 1);  // Increase likes
    } else {
      // Toggle the like state
      setThumbUpClicked(!thumbUpClicked);
      if (thumbUpClicked) {
        setLikes(likes - 1);  // Decrease likes 
      } else {
        setLikes(likes + 1);  // Increase likes 
      }
    }
    setThumbUpClicked(!thumbUpClicked);  
  };

  const handleThumbDownClick = () => {
    if (thumbUpClicked) {
      setThumbUpClicked(false);
      setLikes(likes - 1);  
    } else {
      setThumbDownClicked(!thumbDownClicked);
    }
    setThumbDownClicked(!thumbDownClicked);  
  };

  if (loading || allVideosLoading) return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );

  if (error || allVideosError) return <div className="text-white">Error loading video data</div>;

  return (
    <div className="pt-[4vh]">
      <Sidebar sideNavbar={sideNavbar} />
      {/* Left Video Player (Fixed) */}
      <div className='bg-black text-white flex flex-row pt-[6vh] gap-6'>
      <div className="flex-3 sticky top-20 rounded-2xl ml-6 mr-6 w-full lg:w-[65vw] h-full lg:h-auto ">
        <iframe
          width="100%"
          height="500px"
          src={`${video.url}?autoplay=1`}  // Ensure autoplay is enabled
          title={video.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
        <div className="video-info mt-4">
          <h1 className="text-2xl font-semibold">{video.title}</h1>
          <div className="video-description mt-2">{video.description}</div>
          <div className="video-stats mt-2 text-gray-500">
            <span>{video.views} views</span> • 
            <span>
              <ThumbUpOffAltIcon 
                onClick={handleThumbUpClick} 
                style={{ color: thumbUpClicked ? 'blue' : 'white', cursor: thumbDownClicked ? 'not-allowed' : 'pointer' }} 
              />
              {likes} 
              <ThumbDownOffAltIcon 
                onClick={handleThumbDownClick} 
                style={{ color: thumbDownClicked ? 'blue' : 'white', cursor: thumbUpClicked ? 'not-allowed' : 'pointer' }} 
              />
            </span>
          </div>
          <div className="subscribe-section mt-4 w-[150px]">
          <h1 className="text-red-600 text-xl font-bold">{video.owner || "Amank"}</h1>
            <button className="bg-red-600 text-white  rounded">
              Subscribe
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="comments mt-8">
          {/* pass video id and logged-in userName to comments component */}
          <Comments id={id} />
        </div>
      </div>

      {/* Right Side (All Videos - Scrollable) */}
      <div className="flex-1 ml-4 overflow-y-auto max-h-screen hidden md:block lg:block " style={{ maxHeight: "calc(100vh + 350px)" }}>
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
    </div>
  );
}

export default VideoPage;
