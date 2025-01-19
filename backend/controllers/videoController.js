import Video from "../models/videoModel.js";


// function to get all videos
export async function getVideos(req, res) {
    try {
        const videos = await Video.find();
        res.status(200).json(videos); // Send the videos as a response in JSON format
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos", error });
    }
}
//using get and findById with object id to fetch specific video
export async function particularVideo(req, res){
    try{
     const particularVideo= await Video.findById(req.params.id)  // Fetch the video by ID
     console.log("video with this particular id", particularVideo);
     if(particularVideo){
         return res.status(200).send(particularVideo);
     }else{
         return res.status(404).send({message:"Video not found"})
     }
 }catch(error){
    console.log("error retrieving Video:", Video);
    return res.status(500).send({message:"Internal server error"});
 }
 };
// controller to add video
export async function addVideo(req,res){
    try{const{videoId,url,title,thumbnail,description,genre,owner}=req.body;

        const newVideo= new Video({
            videoId: videoId,
            url:url,
            title:title,
            thumbnail:thumbnail,
            description:description,
            genre:genre,
            owner:owner
        });

        await newVideo.save();
      

      res.status(201).json({"message":"video added"});}
      catch(err){
        res.status(400).json({"message":err});
      }
}

// controller to delete video
export async function deleteVideo(req,res){
    try{const{id}=req.body

    await Video.deleteOne({_id:id});

    res.status(200).json({message:"video deleted"});}
    catch(err){
        res.status(400).json({"message":err});
      }
}

export async function editVideo(req, res){
    const { id } = req.params;
    const { title, description, genre } = req.body;
  
    try {
      const updatedVideo = await Video.findByIdAndUpdate(
        id,
        { title, description, genre },
        { new: true }
      );
  
      if (updatedVideo) {
        res.json({ success: true, message: "Video updated successfully", video: updatedVideo });
      } else {
        res.status(404).json({ success: false, message: "Video not found" });
      }
    } catch (error) {
      res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  