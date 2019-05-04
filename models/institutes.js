var mongoose = require('mongoose');

var InstituteSchema = mongoose.Schema({
    institute_id: {
        type: Number,
        required: true,
        unique:true
    },
	institute_name: {
        type: String,
        required: true
    }
});

var Institute = module.exports = mongoose.model('Institute', InstituteSchema);