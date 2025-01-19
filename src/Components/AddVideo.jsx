import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";

export function AddVideo({ onVideoAdded , sideNavbar }) {
  const navigate = useNavigate();

  const [videoId, setVideoId] = useState("");
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");

  const owner = localStorage.getItem("channelName");

  // Function to handle video submission
  async function submit(e) {
    e.preventDefault();

    if (videoId === "" || title === "" || url === "" || thumbnail === "" || description === "" || genre === "") {
      alert("Fields cannot be empty");
      return;
    }

    if (videoId.includes(" ")) {
      alert("Video ID cannot have a space");
      return;
    }

    const saveUser = await fetch("https://youtube-backend-iukm.onrender.com/addvideo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        videoId,
        title,
        url,
        thumbnail,
        description,
        genre,
        owner,
      }),
    });

    const message = await saveUser.json();

    if (message.message === "video added") {
      if (onVideoAdded) {
        onVideoAdded(); // trigger reload in UserPage
      }
      setTimeout(() => {
        navigate("/channelpage"); // navigate back to the user page
      }, 1000);
    }
  }

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center pt-16 bg-black">
       <Sidebar sideNavbar={sideNavbar} />
      <form className="border border-white rounded-lg w-[50%] p-[5%] flex flex-col gap-2 justify-center items-center">
      <h1 className='text-2xl font-bold text-purple-800'>Add Video Details</h1>
        <input type="text" onChange={(e) => setVideoId(e.target.value)} placeholder="Video ID"
        className="w-[70%] text-xl p-[5px] rounded-lg text-black"/>
       <input type="text" onChange={(e) => setTitle(e.target.value)} placeholder="Title"
        className="w-[70%] text-xl p-[5px] rounded-lg text-black"/>
        <input type="text" onChange={(e) => setUrl(e.target.value)} placeholder="Enter Video URL"
        className="w-[70%] text-xl p-[5px] rounded-lg text-black"/>
        <input type="text" onChange={(e) => setDescription(e.target.value)} placeholder="Description"
          className="w-[70%] text-xl p-[5px] rounded-lg text-black" />
        <input type="text" onChange={(e) => setThumbnail(e.target.value)} placeholder="Enter Thumbnail URL"
        className="w-[70%] text-xl p-[5px] rounded-lg text-black"/>
        <input type="text" onChange={(e) => setGenre(e.target.value)} placeholder="Genre"
        className="w-[70%] text-xl p-[5px] rounded-lg text-black"/>
        <button type="submit" onClick={(e) => submit(e)}
        className="border border-red-600 bg-red-600 font-bold w-[70%] text-xl p-[5px] rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddVideo;
