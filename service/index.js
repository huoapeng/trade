var httpUtil = require('../utils/http.js')
var async = require('async');
var appConfig = require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {
	var resultsData = {};
	var urlArr = [
		{ "path": "/categorylist", "name": "categorylist" }, { "path": "/33/recommenditemlist", "name": "list33" },
		{ "path": "/34/recommenditemlist", "name": "list34" }, { "path": "/35/recommenditemlist", "name": "list35" },
		{ "path": "/36/recommenditemlist", "name": "list36" }, { "path": "/37/recommenditemlist", "name": "list37" },
		{ "path": "/38/recommenditemlist", "name": "list38" }, { "path": "/39/recommenditemlist", "name": "list39" },
		{ "path": "/40/recommenditemlist", "name": "list40" }, { "path": "/41/recommenditemlist", "name": "list41" },
		{ "path": "/42/recommenditemlist", "name": "list42" }, { "path": "/43/recommenditemlist", "name": "list43" },
		{ "path": "/44/recommenditemlist", "name": "list44" }, { "path": "/45/recommenditemlist", "name": "list45" },
		{ "path": "/46/recommenditemlist", "name": "list46" }, { "path": "/47/recommenditemlist", "name": "list47" }]
	var arr = [];
	async.each(urlArr, function (urlArr_, callback) {
		arr.push(function (callback) {
			getUrlInfo(urlArr_, callback)
		})
	}, function (err) {

	});

	async.parallel(arr,
		function (err, results) {
			res.render('index', { "results": resultsData })
		}
	);
	function getUrlInfo(params, callback) {
		var path = params['path'].replace(appConfig.config.proxy.replace, "")
		var options = {
			"path": path
		}
		httpUtil.get(options, function (result, err) {
			if (err) {
				callback(err, null);
			} else {
				resultsData[params['name']] = result
				callback(null, result);
			}
		})
	}

}; 