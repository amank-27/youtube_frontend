import React, { useState } from 'react';
import useFetch from '../utils/useFetch';

function HomePage({ sideNavbar, searchTerm }) {
  const { data: videos, loading, error } = useFetch('https://youtube-backend-iukm.onrender.com/videos');
  const [selectedGenre, setSelectedGenre] = useState('All'); 
  const options = ["All", "Music", "Gaming", "Comedy", "Documentary", "Anime Music", "Anime Music Video", "Anime Fight"];

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error loading videos</div>;

  // filter the videos based on the search term
  let filteredVideos = videos.filter(video =>
    video.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // apply genre filter if selected
  if (selectedGenre !== "All") {
    filteredVideos = filteredVideos.filter(video =>
      video.genre.toLowerCase().includes(selectedGenre.toLowerCase())
    );
  }

  return (
    <div className={sideNavbar ? "homepage flex flex-col overflow-x-hidden flex-[1] ml-[142px] min-h-[100vh] lg:ml-[252px]" : "fullhomepage flex flex-col overflow-x-hidden flex-[1] ml-[0px] min-h-[100vh]"}>
      {/* genre filter options */}
      <div className="homepage_options flex fixed top-[72px] z-[1] w-[100%] box-border gap-5 flex-shrink-0 h-[auto] overflow-x-auto bg-black lg:top-[56px] md:top-[102px]">
        {options.map((item, index) => (
          <div
            key={index}
            className={`hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ${selectedGenre === item ? 'bg-red-600' : ''}`}
            onClick={() => setSelectedGenre(item)} // Set the selected genre
          >
            {item}
          </div>
        ))}
      </div>

      {/* Video List */}
      <div className="video-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-20 pl-4">
        {filteredVideos.map((video) => (
          <div key={video._id} className="video-card bg-black text-white rounded-md overflow-hidden cursor-pointer hover:bg-[rgb(28,28,28)] transition-all duration-200">
            <div className="thumbnail-container w-full h-[180px]">
              <img src={`/${video.thumbnail}`} alt={video.title} className="w-full h-full object-cover rounded-md" />
            </div>
            <div className="video-info p-4">
              <h3 className="video-title text-xl font-semibold truncate">{video.title}</h3>
              <div className="video-stats text-sm mt-2 text-gray-400">
                <span className="video-views">{video.views} views • </span>
                <span className="video-likes">{video.likes} likes</span>
              </div>
              <div className="video-owner text-gray-500 mt-2">Amank</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
