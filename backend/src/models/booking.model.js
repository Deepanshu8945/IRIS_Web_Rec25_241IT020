import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
        },
    infrastructure:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Infrastructure",
        required:true,
    },
    startTime:{type:String,required:true},
    endTime:{type:String,required:true},
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
},{
    timestamps:true
})

const Booking = mongoose.model("Booking",bookingSchema)

export default Booking