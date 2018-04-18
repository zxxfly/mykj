var comObj = {
	"startTime": (new Date).getTime(),
	"u": navigator.userAgent,
	"from": document.URL.split("/")[document.URL.split("/").length - 3] + "-" + document.URL.split("/")[document.URL.split("/").length - 2],
	"getQueryString": function(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if(r != null)
			return unescape(r[2]);
		return null;
	},
	"trim": function(str) { //删除左右两端的空格
		return str.replace(/(^\s*)|(\s*$)/g, "");
	},
	/*
	 *options{
	 *	"url":请求地址
	 *	"callback":回调串
	 *	"data":{},	参数
	 *	"success":成功回调
	 *}
	 **/
	"jsonp": function(options) { //jsonp请求
		options = options || {};
		if(!options.url || !options.callback) {
			throw new Error("参数不合法");
		}

		//创建 script 标签并加入到页面中
		var callbackName = ('jsonp_' + Math.random()).replace(".", "");
		var oHead = document.getElementsByTagName('head')[0];
		options.data[options.callback] = callbackName;
		var params = comObj.formatParams(options.data);
		var oS = document.createElement('script');
		oHead.appendChild(oS);

		//创建jsonp回调函数
		window[callbackName] = function(json) {
			oHead.removeChild(oS);
			clearTimeout(oS.timer);
			window[callbackName] = null;
			options.success && options.success(json);
		};
		//发送请求
		oS.src = options.url + '?' + params;

		//超时处理
		if(options.time) {
			oS.timer = setTimeout(function() {
				window[callbackName] = null;
				oHead.removeChild(oS);
				options.fail && options.fail({
					message: "超时"
				});
			}, time);
		}
	},
	"Ajax": function(opt) {
		opt = opt || {};
		opt.method = opt.method.toUpperCase() || 'POST';
		opt.url = opt.url || '';
		opt.async = opt.async || true;
		opt.data = opt.data || null;
		opt.success = opt.success || function() {};
		var xmlHttp = null;
		if(XMLHttpRequest) {
			xmlHttp = new XMLHttpRequest();
		} else {
			xmlHttp = new ActiveXObject('Microsoft.XMLHTTP');
		}
		var params = [];
		for(var key in opt.data) {
			params.push(key + '=' + opt.data[key]);
		}
		var postData = params.join('&');
		if(opt.method.toUpperCase() === 'POST') {
			xmlHttp.open(opt.method, opt.url, opt.async);
			xmlHttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
			xmlHttp.send(postData);
		} else if(opt.method.toUpperCase() === 'GET') {
			xmlHttp.open(opt.method, opt.url + '?' + postData, opt.async);
			xmlHttp.send(null);
		}
		xmlHttp.onreadystatechange = function() {
			if(xmlHttp.readyState == 4 && xmlHttp.status == 200) {
				opt.success(xmlHttp.responseText);
			}
		};
	},
	"formatParams": function(data) { //格式化参数
		var arr = [];
		for(var name in data) {
			arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]));
		}
		return arr.join('&');
	}
}

var mod_pv = {
	"verid": (document.getElementsByTagName('meta')['ver'] || document.getElementById("version")) ? (document.getElementsByTagName('meta')['ver'] || document.getElementById("version")).getAttribute('content') : "undefined",
	"aid": (document.getElementsByTagName('meta')['aid'] || document.getElementById("aid")) ? (document.getElementsByTagName('meta')['aid'] || document.getElementById("aid")).getAttribute('content') : comObj.getQueryString("aid"),
	"pid": (document.getElementsByTagName('meta')['pid'] || document.getElementById("pid")) ? (document.getElementsByTagName('meta')['pid'] || document.getElementById("pid")).getAttribute('content') : comObj.getQueryString("pid"),
	"lid": (document.getElementsByTagName('meta')['lid'] || document.getElementById("lid")) ? (document.getElementsByTagName('meta')['lid'] || document.getElementById("lid")).getAttribute('content') : comObj.getQueryString("lid"),
	"alid": (document.getElementsByTagName('meta')['alid'] || document.getElementById("alid")) ? (document.getElementsByTagName('meta')['alid'] || document.getElementById("alid")).getAttribute('content') : comObj.getQueryString("alid"),
	"isAndroid": comObj.u.indexOf('Android') > -1 || comObj.u.indexOf('Adr') > -1,
	"isiOS": !!comObj.u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
	"isWx": comObj.u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger',
	"iosUrl": "http://113.107.101.46/download/game/hzgj_hm/hzgj_hm_1001667.apk",
	"andUrl": "http://113.107.101.46/download/game/hzgj_hm/hzgj_hm_1001667.apk",
	"iosUrlend": "http://113.107.101.46/download/game/hzgj_hm/hzgj_hm_1001667.apk",
	"andUrlend": "http://113.107.101.46/download/game/hzgj_hm/hzgj_hm_1001667.apk",
	"downIos": "http://113.107.101.46/download/game/hzgj_hm/hzgj_hm_1001667.apk",
	"downAnd": "http://113.107.101.46/download/game/hzgj_hm/hzgj_hm_1001667.apk",
	"Rltion": window.devicePixelRatio ? (window.screen.width * window.devicePixelRatio + "x" + window.screen.height * window.devicePixelRatio) : (window.screen.width + "x" + window.screen.height),
	"from": (comObj.getQueryString("sid") == null || comObj.getQueryString("sid") == undefined || comObj.getQueryString("sid") == "") ? comObj.from : comObj.from + "-" + comObj.getQueryString("sid"),
	"pving": function(times, t) {
		var url = '';
		var data = {};
		if(mod_pv.lid || mod_pv.alid) { //地址参数有带lid或alid则进入，都没带则不执行统计
			if(!mod_pv.lid && mod_pv.alid) { //如果只带有alid，则执行安卓统计
				if(times == 1) {
					url = mod_pv.andUrl
				}
				if(times == 2) {
					url = mod_pv.andUrlend
				}
				var data = {
					appid: mod_pv.aid,
					packetid: mod_pv.pid,
					verid: mod_pv.verid,
					alid: mod_pv.alid,
					Rltion: mod_pv.Rltion,
					from: mod_pv.from
				};
			} else if(mod_pv.lid && !mod_pv.alid) { //如果只带有lid，则执行IOS统计
				if(times == 1) {
					url = mod_pv.iosUrl
				}
				if(times == 2) {
					url = mod_pv.iosUrlend
				}
				var data = {
					lid: mod_pv.lid,
					verid: mod_pv.verid,
					Rltion: mod_pv.Rltion,
					from: mod_pv.from
				}
			} else if(mod_pv.lid && mod_pv.alid) { //alid和lid都带有，则判断系统，ios系统执行ios统计，其它皆执行安卓统计
				if(mod_pv.isiOS) {
					if(times == 1) {
						url = mod_pv.iosUrl
					}
					if(times == 2) {
						url = mod_pv.iosUrlend
					}
					var data = {
						lid: mod_pv.lid,
						verid: mod_pv.verid,
						Rltion: mod_pv.Rltion,
						from: mod_pv.from
					}
				} else {
					if(times == 1) {
						url = mod_pv.andUrl
					}
					if(times == 2) {
						url = mod_pv.andUrlend
					}
					var data = {
						appid: mod_pv.aid,
						packetid: mod_pv.pid,
						verid: mod_pv.verid,
						alid: mod_pv.alid,
						Rltion: mod_pv.Rltion,
						from: mod_pv.from
					};
				}
			}
			if(t) {
				data.t = t
			}
			comObj.jsonp({
				"url": url,
				"data": data,
				"callback": callback,
				"success": function() {}
			});
		}
	},
	"initDown": function() {
		if(mod_pv.lid && mod_pv.alid) {
			if(mod_pv.isiOS){
				mod_pv.downIos = mod_pv.downIos + "?flag=2&lid=" + mod_pv.lid + "&verid=" + mod_pv.verid + "&from=" + mod_pv.from;
			}else{
				mod_pv.downAnd = mod_pv.downAnd + "?aid=" + mod_pv.aid + "&pid=" + mod_pv.pid + "&verid=" + mod_pv.verid + "&alid=" + mod_pv.alid + "&from=" + mod_pv.from;
			}
		}else if(mod_pv.lid && !mod_pv.alid){
			mod_pv.downAnd = mod_pv.downIos + "?flag=2&lid=" + mod_pv.lid + "&verid=" + mod_pv.verid + "&from=" + mod_pv.from;
			mod_pv.downIos = mod_pv.downIos + "?flag=2&lid=" + mod_pv.lid + "&verid=" + mod_pv.verid + "&from=" + mod_pv.from;
		}else if(!mod_pv.lid && mod_pv.alid){
			mod_pv.downAnd = mod_pv.downAnd + "?aid=" + mod_pv.aid + "&pid=" + mod_pv.pid + "&verid=" + mod_pv.verid + "&alid=" + mod_pv.alid + "&from=" + mod_pv.from;
			mod_pv.downIos = mod_pv.downAnd + "?aid=" + mod_pv.aid + "&pid=" + mod_pv.pid + "&verid=" + mod_pv.verid + "&alid=" + mod_pv.alid + "&from=" + mod_pv.from;
		}else{
			console.log("无alid或lid参数，下载地址错误");
		}
	},
}

function callback() {}
mod_pv.pving(1);
mod_pv.initDown();