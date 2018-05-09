var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {     
	var projectid = URL.parse(req.url, true).query.i; 
	console.log(projectid)
	var resultData={};
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":"/project/"+projectid
		    }  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{
		        	resultData['project']= result;
		            done(null, result);
		        }  
		    }) 
	    },
	    function (onearg, done) {   
	    	 var options={
		        "path":"/29/recommenditemlist"
		    };  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{   
		        	resultData['list29']=result; 
		            done(null, onearg);
		        }  
		    })  
	    },
	    function (onearg, done) {   
	    	var options={
		       "path":onearg['bids'].replace(appConfig.config.proxy.replace,"") 
		    };  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{   
		        	resultData['bids']=result; 
		            done(null, onearg);
		        }  
		    })  
	    },
	    function (onearg, done) { 
	    	var path=onearg['owner'].replace(appConfig.config.proxy.replace,"") 
	        var options={
		        "path":path
		    }  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['owner']= result;
		            done(null, onearg);
		        }  
		    }) 
	    }, function (twoarg, done) { 
	    	console.log(twoarg['categorys'])
	    	var path=twoarg['categorys'].replace(appConfig.config.proxy.replace,"") 
	        var options={
		        "path":path
		    }  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['categorys']= result;
		            done(null, result);
		        }  
		    }) 
	    },
	], function (error, result) {
	    resultData['project']['bonus']=resultData['project']['bonus'].formatMoney(0)

	    res.render('projectDetail',{"results":resultData}) 	
	})
}; 