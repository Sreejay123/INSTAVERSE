import {React} from "react";

import {Container} from '@material-ui/core'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import { Navbar } from "./components/Navbar/Navbar";
import {Home} from '../src/components/Home/Home'
import { Auth } from "./components/Auth/Auth";

const App=()=>{
  
  return(
    <BrowserRouter>
   <Container maxWidth="lg">
   <Navbar/>
    <br/><br/><br/><br/><br/>
    <Routes>
      <Route path="/" exact element={< Home/> }/>
      <Route path="/auth" exact element={ <Auth/> }/>
    </Routes>
   </Container>
   </BrowserRouter>
  );
}
export default App;