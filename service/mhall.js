var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
   	var resultsData={};
    var urlArr=[{"path":"/categorylist","name":"categorylist"},{"path":"/1/recommenditemlist","name":"list1"},
    {"path":"/3/recommenditemlist","name":"list3"},{"path":"/4/recommenditemlist","name":"list4"},{"path":"/5/recommenditemlist","name":"list5"}
    ,{"path":"/6/recommenditemlist","name":"list6"},{"path":"/11/recommenditemlist","name":"list11"},{"path":"/13/recommenditemlist","name":"list13"}
    ,{"path":"/14/recommenditemlist","name":"list14"},{"path":"/15/recommenditemlist","name":"list15"},{"path":"/16/recommenditemlist","name":"list16"}
    ,{"path":"/17/recommenditemlist","name":"list17"},{"path":"/18/recommenditemlist","name":"list18"}]
   // console.log(urlArr)
	var arr=[]; 
	async.each(urlArr, function(urlArr_, callback) { 
		console.log(urlArr_['name'])
	    arr.push(function(callback) {
				getUrlInfo(urlArr_,callback)
			}) 
	}, function(err) { 
	     
	}); 
	async.parallel(arr, 
		function(err, results) {  
			console.log(resultsData)
	   		res.render('mhall',{"results":resultsData}) 
		}
	); 
	function getUrlInfo(params,callback){
		var path=params['path'].replace(appConfig.config.proxy.replace,"") 
	    var options={
	        "path":path
	    }  
	    console.log(path)
	    httpUtil.get(options,function(result,err){  
	        if(err){
	            callback(err, null);
	        }else{   
	        	resultsData[params['name']]=result
	            callback(null, result);
	        }  
	    })  
	}  
 //	res.render('index',{'results':results});
	
}; 