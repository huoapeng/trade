var httpUtil=require('../utils/http.js') 
exports.addNoteMessage = function (req, res, next) {   
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
exports.addWorkMessage = function (req, res, next) {   
    var params = {
        "message":req.body.message,
		"workid":parseInt(req.body.workid),
		"buyerid":parseInt(req.body.buyerid),
		"sellerid":parseInt(req.body.sellerid)
    }
    var options={
        "path":"/workmessage"
    }
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 
