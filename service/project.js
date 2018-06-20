var httpUtil=require('../utils/http.js') 
var async=require('async'); 
exports.projectDetail = function (req, res, next) {    
    var options={
        "path":"/project/"+req.params.projectid
    } 
    console.log(options)
    httpUtil.get(options,function(result,err){  
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result); 
        }  
    })    
}
exports.create = function (req, res, next) {   
    var params = { 
        "userid":req.body.userid ? req.body.userid : req.session.user.id,
        "name":req.body.name,
        "timespan":req.body.timespan,
        "bonus":req.body.bonus,
        "requirements":req.body.requirements,
        "description":req.body.description,
        "bidderQualifiRequire":req.body.bidderQualifiRequire,
        "bidderLocationRequire":req.body.bidderLocationRequire,
        "receiptDes":req.body.receiptDes,
        "receipt":req.body.receipt,
        "cids":req.body.cids
    }
    var options={
        "path":"/project"
    }
    httpUtil.post(params,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result);
        } 
    })
}  
exports.modify = function (req, res, next) {   
    var params = { 
        'id':req.body.id, 
        'status':req.body.status
    }
    console.log(params);
    var options={
        "path":"/project"
    }
    httpUtil.put(params,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result);
        } 
    })
}

exports.createOrder = function (req, res, next) {   
    var params = { 
        "name":req.body.name,
        "buyerid":req.body.userid ? req.body.userid : req.session.user.id,
        "sellerid": req.body.sellerid,
        "workid":req.body.workid
    }
    var options={
        "path":"/order"
    }
    httpUtil.post(params,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            res.send(result);
        } 
    })
} 