import { generateToken } from "../lib/utils.js"
import User from "../models/user.model.js"
import bcrypt from "bcrypt"


export const signup=async (req,res)=>{
    try {
        const {name,password,email,branch} = req.body
    
        if(!name || !password||!email||!branch) return res.status(400).json({message:"All fields are required"})
        
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
            role:"user"
        })

        if(newUser){
            await newUser.save();
            generateToken(newUser._id , res);

            return res.status(200).json({
                _id:newUser._id,
                name: newUser.name,
                email:newUser.email,
                branch:newUser.branch,
                role:newUser.role
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
            role:user.role,
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
export const promoteToAdmin = async(req,res)=>{
    try {
        const userToPromote = await User.findById(req.params.id)
        if(!userToPromote) return res.status(404).json({message:"User not found"})
        
        //Update the users role to admin
        userToPromote.role = "admin"
        await userToPromote.save();
    
        return res.status(200).json({message:"User is now an admin"})
    
    } catch (error) {
        console.log("Error in promoteUser" , error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
export const demoteToUser = async(req,res)=>{
    try {
        const user = await User.findById(req.params.id)
        if(!user) return res.status(404).json({message:"User not found"})
        
        //Update the users role to admin
        user.role = "user"
        await user.save();
    
        return res.status(200).json({message:"Admin is not demoted to user"})
    
    } catch (error) {
        console.log("Error in promoteUser" , error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
export const getUsers = async(req,res)=>{
    try {
        const users = await User.find().select("-password")
        res.status(200).json(users);
    } catch (error) {
        console.log("Error in getUsers" , error.message);
        res.status(500).json({message:"Internal server error"})  
    }
}
export const checkAuth = (req, res) => {
    try {
      res.status(200).json(req.user);
    } catch (error) {
      console.log("Error in checkAuth", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };