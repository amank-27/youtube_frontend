import { useState } from 'react';
import Navbar from './Components/Navbar';
import Home from './Pages/Home';


function App() {
  const [sideNavbar, setSideNavbar] = useState(true);
    
  function setSideNavbarfunc(){
    setSideNavbar(prev => !prev)
  }
  return (
    <>
    <Navbar setSideNavbarfunc={setSideNavbarfunc} sideNavbar={sideNavbar}/>
    <Home  sideNavbar={sideNavbar}/>
    </>
  )
}

export default App
