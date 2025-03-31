import mongoose from "mongoose";

const infrastructureSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    availability: {
        type: Boolean,
        required: true,
    },
    capacity: {
        type: Number,//max no of people allowed
        required: true,
    },
    operatingHours:{
        start:{
            type:String,
            required:true
        },
        end:{
            type:String,
            required:true
        }
    },
    bookedTo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ]
}, { timestamps: true });

const Infrastructure = mongoose.model("Infrastructure", infrastructureSchema);

export default Infrastructure;