var httpUtil=require('../utils/http.js')

exports.bidcount = function (req, res, next) {  
   var options={
         "path":"/"+req.params.projectid+"/bidcount"
   }
   console.log(options)
   httpUtil.get(options,function(result,err){
         if(err){
            res.send(err);
         }else{
            res.send(result);
         } 
   }) 
}; 
exports.put = function (req, res, next) {  
    var params={
        'userid':req.body.userid,
        'projectid':req.body.projectid  
    }; 
    var options={
        "path":"/bid"
    }
    console.log(params);
    httpUtil.put(params,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result);
        } 
    }) 
};
exports.bid = function (req, res, next) {  
    var params={
        'userid':req.session.user.id,
        'projectid':req.body.projectid,  
        'price':req.body.price,  
        'description':req.body.description,  
        'timespan':req.body.timespan, 
        'file':req.body.file,  
    }; 
    var options={
        "path":"/bid"
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