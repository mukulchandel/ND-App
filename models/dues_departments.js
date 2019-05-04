var mongoose = require('mongoose');

var DuesDepartmentSchema = mongoose.Schema({
    institute_id: {
        type: Number,
        required: true
    },
	username: {
        unique: true,
        type: String,
        required: true
    }
});

var DuesDepartment = module.exports = mongoose.model('DuesDepartment', DuesDepartmentSchema);