var httpUtil=require('../utils/http.js') 
exports.addNote = function (req, res, next) {   
    var params = {
        "userid":req.session.user.id,
        "projectid":parseInt(req.body.projectid),
        "title":req.body.title
    }
    var options={
        "path":"/note"
    } 
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            result['userImage']=req.session.user.imageSmall;
            result['userName']=req.session.user.nickname; 
            console.log(result)
            res.send(result); 
        }
    })   
} 

exports.projectnotes = function (req, res, next) {  
    //var projectid = URL.parse(req.url, true).query.projectid; 
    var options={
        'path':'/'+req.params.projectid+"/projectnotes"

    } 
    httpUtil.get(options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 