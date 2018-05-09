var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {     
	var resultData={}; 
	var userid=req.query.userid ? req.query.userid : ""   ;  
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":"/user/"+userid
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
	    function(onearg,done) {
	    	console.log(onearg)
	    	var options={
		        "path":onearg['privateAuthentication'].replace(appConfig.config.proxy.replace,"")
		    }    
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['privateAuthentication']= result;
		            done(null, onearg);
		        }  
		    }) 
	    },
	    function(onearg,done) {
	    	console.log(onearg)
	    	var options={
		        "path":onearg['companyAuthentication'].replace(appConfig.config.proxy.replace,"")
		    }    
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['companyAuthentication']= result;
		            done(null, onearg);
		        }  
		    }) 
	    },
	    function(onearg,done) { 
	    	var options={
		        "path":onearg['bankAuthentication'].replace(appConfig.config.proxy.replace,"")
		    }    
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['bankAuthentication']= result;
		            done(null, result);
		        }  
		    }) 
	    }
	],  
    function(err, results) {   
    	 
    	//console.log(resultData)
    	res.render('admin/manualAnthenUpload',{'results':resultData}) 	
    }); 
 
}; 
 