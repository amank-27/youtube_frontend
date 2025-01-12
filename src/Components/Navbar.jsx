import React from 'react'
import { useState } from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SearchIcon from '@mui/icons-material/Search';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';

function Navbar(){
    const[userPic, setuserPic]= useState("https://img.freepik.com/free-vector/add-new-user_78370-4710.jpg?ga=GA1.1.364819553.1719325834&semt=ais_hybrid")
    const[navbarProfile, setnavbarProfile]= useState(false);
  
    function handleClickprofile(){
        setnavbarProfile(prev=>!prev)
    }
    
    return(
        <div className=
        'navbar h-[10vh] box-border pt-[5px] pb-[8px] flex items-center w-[100%] space justify-between top-0 fixed bg-black z-10'
        >
        <div className="navbar-left gap-3 flex justify-center items-center w-fit">
            <div className="menuicon w-10 h-10 flex justify-center items-center cursor-pointer">
                <MenuIcon sx={{color:"white"}}/>
            </div>
            <div className="youtubeicon flex justify-center items-center cursor-pointer text-white">
                <YouTubeIcon sx={{ fontSize:"34px"}} 
                className=' text-red-600'/>
                <div className="youtubetitle">YouTube</div>
            </div>
        </div>
        <div className="navbar-middle flex gap-3 w-[50%]">
            <div className="navsearch w-[100%] flex">
                <input type="text" placeholder='Search' 
                className='searchbar w-[90%] h-[40px] rounded-l-2xl  border border-solid border-[rgb(58,57,57)] bg-black text-white text-lg pl-7'/>
            <div 
            className="searchicon cursor-pointer w-[70px]  border border-solid border-[rgb(42,42,42)] bg-[rgb(42,42,42)] flex justify-center items-center rounded-r-2xl">
                <SearchIcon  sx={{ fontSize:"28px", color:"white"}} /></div>
            </div>
        </div>
        <div className="navbar-right flex gap-5 justify-center items-center relative">
            <VideoCallIcon sx={{ fontSize:"30px",cursor:"pointer", color:"white"}}/>
          <img onClick={handleClickprofile} src={userPic} alt="login" className='navbar-login w-[30px] rounded-[50%] cursor-pointer '/>
        
         { navbarProfile &&
         <div className="profilediv absolute top-9 w-[100%] z-20 right-1 text-white">
            <div className="profile-option bg-[rgb(85,85,85)] p-3 cursor-pointer hover:bg-[rgb(34,33,33)] ">Profile</div>
            <div className="profile-option bg-[rgb(85,85,85)] p-3 cursor-pointer hover:bg-[rgb(34,33,33)] ">Logout</div>
            <div className="profile-option bg-[rgb(85,85,85)] p-3 cursor-pointer hover:bg-[rgb(34,33,33)] ">Login</div>
         </div>
}
        </div>
        </div>
    )
}

export default Navbar;