import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"


export const signup=async (req,res)=>{
    try {
        const {name,password,email,roll,branch} = req.body
    
        if(!name || !password||!email||!branch||!roll) return res.status(400).json({message:"All fields are required"})
        
        if(password.length<8) return res.status(400).json({message:"Password must be greater than 8 characters"})

        const user = await User.findOne({email})

        if(user) return res.status(400).json({message:"User already exists"})

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser = new User({
            name,
            password:hashedPassword,
            email,
            branch,
            roll
        })

        if(newUser){
            await newUser.save();
            generateToken(newUser._id , res);

            return res.status(200).json({
                _id:newUser._id,
                name: newUser.name,
                email:newUser.email,
                branch:newUser.branch,
                roll:newUser.roll
            })
        }
        else{
            return res.status(400).json({message:"Invalid user data"})
        }
    } catch (error) {
        console.log("Error in signup controller" , error.message);
        res.status(500).json({message:"Internal server error"})
        
    }
}
export const login=async(req,res)=>{
    try {
        const {email,password} = req.body
    
        if(!email||!password) return res.status(400).json({message:"All fields are required"})
    
        if(password.length<8) return res.status(400).json({message:"Password must be greater than 8 characters"})
    
        const user = await User.findOne({email})
    
        if(!user) return res.status(400).json({message:"Invalid credentials"})

        const isPasswordCorrect = await bcrypt.compare(password,user.password)

        if(!isPasswordCorrect) return res.status(400).json({message:"Invalid credentials"})
        
        generateToken(user._id , res)

        res.status(200).json({
            _id:user._id,
            email:user.email,
            name:user.name,
        })
    } catch (error) {
        console.log("Error in login controller" , error.message);
        res.status(500).json({message:"Internal server error"})
        
    }

}
export const logout=async(req,res)=>{
    try {
        res.cookie("jwt" , "" , {maxAge:0})
        res.status(200).json({message:"Logged out successfully"})
    } catch (error) {
        console.log("Error in logout controller" , error.message);
        res.status(500).json({message:"Internal server error"})
    }
}