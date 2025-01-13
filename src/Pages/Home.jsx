import React from "react";
import Sidebar from "../Components/Sidebar";
import HomePage from "../Components/HomePage";



function Home({sideNavbar}){
    return(
        <>
        <div 
        className="home flex w-[100%] pr-[13px] pt-[40px] box-border bg-black">
         <Sidebar sideNavbar={sideNavbar}/>
         <HomePage sideNavbar={sideNavbar}/>
        </div> 
        </>
    )
}

export default Home;