import React from "react";
import useFetch from "../utils/useFetch";

function HomePage({sideNavbar}){
    const { data: videos, loading, error } = useFetch('https://youtube-backend-iukm.onrender.com/videos');

    if (loading) return <div className="text-white">Loading...</div>;
    if (error) return <div className="text-white">Error loading videos</div>;
  
    return(
        <>
        <div className={sideNavbar?"homepage flex flex-col overflow-x-hidden flex-[1] ml-[142px] min-h-[100vh] lg:ml-[252px] ":"fullhomepage flex flex-col overflow-x-hidden flex-[1] ml-[0px] min-h-[100vh]"}>
            <div className="homepage_options flex fixed top-[72px] z-[1] w-[100%] box-border gap-5 flex-shrink-0 h-[auto] overflow-x-auto bg-black lg:top-[56px] md:top-[102px]">
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    All
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Music
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Gaming
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Comedy
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Live
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Cars
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Vlogging
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                Trending
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Fantasy
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Science Fiction
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    ASMR
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Technology
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                    Magic
                 </div>
                 <div className="hompage_option flex-shrink-0 flex-grow-0 basis-auto h-[30px] py-1 px-[10px] bg-[rgb(42,42,42)] text-white font-semibold rounded-[5px] flex justify-center items-center cursor-pointer ">
                 Motorcycles
                 </div>
                 
               
            </div>
      
      {/* Video List */}
      <div className="video-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-20 pl-4">
        {videos.map((video) => (
          <div key={video._id} className="video-card bg-black text-white rounded-md overflow-hidden cursor-pointer hover:bg-[rgb(28,28,28)] transition-all duration-200">
            {/* Video Thumbnail */}
            <div className="thumbnail-container w-full h-[180px]">
              <img 
                 src={`/${video.thumbnail}`} 

                alt={video.title} 
                className="w-full h-full object-cover rounded-md" 
              />
            </div>

            {/* Video Information */}
            <div className="video-info p-4">
              <h3 className="video-title text-xl font-semibold truncate">{video.title}</h3>

              <div className="video-stats text-sm mt-2 text-gray-400">
                <span className="video-views">{video.views} views • </span>
                <span className="video-likes">{video.likes} likes</span>
              </div>

              {/* Channel Name*/}
              <div className="video-owner text-gray-500 mt-2">Amank</div>
            </div>
          </div>
        ))}
      </div>
    </div>
        </>
    )
}

export default HomePage;  