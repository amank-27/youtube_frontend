import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function CreateChannel() {
  const navigate = useNavigate();
  const [channelName, setChannelName] = useState('');
  const [channelDescription, setChannelDescription] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const token = localStorage.getItem("token");
  const savedChannelName = localStorage.getItem("channelName");

  if (!token) {
    navigate("/login");
    return;
  }

  if (savedChannelName) {
    navigate("/userpage");
    return;
  }

  async function createChannelHandler(e) {
    e.preventDefault();

    if (!channelName || !channelDescription) {
      setErrorMessage("Both Channel Name and Description are required.");
      return;
    }

    const email = localStorage.getItem("email");

    if (!email) {
      setErrorMessage("Email is required to create a channel.");
      return;
    }

    try {
      const response = await fetch("https://youtube-backend-iukm.onrender.com/createchannel", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `JWT ${token}`,
        },
        body: JSON.stringify({
          email,  
          channelName, 
          channelDescription, 
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create channel");
      }

      const result = await response.json();

      if (result.success || response.status === 201) {
        alert("Channel created successfully");

        // Debug: Log before saving to localStorage
        console.log("Saving Channel Name to localStorage:", channelName);
        
        localStorage.setItem("channelName", channelName); 
        navigate("/userpage");
      } else {
        setErrorMessage(result.message || "An unknown error occurred.");
      }
    } catch (error) {
      console.error("Error during channel creation:", error);
      setErrorMessage("Error creating channel. Please try again.");
    }
  }

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <form
        className="border border-white rounded-lg w-[50%] p-[5%] flex flex-col gap-10 justify-center items-center"
        onSubmit={createChannelHandler}
      >
        {errorMessage && <div className="text-red-600">{errorMessage}</div>}
        <input
          type="text"
          value={channelName}
          onChange={(e) => setChannelName(e.target.value)}
          placeholder="Channel Name"
          className="w-[70%] text-xl p-[5px] rounded-lg text-black"
        />
        <textarea
          value={channelDescription}
          onChange={(e) => setChannelDescription(e.target.value)}
          placeholder="Channel Description"
          className="w-[70%] text-xl p-[5px] rounded-lg text-black"
        />
        <button
          type="submit"
          className="border border-red-600 bg-red-600 font-bold w-[70%] text-xl p-[5px] rounded-lg"
        >
          Create Channel
        </button>
      </form>
    </div>
  );
}

export default CreateChannel;
