import comment from "../models/commentModel.js";

export async function addComment(req,res){

    try{const {commentData,userName,email,videoId}=req.body;

    const newComment= new comment({
        "commentData":commentData,
        "userName":userName,
        "userEmail":email,
        "videoId":videoId
    });

    await newComment.save();
    res.status(201).json({message:"comment saved"});}
    catch(err){
        res.status(400).json({"message":err})
    }
}

export async function editComment(req,res){
    
    const {commentData,id}=req.body;

   await comment.updateOne({_id:id},{ $set: { commentData: commentData } })

    
   res.status(201).json({message:"comment updated"});

}

export async function deletComment(req,res){
    const{id}=req.body

    await comment.deleteOne({_id:id});

    res.status(200).json({message:"comment deleted"});
}

export async function getComment(req,res){
    res.send(await comment.find());
}