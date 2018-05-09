var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {   
    var resultsData={};
    var urlArr=[{"path":"/categorylist","name":"categorylist"},{"path":"/48/recommenditemlist","name":"list48"},{"path":"/49/recommenditemlist","name":"list49"},
    {"path":"/50/recommenditemlist","name":"list50"},{"path":"/51/recommenditemlist","name":"list51"},{"path":"/52/recommenditemlist","name":"list52"},{"path":"/53/recommenditemlist","name":"list53"},
    {"path":"/54/recommenditemlist","name":"list54"},{"path":"/55/recommenditemlist","name":"list55"},{"path":"/56/recommenditemlist","name":"list56"},
    {"path":"/57/recommenditemlist","name":"list57"},{"path":"/58/recommenditemlist","name":"list58"}]
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
	   		res.render('team',{"results":resultsData}) 
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