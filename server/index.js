import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from "./routes/users.js"
import postRoute from "./routes/posts.js"

dotenv.config()
const app=express()
app.use(bodyParser.json({limit:"32mb",extended:true}))
app.use(bodyParser.urlencoded({limit:"32mb",extended:true}))
app.use(cors());

app.use('/posts',postRoute);
app.use('/user',userRoute)

mongoose.set("strictQuery", false);

const PORT=process.env.PORT || 5000;
mongoose.connect(process.env.CONNECTION_URL)
.then(()=>app.listen(PORT,()=>console.log(`server running at port: ${PORT}`)))
.catch(err=>console.log(err.message))
const database=mongoose.connection;
database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})