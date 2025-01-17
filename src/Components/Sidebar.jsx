import React from "react";
import HomeIcon from '@mui/icons-material/Home';
import SlideshowIcon from '@mui/icons-material/Slideshow';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import RecentActorsIcon from '@mui/icons-material/RecentActors';
import HistoryIcon from '@mui/icons-material/History';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import PlaylistPlayIcon from '@mui/icons-material/PlaylistPlay';
import ExploreIcon from '@mui/icons-material/Explore';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import LiveTvIcon from '@mui/icons-material/LiveTv';

function Sidebar({sideNavbar}){
    return(
        <>
        <div className={sideNavbar ? "home-sidebar flex flex-col flex-grow-[0.16] z-40 flex-shrink box-border h-[95vh] overflow-y-auto fixed t-[55px] left-0 w-[40vw] p-[14px] pt-5 sm:w-[20vw]  md:pt-[50px] lg:pt-2 md:hidden lg:block bg-black text-white":"home-sidebarhide hidden "}>
            <div className="sidebartop flex flex-col border-b border-solid  pb-2 ">
                <div className={`sidebartop-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <HomeIcon />
                <div className="">Home</div>
                 </div>
                 <div className={`sidebartop-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <SlideshowIcon />
                <div className="">Shorts</div>
                 </div>
                 <div className={`sidebartop-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <SubscriptionsIcon />
                <div className="">Subscription</div>
                 </div>
            </div>

            <div className="sidebarbottom flex flex-col border-b border-solid  pb-2 ">
            <div className={`sidebarbottom-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <div className="">You</div>
                <ChevronRightIcon />
                 </div>
                 <div className={`sidebarbottom-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <RecentActorsIcon />
                <div className="">Your Channel</div>
                 </div>
                 <div className={`sidebarbottom-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <HistoryIcon />
                <div className="">History</div>
                 </div>
                 <div className={`sidebarbottom-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <WatchLaterIcon />
                <div className="">Watch Later</div>
                 </div>
                 <div className={`sidebarbottom-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <ThumbUpIcon />
                <div className="">Liked Videos</div>
                 </div>
                 <div className={`sidebarbottom-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <PlaylistPlayIcon />
                <div className="">Playlists</div>
                 </div>
            </div>
            <div className="sidebardown flex flex-col border-b border-solid  pb-2 ">
            <div className={`sidebardown-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <div className="">Explore</div>
                <ExploreIcon />
                 </div>
                 <div className={`sidebardown-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <WhatshotIcon />
                <div className="">Trending</div>
                 </div>
                 <div className={`sidebardown-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <SportsEsportsIcon />
                <div className="">Gaming</div>
                 </div>
                 <div className={`sidebardown-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <LibraryMusicIcon />
                <div className="">Music</div>
                 </div>
                 <div className={`sidebardown-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <TheaterComedyIcon />
                <div className="">Comedy</div>
                 </div>
                 <div className={`sidebardown-option flex gap-5 items-center pt-[9px] pb-[10px] rounded-2xl cursor-pointer hover:bg-[rgb(35,35,35)]`}>
                <LiveTvIcon />
                <div className="">Live</div>
                 </div>
            </div>
        </div>
        </>
    )
}

export default Sidebar;