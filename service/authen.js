var httpUtil=require('../utils/http.js')
var URL = require('url');
exports.userauthen = function (req, res, next) {   
	var type = URL.parse(req.url, true).query.type; 
   	var options={
   		"path":"/userauthen?userid="+req.session.user.id+"&type="+type
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
exports.privateAuthen = function (req, res, next) {    
    var params={
        "ownerid": req.body.ownerid ? req.body.ownerid : req.session.user.id ,
		'identityid':req.body.identityid,
		'name':req.body.name,
		'identityFrontImage':req.body.identityFrontImage,
		'identityBackImage':req.body.identityBackImage
    }
    console.log(params)
    var options={
        'path':'/privateauthen' 
    }
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
}    
exports.delPrivateAuthen = function (req, res, next) {    
    var params={
        'ownerid':req.body.ownerid ? req.body.ownerid : req.session.user.id 
    }
    var options={
        'path':'/privateauthen' 
    }
    httpUtil.delete(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
}  
exports.companyAuthen = function (req, res, next) {    
    var params={
        "ownerid":req.body.ownerid ? req.body.ownerid : req.session.user.id ,
		'name':req.body.name,
		'businessScope':req.body.businessScope,
        'licenseID':req.body.licenseID,
        'verifyType':1, 
		'licenseImage':req.body.licenseImage,
		'contactImage':req.body.contactImage
    }
    console.log(params)
    var options={
        'path':'/companyauthen' 
    }
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 
exports.delCompanyAuthen = function (req, res, next) {    
    var params={
        'ownerid':req.body.ownerid ? req.body.ownerid : req.session.user.id 
    }
    var options={
        'path':'/companyauthen' 
    }
    httpUtil.delete(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 
exports.bankAuthen = function (req, res, next) {    
    var params={
        "ownerid":req.body.ownerid ? req.body.ownerid : req.session.user.id , 
		'name':req.body.name,
		'bankAccount':req.body.bankAccount, 
        'bankName':req.body.bankName,
        'bankLocation':req.body.bankLocation,
    }
    console.log(params)
    var options={
        'path':'/bankauthen' 
    }
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 
exports.modifyBankAuthen = function (req, res, next) {    
    var params={
        'id':req.body.id,
		'code':req.body.code,
    }
    console.log(params)
    var options={
        'path':'/bankauthen' 
    }
    httpUtil.put(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
}  
exports.delBankAuthen = function (req, res, next) {    
    var params={
        "ownerid":req.body.ownerid ? req.body.ownerid : req.session.user.id ,
    }
    console.log(params)
    var options={
        'path':'/bankauthen' 
    }
    httpUtil.delete(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
}   

exports.manualthen = function (req, res, next) {    
    var params={
        "ownerid":req.body.ownerid ? req.body.ownerid : req.session.user.id , 
		"name":req.body.name,
		"phone":req.body.phone,
		"location":req.body.location,
    }
    console.log(params)
    var options={
        'path':'/manualthen' 
    }
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 

exports.approval = function (req, res, next) {    
    var params={
        "authenType":req.body.authenType,  
        "authenID":req.body.authenID,  
        "approvalStatus":req.body.approvalStatus,  
        "userid":req.body.userid,  
        "adminid":req.body.adminid,  
        //"description":"asdasd"
        "description":req.body.description,  
    }
    console.log(params)
    var options={
        'path':'/approval' 
    }
    httpUtil.post(params,options,function(result,err){
        if(err){ 
            res.send("statusCode is:"+err);  
        }else{  
            res.send(result); 
        }
    })  
} 


