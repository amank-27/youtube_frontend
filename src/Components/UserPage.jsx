import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function UserPage() {
  const navigate = useNavigate();
  const [reload, setReload] = useState(true);
  const [data, setData] = useState(null);

  const userName = localStorage.getItem("userName");
  const email = localStorage.getItem("email");
  const JWT = localStorage.getItem("token");
  const channelName = localStorage.getItem("channelName");

  // Redirect if not logged in or channel name is not set
  useEffect(() => {
    if (!JWT || !channelName) {
      navigate("/"); // If the user is not logged in or doesn't have a channel, redirect to homepage
    }
  }, [JWT, channelName, navigate]);

  // Fetch all videos from the API
  useEffect(() => {
    async function retrieve() {
      const response = await fetch("https://youtube-backend-iukm.onrender.com/videos");
      const result = await response.json();
      setData(result);
    }
    retrieve();
  }, [reload]);

  // Loading state
  if (!data) {
    return (
      <div>
        <div className="flex justify-center items-center h-screen">
      <div className="w-16 h-16 border-4 border-blue-800 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
      </div>
    );
  }

  // Function to handle deleting a video
  async function handleVideoDelete(videoId, event) {
    event.stopPropagation(); // Prevent the click from triggering the video player page redirect

    const conf = confirm("Are you sure you want to DELETE the video?");
    if (conf === true) {
      const id = typeof videoId === 'object' ? videoId.$oid || videoId._id : videoId;

      const response = await fetch("https://youtube-backend-iukm.onrender.com/deletevideo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id, // Pass the correct ID format
        }),
      });

      const message = await response.json();
      if (message.message === "video deleted") {
        alert("Video deleted successfully!");
        setReload(!reload); // Trigger a reload to refresh the video list
      } else {
        alert("Error deleting video.");
      }
    }
  }

  // Function to handle navigating to the video player page
  function handleVideoClick(videoId) {
    navigate(`/videos/${videoId}`); // Navigate to the video player page on click
  }

  // Filter videos where the owner matches the channelName from localStorage
  const userVideos = data.filter((video) => video.owner === channelName);

  // Handle the delete channel functionality
  async function handleDelete() {
    const choice = confirm("Are you sure you want to delete the channel?");
    if (choice === true) {
      const saveUser = await fetch("https://youtube-backend-iukm.onrender.com/deletechannel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "authorization": `JWT ${JWT}`,
        },
        body: JSON.stringify({
          email: email,
        }),
      });

      const message = await saveUser.json();

      if (message.message === "Channel deleted") {
        localStorage.removeItem("channelName"); // Remove channel from localStorage
        alert("Channel deleted successfully.");
        setTimeout(() => {
          navigate("/"); // Redirect to homepage after deletion
        }, 1000);
      } else {
        alert(message.message || "Error deleting channel");
      }
    }
  }

  return (
    <div className="pt-16">
      <div className="m-10">
        <div className="flex m-10 ml-[10%]">
          <div className="rounded-[500px] overflow-hidden w-[100px] h-[100px]">
            <img
              src="https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"
              alt=""
              className="w-[100px] h-[100px]"
            />
          </div>
          <div className="flex flex-col justify-center items-start">
            <div className="text-3xl font-semibold ml-[20px]">{channelName}</div>
            <div className="font-bold text-gray-400 ml-[20px]">0 Subs</div>
            <div className="flex flex-col md:flex-row md:gap-5">
              <div className="text-center border p-2 rounded-r-[50px] rounded-l-[50px] bg-gray-600 font-bold text-l cursor-pointer m-2">
                Subscribe
              </div>
              <div
                onClick={() => navigate("/addvideo")}
                className="text-center border p-2 rounded-r-[50px] rounded-l-[50px] bg-cyan-600 font-bold text-l cursor-pointer m-2 w-[100px]"
              >
                Add Video
              </div>
              <div
                onClick={handleDelete}
                className="text-center border p-2 rounded-r-[50px] rounded-l-[50px] bg-red-600 font-bold text-l cursor-pointer m-2"
              >
                Delete Channel
              </div>
            </div>
          </div>
        </div>
        <div className="border"></div>

        <div>
          <div className="m-10 text-2xl">Uploads:</div>
          <div className="video-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pl-4">
            {userVideos.length === 0 ? (
              <div className="text-white text-center">No videos uploaded yet.</div>
            ) : (
              userVideos.map((video) => (
                <div
                  key={video._id}
                  className="video-card bg-black text-white rounded-md overflow-hidden cursor-pointer hover:bg-[rgb(28,28,28)] transition-all duration-200"
                  onClick={() => handleVideoClick(video._id)} // Navigate to the video player page on click
                >
                  <div className="thumbnail-container w-full h-[180px]">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="video-info p-4">
                    <h3 className="video-title text-xl font-semibold truncate">{video.title}</h3>
                    <div className="video-stats text-sm mt-2 text-gray-400">
                      <span className="video-views">{video.views} views • </span>
                      <span className="video-likes">{video.likes} likes</span>
                    </div>
                    <div className="video-owner text-gray-500 mt-2">{video.owner}</div>
                  </div>
                  <div className="delete-video-button mt-4 flex justify-center">
                    <button
                      onClick={(e) => handleVideoDelete(video._id, e)} // Pass event to prevent redirection on delete
                      className="text-red-600 font-bold"
                    >
                      Delete Video
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
