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
    availability:{
        type:Boolean,
        required:true
    },
    quantity:{
        type:Number,
        required:true,
    },
    condition:{
        type:String,
        required:true,
        enum:["New", "Good", "Fair", "Damaged"]
    }
},{timestamps:true})

const Equipment = mongoose.model("Equipment",equipmentSchema);

export default Equipment