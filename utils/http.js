var http=require('http');  
var querystring=require('querystring');
var appConfig=require('../appConfig.js');
var fs = require('fs');
exports.get=function (options,callback) {   
   	var opt = {
        host:appConfig.config.proxy.host,
        port:appConfig.config.proxy.port,
        method:'get',
        path:appConfig.config.proxy.path+options['path'], 
        headers: {  
             "Content-Type": 'application/json',  
        }  
    }     
    var body = ''; 
    var req = http.request(opt, function(res) {
       	console.log("Got response: " + res.statusCode);  
        if (res.statusCode == 200) {   
            res.on('data', function (chunk) { 
            	body += chunk;   
            })  
            res.on('end', function () {  
	             return callback(JSON.parse(body),null); 
	        })            
        } else {   
            return callback(null,res.statusCode);
        } 

         
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        return callback(null, JSON.stringify(e.message));
    })  
    req.end(); 
} 
exports.post=function (params,options,callback) {   
   	if(params){
        params = JSON.stringify(params);  
    }
   var opt = {
         host:appConfig.config.proxy.host,
         port:appConfig.config.proxy.port,
         method:'post',
         path:appConfig.config.proxy.path+options['path'],
         headers: {  
             "Content-Type": 'application/json',  
             //'Content-Length': params.length
             'Content-Length':Buffer.byteLength(params,'utf8')  
        }  
    }    
    console.log(params)
    console.log(opt)
    var body = '';
    var req = http.request(opt, function(res) {
       console.log("Got response: " + res.statusCode);
        if (res.statusCode == 200) {  
            var body = "";  
            res.on('data', function (data) { body += data; return callback(JSON.parse(body),null);})  
                              
        } else {  
            return callback(null,res.statusCode);
        }    
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        return callback(null, JSON.stringify(e.message));
    }) 
    req.write(params)
    req.end(); 
} 
exports.put=function (params,options,callback) {   
    if(params){
        params = JSON.stringify(params);  
    }
    var opt = {
         host:appConfig.config.proxy.host,
         port:appConfig.config.proxy.port,
         method:'put',
         path:appConfig.config.proxy.path+options['path'],
         headers: {  
             "Content-Type": 'application/json',  
             'Content-Length':Buffer.byteLength(params,'utf8')  
        }  
    }   
    console.log(opt) 
    var body = '';
    var req = http.request(opt, function(res) {
       console.log("Got response: " + res.statusCode);
        if (res.statusCode == 200) {  
            var body = "";  
            res.on('data', function (data) { body += data; return callback(JSON.parse(body),null);})  
                              
        } else {  
            return callback(null,res.statusCode);
        }    
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        return callback(null, JSON.stringify(e.message));
    }) 
    req.write(params)
    req.end(); 
} 
exports.delete=function (params,options,callback) {   
    if(params){
        params = JSON.stringify(params);  
    }
    var opt = {
         host:appConfig.config.proxy.host,
         port:appConfig.config.proxy.port,
         method:'delete',
         path:appConfig.config.proxy.path+options['path'],
         headers: {  
             "Content-Type": 'application/json',  
             'Content-Length': params.length
        }  
    }   
    console.log(opt) 
    var body = '';
    var req = http.request(opt, function(res) {
       console.log("Got response: " + res.statusCode);
        if (res.statusCode == 200) {  
            var body = "";  
            res.on('data', function (data) { body += data; return callback(JSON.parse(body),null);})  
                              
        } else {  
            return callback(null,res.statusCode);
        }    
    }).on('error', function(e) {
        console.log("Got error: " + e.message);
        return callback(null, JSON.stringify(e.message));
    }) 
    req.write(params)
    req.end(); 
} 
exports.uploadfile=function (req,options,callback) {   
    var boundaryKey = Math.random().toString(16); //随机数，目的是防止上传文件中出现分隔符导致服务器无法正确识别文件起始位置
    var payload = '--' + boundaryKey + '\r\n' 
    + 'Content-Type: image/jpeg\r\n' 
    + 'Content-Disposition: form-data; name="file"; filename='+req.files.file.originalname+'\r\n'
    + 'Content-Transfer-Encoding: binary\r\n\r\n'; 
    var enddata  = '\r\n--' + boundaryKey + '--';
    var opt = {
        host:appConfig.config.proxy.host,
        port:appConfig.config.proxy.port,
        path: appConfig.config.proxy.path+options['path'],
        method: 'POST',
        headers: {  
             "Content-Type": 'multipart/form-data;  boundary='+boundaryKey+'',  
             'Content-Length':Buffer.byteLength(payload)+Buffer.byteLength(enddata)+req.files.file.size, 
        }   
    };   
    console.log(opt)
    var reqHttps = http.request(opt, function(res) {
        console.log("Got response: " + res.statusCode);
        if (res.statusCode == 200) {  
            var body = "";  
            res.on('data', function (data) { body += data; return callback(JSON.parse(body),null);})  
                              
        } else {  
            return callback(null,res.statusCode);
        }    
    }); 
    reqHttps.write(payload); 
    var fileStream = fs.createReadStream(req.files.file.path, { bufferSize: 4 * 1024 }); 
    fileStream.pipe(reqHttps, {end: false});
    fileStream.on('end', function() { 
        reqHttps.end(enddata);  
    }); 
    reqHttps.on('error', function(e) {
      console.error("error:"+e);
    });
} 
/**货币单位转换
Extend the default Number object with a formatMoney() method:
 usage: someVar.formatMoney(decimalPlaces, symbol, thousandsSeparator, decimalSeparator)
 defaults: (2, "$", ",", ".")
**/
Number.prototype.formatMoney = function (places, symbol, thousand, decimal) {
    places = !isNaN(places = Math.abs(places)) ? places : 2;
    symbol = symbol !== undefined ? symbol : "";
    thousand = thousand || ",";
    decimal = decimal || ".";
    var number = this,
        negative = number < 0 ? "-" : "",
        i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
};