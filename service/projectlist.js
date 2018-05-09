var httpUtil=require('../utils/http.js')
var async= require('async');
var appConfig=require('../appConfig.js');
var appConfig=require('../appConfig.js');
var URL = require('url');
exports.showHtml = function (req, res, next) {    
	console.log("zhe11111")
	var resultData={}; 
	var cid=req.query.c ? req.query.c : "" 
	var keyword=req.query.keyword ? req.query.keyword : "" 
	var status=req.query.s ? req.query.s : 1
	var orderby=req.query.o ? req.query.o : "" 
	var desc=req.query.d ? req.query.d : "" 
	var url="/projectlist/"+req.params.page+"?"+(cid ? "cid="+cid+"&" : "") +  (keyword ? "keyword="+encodeURIComponent(keyword)+"&" : "")+ (status ? "status="+status+"&" : "")
	+ (orderby ? "orderby="+orderby+"&" : "")+ (desc ? "desc="+desc+"&" : "");
	console.log(url)
	var parentCategory=""
	var hasSonCategory=false

	async.waterfall([
	    function (done) {
	    	var options={
		        "path":url
		    }   
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{
		        	console.log("返回的结果",result)
		        	resultData= result;
		            done(null, result);
		        }  
		    }) 
	    },
	    function (onearg, done) {   
	    	 var options={
		        "path":"/categorylist"
		    };  
		    httpUtil.get(options,function(result,err){  
		        if(err){
		            done(err, null);
		        }else{   
		        	resultData['categorylist']=result; 
		            done(null, onearg);
		        }  
		    })  
	    }, 
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
					resultData['data'][i]['owner']=results[i]
				}
			    done(err, resultData) 
			}); 
	    } ,
	    function (onearg, done) {   
	    	var arr=[];
	    	 
	    	async.each(onearg['data'], function(obj, callback) {  
			    arr.push(function(callback) {
						getUserCategorys(obj,callback)
					}) 
			}, function(err) { 
			     
			}); 

	    	async.series(arr, 
			function(err, results) { 
				for(var i in resultData['data']){
					resultData['data'][i]['categorys']=results[i]
				}
			    done(err, resultData) 
			}); 
	    }  
	],  
    function(err, results) {   
    	 
    	for(var i in resultData['categorylist']['data']){
    		
    		if(resultData['categorylist']['data'][i]['parentid']==cid){
    			hasSonCategory=true;
    			break;
    		}
    		if(resultData['categorylist']['data'][i]['id']==cid){
    			parentCategory= resultData['categorylist']['data'][i]['parentid']
    		}
    	} 
    	resultData['activeCid']=cid;    
    	resultData['hasSonCategory']=hasSonCategory;    
    	resultData['parentCategory']=parentCategory;     
    	//处理时间格式
    	for(var i in resultData['data']){
    		resultData['data'][i]['publishDate']=dateType(resultData['data'][i]['publishDate'])
    		resultData['data'][i]['bonus']=resultData['data'][i]['bonus'].formatMoney(0)	
    	}  
    	res.render('projectlist',{'results':resultData}) 	
    }); 
 
}; 
function getUserInfo(params,callback){
	var path=params['owner'].replace(appConfig.config.proxy.replace,"") 
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
function getUserCategorys(params,callback){
	var path=params['categorys'].replace(appConfig.config.proxy.replace,"") 
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
function dateType(date){
	var date=new Date(date);
	return date.toLocaleDateString();
}
