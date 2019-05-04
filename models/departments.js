var mongoose = require('mongoose');

var DepartmentSchema = mongoose.Schema({
    department_id: {
        type: Number,
        required: true,
        unique:true
    },
    institute_id: {
        type: Number,
        required: true
    },
	department_name: {
        type: String,
        required: true
    }
});

var Department = module.exports = mongoose.model('Department', DepartmentSchema);