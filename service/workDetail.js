var httpUtil = require('../utils/http.js')
var async = require('async');
var appConfig = require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {
	var workid = URL.parse(req.url, true).query.i;
	var resultData = {};
	async.waterfall([
		function (done) {
			var options = {
				"path": "/work/" + workid
			}
			httpUtil.get(options, function (result, err) {
				if (err) {
					done(err, null);
				} else {
					resultData['work'] = result;
					done(null, result);
				}
			})
		}, function (onearg, done) {
			var path = onearg['owner'].replace(appConfig.config.proxy.replace, "")
			var options = {
				"path": path
			}
			httpUtil.get(options, function (result, err) {
				if (err) {
					done(err, null);
				} else {
					resultData['owner'] = result;
					onearg['owner'] = result
					done(null, onearg);
				}
			})
		},
		function (onearg, done) {
			var path = onearg['owner']['works'].replace(appConfig.config.proxy.replace, "")
			var options = {
				"path": path
			}
			httpUtil.get(options, function (result, err) {
				if (err) {
					done(err, null);
				} else {
					resultData['works'] = result;
					done(null, onearg);
				}
			})
		},
		function (onearg, done) {
			var options = {
				"path": "/workpic/" + workid
			}
			httpUtil.get(options, function (result, err) {
				if (err) {
					done(err, null);
				} else {
					resultData['workpics'] = result;
					done(null, onearg);
				}
			})
		}
	],
		function (err, results) {
			res.render('workDetail', { "results": resultData })
		});

}; 