var httpUtil = require('../../utils/http.js')
var async = require('async');
var appConfig = require('../../appConfig.js');
var URL = require('url');

exports.showHtml = function (req, res, next) {
	if (!req.session.user) {
		return res.redirect('/login');
	}
	var resultData = {};
	async.waterfall([
		function (done) {
			var options = {
				"path": "/workmessagelist?b=" + req.session.user.id
			}
			httpUtil.get(options, function (result, err) {
				if (err) {
					done(err, null);
				} else {
					for (var i in result['data']) {
						result['data'][i]['publishDate'] = dateType(result['data'][i]['publishDate'])
					}
					resultData['buyerMessageList'] = result;
					done(null, result);
				}
			})
		},function (onearg, done) {
			var options = {
				"path": "/workmessagelist?s=" + req.session.user.id
			}
			httpUtil.get(options, function (result, err) {
				if (err) {
					done(err, null);
				} else {
					for (var i in result['data']) {
						result['data'][i]['publishDate'] = dateType(result['data'][i]['publishDate'])
					}
					resultData['sellerMessageList'] = result;
					done(null, result);
				}
			})
		}
	], function (err, results) {
		res.render('userCenter/messages', { 'results': resultData })
	});
};
function dateType(date) {
	var date = new Date(date);
	return date.toLocaleDateString();
}