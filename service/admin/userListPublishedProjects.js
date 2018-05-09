var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
	var resultData={};    
	console.log(1)
	var status=req.query.status ? req.query.status : "";
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":'/userPublishedProjects/'+req.params.page+"?userid="+req.query.userid + (status ? "&status="+status : "")
		    }   
		    console.log(options)
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData= result;

		            done(null, result);
		        }  
		    }) 
	    },  
	    function (onearg, done) {   
	    	var arr=[]; 
	    	async.each(onearg['data'], function(obj, callback) {  
			    arr.push(function(callback) {
						getBidCount(obj,callback)
					}) 
			}, function(err) { 
			     
			});  
	    	async.series(arr, 
			function(err, results) { 
				for(var i in resultData['data']){
					resultData['data'][i]['bidCount']=results[i]['count']
				}
			    done(err, resultData) 
			});  
	    }  
	],  
    function(err, results) { 
    	 
    	console.log(resultData)
    	res.render('admin/userListPublishedProjects',{'results':resultData}) 	
    });   
};  
function getBidCount(params,callback){
	var path=params['bidCount'].replace(appConfig.config.proxy.replace,"") 
    var options={
        "path":path
    }  
    httpUtil.get(options,function(result,err){  
        if(err){
            callback(err, null);
        }else{   
            callback(null, result);
        }  
    })  
}