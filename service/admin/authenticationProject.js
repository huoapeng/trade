var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {     
	var resultData={}; 
	var status=req.query.status ? req.query.status : ""   ;
	var keyword=req.query.keyword ? req.query.keyword : ""   ;
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":"/projectlist/"+req.params.page+"?"+(req.query.status ? "status="+req.query.status+"&"  : "")+(req.query.keyword ? "keyword="+req.query.keyword+"&"  : "")
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
	    } 
	],  
    function(err, results) {   
    	 
    	console.log(resultData)
    	res.render('admin/authenticationProject',{'results':resultData}) 	
    }); 
 
}; 
 