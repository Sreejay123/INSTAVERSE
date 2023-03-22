import { Container, Grid, Grow } from '@material-ui/core'
import {React,useState,useEffect} from 'react';
import { Posts } from '../Posts/Posts'
import { Form } from '../Form/Form'
import {getPosts} from '../../actions/posts'
import usestyles from './styles';
import {useDispatch} from 'react-redux';


export const Home = () => {
  const [currentId,setcurrentId]=useState(null)
  const classes=usestyles();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(getPosts())
  },[currentId,dispatch])

  return (
    <Grow in>
      <Container>
      <Grid container className={classes.mainContainer} justifyContent="space-between" alignItems="stretch" spacing={4}>
        <Grid item xs={12} sm={7}>
          <Posts setcurrentId={setcurrentId}/>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Form currentId={currentId} setcurrentId={setcurrentId}/>
          </Grid>
      </Grid>
      </Container>
    </Grow>
  )
}

export default Home;