import React from "react";
import Sidebar from "../Components/Sidebar";
import HomePage from "../Components/HomePage";



function Home({sideNavbar}){
    return(
        <>
        <div 
        className="home flex w-[100%] px-[13px] pt-[40px] box-border">
         <Sidebar sideNavbar={sideNavbar}/>
         <HomePage/>
        </div> 
        </>
    )
}

export default Home;