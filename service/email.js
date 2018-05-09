var httpUtil=require('../utils/http.js') 
exports.sendemail = function (req, res, next) {   
    var params = {
        "recivers":req.body.recivers,
        "folderName":req.body.folderName
    }
    var options={
        "path":"/sendemail"
    } 
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{   
            res.send(result); 
        }
    })   
} 