var express = require('express');
var router = express.Router();

var Dues = require('../models/dues');
var Student = require('../models/students');

router.get('/', function(req, res){
	res.render('index');
});

router.get('/dues/rollno', function(req, res){
	res.render('rollno');
});
router.post('/dues/rollno', function(req, res){
	Dues.find({rollno:req.body.rollno},function(err,dues){
		res.render('rollno',{dues:dues});
	});
});

router.get('/dues/department', function(req, res){
	res.render('department');
});
router.post('/dues/department', function(req, res){
	Dues.find({department_id:req.body.id},function(err,dues){
		res.render('department',{dues:dues});
	});
});


module.exports = router;