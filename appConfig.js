exports.config = {
    proxy:{
        host:"www.juxingcloud.com",
      // host:"139.196.183.6",
        port:8080,
        path:"/api/v1.0",
        replace:"http://www.juxingcloud.com:8080/api/v1.0"
    } 
};