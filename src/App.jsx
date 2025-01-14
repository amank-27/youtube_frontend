import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';

function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state

  function setSideNavbarfunc() {
    setSideNavbar(prev => !prev);
  }

  return (
    <div>
      <Navbar 
        setSideNavbarfunc={setSideNavbarfunc} 
        sideNavbar={sideNavbar} 
        searchTerm={searchTerm} // pass searchTerm
        setSearchTerm={setSearchTerm} // pass setSearchTerm to update searchTerm
      />
      <Home 
        sideNavbar={sideNavbar} 
        searchTerm={searchTerm} // pass searchTerm to HomePage
      />
    </div>
  );
}

export default App;
