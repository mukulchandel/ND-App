var mongoose = require('mongoose');

var StudentSchema = mongoose.Schema({
    rollno: {
        type: Number,
        required: true,
        unique:true
    },
    institute_id: {
        type: Number,
        required: true
    },
    department_id: {
        type: Number,
        required: true
    },
	name: {
        type: String,
        required: true
    },
    email: {
        type: String,
    }
});

var Student = module.exports = mongoose.model('Student', StudentSchema);