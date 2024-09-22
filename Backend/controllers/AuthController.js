import { User } from "../models/User.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const signup=async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        //If user already exist then it will show error that already have an account.

        const user=await User.findOne({email});

        if(user){
            return res.status(409).json({message:'User is already exist,You can login',success:false})
        }

        const userModel=new User({name,email,password})

        //Before saving it to database we need to encrypt the password


        userModel.password=await bcrypt.hash(password,10)

        await userModel.save()

        res.status(201).json({
            message:'Signup successfully',
            success:true
        })

    } catch(error){
        res.status(500).json({
            message:'Internal server error',
            success:false
        })
    }
}

const login=async(req,res)=>{
    try{
        const {email,password}=req.body;

        //If user already exist then it will show error that already have an account.

        const user=await User.findOne({email});

        if(!user){
            return res.status(403).json({message:'Failed Authentication.Email or password is wrong',success:false})
        }

        //We have to decrypt the password to check authentication

        const isPassEqual=await bcrypt.compare(password,user.password)

        if(!isPassEqual){
            return res.status(403).json({message:'Failed Authentication.Email or password is wrong',
             success:false
            })
        }

        //If password is equal then we will create JWT token,,with this user can acces other functions without login.

        const jwtToken=jwt.sign({email:user.email,id:user.id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        )

        res.status(200).json({
            message:'Login successfully',
            success:true,
            jwtToken,
            email,
            name:user.name
        })

    } catch(error){
        res.status(500).json({
            message:'Internal server error',
            success:false
        })
    }
}
export {signup,login};