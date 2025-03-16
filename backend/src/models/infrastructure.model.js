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
        type: Number,
        required: true,
    },
    operatingHours: {
        type: String,
        required: true,
    }
}, { timestamps: true });

const Infrastructure = mongoose.model("Infrastructure", infrastructureSchema);

export default Infrastructure;
