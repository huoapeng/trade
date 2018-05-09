var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {     
	var resultData="";
	res.render('userCenter/messages',{'results':resultData}) 	 
 
}; 
 