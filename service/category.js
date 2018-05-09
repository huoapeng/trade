var httpUtil=require('../utils/http.js')

exports.categorylist = function (req, res, next) {  
   var options={
         "path":"/categorylist"
   }
   httpUtil.get(options,function(result,err){
         if(err){
            res.send(err);
         }else{
            res.send(result);
         } 
   })

}; 
exports.usercategorys = function (req, res, next) {  
   var options={
         "path":"/"+req.session.user.id+"/usercategorys"
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
exports.add = function (req, res, next) {  
    var params={
        'parentid':req.body.parentid,
         'name':req.body.name
    }; 
    var options={
        "path":"/category"
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
exports.modify= function (req, res, next) {  
      var params = { 
         'id':req.body.id, 
         'name':req.body.name,
         'parentid':req.body.parentid
      }
      console.log(params);
      var options={
         "path":"/category"
      }
      httpUtil.put(params,options,function(result,err){
         if(err){
            res.send("statusCode is:"+err);
         }else{
            res.send(result);
         } 
      })
};
exports.delete = function (req, res, next) {  
      var params={
         'id':req.body.id
      }; 
      var options={
        "path":"/category"
      } 
      httpUtil.delete(params,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result);
        } 
      }) 
};

