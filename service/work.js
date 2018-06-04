var httpUtil=require('../utils/http.js') 
exports.create = function (req, res, next) {   
    var params = {
        'title':req.body.title,
        'image':req.body.image,
        'description':req.body.description,
        'userid':req.session.user.id,
        'file':req.body.file,
        'copyright':req.body.copyright,
        'thumbnail':req.body.thumbnail,
        'tags':req.body.tags
    }
    var options={
        "path":"/work"
    }
    console.log(params);
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 
exports.delete = function (req, res, next) {    
    var params={
        'id':req.body.id 
    }
    var options={
        'path':'/work' 
    } 
    httpUtil.delete(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 

exports.getWorksByUserid = function (req, res, next) {   
    var options={
        'path':'/'+req.params.userid+"/userworks/"+req.params.page

    } 
    httpUtil.get(options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 

exports.userworks = function (req, res, next) {   
    var options={
        'path':'/'+req.session.user.id+"/userworks/"+req.params.page

    } 
    httpUtil.get(options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 

exports.workpic = function (req, res, next) {   
    var options={
        'path': "/workpic/"+req.params.workid

    } 
    httpUtil.get(options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 