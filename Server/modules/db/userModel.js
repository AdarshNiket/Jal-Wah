/**
 * File Name: userModel.js,
 * Author: Clarice Technologies,
 * Date Created: 29th Nov 2014,
 * Description: This is used to manage user collection in mongodb with mongoose friendly.
 */

var mongoose = require('mongoose');
var conn = mongoose.createConnection(global.dbconnstr);
var Schema = mongoose.Schema;

// var crypto = require('crypto');

var userSchema = new Schema({
	residentName : String,
	emailId : String,
	mobileNumber : String,
	peopleInHome : String,
	invitedMembers : Array
});

userSchema.statics.selectUser = function(condition, callback) {
	this.find(condition, function(err, docs) {
		callback(err, docs);
	});
};

userSchema.statics.insertUser = function(options, callback) {
	var newUser = new this;

	if (options.emailId) {
		newUser.residentName = options.residentName;
		newUser.emailId = options.emailId;
		newUser.mobileNumber = options.mobileNumber;
		newUser.peopleInHome = options.peopleInHome;
		newUser.invitedMembers = options.invitedMembers;

		newUser.save(function(err, result) {

			if (err) {
				callback({
					status : 'FAILED',
					errMsg : 'Not saved in database'
				});
			} else if ( typeof callback === 'function') {
				callback({
					status : 'SUCCESS',
					data : result
				});
			}
		});

	} else if ( typeof callback === 'function') {
		callback(new Error("Invalid input!"));
	}
};
var userModel = conn.model('userModel', userSchema);
// Exports
exports.userSchema = userSchema;
exports.userModel = userModel;

