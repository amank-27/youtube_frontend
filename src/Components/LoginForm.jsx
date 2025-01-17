import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Login({ setUserPic, handleLoginSuccess }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  async function login(e) {
    e.preventDefault();

    // Validate fields
    if (!username || !password) {
      alert("All fields are necessary");
      return;
    }

    try {
      console.log("Logging in with", username, password); // Log the input values

      const saveUser = await fetch("https://youtube-backend-iukm.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      console.log("Login response status:", saveUser.status); // Log the status of the response

      if (!saveUser.ok) {
        throw new Error("Failed to login");
      }

      const message = await saveUser.json();
      console.log("Server Response:", message); // Log the server response

      if (message.token) {
        console.log("Token received:", message.token); // Log the token

        localStorage.setItem("userName", username);
        localStorage.setItem("email", message.email); // Store email
        localStorage.setItem("token", message.token);

        // Set user picture after login
        setUserPic("https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png");

        alert(message.message);

        // Notify App to update login state
        handleLoginSuccess();

        navigate("/"); // Redirect to home after successful login
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("There was an issue logging in. Please try again.");
    }
  }

  return (
    <div className="w-[100%] h-[100vh] flex justify-center items-center">
      <form
        className="border border-white rounded-lg w-[50%] p-[5%] flex flex-col gap-10 justify-center items-center"
        onSubmit={login}
      >
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-[70%] text-xl p-[5px] rounded-lg text-black"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-[70%] text-xl p-[5px] rounded-lg text-black"
        />
        <button
          type="submit"
          className="border border-red-600 bg-red-600 font-bold w-[70%] text-xl p-[5px] rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
