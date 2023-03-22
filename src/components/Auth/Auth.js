import React,{useState} from 'react'
import { Avatar,Paper,Button,Grid,Typography,Container } from '@material-ui/core';
import useStyles from './styles'
import LockOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import { Input } from './Input';
import { useNavigate } from 'react-router-dom';
import {signin,signup} from '../../actions/auth';
import {useDispatch} from 'react-redux'

 const initialState={firstName:'',lastName:'',email:'',password:'',confirmPassword:''}

export const Auth = () => {
    const classes=useStyles()
    const [isSignUp,setIsSignUp]=useState(false);
    const [showPassword,setShowPassword]=useState(false);
    const [formData,setFormData]=useState(initialState);
    const navigate=useNavigate();
    const dispatch=useDispatch()


    const handleSubmit=(e)=>{
        e.preventDefault();
       if(isSignUp){
            dispatch(signup(formData,navigate))
       }else{
            dispatch(signin(formData,navigate))

       }
     }

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value})
    }

    const handleShowPassword=()=>{
        setShowPassword((prevShowPassword)=>!prevShowPassword)
    }
    const switchMode=()=>{
        setIsSignUp((prevIsSignUp)=>!prevIsSignUp)
    }
  return (
   <Container component="main" maxWidth="xs">
     <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignUp ? 'Sign Up':'Sign In'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
           <Grid container spacing={2}>
            {
                isSignUp && (
                    <>
                    <Input name='firstName' label="First Name" handleChange={handleChange} autoFocus half/>
                    <Input name='lastName' label="Last Name" handleChange={handleChange} half/>

                    </>
                )
            }
            <Input name='email' label="Email Address" type="email" handleChange={handleChange}/>
            <Input name='password' label="Password" handleChange={handleChange} type={showPassword ? 'text' : 'password' } handleShowPassword={handleShowPassword}/>
            {
                isSignUp && <Input name='confirmPassword' label='Repeat Password' handleChange={handleChange} type='password'/>
            }
           </Grid>
           <Button type='submit' variant='contained' color='primary' fullWidth className={classes.submit}>{isSignUp ? 'Sign Up':'Sign In'}</Button>

           <Grid container justifyContent='flex-end'>
           <Grid item >
            <Button onClick={switchMode}>
                {isSignUp ? 'Already have an Account? Sign In' : 'Dont have an Account? Sign Up'}
            </Button>
           </Grid>
           </Grid>
         </form>

     </Paper>
   </Container>
  );
}
