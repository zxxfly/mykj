var edit = getParam('edit');

// 正式环境
var basePath = "/";
var actionPath = "http://searchmanager.ewan.cn/";
var agentUrl = "http://admin.adv.ewan.cn/agent.html";

if(edit) {
	if(edit == 1)
		document.title = decodeURIComponent(getParam('aname'));

	var ver = document.getElementsByTagName('meta')['ver'];
	var verid = ver.getAttribute('content');
	ver.setAttribute('content', parseInt(verid) + 1);
	
	var css = document.createElement("link");
//	css.setAttribute("id", "css_model");
	css.setAttribute("class", "tool_");
	css.setAttribute("rel", "stylesheet");
	css.setAttribute("type", "text/css");
	css.setAttribute("href", basePath + "pages/css/model.css");
	document.head.appendChild(css);

	var js = document.createElement("script");
//	js.setAttribute("id", "js_jquery");
	js.setAttribute("class", "tool_");
	js.setAttribute("src", basePath + "pages/js/jquery.min.js");
	js.setAttribute("type", "text/javascript");
	js.setAttribute("charset", "utf-8");
	document.head.appendChild(js);

	window.onload = function() {
		var js = document.createElement("script");
//		js.setAttribute("id", "js_model");
		js.setAttribute("class", "tool_");
		js.setAttribute("src", basePath + "pages/js/model.js");
		js.setAttribute("type", "text/javascript");
		js.setAttribute("charset", "utf-8");
		document.body.appendChild(js);
	}
}

function getParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	
	var r = window.location.search.substr(1).match(reg);

	if(r != null)
		return r[2];

	return null;
}


$(".btnCmDownload").on("click",function(){
	if(mod_pv.isWx){
		down.wxTip();
	}else{
		if(mod_pv.isAndroid){
			window.location.href=mod_pv.downAnd;
		}else{
			window.location.href=mod_pv.downIos;
		}
	}
});
