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
					var arr = result['data'];
					var workmap = {},
						dest = [];
					for (var i = 0; i < arr.length; i++) {
						var ai = arr[i];
						if (!workmap[ai.workid]) {
							dest.push({
								workid: ai.workid,
								sellerid: ai.seller_id,
								title: ai.workTitle,
								data: [ai]
							});
							workmap[ai.workid] = 'hello world';
						} else {
							for (var j = 0; j < dest.length; j++) {
								var dj = dest[j];
								if (dj.workid == ai.workid) {
									dj.data.push(ai);
									break;
								}
							}
						}
					}
					resultData['buyerMessageList'] = dest;
					done(null, result);
				}
			})
		}, function (onearg, done) {
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