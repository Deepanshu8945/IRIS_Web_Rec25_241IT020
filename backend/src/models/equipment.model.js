import mongoose from "mongoose";

const equipmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
    },
    category:{
        type: String,
        required:true,
    },
    availablity:{
        type:String,
        enum:["available","not available" , "under maintenance"],
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    availableQuantity:{
        type:Number,
        required:true
    },
    condition:{
        type:String,
        required:true,
        enum:["New", "Good", "Fair", "Damaged"]
    },
    issuedTo: [
        {
         type: mongoose.Schema.Types.ObjectId,
         ref: "User" 
        }
    ]

},{timestamps:true})

const Equipment = mongoose.model("Equipment",equipmentSchema);

export default Equipment