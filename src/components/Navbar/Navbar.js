import React, { useEffect, useState } from "react";
import { AppBar,Avatar,Toolbar,Typography,Button} from "@material-ui/core";
import instaverse from '../../images/instaverse.png'
import useStyles from './styles';
import decode  from "jwt-decode";
import {Link,useNavigate,useLocation} from 'react-router-dom'

import {useDispatch} from 'react-redux'

export const Navbar=()=>{
    const dispatch=useDispatch()
    const classes=useStyles()
    const [user,setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    const history=useNavigate()
    const location=useLocation()
   

    const logout=()=>{
        dispatch({type:'LOGOUT'})
        history('/auth')
        setUser(null)
    }

    useEffect(()=>{
        const token=user?.token 

        if(token){
            const decodeToken=decode(token)

            if(decodeToken.exp*1000<new Date().getTime()) logout()

        }

        setUser(JSON.parse(localStorage.getItem('profile')))
    },[location])
    

    return(
    <AppBar className={classes.appBar} postion="static" color="inherit">
    <div className={classes.brandContainer}>
    <img className={classes.image} src={instaverse} alt="instaverse" height="60"/>
    <Typography className={classes.heading} component={Link} to="/" variant="h2" align="center">INSTAVERSE</Typography>
    </div>
    <br/>
    <br/>
    <br/>
    <br/>
    <Toolbar className={classes.toolbar}>
        {
            user ? (
                <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} ser={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button variant="contained" onClick={logout} color="secondary">Logout</Button>
                </div>
            ):(
                <Button variant="contained" component={Link} to="/auth" color="primary">Sign In</Button>
            )
        }
    </Toolbar>
  </AppBar>
  );
}