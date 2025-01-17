import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'; 
import Home from './Pages/Home'; 
import VideoPage from './Pages/VideoPage'; 
import { Login } from './Components/LoginForm'; 
import { Register } from './Components/RegisterForm'; 
import ChannelPage from "./Components/ChannelPage";

function App() {
  const [userPic, setUserPic] = useState(
    "https://img.freepik.com/free-vector/add-new-user_78370-4710.jpg?ga=GA1.1.364819553.1719325834&semt=ais_hybrid"
  ); // Default picture for logged-out user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    if (token && userName) {
      setIsLoggedIn(true); // If token and username exist in localStorage, the user is logged in
      setUserPic("https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"); // Set user profile picture
    }
  }, []);

  function setSideNavbarfunc() {
    setSideNavbar(prev => !prev);
  }

  function handleLoginSuccess() {
    setIsLoggedIn(true);
  }

  function handleLogout() {
    setIsLoggedIn(false);
    setUserPic("https://img.freepik.com/free-vector/add-new-user_78370-4710.jpg?ga=GA1.1.364819553.1719325834&semt=ais_hybrid");
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
    localStorage.removeItem('channelName');
  }

  return (
    <div>
      <Navbar 
        setSideNavbarfunc={setSideNavbarfunc} 
        sideNavbar={sideNavbar} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
        userPic={userPic}  
        isLoggedIn={isLoggedIn} // Pass login state to Navbar
        handleLogout={handleLogout} // Pass logout handler to Navbar
      />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} searchTerm={searchTerm} />} />
        <Route path="/videos/:id" element={<VideoPage sideNavbar={sideNavbar} />} />
        <Route 
          path="/login" 
          element={<Login setUserPic={setUserPic} handleLoginSuccess={handleLoginSuccess} />} 
        />
        <Route path="/register" element={<Register />} />
        <Route path="/channel" element={<ChannelPage />} />
      </Routes>
    </div>
  );
}

export default App;
