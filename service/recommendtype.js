var httpUtil=require('../utils/http.js')

exports.add = function (req, res, next) {  
    var params={ 
        'name':req.body.name
    }; 
    var options={
        "path":"/recommendtype"
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
         'typeid':req.body.typeid, 
         'name':req.body.name
      }
      console.log(params);
      var options={
         "path":"/recommendtype"
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
         'typeid':req.body.typeid
      }; 
      var options={
        "path":"/recommendtype"
      } 
      httpUtil.delete(params,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result);
        } 
      }) 
};