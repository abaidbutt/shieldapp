const mongoose = require('mongoose')


const emergencySchema = new mongoose.Schema({
    work_category:{
        type: String,
        required: true
    },
    message:{
        type:Object,
        required:true
    }
}, {timestamps: true})

const Emergency = mongoose.model("Emergency" , emergencySchema)

module.exports = Emergency