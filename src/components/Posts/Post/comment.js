import React,{useState,useEffect} from "react";
// import usestyles from './styles'
import { TextField,Button, Paper, Typography } from "@material-ui/core";
import { useDispatch,useSelector } from "react-redux";
import  {commentPost}from "../../../actions/posts";


export const Comment=({currentId})=>{
    const [sample,setSample]=useState('');
    const [postData,setPostData]=useState({ comments:[]})
    const post=useSelector((state)=>currentId ? state.posts.find(p=>p._id===currentId):null)
    // const classes=usestyles()
    const dispatch=useDispatch()
    const user=JSON.parse(localStorage.getItem('profile'))
    useEffect(()=>{
        if(post) setPostData(post)
    },[post])

    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(commentPost(currentId,{...postData,commented:[...post.commented,user?.result?.name]}))
        console.log(user.result.name)
    }
    const handleChange=(e)=>{
        setSample(e.target.value);
    }
    const handleMessage=()=>{
        setPostData({...postData,comments:[...post.comments,sample]})
    }
    const Handle=()=>{
        let element=[];
        for (let index = 0; index < post.commented.length; index++) {
             element.push(<div>{post.commented[index]+" : "+post.comments[index]}</div>);
                 
        }
        return element
    }
 return(
    <Paper>
         
    <form autoComplete="off" noValidate onSubmit={handleSubmit}>
       <Handle/>
      {
        post.comments.length===0 ? (<Typography align="center">No Comments Yet</Typography>):(console.log("comments"))
      }
    
        {/* <Typography variant="h8">{commente} : {com}</Typography> */}
        {/* <Typography variant="h6">{currentId ? 'Editing': 'Creating'} a Post</Typography> */}
        <TextField name="comment" variant="outlined" label="comment"  fullWidth value={sample} onChange={handleChange}/>
       
        <Button type="submit" variant="contained" color="primary" size="large" fullWidth onClick={handleMessage}>Send</Button>
  </form>
  </Paper>
    );
}
