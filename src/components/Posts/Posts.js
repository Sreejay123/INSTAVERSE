import React from "react";
import Post from "./Post/Post"
import usestyles from './styles'
import {useSelector} from 'react-redux'
import {Grid,CircularProgress} from '@material-ui/core'

export const Posts=({setcurrentId})=>{
    const classes=usestyles()
    const posts=useSelector((state)=>state.posts)
    console.log(posts)
    return(
        !posts.length ? <CircularProgress/> :
        <Grid className={classes.container} container alignItems="stretch" spacing={3}>
            {posts.map(post=>(
                <Grid key={post._id} item xs={12} sm={6}>
                    <Post post={post} setcurrentId={setcurrentId}/>
                </Grid>
            ))
            }
        </Grid>

   )
}
