var httpUtil=require('../utils/http.js') 
exports.create = function (req, res, next) {   
    var params = {
        "name":req.body.name
    }
    var options={
        "path":"/worktag"
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
exports.worktags = function (req, res, next) {    
    var options={
        'path':'/'+req.params.worktagsId+"/worktags" 
    }   
    httpUtil.get(options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 