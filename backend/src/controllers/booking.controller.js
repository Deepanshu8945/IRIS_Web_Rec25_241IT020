import Booking from "../models/booking.model.js";
import Infrastructure from "../models/infrastructure.model.js";
import User from "../models/user.model.js";

export const createBooking = async(req,res)=>{
    try {
        const {infraId ,startTime,endTime} = req.body;
    
        if(!infraId||!startTime||!endTime)return res.status(400).json({message:"All fields are requied"})
        
        const infrastructure = await Infrastructure.findOne({_id: infraId})
        if(!infrastructure) return res.status(400).json({message:"Infrastructure doesnt exist"})
        
        if(infrastructure.capacity <=0) return res.status(400).json({message:"Not enough capacity"})
    
        const start = new Date(startTime)
        const end = new Date(endTime)
    
        if(start>=end) return res.status(400).json({message:"Startdate shoulb be before end date"})
        
        const existingBooking = await Booking.findOne({
            user:req.user._id,
            infrastructure:infraId})

        if(existingBooking)return res.status(400).json({message:"Booking already exist"})
    
        const newBooking = new Booking({
            user:req.user._id,
            infrastructure:infraId,
            startTime,
            endTime,
        })
        await newBooking.save();
        return res.status(200).json({message:"Booking created successfully"})
    } catch (error) {
        console.log("Error in createBooking",error.message);
        res.status(500).json({message:"Internal server error"})
        
    }   
}
export const getBookings = async(req,res)=>{
    try {
        const bookings = await Booking.find()
        res.status(200).json(bookings)
    } catch (error) {
        console.log("Error in getBookings",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
export const getUserBookings = async(req,res)=>{
    try {
        const userId = req.params.id;
        const userBookings = await Booking.find({userId})
        res.status(200).json(userBookings)
    } catch (error) {
        console.log("Error in getUserBookings",error.message);
        res.status(500).json({message:"Internal server error"})
    }
}
export const acceptBooking = async(req,res)=>{
    try {
        const {bookingId} = req.body;
        if(!bookingId) return res.status(400).json({message:"All fields are required"})
    
        const booking = await Booking.findOne({_id:bookingId})

        if(!booking) return res.status(400).json({message:"Infrastructure not found!"})
        if(booking.status !== "pending") return res.status(400).json({message:"Booking already accepted/rejected"})

        //getting ids of infrastructure and user that created the booking 
        const userId = booking.user;
        const infraId = booking.infrastructure;
        const user = await User.findOne({_id:userId})
        const infrastructure = await Infrastructure.findOne({_id:infraId})
        if(!user) return res.status(400).json({message:"User doesnt exist"})
        if(!infrastructure) return res.status(400).json({message:"Infrastructure doesnt exist"})

        if(infrastructure.capacity <=1) return res.status(400).json({message:"Not enough capacity"})

        booking.status = "approved"
        booking.approvedAt = Date.now();
        infrastructure.bookedTo.push(user);
        infrastructure.capacity--;
        await infrastructure.save();
        await booking.save();

        res.status(200).json({
            message: `Booking is accepted` 
        })
        
    } catch (error) {
        console.log("Error in acceptBooking",error.message);
        res.status(500).json({message:"Internal server error"})        
    }
}
export const rejectBooking = async(req,res)=>{
    try {
        const {infraId,reason} = req.body;
        if(!infraId) return res.status(400).json({message:"All fields are required"})
    
        const booking = await Booking.findOne({_id:infraId})

        if(!booking) return res.status(400).json({message:"Booking not found!"})

        booking.status = "rejected"
        if(reason) booking.reason = reason;
        booking.rejectedAt = Date.now;

        await booking.save();

        res.status(200).json({
            message:"Booking is rejected"
        })
        
    } catch (error) {
        console.log("Error in rejectBooking",error.message);
        res.status(500).json({message:"Internal server error"})     
    }
}
