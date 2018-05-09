var httpUtil=require('../utils/http.js') ;
var formidable = require('formidable');
var fs = require('fs'); 
exports.uploadfile = function (req, res, next) {      
    





    var options={
        "path":"/uploadfile?type="+req.body.type+"&foldername="+(req.body.foldername ? req.body.foldername : req.session.user.id)+(req.body.thumbnail ?  "&thumbnail="+req.body.thumbnail : "")
    } 
    console.log(options)
    httpUtil.uploadfile(req,options,function(result,err){
        if(err){
            res.send("statusCode is:"+err);
        }else{
            console.log(result)  
            if(req.body.type==11){ 
              req.session.user=result['user']
            }
            res.send(result);
        } 
    })   
} 
/* 
    */ 

    /**
   var boundaryKey = Math.random().toString(16); //随机数，目的是防止上传文件中出现分隔符导致服务器无法正确识别文件起始位置
    var payload = '--' + boundaryKey + '\r\n' 
    + 'Content-Type: image/jpeg\r\n' 
    + 'Content-Disposition: form-data; name="file"; filename='+req.files.file.originalname+'\r\n'
    + 'Content-Transfer-Encoding: binary\r\n\r\n';
    console.log(payload);
    console.log(req.files.file)
    var enddata  = '\r\n--' + boundaryKey + '--';
    var options = {
        host:appConfig.config.proxy.host,
        port:appConfig.config.proxy.port,
        path: appConfig.config.proxy.path+'uploadfile?type=7&foldername=1113',
        method: 'POST',
        headers: {  
             "Content-Type": 'multipart/form-data;  boundary='+boundaryKey+'',  
             'Content-Length':Buffer.byteLength(payload)+Buffer.byteLength(enddata)+req.files.file.size, 
        }   
    }; 
    console.log(options)
    var reqHttps = http.request(options, function(resHttps) {
      console.log("statusCode: ", resHttps.statusCode);
      console.log("headers: ", resHttps.headers);
      
      resHttps.on('data', function(chunk) {
        console.log("body:"+chunk); 
      });
      resHttps.on('end', function () {  
           console.log("end")
            res.send("fail")
      }) 
    });
    
    reqHttps.write(payload); 
    var fileStream = fs.createReadStream(req.files.file.path, { bufferSize: 4 * 1024 }); 
    fileStream.pipe(reqHttps, {end: false});
    fileStream.on('end', function() {
      // mark the end of the one and only part
      console.log(11111)
      reqHttps.end(enddata);  
    });
    
    reqHttps.on('error', function(e) {
      console.error("error:"+e);
    });


    **/