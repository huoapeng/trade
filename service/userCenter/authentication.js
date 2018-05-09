var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {   
	var resultData={};    
	var status=req.query.status ? req.query.status : "";
	if(!req.session.user){
		return res.redirect('/login');  
	}
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":'/user/'+req.session.user.id
		    }    
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
    		arr.push(function(callback) {
				getUrlData(onearg['privateAuthentication'],callback)
			}) 
			arr.push(function(callback) {
				getUrlData(onearg['companyAuthentication'],callback)
			})  
	    	async.series(arr, 
			function(err, results) {  
				resultData['privateAuthentication']  =results[0]['data']
				resultData['companyAuthentication']  =results[1]['data'] 
				done(err, results) 
			});   
	    }  
	],  
    function(err, results) { 
    	console.log(resultData) 
    	res.render('userCenter/authentication.html',{'results':resultData}) 	
    });   
};  
function getUrlData(params,callback){
	var path=params.replace(appConfig.config.proxy.replace,"") 
    var options={
        "path":path
    }  
    console.log(options)
    httpUtil.get(options,function(result,err){  
        if(err){
            callback(err, null);
        }else{   
        	console.log(result)
        	 callback(null, result);
        }  
    })  
}