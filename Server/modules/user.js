/**
 * File Name: user.js,
 * Author: Clarice Technologies,
 * Date Created: 29th Nov 2014,
 * Description: This is used to manage user activities.
 */
var dbcontrol = require('./db/dbcontrol');
var userModel = dbcontrol('userModel').userModel;
var fs = require("fs");

var readUserData = function(request, response, next) {
	if (request.params.emailId) {
		condition = {
			emailId : request.params.emailId
		};
		console.log("condition is", condition);
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

var saveUserData = function(request, response, next) {
	console.log('POST body');
	console.log(request.body);
	var userData = request.body;

	// Testing code start.
	// /userData = {
	// residentName : "Hilarudeen",
	// emailId : "udeen.smart@gmail.com",
	// mobileNumber : "123456",
	// peopleInHome : "6",
	// invitedMembers : ["1", '2']
	// };
	// Testing code end.

	userModel.insertUser(userData, function(err, results) {
		console.log("saving attempt");
		console.log(arguments);
		response.send({
			status : 'SUCCESS',
			isEnabled : true
		});
	});
}
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
		saveUserData(request, response, next);
};
