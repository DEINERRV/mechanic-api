const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: [true,"Must Provied a Service Name"],
        trim: true,
        maxlength: 50
    },
    description: {
        type: String,
        trim: true,
        maxlength: 300
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true,"Please provide a user"]
    }
},{timestamps: true})

module.exports = mongoose.model('Service', ServiceSchema);