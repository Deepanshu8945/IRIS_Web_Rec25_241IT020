import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

//Middleware to protect rotes , allow only authenticated user
export const protect=async(req,res,next)=>{
    try {
        const token = req.cookies.jwt;
        if(!token) return res.status(400).json({message:"Not authorized, no token"})

        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        req.user = await User.findById(decoded.userId).select("-password")

        next()
    } catch (error) {
        console.log("Error in protect middleware" , error.message);
        return res.status(400).json({message:"Invalid token"})
        
    }
}

//Middleware for checking if user is admin
export const adminOnly = async(req,res,next)=>{
    if(req.user && req.user.role === "admin")
        next()
    else return res.status(403).json({message:"Access denied, not an admin"})
}
