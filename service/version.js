var httpUtil=require('../utils/http.js')
var URL = require('url');
exports.addVersion = function (req, res, next) {   
	var params = {
      "projectid":req.body.projectid, 
      "title":req.body.title, 
      "description":req.body.description, 
      "userid":req.session.user.id,
      'image':req.body.image
   
   }
   var options={
      "path":"/version"
   }
   console.log(params);
   httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
   })  
}; 