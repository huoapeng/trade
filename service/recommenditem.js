var httpUtil=require('../utils/http.js')

exports.add = function (req, res, next) {  
    var params={ 
      'typeid':req.body.typeid, 
      'title':req.body.title, 
      'description':req.body.description, 
      'url':req.body.url, 
      'orderid':req.body.orderid, 
      'image':req.body.image
    }; 
    var options={
        "path":"/recommenditem"
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


exports.recommenditemlist = function (req, res, next) {    
    var options={
      "path":"/"+req.params.type+"/recommenditemlist"
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
exports.modify= function (req, res, next) {  
      var params = { 
        'itemid':req.body.itemid,
        'title':req.body.title,
        'description':req.body.description,
        'url':req.body.url,
        'orderid':req.body.orderid,
        'image':req.body.image
      }
      console.log(params);
      var options={
         "path":"/recommenditem"
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
         'itemid':req.body.itemid
      }; 
      var options={
        "path":"/recommenditem"
      } 
      httpUtil.delete(params,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result);
        } 
      }) 
};