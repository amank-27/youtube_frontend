import express from "express";
import mongoose from "mongoose";
import { videoRoutes } from "./routes/videoRoutes.js";
import { userRoutes } from "./routes/userRoutes.js";
import { channelRoutes } from "./routes/channelRoutes.js";
import {commentRoutes} from "./routes/commentRoutes.js";
import cors from "cors";


mongoose.connect("mongodb+srv://amankk:PwYTHXdOMnTZFdbn@cluster0.n2ew1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"); //connect to mongodb atlas database
//all the code below is just to see if the connection is working or not
const db=mongoose.connection;
db.on("open", ()=>{
    console.log("connection successful");
});
db.on("error", ()=>{
    console.log("connection unsucessfull");
});

const app=new express();// initialize the Express app
//make a server
app.listen(5100, ()=>{
    console.log("server is running on port 5100");
});
app.use(cors());
app.use(express.json()); //to parse the incoming json


videoRoutes(app);
userRoutes(app);
channelRoutes(app);
commentRoutes(app);