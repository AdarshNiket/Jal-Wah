/**
 * File Name: app.js,
 * Author: Clarice Technologies,
 * Date Created: 29th Nov 2014,
 * Description: This file hold server configuration and hooks to link modules.
 */
var express = require('express');
var app = express.createServer();
var SessionMongoose = require("session-mongoose")(express);
var fs = require('fs');

// Read configurations
try {
	var config = fs.readFileSync('./env/config.json', 'utf8');
	config = JSON.parse(config);
	var env = process.argv[2];
	switch(env) {
		case 'production':
			config = config.production;
		default:
			config = config.development;
	}

} catch(e) {
	throw e;
	process.exit();
}

var mongooseSessionStore = new SessionMongoose({
	url : config.MONGO_URI,
	interval : 120000 // expiration check worker run interval in millisec (default: 60000)
});

app.configure(function configuration() {
	app.use(express.cookieParser());
	app.use(express.session({
		secret : "Jalwah",
		cookie : {
			maxAge : (120 * 60 * 1000) //2 hrs
		},
		store : mongooseSessionStore
	}));
	app.use(express.bodyParser());
	app.use(function(req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	})
	// app.use('/files', express.static(basePath + '/files'));
	// app.use('/images', express.static(viewsPath + '/images'));
	// app.use('/css', express.static(viewsPath + '/css'));
	// app.use('/js', express.static(viewsPath + '/js'));
});

// Include APIs and respective handlers
require('./apis')(app);

global.dbconnstr = config.MONGO_URI;

// Exports
bootup = function() {
	var appStart = function() {
		app.listen('3000', function starting(err) {
			console.log('Server has been started in 3000');
		});
	};

	//Create Database Connection
	require('mongoose').connect(config.MONGO_URI, function(err, dbins) {
		if (err) {
			console.log('DB ' + err);
			process.exit();
		} else {
			// Testing code start
			/*
			var dbcontrol = require('./modules/db/dbcontrol');
			var userModel = dbcontrol('userModel').userModel;
			userModel.insertUser({
			residentName : "Hilarudeen",
			emailId : "hilar@gmail.com",
			mobileNumber : "123456",
			peopleInHome : "6",
			invitedMembers : ["1", '2']
			}, function(err) {
			console.log("saving attempt");
			console.log(arguments);

			});
			*/
			// Testing code end
			console.log('Database has been connected.');
			if ( typeof appStart === 'function')
				appStart();
		}
	});

};

// Bootup application.
bootup();
