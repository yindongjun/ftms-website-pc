function FTUserTracker() {}
FTUserTracker.prototype = {
	uid: null,
	host: "http://59.151.106.133:9090",
	head: document.head || document.getElementsByTagName("head")[0] || document.documentElement,
	charset: "utf-8",

	access: function () {
		_paq.push([ function() {
			var pwkid = this.getVisitorId();

			if ((pwkid == null || pwkid == "" || pwkid == undefined) && document.cookie != null && document.cookie != "") {
				var cookies = document.cookie.split(";");
				for (var i = 0; i < cookies.length; i++) {
					var kv = cookies[i].split("=");
					if (kv != null && kv.length == 2) {
						if(kv[0].indexOf('_pk_id') >= 0) {
							pwkid = kv[1].substr(0, kv[1].indexOf('.'));
							break;
						}
					}
				}
			}

			ftUserTracker.sendAccess(pwkid);
		}]);
	},

	sendAccess: function (pwkid) {
		var refer = function() {
			try {
				if (document.referrer) return document.referrer + '';
				else if (window.opener) return window.opener.location + '';
			} catch(e) {
			}
			return '';
		}();
		if (refer != null && refer.length > 150)
			refer = refer.substr(0, 150);
		var title = window.document.title || window.location + '';
		var keyword = "";
		var description = "";
		var metas = document.getElementsByTagName("meta");
		for (var i = 0; i < metas.length; i++) {
			var meta = metas[i];
			var name = meta.getAttribute("name");
			if (name == "keywords") {
				keyword = meta.getAttribute("content");
			}
			if (name == "description") {
				description = meta.getAttribute("content");
			}
		}
		//var platform = navigator.platform + '';
		//var color = (navigator.appName == "Netscape" ? color = screen.pixelDepth : color = screen.colorDepth) + '';
		var screenSize = screen.width + 'x' + screen.height;
		var language = (navigator.language ? navigator.language : navigator.browserLanguage) + '';
		var timeZone = ((new Date().getTimezoneOffset() / 60) * (-1)) + '';

		var url = this.host + "/tracker";

		var script = document.createElement("script");
		script.async = "async";
		if (this.charset) {
			script.charset = this.charset;
		}
		url = url + "?refer=" + encodeURIComponent(refer) + "&title=" + encodeURIComponent(encodeURIComponent(title)) + "&screen=" + screenSize + "&language=" + language + "&timezone=" + timeZone + "&pageurl=&keyword=&description=&pwkid=" + pwkid + "&r=" + Math.random();
		script.src = url;
		this.head.insertBefore(script, this.head.children[0]);
	},

	requestDT: function() {
		var iframe = document.createElement("iframe");
		var first = document.body.children[0];
                iframe.style.display = "none";
	//	iframe.src ="http://cmp.mct01.com/cmp.htm?media=ftms&uid=" + this.uid + "&r=http://static.mct01.com/cm.htm";
	        iframe.src="https://mapping.mct01.com/cm.htm?media=ftms&uid=" + this.uid + "&r=ftms";
              	first.parentNode.insertBefore(iframe, first);
	},

	reservationForm: function(setting) {
		var script = document.createElement("script");
		script.async = "async";
		if (this.charset) {
			script.charset = this.charset;
		}
		var url = this.host + "/reservation";
		var parameters = setting;
		url = url + "?" + parameters;
		script.src = url;
		this.head.insertBefore(script, this.head.children[0]);
	},
	clickDealer: function() {
		var refer = function() {
			try {
				if(document.referrer)
					return document.referrer + '';
				else if(window.opener)
					return window.opener.location + '';
		} catch(e) {}
			return '';
		}();
		if(refer != null && refer.length > 150) {
			refer = refer.substr(0, 150);
		}
		var sourceurl = "";
		if("" != refer) {
			var urls = refer.split("/");
			sourceurl = urls[2];
		}
		ajax({
			"type": "get",
			"url": this.host + "/clickCount?sourceUrl="+sourceurl+"&type=dealerSearch",
			"async": true,
			"success": function(res) {
				console.log("success:"+res);
			},
			"Error": function(text) {
				console.log(text);
			}
		});
//		var script = document.createElement("script");
//		script.async = "async";
//		if(this.charset) {
//			script.charset = this.charset;
//		}
//		var url = this.host + "/data-export/dealerSearchAppointCount/dealerSearchCount";
//		url = url + "?sourceUrl=" + sourceurl;
//		script.src = url;
//		this.head.insertBefore(script, this.head.children[0]);
	},
clickAppiont: function() {
		var refer = function() {
			try {
				if(document.referrer)
					return document.referrer + '';
				else if(window.opener)
					return window.opener.location + '';
			} catch(e) {}
			return '';
		}();
		if(refer != null && refer.length > 150) {
			refer = refer.substr(0, 150);
		}
		var sourceurl = "";
		if("" != refer) {
			var urls = refer.split("/");
			sourceurl = urls[2];
		}

		ajax({
			"type": "get",
			"url": this.host + "/clickCount?sourceUrl="+sourceurl+"&type=appoint",
			"async": true,
			"success": function(res) {
				console.log("success:"+res);
			},
			"Error": function(text) {
				console.log(text);
			}
		});
//		var script = document.createElement("script");
//		script.async = "async";
//		if(this.charset) {
//			script.charset = this.charset;
//		}
//		var url = this.host + "/data-export/dealerSearchAppointCount/appointCount";
//		url = url + "?sourceUrl=" + sourceurl;
//		script.src = url;
//		this.head.insertBefore(script, this.head.children[0]);
	}
}
//封装ajax
// 兼容xhr对象
function createXHR() {
	if(typeof XMLHttpRequest != "undefined") { // 非IE6浏览器
		return new XMLHttpRequest();
	} else if(typeof ActiveXObject != "undefined") { // IE6浏览器
		var version = [
			"MSXML2.XMLHttp.6.0",
			"MSXML2.XMLHttp.3.0",
			"MSXML2.XMLHttp",
		];
		for(var i = 0; i < version.length; i++) {
			try {
				return new ActiveXObject(version[i]);
			} catch(e) {
				//跳过
			}
		}
	} else {
		throw new Error("您的系统或浏览器不支持XHR对象！");
	}
}
// 封装ajax
function ajax(obj) {
	var xhr = createXHR();
	obj.url = obj.url;
//	obj.data = JSON.stringify(obj.data); // 转义字符串
//	if(obj.type === "get") { // 判断使用的是否是get方式发送
//		obj.url += obj.url.indexOf("?") == "-1" ? "?" + obj.data : "&" + obj.data;
//	}
	// 异步
	if(obj.async === true) {
		// 异步的时候需要触发onreadystatechange事件
		xhr.onreadystatechange = function() {
			// 执行完成
			if(xhr.readyState == 4) {
				callBack();
			}
		}
	}
	xhr.open(obj.type, obj.url, obj.async); // false是同步 true是异步 // "demo.php?rand="+Math.random()+"&name=ga&ga",
	if(obj.type === "post") {
		xhr.setRequestHeader("Content-Type", "application/json");
		xhr.send(obj.data);
	} else {
		xhr.send(null);
	}
	// xhr.abort(); // 取消异步请求
	// 同步
	if(obj.async === false) {
		callBack();
	}
	// 返回数据
	function callBack() {
		// 判断是否返回正确
		if(xhr.status == 200) {
			obj.success(xhr.responseText);
		} else {
			obj.Error("获取数据失败，错误代号为：" + xhr.status + "错误信息为：" + xhr.statusText);
		}
	}
}
