;(function($) {
	var methods ={
		"turnPage":function(data,callback){ 
			callback
			var obj=$(this);
			obj.empty();
			var string='<ul>'; 
			if(data['pages']>0){ 
				string+='<li><i id="prev" class="icon-chevron-left"   data-pageId="'+data['prev_num']+'" ></i></li>'; 
				if(  parseInt(data['pages'])<=6){
					for(var  i=1;i<=data['pages'];i++){ 
		 	 			if(parseInt(data['page'])==i){
							string+='<li><a class="active" data-pageId="'+i+'">'+i+'</a></li>';
						}else{
							string+='<li><a class=""   data-pageId="'+i+'">'+i+'</a></li>';
						} 
		 	 		}
				}else if(    data['pages']>6){
					if( (parseInt(data['page'])-3)>1  &&      (parseInt(data['page'])+2)<data['pages']){
						string+='<li><a    data-pageId="1">1</a></li>'+
							'<li>...</li>'+
							'<li><a    data-pageId="'+(parseInt(parseInt(data['page']))-2)+'">'+(parseInt(data['page'])-2)+'</a></li>'+
							'<li><a     data-pageId="'+(parseInt(data['page'])-1)+'">'+(parseInt(data['page'])-1)+'</a></li>'+
							'<li><a class="active"   data-pageId="'+parseInt(data['page'])+'">'+parseInt(data['page'])+'</a></li>'+
							'<li><a    data-pageId="'+(parseInt(data['page'])+1)+'">'+(parseInt(data['page'])+1)+'</a></li>'+ 
							'<li>...</li>'+
							'<li><a    data-pageId="'+parseInt(data['pages'])+'">'+parseInt(data['pages'])+'</a></li>';
					}else if((parseInt(data['page'])-3)<=1 ){ 
						for(var  i=1;i<=data['page'];i++){ 
							if(parseInt(data['page'])==i){
								string+='<li><a class="active" data-pageId="'+i+'">'+i+'</a></li>';
							}else{
								string+='<li><a class=""   data-pageId="'+i+'">'+i+'</a></li>';
							} 
						}
						string+='<li><a    data-pageId="'+(parseInt(data['page'])+1)+'">'+(parseInt(data['page'])+1)+'</a></li>'+ 
							'<li>...</li>'+
							'<li><a    data-pageId="'+parseInt(data['pages'])+'">'+parseInt(data['pages'])+'</a></li>';
						 
					}else if((parseInt(data['page'])+2)>=data['pages']){
						string+='<li><a    data-pageId="1">1</a></li>'+
							'<li>...</li>'+
							'<li><a    data-pageId="'+(parseInt(parseInt(data['page']))-2)+'">'+(parseInt(data['page'])-2)+'</a></li>'+
							'<li><a     data-pageId="'+(parseInt(data['page'])-1)+'">'+(parseInt(data['page'])-1)+'</a></li>'+
							'<li><a class="active"   data-pageId="'+parseInt(data['page'])+'">'+parseInt(data['page'])+'</a></li>';
						
						for(var  i=parseInt(data['page'])+1;i<=parseInt(data['pages']);i++){ 
							string+='<li><a class=""   data-pageId="'+i+'">'+i+'</a></li>';
						} 
						
					}
				} 
				string+='<li><i id="next" class=" icon-chevron-right"  data-pageId="'+data['next_num']+'" ></i></li>';
				 
			}else{ 
			} 
			string+='</ul>'; 
			obj.append(string); 
			obj.find('a').click(callback);
			if(data['has_next']=="true"){
				console.log(data['has_next']) 
				$('#next').click(callback)  
			} else{
				$('#next').css('display',"none")
			}
			if(data['has_prev']=="true"){
				$('#prev').click(callback)	
			}else{
				$('#prev').css('display',"none")
			}
		}

	} 
	$.fn.myUtils = function (method,callback) { 
		if (methods[method]) {  
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1),Array.prototype.slice.call(arguments, 2));
		}
	} 
})(jQuery, window, document); 
//修改url参数 
function replaceParamVal(url,paramName,replaceWith) { 
   	var oUrl=url;
   	var nUrl="";
   	if(url.indexOf(paramName)>=0){
   		var re=eval('/('+ paramName+'=)([^&]*)/gi');
   		nUrl = oUrl.replace(re,paramName+'='+replaceWith);
   	}else{
   		if(url.indexOf("?")>=0){
   			nUrl = oUrl+'&'+paramName+'='+replaceWith;
   		}else{
   			nUrl = oUrl+'?'+paramName+'='+replaceWith;
   		} 
   	} 
    return nUrl
}
//去除url参数
function removeParameter(url,removeParam) { 
	var re=eval('/(^\\?|&)'+ removeParam+'=[^&]*(&)?/g');
	return url.replace(re, function(p0, p1, p2) {
        return p1 === '?' || p2 ? p1 : '';
    });  
}
//获取url参数
function getUrlParameter(name)
{
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r!=null)return  unescape(r[2]); return null;
}
