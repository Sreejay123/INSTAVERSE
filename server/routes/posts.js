import express from "express";
import {getPosts,createPost,updatePost,deletePost,likePost,commentPost} from "../controllers/posts.js"
import auth from '../middleware/auth.js'

//localhost:5000/posts
const router=express.Router();
router.get('/',getPosts);
router.post('/create',auth,createPost);
router.patch('/:id',auth,updatePost);
router.delete('/:id',auth,deletePost);
router.patch('/:id/likePost',auth,likePost)
router.patch('/:id/comments',auth,commentPost)

export default router;