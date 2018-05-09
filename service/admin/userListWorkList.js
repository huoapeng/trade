var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {   
	var resultData={};     
	async.waterfall([
	    function (done) {
	    	var path="/"+req.query.userid+"/userworks/"+req.params.page
	    	var options={
		        "path":path
		    } 
	    	console.log(options)
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['works']= result; 
		            done(null, result);
		        }  
		    }) 
	    },
	    function (onearg, done) {   
	    	var arr=[]; 
	    	async.each(onearg['data'], function(obj, callback) {  
			    arr.push(function(callback) {
						getWorkTags(obj,callback)
					}) 
			}, function(err) { 
			     
			});  
	    	async.series(arr, 
			function(err, results) { 
				console.log(results)
				for(var i in resultData['works']['data']){
					resultData['works']['data'][i]['tags']=results[i]
				}
			    done(err, resultData) 
			}); 
	    }  
	],  
    function(err, results) {  
    	console.log(resultData)
    	res.render('admin/userListWorkList',{'results':resultData}) 	
    });   
};
function getWorkTags(params,callback){
	var path=params['tags'].replace(appConfig.config.proxy.replace,"");
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