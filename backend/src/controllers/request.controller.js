import Equipment from "../models/equipment.model.js";
import Request from "../models/request.model.js";
import User from "../models/user.model.js";

export const createRequest=async(req,res)=>{
    try {
        const {equipmentId , quantity,startDate,endDate} = req.body;
    
        if(!equipmentId||!quantity||!startDate||!endDate)return res.status(400).json({message:"All fields are requied"})
        
        const equipment = await Equipment.findOne({_id: equipmentId})
        if(!equipment) return res.status(400).json({message:"Equipment doesnt exist"})
        
        if(quantity > equipment.availableQuantity) return res.status(400).json({message:"Not enought equipment available"})
    
        const start = new Date(startDate)
        const end = new Date(endDate)
    
        if(start>=end) return res.status(400).json({message:"Startdate shoulb be before end date"})
        
        const existingRequest = await Request.findOne({
            user:req.user._id,
            equipment:equipmentId})
        if(existingRequest)return res.status(400).json({message:"Request already exist"})
    
        const newRequest = new Request({
            user:req.user._id,
            equipment:equipmentId,
            startDate,
            endDate,
            quantity
        })
        await newRequest.save();
        return res.status(200).json({message:"Request created successfully"})
    } catch (error) {
        console.log("Error in createRequest",error.message);
        res.status(500).json({message:"Internal server error"})
        
    }
      
    
}
export const getAllRequets = async(req,res)=>{
    try {
        const requests = await Request.find();
        res.status(200).json(requests)
    } catch (error) {
        console.log("Error in viewAllRequests",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
export const getUserRequests= async(req,res)=>{
    try{
        const userRequests = await Request.find({user : req.user._id})
        res.status(200).json(userRequests)
    } catch (error) {
        console.log("Error in viewUserRequests",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
export const acceptRequest=async(req,res)=>{
    try {
        const {requestId} = req.body;
        if(!requestId) return res.status(400).json({message:"All fields are required"})
    
        const request = await Request.findOne({_id:requestId})

        if(!request) return res.status(400).json({message:"Equipment not found!"})

        //getting ids of equipment and user that created the request 
        const userId = request.user;
        const equipmentId = request.equipment;
        const user = await User.findOne({_id:userId})
        const equipment = await Equipment.findOne({_id:equipmentId})
        if(!user) return res.status(400).json({message:"User doesnt exist"})
        if(!equipment) return res.status(400).json({message:"equipment doesnt exist"})

        if(equipment.availableQuantity <=1) return res.status(400).json({message:"Not enough quantity"})

        request.status = "approved"
        request.approvedAt = Date.now;
        equipment.issuedTo.push(user);
        equipment.availableQuantity--;
        await equipment.save();
        await request.save();

        res.status(200).json({
            requestId
        })
        
    } catch (error) {
        console.log("Error in acceptRequest",error.message);
        res.status(500).json({message:"Internal server error"})        
    }
}
export const rejectRequest=async(req,res)=>{
    try {
        const {requestId,reason} = req.body;
        if(!requestId) return res.status(400).json({message:"All fields are required"})
    
        const request = await Request.findOne({_id:requestId})

        if(!request) return res.status(400).json({message:"Equipment not found!"})

        request.status = "rejected"
        if(reason) request.reason = reason;
        request.rejectedAt = Date.now;

        await request.save();

        res.status(200).json({
            requestId
        })
        
    } catch (error) {
        console.log("Error in rejectRequest",error.message);
        res.status(500).json({message:"Internal server error"})     
    }
}