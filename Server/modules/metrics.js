/**
 * File Name: user.js,
 * Author: Clarice Technologies,
 * Date Created: 29th Nov 2014,
 * Description: This is used to analyze and send water usage metrics to user.
 */
// var dbcontrol = require('./db/dbcontrol');
// var userModel = dbcontrol('userModel').userModel;
// var fs = require("fs");

var readUsageMetrics = function(request, response, next) {
	var query = request.query;
	var searchKey = [query.flatId, query.frequency, query.compareWith].join('_');
	var usageData = {};

	switch(searchKey) {
		case 'b502_daily_society':
			usageData = {
				periods : ["30/Nov", "29/Nov", "28/Nov", "27/Nov", "26/Nov", "25/Nov", "24/Nov"],

				usages : [{
					name : 'Society Average',
					data : [190, 360, 345, 380, 400, 370, 360]

				}, {
					name : 'b502',
					data : [160, 320, 330, 348, 295, 250, 350]
				}]
			};
			break;
			
		case 'b502_weekly_society':
			usageData = {
				periods : ["week 7", "week 6", "week 5", "week 4", "week 3", "week 2", "week 1"],

				usages : [{
					name : 'Society Average',
					data : [1330, 2520, 2415, 2660, 2800, 2590, 2520]

				}, {
					name : 'b502',
					data : [1120, 2240, 2310, 2436, 2065, 1750, 2450]
				}]
			};
			break;
			
		case 'b502_monthly_society':
			usageData = {
				periods : ["Nov", "Oct", "Sep", "Aug", "Jul", "Jun", "May"],

				usages : [{
					name : 'Society Average',
					data : [5700, 10800, 10350, 11400, 12000, 11100, 10800]

				}, {
					name : 'b502',
					data : [4800, 9600, 9900, 10440, 8850, 7500, 10500]
				}]
			}
			break;

		case 'b502_daily_city':
			usageData = {
				periods : ["30/Nov", "29/Nov", "28/Nov", "27/Nov", "26/Nov", "25/Nov", "24/Nov"],

				usages : [{
					name : 'City Average',
					data : [200, 380, 360, 380, 360, 362, 350]

				}, {
					name : 'b502',
					data : [180, 300, 350, 320, 333, 360, 325]

				}]

			};
			break;
			
		case 'b502_weekly_city':
			usageData = {
				periods : ["week 7", "week 6", "week 5", "week 4", "week 3", "week 2", "week 1"],

				usages : [{
					name : 'City Average',
					data : [1400, 2660, 2520, 2660, 2520, 2534, 2450]
				}, {
					name : 'b502',
					data : [1120, 2240, 2310, 2436, 2065, 1750, 2450]
				}]
			}
			break;
			
		case 'b502_monthly_city':
			usageData = {
				periods : ["Nov", "Oct", "Sep", "Aug", "Jul", "Jun", "May"],

				usages : [{
					name : 'City Average',
					data : [6000, 11400, 10800, 11400, 10800, 10860, 10500]
				}, {
					name : 'b502',
					data : [4800, 9600, 9900, 10440, 8850, 7500, 10500]
				}]
			};
			break;

		case 'b502_daily':
			usageData = {
				periods : ["30/Nov", "29/Nov", "28/Nov", "27/Nov", "26/Nov", "25/Nov", "24/Nov"],

				usages : [{
					name : 'b502',
					data : [160, 320, 330, 348, 295, 250, 350]
				}]
			};
			break;
			
		case 'b502_weekly':
			usageData = {
				periods : ["week 7", "week 6", "week 5", "week 4", "week 3", "week 2", "week 1"],

				usages : [{
					name : 'b502',
					data : [1120, 2240, 2310, 2436, 2065, 1750, 2450]
				}]
			};
			break;
			
		case 'b502_monthly':
			usageData = {
				periods : ["Nov", "Oct", "Sep", "Aug", "Jul", "Jun", "May"],

				usages : [{
					name : 'b502',
					data : [4800, 9600, 9900, 10440, 8850, 7500, 10500]
				}]
			}
			break;

		default:
			response.send({
				status : 'FAILED',
				errMsg : 'Invalid filter options.'
			});
			return;
	}

	response.send({
		status : 'SUCCESS',
		data : usageData
	});
};

exports.usageMetricsHandler = function(request, response, next) {
	if (request.method == 'GET')
		readUsageMetrics(request, response, next);
};
