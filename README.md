YouTube Clone Project
This repository contains the source code for a fully functional YouTube clone, developed using modern web technologies. It provides key features such as video streaming, user authentication, and a commenting system.


Helpful Links:
- GitHub Repository: https://github.com/amank-27/youtube_frontend added backend inside this for easier accesiblilty if you want to check out backend github repo also- https://github.com/amank-27/youtube_backend

- Demo Video(Walkthrough video): https://drive.google.com/file/d/1o4CcQqvtYW5_923FaGxycHpYnVUNp4Qk/view

- Live Demo: https://youtube-frontend-w2bc.vercel.app/ vercel link


Key Features:
- User Authentication:Secure login and registration using JSON Web Tokens (JWT).
- Responsive UI: An adaptable user interface styled with Tailwind CSS, ensuring a smooth experience across all devices.

- videoplayerpage-video to be played with likes and dislikes added functionality for comments only logged in can add comments

- AddVideos functionalty also added for easier access and checking of working-
 
  a video url- https://www.youtube.com/embed/IcAV5qiko8M 
  you can use anyone from the youtube just copy embedded code in iframe take out the video link from src or provide any video link from the web
  a video thumbnail image - https://i.ytimg.com/vi/IcAV5qiko8M/hqdefault.jpg 
  you can take anyone from the web
  this links are just given for easier accesibilty to addvideo

- Comment System: Full CRUD functionality to manage comments on videos.
  To add comments you have to login you can only edit and delete your own comments
- Dynamic Routing: Seamless navigation between pages powered by React Router.
  Also lazy loading and suspense is given
- Backend Integration: A solid server-side setup built with Node.js and Express.js.
- Database Integration: Efficient data storage and management with MongoDB.

Technologies Utilized:
Frontend:
- React.js
- Tailwind CSS
- Vite
Backend:
- Node.js
- Express.js
- MongoDB
Development Tools:
- Vite for fast development and hot module replacement

HOW TO RUN:

To run the code on your local machine follow the given steps.
Download all the file from the github repo or use clone feature in git.
Navigate in the project directory .
Install the required dependencies using -- npm install
Now you can easily run the project in the local server using -- npm run dev 