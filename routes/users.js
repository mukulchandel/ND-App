var express = require('express');
var router = express.Router();

var Dues = require('../models/dues');
var User = require('../models/user');
var Student = require('../models/students');
var Institute = require('../models/institutes');
var Department = require('../models/departments');
var DuesDepartment = require('../models/dues_departments');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

router.get('/dashboard', ensureAuthenticated, function(req, res) {
		User.findOne({username:req.session.passport.user},function(err,result){
			if(result) {
				console.log(result);
				if(result['role'] == 'admin') {
										res.redirect('/users/dashboard/add_handler');
				}
				else if(result['role'] == 'handler') {
					res.redirect('/users/dashboard/add_dues');
				}
			}
			else{
				res.redirect('/users/login');
			}
		});
});

router.get('/dashboard/add_handler', ensureAuthenticated, function(req, res) {
		User.findOne({username:req.session.passport.user},function(err,result){
			if(result) {
				console.log(result);
				if(result['role'] == 'admin') {
					User.find({role:'handler'},function(errr,handlers){
							console.log(handlers);		
							res.render('add_handler',{handlers:handlers});
					});
				}
				else {
					res.redirect('/users/dashboard');	
				}
			}
			else{
				res.redirect('/users/login');
			}
		});
});

router.post('/dashboard/add_handler', ensureAuthenticated, function(req, res) {
	var newUser = new User({
	  username: req.body.username,
	  password: req.body.password,
    role: 'handler'
	});
	User.createUser(newUser,function(err,user){
     if(err) console.log(err);
     console.log(user);
	});
	var newDuesDepartment = DuesDepartment({
		username: req.body.username,
		institute_id: req.body.institute_id
	});
	newDuesDepartment.save(function(err) {
  	if (err) throw err;
  	console.log('DuesDepartment Created');
	});
	res.redirect('/users/dashboard/add_handler')

});

router.get('/dashboard/add_student', ensureAuthenticated, function(req, res) {
		User.findOne({username:req.session.passport.user},function(err,result){
			if(result) {
				console.log(result);
				if(result['role'] == 'admin') {
					Student.find({},function(errr,students){
							console.log(students);		
							res.render('add_student',{students:students});
					});
				}
				else {
					res.redirect('/users/dashboard');	
				}
			}
			else{
				res.redirect('/users/login');
			}
		});
});

router.post('/dashboard/add_student', ensureAuthenticated, function(req, res) {
	var newStudent = new Student({
		rollno: req.body.rollno,
	  name: req.body.name,
	  institute_id: req.body.institute_id,
		department_id: req.body.department_id,
		email: req.body.email
	});
	newStudent.save(function(err) {
  	if (err) throw err;
  	console.log('Student Created');
	});
	res.redirect('/users/dashboard/add_student')

});

router.get('/dashboard/add_institute', ensureAuthenticated, function(req, res) {
		User.findOne({username:req.session.passport.user},function(err,result){
			if(result) {
				console.log(result);
				if(result['role'] == 'admin') {
					Institute.find({},function(errr,institutes){	
							res.render('add_institute',{institutes:institutes});
					});
				}
				else {
					res.redirect('/users/dashboard');	
				}
			}
			else{
				res.redirect('/users/login');
			}
		});
});

router.post('/dashboard/add_institute', ensureAuthenticated, function(req, res) {
	var newInstitute = new Institute({
	  institute_id: req.body.institute_id,
		institute_name: req.body.institute_name
	});
	newInstitute.save(function(err) {
  	if (err) throw err;
  	console.log('Institute Created');
	});
	res.redirect('/users/dashboard/add_institute')

});

router.get('/dashboard/add_department', ensureAuthenticated, function(req, res) {
		User.findOne({username:req.session.passport.user},function(err,result){
			if(result) {
				console.log(result);
				if(result['role'] == 'admin') {
					Department.find({},function(errr,departments){	
							res.render('add_department',{departments:departments});
					});
				}
				else {
					res.redirect('/users/dashboard');	
				}
			}
			else{
				res.redirect('/users/login');
			}
		});
});

router.post('/dashboard/add_department', ensureAuthenticated, function(req, res) {
	var newDepartment = new Department({
		department_id: req.body.department_id,
	  institute_id: req.body.institute_id,
		department_name: req.body.department_name
	});
	newDepartment.save(function(err) {
  	if (err) throw err;
  	console.log('Department Created');
	});
	res.redirect('/users/dashboard/add_department')

});

router.get('/dashboard/add_dues', ensureAuthenticated, function(req, res) {
		User.findOne({username:req.session.passport.user},function(err,result){
			if(result) {
				if(result['role'] == 'handler') {
					Dues.find({handler:req.session.passport.user},function(errr,dues){	
							res.render('add_dues',{dues:dues});
					});
				}
				else {
					res.redirect('/users/dashboard');	
				}
			}
			else{
				res.redirect('/users/login');
			}
		});
});

router.post('/dashboard/add_dues', ensureAuthenticated, function(req, res) {
	var newDues = new Dues({
		rollno: req.body.rollno,
	  	status: 0,
		department_id: req.body.department_id,
		handler: req.session.passport.user,
		comments: req.body.comments
	});
	newDues.save(function(err) {
  	if (err) throw err;
  	console.log('Dues Created');
	});
	res.redirect('/users/dashboard/add_dues')

});

router.get('/dashboard/remove_dues', ensureAuthenticated, function(req, res) {
		User.findOne({username:req.session.passport.user},function(err,result){
			if(result) {
				if(result['role'] == 'handler') {
					Dues.find({handler:req.session.passport.user},function(errr,dues){	
							res.render('remove_dues',{dues:dues});
					});
				}
				else {
					res.redirect('/users/dashboard');	
				}
			}
			else{
				res.redirect('/users/login');
			}
		});
});

router.post('/dashboard/remove_dues', ensureAuthenticated, function(req, res) {
	Dues.findOne({handler:req.session.passport.user,rollno:req.body.rollno},function(errr,dues){	
		 dues.remove(function(err) {
    	if (err) throw err;
    	console.log('Dues successfully deleted!');
  		});
	});

	res.redirect('/users/dashboard/remove_dues');

});










// User Authentication

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		//req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

router.get('/login',function(req, res) {
    User.find({username:'admin'},function(err,result){
        if(result.length == 0) {
            var newUser = new User({
			    username: 'admin',
			    password: '123456',
                role: 'admin'
	        });
		    User.createUser(newUser,function(err,user){
                 if(err) console.log(err);
                 console.log(user);
            });
        }
    });
    res.render('login');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
   User.getUserByUsername(username, function(err, user){
   	if(err) throw err;
   	if(!user){
   		return done(null, false, {message: 'Unknown User'});
   	}
   	User.comparePassword(password, user.password, function(err, isMatch){
   		if(err) throw err;
   		if(isMatch){
   			return done(null, user);
   		} else {
   			return done(null, false, {message: 'Invalid Password'});
   		}
   	});
   });
}));

passport.serializeUser(function(user, done) {
  done(null, user.username);
});

passport.deserializeUser(function(username, done) {
  User.getUserByUsername(username, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/users/dashboard', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/users/dashboard');
  });

router.get('/logout', function(req, res){
	req.logout();

	req.flash('success_msg', 'You are logged out');

	res.redirect('/users/login');
});

module.exports = router;

