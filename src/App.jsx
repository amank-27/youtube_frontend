import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from './Components/Navbar'; 
import Home from './Pages/Home'; 
import VideoPage from './Pages/VideoPage'; 
import { Login } from './Components/LoginForm'; 
import { Register } from './Components/RegisterForm'; 
import CreateChannel from "./Components/CreateChannel";
import UserPage from "./Components/UserPage";
import AddVideo from "./Components/addVideo";

function App() {
  const navigate = useNavigate();
  const [userPic, setUserPic] = useState(
    "https://img.freepik.com/free-vector/add-new-user_78370-4710.jpg?ga=GA1.1.364819553.1719325834&semt=ais_hybrid"
  ); // Default picture for logged-out user
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userName');
    const channelName = localStorage.getItem('channelName'); // Retrieve channel name

    if (token && userName) {
      setIsLoggedIn(true); // If token and username exist in localStorage, the user is logged in
      setUserPic("https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png"); // Set user profile picture
    }

    // Do not redirect to user page automatically here, wait for explicit navigation.
  }, []);

  function handleLogout() {
    setIsLoggedIn(false);
    setUserPic("https://img.freepik.com/free-vector/add-new-user_78370-4710.jpg?ga=GA1.1.364819553.1719325834&semt=ais_hybrid");
    localStorage.removeItem('userName');
    localStorage.removeItem('email');
    localStorage.removeItem('token');
   
    navigate('/'); // Redirect to homepage after logout
  }

  return (
    <div>
      <Navbar 
        setSideNavbarfunc={() => setSideNavbar(prev => !prev)} 
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
          element={<Login setUserPic={setUserPic} handleLoginSuccess={() => setIsLoggedIn(true)} />} 
        />
        <Route path="/register" element={<Register />} />
        <Route path="/createchannel" element={<CreateChannel />} />
        <Route path="/userpage" element={<UserPage />} />
        <Route path="/addvideo" element={<AddVideo />} />
      </Routes>
    </div>
  );
}

export default App;
