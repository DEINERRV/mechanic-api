const mongoose = require("mongoose");

const RepairSchema = new mongoose.Schema({
    date: { 
        type: Date,
        required: [true,"Must Provied a Date"],
    },
    description: {
        type: String,
        required: [true,"Must Provied a Description"],
        trim: true,
        minlength: 3,
        maxlength: 100
    },
    status: {
        type: String,
        enum: ["in process","finish","delivered"],
        default: 'in process',
    },
    services:[{
        type: mongoose.Types.ObjectId,
        ref: 'Service'
      }],
    mechanic: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true,"Please provide a mechanic"]
    },
    vehicle:{
        type: mongoose.Types.ObjectId,
        ref: "Vehicle",
        require: [true,"Please provide a Vehicle"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true,"Please provide a user"]
    }
},{timestamps: true})

module.exports = mongoose.model('Repair', RepairSchema);