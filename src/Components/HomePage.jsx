import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useFetch from "../utils/useFetch";

function HomePage({ sideNavbar, searchTerm }) {
  const navigate = useNavigate(); 
  const { data: videos, loading, error } = useFetch("https://youtube-backend-iukm.onrender.com/videos");
  const [selectedGenre, setSelectedGenre] = useState("All");
  const options = ["All", "Music", "Gaming", "Comedy", "Documentary", "Anime Music", "Anime Music Video", "Anime Fight"];

  if (loading) return <div className="flex justify-center items-center w-[100vw] h-[100vh]">
    <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent border-solid rounded-full animate-spin"></div>
  </div>;

  if (error) return <div className="text-white">Error loading videos</div>;

  let filteredVideos = videos.filter(video => video.title.toLowerCase().includes(searchTerm.toLowerCase()));

  if (selectedGenre !== "All") {
    filteredVideos = filteredVideos.filter(video => video.genre.toLowerCase().includes(selectedGenre.toLowerCase()));
  }

  return (
    <div className={"sideNavbar fullhomepage flex flex-col overflow-x-hidden flex-[1] ml-[0px] min-h-[100vh]"}>
      <div className="homepage_options flex fixed top-[76px] pl-4 z-[1] w-[100%] box-border gap-5 flex-shrink-0 h-[auto] overflow-x-auto bg-black lg:top-[56px] md:top-[104px]  lg:pl-36 md:pl-6">
        {options.map((item, index) => (
          <div
            key={index}
            className={`hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ${selectedGenre === item ? 'bg-red-600' : ''}`}
            onClick={() => setSelectedGenre(item)}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Video List */}
      <div className="video-list  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 pt-20 pr-4 pl-4 md:pr-20 md:pl-20 ">
        {filteredVideos.map((video) => {
          const videoOwner = video.owner || "Amank";  // Use "Amank" if no owner is found
          return (
            <div 
              key={video._id} 
              className="video-card bg-black text-white rounded-md overflow-hidden cursor-pointer hover:bg-[rgb(28,28,28)] transition-all duration-200"
              onClick={() => navigate(`/videos/${video._id}`)}
            >
              <div className="thumbnail-container w-full h-[180px]">
                <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover rounded-md" />
              </div>
              <div className="video-info p-4">
                <h3 className="video-title text-xl font-semibold truncate">{video.title}</h3>
                <div className="video-stats text-sm mt-2 text-gray-400">
                  <span className="video-views">{video.views} views • </span>
                  <span className="video-likes">{video.likes} likes</span>
                </div>
                <div className="video-owner text-gray-500 mt-2">{videoOwner}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HomePage;
