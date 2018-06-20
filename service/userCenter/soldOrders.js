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
		        "path":'/userSoldOrders/'+req.params.page+"?userid="+req.session.user.id
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
    	res.render('userCenter/soldOrders.html',{'results':resultData}) 	
    });   
};  