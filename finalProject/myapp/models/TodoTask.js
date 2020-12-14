const mongoose = require('mongoose');
const todoTaskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    timeCreated: {
        type: Date,
        default:()=> Date.now()
    }
})
module.exports = mongoose.model('TodoTask',todoTaskSchema);