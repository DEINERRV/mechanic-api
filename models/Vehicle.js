const mongoose = require("mongoose");

const VehicleSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true,"Must Provied a Car Name"],
        trim: true,
        maxlength: 50
    },
    plate: {
        type: String,
        required: [true,"Must License Plate"],
        trim: true,
        minlength: 6,
        maxlength: 6
    },
    status: {
        type: String,
        enum: ["good","in process","finish","delivered"],
        default: "good",
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true,"Please provide a user"]
    }
},{timestamps: true})

module.exports = mongoose.model('Vehicle', VehicleSchema);