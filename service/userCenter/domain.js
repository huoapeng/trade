var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {  
	if(!req.session.user){
		return res.redirect('/login');  
	} 
	var resultData={};     
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":'/categorylist'
		    }   
		    console.log(options)
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['categorylist']= result; 
		            done(null, result);
		        }  
		    }) 
	    },
	    function (onearg, done) {   
	    	var path=req.session.user.categorys.replace(appConfig.config.proxy.replace,"") 
	    	var options={
		        "path":path
		    } 
	    	console.log(options)
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['categorys']= result; 
		            done(null, result);
		        }  
		    }) 
	    }  
	],  
    function(err, results) {  
    	console.log(resultData)
    	res.render('userCenter/domain.html',{'results':resultData}) 	
    });   
};