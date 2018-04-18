var domain = document.domain;
if(domain.indexOf("ewan.cn") > -1) {
	window._pt_lt = new Date().getTime();
	window._pt_sp_2 = [];
	_pt_sp_2.push('setAccount,6b7c2677');
	var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	(function() {
		var atag = document.createElement('script');
		atag.type = 'text/javascript';
		atag.async = true;
		atag.src = _protocol + 'js.ptengine.cn/6b7c2677.js';
		atag.setAttribute("class", "tool_");
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(atag, s);
	})();
} else if(domain.indexOf("nnsms.net") > -1) {
	window._pt_lt = new Date().getTime();
	window._pt_sp_2 = [];
	_pt_sp_2.push('setAccount,2fc475c4');
	var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	(function() {
		var atag = document.createElement('script');
		atag.type = 'text/javascript';
		atag.async = true;
		atag.src = _protocol + 'js.ptengine.cn/2fc475c4.js';
		atag.setAttribute("class", "tool_");
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(atag, s);
	})();
} else if(domain.indexOf("kuaiyouya.com") > -1) {
	window._pt_lt = new Date().getTime();
	window._pt_sp_2 = [];
	_pt_sp_2.push('setAccount,5b904716');
	var _protocol = (("https:" == document.location.protocol) ? " https://" : " http://");
	(function() {
		var atag = document.createElement('script');
		atag.type = 'text/javascript';
		atag.async = true;
		atag.src = _protocol + 'js.ptengine.cn/5b904716.js';
		atag.setAttribute("class", "tool_");
		var s = document.getElementsByTagName('script')[0];
		s.parentNode.insertBefore(atag, s);
	})();
};

//公司信息
$(function(){
	var oldInfo = '<div class="r-info" id="ba"><p>上海益玩网络科技有限公司</p><p>沪ICP备13028075号 沪网文【2016】4214-303号</p></div><div class="r-info" id="bc"><p>芜湖易玩网络科技有限公司</p><p>皖ICP备14009428号 皖网文【 2014】1435-035号</p></div><div class="r-info" id="bd"><p>芜湖快游网络科技有限公司</p><p>皖ICP备16003029号-1 皖网文【 2016】3222-044号</p></div>';
	//新公司地址
	var newInfo = '<div class="r-info" id="be"><p>上海石榴网络科技有限公司</p><p>沪ICP备16047396号-1 沪网文【2017】1743-062号</p></div><div class="r-info" id="bf"><p>广州畅玩网络科技有限公司</p><p>沪ICP备13028075号  粤网文【2016】0639-038号</p></div><div class="r-info" id="bg"><p>上海益玩网络科技有限公司</p><p>沪ICP备13028075号-23  沪网文【2016】4214-303号</p></div>';
	
	$(".r-info").remove();
	var imgText = $(".bg1").html();
	$(".bg1").html(oldInfo+newInfo+imgText);
	function GetRequest() {
		var url = location.search;
		var theRequest = new Object();
		if(url.indexOf("?") != -1) {
			var str = url.substr(1);
			strs = str.split("&");
			for(var i = 0; i < strs.length; i++) {
				theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
			}
		}
		return theRequest;
	}

	var Request = new Object();
	Request = GetRequest();
	var sid;
	sid = Request['sid'];
	$(".r-info").eq(parseInt(sid) - 1).show();
});










