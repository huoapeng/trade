var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
 
   	var resultsData={};
    var urlArr=[{"path":"/authenticationlist?type=1","name":"authenticationlist1"},{"path":"/authenticationlist?type=2","name":"authenticationlist2"},
    {"path":"/authenticationlist?type=4","name":"authenticationlist4"},{"path":"/authenticationlist?type=8","name":"authenticationlist8"}]
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
	   		res.render('admin/authenticationList',{"results":resultsData}) 
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
