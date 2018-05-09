var httpUtil=require('../utils/http.js') 
var async=require('async');
exports.usertags = function (req, res, next) {    
    var options={
        "path":"/"+req.session.user.id+"/usertags"
    }
    console.log(options)
    httpUtil.get(options,function(result,err){  
        if(err){
            res.send("statusCode is:"+err);
        }else{
            console.log(result) 
             res.send(result);
        }  
    })    
}
exports.add = function (req, res, next) {    
    var options={
        "path":"/usertag"
    }  
    var params={
        "userid":req.session.user.id,
        "name":req.body.name
    }
    console.log(options)
    httpUtil.post(params,options,function(result,err){  
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result); 
        }  
    })    
}
exports.adminAdd = function (req, res, next) {    
    var options={
        "path":"/usertag"
    }  
    var params={ 
        "name":req.body.name
    }
    console.log(options)
    httpUtil.post(params,options,function(result,err){  
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result); 
        }  
    })    
}
exports.delete = function (req, res, next) {    
    var options={
        "path":"/usertag"
    }
    var params={
        "userid":req.session.user.id,
        "id":req.body.id
    }
    console.log(options)
    httpUtil.delete(params,options,function(result,err){  
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result); 
        }  
    })    
}
exports.adminDelete = function (req, res, next) {    
    var options={
        "path":"/usertag"
    }
    var params={ 
        "id":req.body.id
    }
    console.log(options)
    httpUtil.delete(params,options,function(result,err){  
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result); 
        }  
    })    
}
exports.usertaglist = function (req, res, next) {    
    var options={
        "path":"/search/usertaglist/"+req.params.keyword
    }
    console.log(options)
    httpUtil.get(options,function(result,err){  
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result); 
        }  
    })    
}
