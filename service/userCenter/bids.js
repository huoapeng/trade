var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
    var url=req.originalUrl;
    console.log(url)
	var resultData={}; 
	var projectid=req.query.i  
	var hasBidded=false;
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":'/'+projectid+"/bidlist"
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
	    } ,
	    function (onearg, done) {   
	    	var arr=[];
	    	 
	    	async.each(onearg['data'], function(obj, callback) {  
			    arr.push(function(callback) {
						getUserInfo(obj,callback)
					}) 
			}, function(err) { 
			     
			}); 
	    	async.series(arr, 
			function(err, results) { 
				for(var i in resultData['data']){
					resultData['data'][i]['user']=results[i]
				}
			    done(err, onearg) 
			}); 
	    }   ,
	    function (onearg, done) {    
	    	var options={
		        "path":'/project/'+projectid
		    }  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['project']= result; 
		            done(null, result);
		        }   
		    })  
	    }  
	],  
    function(err, results) {
    	for(var i in resultData['data']) {
    		if(resultData['data'][i]['status']==2){
    			hasBidded=true;
    		} 
    	}   
    	resultData['hasBidded']=true;
    	console.log(resultData)
    	res.render('userCenter/bids',{'results':resultData}) 	
    }); 
 
}; 

 
function getUserInfo(params,callback){
	var path=params['user'].replace(appConfig.config.proxy.replace,"") 
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