var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
 
   	var resultsData={};
    var urlArr=[{"path":"/categorylist","name":"categorylist"},{"path":"/2/recommenditemlist","name":"list2"},
    {"path":"/7/recommenditemlist","name":"list7"},{"path":"/8/recommenditemlist","name":"list8"},{"path":"/9/recommenditemlist","name":"list9"}
    ,{"path":"/10/recommenditemlist","name":"list10"},{"path":"/12/recommenditemlist","name":"list12"},{"path":"/19/recommenditemlist","name":"list19"}
    ,{"path":"/20/recommenditemlist","name":"list20"},{"path":"/21/recommenditemlist","name":"list21"},{"path":"/22/recommenditemlist","name":"list22"}
    ,{"path":"/23/recommenditemlist","name":"list23"},{"path":"/24/recommenditemlist","name":"list24"}]
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
	   		res.render('vrhall',{"results":resultsData}) 
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
     
  
}; 

 

 