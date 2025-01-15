import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from './Components/Navbar'; 
import Home from './Pages/Home'; 
import VideoPage from './Pages/VideoPage'; 
import { Login } from './Components/LoginForm'; 
import { Register } from './Components/RegisterForm'; 

function App() {
  const [userPic, setUserPic] = useState(
    "https://img.freepik.com/free-vector/add-new-user_78370-4710.jpg?ga=GA1.1.364819553.1719325834&semt=ais_hybrid"
  ); // Default picture for logged-out user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Toggle the sideNavbar
  function setSideNavbarfunc() {
    setSideNavbar(prev => !prev);
  }

  // Handle login success (set user as logged in)
  function handleLoginSuccess() {
    setIsLoggedIn(true); // Set the user as logged in
  }

  // Handle logout
  function handleLogout() {
    setIsLoggedIn(false); // Set the user as logged out
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
        <Route path="/videos/:id" element={<VideoPage />} />
        <Route 
          path="/login" 
          element={<Login setUserPic={setUserPic} handleLoginSuccess={handleLoginSuccess} />} 
        />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
