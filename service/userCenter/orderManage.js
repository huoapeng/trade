var httpUtil=require('../../utils/http.js')
var async= require('async');
var appConfig=require('../../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {  
	if(!req.session.user){
		return res.redirect('/login');  
	} 
	var resultData={};    
	var status=req.query.status ? req.query.status : ""; 
	var winner=req.query.winner ? req.query.winner : ""; 
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":'/userParticipateProjects/'+req.params.page+"?userid="+req.session.user.id + (status ? "&status="+status : "") + (winner ? "&winner="+winner : "")
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
						getProject(obj,callback)
					}) 
			}, function(err) { 
			     
			});  
	    	async.series(arr, 
			function(err, results) { 
				for(var i in resultData['data']){
					resultData['data'][i]['project']=results[i]
				}
			    done(err, resultData) 
			});  
	    }  
	],  
    function(err, results) { 
    	 
    	console.log(resultData)
    	res.render('userCenter/orderManage.html',{'results':resultData}) 	
    });   
};  
function getProject(params,callback){
	var path=params['project'].replace(appConfig.config.proxy.replace,"") 
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