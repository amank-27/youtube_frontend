import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import VideoPage from './Pages/VideoPage';  // Import the VideoPage

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); 

  function setSideNavbarfunc() {
    setSideNavbar(prev => !prev);
  }

  return (
    <div>
      <Navbar 
        setSideNavbarfunc={setSideNavbarfunc} 
        sideNavbar={sideNavbar} 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm} 
      />
      <Routes>
        <Route path="/" element={<Home sideNavbar={sideNavbar} searchTerm={searchTerm} />} />
        <Route path="/videos/:id" element={<VideoPage />} />  {/* VideoPage Route */}
      </Routes>
    </div>
  );
}

export default App;
