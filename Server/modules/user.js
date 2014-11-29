/**
 * File Name: login.js,
 * Author: hilarudeens,
 * Date Created: 10th Oct 2012,
 * Description: To render login page.
 */
var dbcontrol = require('./db/dbcontrol');
var fs = require("fs");

var readUserData = function(request, response, next) {

	if (request.params.emailId) {
		condition = {
			emailId : request.params.emailId
		};
		userModel = dbcontrol('userModel').userModel;
		userModel.find(condition, function(err, results) {
			if (results.length && results[0].emailId === request.params.emailId) {
				response.send({
					status : 'SUCCESS',
					isEnabled : true
				});
			} else if (!err) {
				response.send({
					status : 'SUCCESS',
					isEnabled : false
				});
			} else {
				response.send({
					status : 'FAILED',
					errMsg : 'Could not read data.'
				}, {
					'Content-Type' : 'text/json'
				}, 400);
			}
		});

		/*userModel.find(condition, function(err, results) {
		console.log("Result");
		console.log(results);

		if (results[0].emailId === request.params.emailId) {
		response.send({
		status : 'SUCCESS',
		isEnabled : true
		});
		} else if (!err) {
		response.send({
		status : 'SUCCESS',
		isEnabled : false
		});
		} else {
		response.send({
		status : 'FAILED',
		errMsg : 'Could not read data.'
		});
		}

		});*/

		/*userModel.insertUser({
		residentName : "Hilarudeen",
		emailId : "udeen.smart@gmail.com",
		mobileNumber : "123456",
		peopleInHome : "6",
		invitedMembers : ["1",'2']
		}, function(err) {
		console.log("saving attempt");
		console.log(arguments);
		response.send({
		status : 'SUCCESS',
		isEnabled : true
		});
		});
		/*userModel.find({
		"emailId" : request.params.emailId
		}, function(err, result) {

		});*/

		// userModel.insertBook({
		// title : title,
		// author : author,
		// isbn : isbn,
		// description : description,
		// file : filePath
		// }, function(err) {
		// response.redirect('/addbooks');
		// });

	} else {
		response.send({
			status : 'FAILED',
			errMsg : 'User id is missing.'
		});
	}
};

/*
 var loginFormSubmit = function(request, response, next) {
 var username = request.body.username;
 var password = request.body.password;
 var user = dbcontrol.userCollection;

 if (username === 'admin' && password === 'admin') {
 request.session.username = username;
 response.redirect('/');
 } else {
 response.redirect('/adminlogin');
 }
 };*/

exports.checkUserHandler = function(request, response, next) {
	if (request.method == 'GET')
		readUserData(request, response, next);
	else if (request.method == 'POST')
		loginFormSubmit(request, response, next);
};
