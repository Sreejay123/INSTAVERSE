import postMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts=async(req,res)=>{
    try{
   const postMessages=await postMessage.find();
   res.status(200).json(postMessages)
}
catch(error){
  res.status(404).json({message:error.message})
}
}

export const createPost=async(req,res)=>{
 const post=req.body;
 
 const newPost=postMessage({...post,creator : req.userId,createdAt : new Date().toISOString()});

    try {
        await newPost.save()
        res.status(201).json(newPost)
    } catch (error) {
        res.status(409).json({message:error.message})
    }

}

export const updatePost=async(req,res)=>{
    const {id:_id}=req.params;

    const post=req.body;

    if(!mongoose.isValidObjectId(_id)) return res.status(404).send('No post with that id');

   const updatedPost=await postMessage.findByIdAndUpdate(_id,post)

   res.json(updatedPost)
}

export const deletePost=async(req,res)=>{
    const{ id }=req.params;
    if(!mongoose.isValidObjectId(id)) return res.status(404).send('No post with that id');
    await postMessage.findByIdAndRemove(id);
    res.json('post deleted successfully')
}
export const likePost=async(req,res)=>{
    const {id}=req.params;
    
    if(!req.userId) return res.json({ message: 'Unauthenticated'})

    if(!mongoose.isValidObjectId(id)) return res.status(404).send('No post with that id');

    const post=await postMessage.findById(id);
    
    const index=post.likes.findIndex((id)=> id ===String(req.userId))

    if(index===-1){
        try{
        post.likes.push(req.userId)
        }
        catch(error){
           console.log(req.userId)
        }
    }else{
        post.likes=post.likes.filter((id)=>id!==String(req.userId))
        }

    const updatedPost=await postMessage.findByIdAndUpdate(id,post,{new:true})
    res.json(updatedPost)
}
export const commentPost=async(req,res)=>{
    const {id}=req.params;
    const post=req.body

    if(!req.userId) return res.json({ message: 'Unauthenticated'})

    if(!mongoose.isValidObjectId(id)) return res.status(404).send('No post with that id');
    
    const updatedPost=await postMessage.findByIdAndUpdate(id,post,{new:true})
    res.json(updatedPost)


}