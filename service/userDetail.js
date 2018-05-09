var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
    var userid = URL.parse(req.url, true).query.i; 
	var resultData={};
	async.waterfall([
	    function (done) {
	    	var options={
		        "path":"/user/"+userid
		    }  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{ 
		        	resultData['user']= result;
		            done(null, result);
		        }  
		    }) 
	    },
	    function (onearg, done) {  
	    	async.parallel({
			    tags:function(callback){
			        var path=onearg['tags'].replace(appConfig.config.proxy.replace,"") 
			        var options={
				        "path":path
				    }  
				    httpUtil.get(options,function(result,err){  
				        if(err){
				            callback(err, null);
				        }else{ 
				        	resultData['tags']= result;
				            callback(null, result);
				        }  
				    }) 
			    },
			    categorys:function(callback){
			        var path=onearg['categorys'].replace(appConfig.config.proxy.replace,"") 
			        var options={
				        "path":path
				    }  
				    httpUtil.get(options,function(result,err){  
				        if(err){
				            callback(err, null);
				        }else{ 
				        	resultData['categorys']= result;
				            callback(null, result);
				        }  
				    }) 
			    } ,
			    participateProjects:function(callback){
			        var path=onearg['participateProjects'].replace(appConfig.config.proxy.replace,"") 
			        var options={
				        "path":path
				    }  
				    httpUtil.get(options,function(result,err){  
				        if(err){
				            callback(err, null);
				        }else{ 
				        	resultData['participateProjects']= result;
				            callback(null, result);
				        }  
				    }) 
			    } ,
			    publishedProjects:function(callback){
			        var path=onearg['publishedProjects'].replace(appConfig.config.proxy.replace,"") 
			        var options={
				        "path":path
				    }  
				    httpUtil.get(options,function(result,err){  
				        if(err){
				            callback(err, null);
				        }else{ 
				        	resultData['publishedProjects']= result;
				            callback(null, result);
				        }  
				    }) 
			    } ,
			    works:function(callback){
			        var path=onearg['works'].replace(appConfig.config.proxy.replace,"") 
			        var options={
				        "path":path
				    }  
				    httpUtil.get(options,function(result,err){  
				        if(err){
				            callback(err, null);
				        }else{ 
				        	resultData['works']= result;
				            callback(null, result);
				        }  
				    }) 
			    },
			    list28:function(callback){  
			        var options={
				        "path":'/28/recommenditemlist'
				    }  
				    httpUtil.get(options,function(result,err){  
				        if(err){
				            callback(err, null);
				        }else{ 
				        	resultData['list28']= result;
				            callback(null, result);
				        }  
				    }) 
			    } 
			},function(error,result){
			    if(!error)
			        done(null,onearg);
			    else
			        done(error,null);
			});
	    },
	    function (onearg, done) {   
		    var arr=[]; 
	    	async.each(resultData['participateProjects']['data'], function(obj, callback) {  
			    arr.push(function(callback) {
						getParticipateProjects(obj,callback)
					}) 
			}, function(err) { 
			     
			});  
	    	async.series(arr,
			function(err, results) { 
				
				for(var i in results){
						console.log(results[i])
					resultData['participateProjects']['data'][i]['project']=results[i]
				}
			    done(err, onearg) 
			}); 
	    }
	],  
    function(err, results) {   
    	//console.log(resultData) 
    	res.render('userDetail',{"results":resultData}) 	
    }); 
};  
function getParticipateProjects(params,callback){
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