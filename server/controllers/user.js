import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'
// import mongoose from 'mongoose'

export const signin = async(req,res)=>{
    const{email,password}=req.body;

    try {
        const existingUser=await User.findOne({ email })
        if(!existingUser) return res.status(404).json({message:"User doesn't exist"})

        const isPsswordCorrect=await bcrypt.compare(password,existingUser.password)
        if(!isPsswordCorrect) return res.status(404).json({message:"Invalid Credentials"})

        const token=jwt.sign({ email:existingUser.email,id:existingUser._id },'test',{ expiresIn:'1h' })

        res.status(200).json({result:existingUser,token})

    } catch (error) {
        res.status(500).json({message:'Something went wrong'})
    }
}
export const signup = async(req,res)=>{
   
    try {
        const {email,password,firstName,lastName,confirmPassword}=req.body;
        const existingUser=await User.findOne({ email })
        if(existingUser) return res.status(400).json({message:"User exists"})

        if(password!==confirmPassword) return res.status(400).json({message:"Passwords don't match"})       
        const hashedPassword=await bcrypt.hash(password,12)
        User.create({ name:`${firstName} ${lastName}`,email,password:hashedPassword }).then(result=>{
        if(result!==null){
        const token=jwt.sign({ email:result.email,id:result._id },'test',{ expiresIn:'1h' })
        res.status(200).json({result,token})
        }
        }
        )
    } catch (error) {
        
        res.status(500).json({message:'Something went wrong'})
        
    }

}
