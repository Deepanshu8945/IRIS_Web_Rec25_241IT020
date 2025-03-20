import mongoose from "mongoose";

const requestSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    equipment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Equipment",
        required:true,
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    startDate:{type:Date,required:true},
    endDate:{type:Date,required:true},
    reason:{//admin can provide reason for rejection
        type:String,
    },
    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending"
    },
    requestedAt:{type:Date, default:Date.now},
    approvedAt:{type:Date},
    rejectedAt:{type:Date}
},{timestamps:true})

const Request = mongoose.model("Request" , requestSchema)
export default Request;