import React from "react";
import { useState } from "react";
import usestyles from './styles'
import { Card,CardActions,CardMedia,CardContent,Typography,Button } from "@material-ui/core";
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ForumIcon from '@material-ui/icons/Forum'
import moment from 'moment'
import { useDispatch } from "react-redux";
import { deletePost,likePost} from "../../../actions/posts";
import {Comment} from "./comment"


const Post=({post,setcurrentId})=>{
    const classes=usestyles()
    const dispatch=useDispatch()
    const[click,setClick]=useState(false)
    const user=JSON.parse(localStorage.getItem('profile'))

    const Likes=()=>{
        if(post.likes.length>0){
            return post.likes.find((like)=>like===(user?.result?.googleId||user?.result?._id))
            ?(
                <><ThumbUpAltIcon fontSize="small"/>&nbsp;{post.likes.length>2 ? `You and ${post.likes.length-1} others` : `${post.likes.length} like${post.likes.length>1?'s':' '}`}</>

            ):(
                <><ThumbUpAltOutlined fontSize="small"/>&nbsp;{post.likes.length} {post.likes.length===1 ? 'Like': 'Likes'}</>
            )
        }
        return <><ThumbUpAltOutlined fontSize="small"/>&nbsp;Like</>;
    }
    const handleSubmit=()=>{
        setClick((click)=>!click)
        console.log(click)
    }
    


    return(
        <div>
        <Card className={classes.card}>
            <CardMedia className={classes.media} image={post.selectedFile} title={post.title}/>
                <div className={classes.overlay}>
                    <Typography variant="h6">{post.name}</Typography>
                    <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
                </div>
                {(user?.result?._id===post?.creator) && (
                 <div className={classes.overlay2}>
                 <Button style={{color:'white'}}
                  size='small' 
                  onClick={()=>{setcurrentId(post._id) }}>
                     <MoreHorizIcon fontSize="medium"/>
                 </Button>
             </div>   
                )}
                
                <div className={classes.details}>
                <Typography variant="body2" color="textSecondary">{post.tags.map(tag=>`#${tag}`)}</Typography>
                </div>
                <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
                <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">{post.message}</Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={()=>{dispatch(likePost(post._id))}}>
                    <Likes/>
                    </Button>
                    <Button size="small" color="primary" disabled={!user?.result} onClick={handleSubmit} >
                        <ForumIcon fontSize="small"/>
                    </Button>
                    {(user?.result?._id===post?.creator) && (
                          <Button size="small" color="primary" onClick={()=>{dispatch(deletePost(post._id))}}>
                          <DeleteIcon fontSize="small"/>
                      </Button>
                    )}
                </CardActions>  
        </Card>
        <div>
         {((click===true)? <Comment currentId={post._id}/>:console.log("checking") )}
         </div>
  
  </div>
  )
}
export default Post;