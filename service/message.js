var httpUtil=require('../utils/http.js') 
exports.addMessage = function (req, res, next) {   
    var params = {
        "userid":req.session.user.id,
        "message":req.body.message,
        "noteid":parseInt(req.body.noteid)
    }
    var options={
        "path":"/notemessage"
    }
    console.log(params);
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            result['userImage']=req.session.user.imageSmall;
            result['userName']=req.session.user.nickname; 
            res.send(result); 
        }
    })  
} 
exports.notemessagelist = function (req, res, next) {  
    //var projectid = URL.parse(req.url, true).query.projectid; 
    var options={
        'path':'/'+req.params.noteid+"/notemessagelist"

    } 
    httpUtil.get(options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 

