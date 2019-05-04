var mongoose = require('mongoose');

var DuesSchema = mongoose.Schema({
    rollno: {
        type: Number,
        required: true,
    },
    handler: {
        type: String,
        required: true
    },
    department_id: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
	comments: {
        type: String,
        required: true
    }
});

var Dues = module.exports = mongoose.model('Dues', DuesSchema);