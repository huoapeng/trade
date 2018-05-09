//个人中心搜索
$('.search a').click(function(){
	var keyword=$('.search input').val();
	/*console.log(keyword);
	var url=location.search.toString();
	url=replaceParamVal(url,'keyword',keyword)  */
	url='/p/1?keyword='+keyword;
	location = url 
})  