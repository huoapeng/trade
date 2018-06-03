var httpUtil = require('../../utils/http.js')
var async = require('async');
var appConfig = require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {
	if (!req.session.user) {
		return res.redirect('/login');
	}
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
		}, function (onearg, done) {
			var options = {
				"path": "/workmessagelist?w=" + workid + '&b=' + req.session.user.id + '&s=' + onearg["userid"]
			}
			httpUtil.get(options, function (result, err) {
				if (err) {
					done(err, null);
				} else {
					for (var i in result['data']) {
						result['data'][i]['publishDate'] = dateType(result['data'][i]['publishDate'])
					}
					resultData['messagelist'] = result;
					done(null, onearg);
				}
			})
		}
	], function (err, results) {
		res.render('userCenter/workBuy', { "results": resultData })
	});
};
function dateType(date) {
	var date = new Date(date);
	return date.toLocaleDateString();
}