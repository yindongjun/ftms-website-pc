//rem自动计算
(function(doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
		recalc = function() {
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			docEl.style.fontSize = 100 * (clientWidth / 1680) + 'px';
		};

	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);

//解决ie8不支持rem
/**
 * Module: rem - v1.3.2
 * Description: A polyfill to parse CSS links and rewrite pixel equivalents into head for non supporting browsers
 * Date Built: 2014-07-02
 * Copyright (c) 2014  | Chuck Carpenter <chuck.carpenter@me.com>,Lucas Serven <lserven@gmail.com>;
 **/
! function(e) {
	"use strict";
	var t = function() {
			var e = document.createElement("div");
			return e.style.cssText = "font-size: 1rem;", /rem/.test(e.style.fontSize)
		},
		n = function() {
			for(var e = document.getElementsByTagName("link"), t = [], n = 0; n < e.length; n++) "stylesheet" === e[n].rel.toLowerCase() && null === e[n].getAttribute("data-norem") && t.push(e[n].href);
			return t
		},
		r = function() {
			for(var e = 0; e < h.length; e++) l(h[e], o)
		},
		o = function(e, t) {
			if(p.push(e.responseText), v.push(t), v.length === h.length) {
				for(var n = 0; n < v.length; n++) a(p[n], v[n]);
				(h = m.slice(0)).length > 0 ? (v = [], p = [], m = [], r()) : i()
			}
		},
		a = function(e, t) {
			for(var n, r = d(e).replace(/\/\*[\s\S]*?\*\//g, ""), o = /[\w\d\s\-\/\\\[\]:,.'"*()<>+~%#^$_=|@]+\{[\w\d\s\-\/\\%#:!;,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!;,.'"*()]*\}/g, a = r.match(o), i = /\d*\.?\d+rem/g, s = r.match(i), c = /(.*\/)/, l = c.exec(t)[0], u = /@import (?:url\()?['"]?([^'\)"]*)['"]?\)?[^;]*/gm; null !== (n = u.exec(e));) m.push(0 === n[1].indexOf("/") ? n[1] : l + n[1]);
			null !== a && 0 !== a.length && (f = f.concat(a), g = g.concat(s))
		},
		i = function() {
			for(var e = /[\w\d\s\-\/\\%#:,.'"*()]+\d*\.?\d+rem[\w\d\s\-\/\\%#:!,.'"*()]*[;}]/g, t = 0; t < f.length; t++) {
				u += f[t].substr(0, f[t].indexOf("{") + 1);
				for(var n = f[t].match(e), r = 0; r < n.length; r++) u += n[r], r === n.length - 1 && "}" !== u[u.length - 1] && (u += "\n}")
			}
			s()
		},
		s = function() {
			for(var e = 0; e < g.length; e++) y[e] = Math.round(parseFloat(g[e].substr(0, g[e].length - 3) * w))*5 + "px";
			c()
		},
		c = function() {
			for(var e = 0; e < y.length; e++) y[e] && (u = u.replace(g[e], y[e]));
			var t = document.createElement("style");
			t.setAttribute("type", "text/css"), t.id = "remReplace", document.getElementsByTagName("head")[0].appendChild(t), t.styleSheet ? t.styleSheet.cssText = u : t.appendChild(document.createTextNode(u))
		},
		l = function(t, n) {
			try {
				var r = e.ActiveXObject ? new ActiveXObject("Microsoft.XMLHTTP") || new ActiveXObject("Msxml2.XMLHTTP") : new XMLHttpRequest;
				r.open("GET", t, !0), r.onreadystatechange = function() {
					4 === r.readyState && n(r, t)
				}, r.send(null)
			} catch(o) {
				if(e.XDomainRequest) {
					var a = new XDomainRequest;
					a.open("get", t), a.onload = function() {
						n(a, t)
					}, a.onerror = function() {
						return !1
					}, a.send()
				}
			}
		},
		d = function(t) {
			return e.matchMedia || e.msMatchMedia || (t = t.replace(/@media[\s\S]*?\}\s*\}/g, "")), t
		};
	if(!t()) {
		var u = "",
			h = n(),
			m = [],
			f = [],
			g = [],
			p = [],
			v = [],
			y = [],
			w = "";
		w = function() {
			var e, t = document,
				n = t.documentElement,
				r = t.body || t.createElement("body"),
				o = !t.body,
				a = t.createElement("div"),
				i = r.style.fontSize;
			return o && n.appendChild(r), a.style.cssText = "width:1em; position:absolute; visibility:hidden; padding: 0;", r.style.fontSize = "1em", r.appendChild(a), e = a.offsetWidth, o ? n.removeChild(r) : (r.removeChild(a), r.style.fontSize = i), e
		}(), r()
	}
}(window);