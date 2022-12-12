const mongoose = require('mongoose');
const { stringify } = require('uuid');

var studentSchema = new mongoose.Schema({
    fullname: {
        type: String,
        require: 'this field is required',
    },
    email:{
        type: String,
        require: 'this field is required',
    },
    mobile:{
        type: Number,
        require: 'this field is required',
    },
    city:{
        type: String,
        require: 'this field is required',
    },
})
const Student=mongoose.model("Student", studentSchema);
module.exports = Student;