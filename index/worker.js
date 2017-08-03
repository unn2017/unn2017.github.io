(function(){
try{
function now(){
	return new Date().getTime();
}

function parseURL(url) {
	var a = document.createElement('a');
	a.href = url;
	return {
		source: url,
		protocol: a.protocol.replace(':',''),
		host: a.hostname,
		port: a.port,
		query: a.search,
		params: (function(){
			var ret = {},
				seg = a.search.replace(/^\?/,'').split('&'),
				len = seg.length, i = 0, s;
			for (;i<len;i++) {
				if (!seg[i]) { continue; }
				s = seg[i].split('=');
				ret[s[0]] = s[1];
			}
			return ret;
		})(),
		file: (a.pathname.match(/\/([^\/?#]+)$/i) || [,''])[1],
		hash: a.hash.replace('#',''),
		path: a.pathname.replace(/^([^\/])/,'/$1'),
		relative: (a.href.match(/tps?:\/\/[^\/]+(.+)/) || [,''])[1],
		segments: a.pathname.replace(/^\//,'').split('/')
	};
}



function getEngine(host) {
    if (host.indexOf('baidu.com') > -1) {
        return 'baidu';
    }else if (host.indexOf('google.com') > -1) {
        return 'google';
    }else if (host.indexOf('sogou.com') > -1) {
        return 'sogou';
    }else if (host.indexOf('soso.com') > -1) {
        return 'QQ';
    }else if (host.indexOf('bing.com') > -1) {
        return 'bing';
    }else if (host.indexOf('yahoo.com') > -1) {
        return 'yahoo';
    }else if (host.indexOf('so.com') > -1) {
        return '360';
    }else if (host.indexOf('sm.cn') > -1) {
        return 'sm';
    }else{
		return host;
	}
}


function isGBK(ie){
	if(ie == null){
		return false;
	}
	ie = ie.toLowerCase();
	return ie.indexOf('utf') == -1;
}



function getKeyWord(refer){
	if(refer == null){
		return null;
	}	
	var url = refer;
	var obj = parseURL(url);
	tj.engine = getEngine(obj.host);
	if(obj.host.indexOf('youxuan.baidu.com') >= 0){
		return getYouxuanKeyword(obj.query.split('&'));
	}
	if(!obj.params){
		return null;
	}
	tj.gbk = isGBK(obj.params.ie);
	var word = obj.params.word || obj.params.keyword || obj.params.wd || obj.params.q || obj.params.query || obj.params.p;
		switch (tj.engine) {
	    case "google":
	        word = obj.params.q;
	        break;
	    case "sogou":
	        word = obj.params.query || obj.params.keyword;
	        break;
	    case "QQ":
	        word = obj.params.query;
	        break;
	    case "bing":
	        word = obj.params.q;
	        break;
	    case "yahoo":
	        word = obj.params.p;
	        break;
	    case "360":
	        word = obj.params.q;
	        break;
	   	case "sm":
	        word = obj.params.q;
	        break;
	}

	if (obj.host == 'cpro.baidu.com') {//
		word = obj.params.ori || obj.params.k||obj.params.k0||obj.params.k1||obj.params.k2||obj.params.k3||obj.params.k4;
		tj.gbk = true;
	}	
	if(word != null && word.indexOf('%') > -1){
		try{
			return decodeURIComponent(word);		
		}catch(e){}
	}
	return word;
}



function getYouxuanKeyword(arr){
	tj.gbk = true;
	for(var i=0;i<arr.length;i++){
		if(arr[i].indexOf('p=') == 0){
			var p = unescape(arr[i].substring(2));
			var s = p.indexOf('=');
			var e = p.indexOf('&');
			return escape(p.substring(s+1,e));
		}
	}
	return null;
}


function Event (lastAction,lastPost,pushing){
	this.lastAction = lastAction;
	this.lastPost = lastPost;
	this.lastId = 0;
	this.pushing = pushing;
	this.nextAction = null;
	this.nextEvent = null;
}



Event.prototype = {
	push : function(action,e){
		if(this.lastAction == 'copy' || this.nextAction == 'copy'){
			return false;
		}
		if(this.pushing){
			this.nextAction = action;
			this.nextEvent = e;
			return true;
		}
		if(now() - this.lastPost < 5000 && this.lastId > 0 ){
			this.nextAction = action;
			this.nextEvent = e;
			this.nextPush();
			return true;
		}
		return false;
	},
	nextPush : function(){
		if(this.nextAction != null){
			var data = {ac:'update',id:this.lastId,action:this.nextAction,time:now()};
			if(this.nextEvent && this.nextEvent.type){data.event=this.nextEvent.type}
			tj.request(data,null,this);
			this.lastAction = this.nextAction;
			this.nextAction = null;
		}else{
			this.pushing = false;
		}
	}
}



function Flag (){
	this.event = new Event();	
}

Flag.prototype = {
	push : function(action,e){
		var b = this.event.push(action,e);
		if(b){
			return true;
		}
		this.event = new Event(action,now(),true);
		return false;
	}
}

var tj = {
	view : false,
	acc : false,
	engine:null,
	u : 0,
	sid : 0,
	gbk : false,
	flags : {wx:new Flag(),qq:new Flag()},
	word: null,
    rReferer: null,
	//rReferer: document.referrer,
	fullURL:null,
	clearSelection:false,
	copynum:false
};



window.goTJ = tj;

function getTarget(e){
    e = window.event || e ;
	return e.srcElement || e.target  ;
}



function getCurrentScript() {
   if (document.currentScript) {
       return document.currentScript.src;
   }
   var stack, i, node;
   var a = {};
   try {
       a.b.c();
   } catch(e) {
       stack = e.stack;
   }
   if (stack) {
       i = stack.lastIndexOf('http://');
       var a = stack.slice(i).replace(/\s\s*$/, '').replace(/(:\d+)?:\d+$/i, '');
       return a;
   }
   var scripts = document.getElementsByTagName("script");
	for (var i = scripts.length - 1; i >= 0; i--) {
		var script = scripts[i]
		if (script.readyState === "interactive") {
			return script.src;
		}
	}
	if(scripts.length > 0){
		return scripts[scripts.length-1].src;
	}
}




(function(){
var src = getCurrentScript();
if(src == null){
	throw new Error('获取不到参数!');
}
var i = src.indexOf('?');
if(i > 0){
	var s = src.substring(i+1);
	var arr = s.split('&');
	for(var a=0;a<arr.length;a++){
		var b = arr[a].split('=');
		if(b.length > 1){
			tj[b[0]] = b[1];
		}
	}
}
})();




if(!document.addEventListener){
	var addEventListener;
	if(document.attachEvent){
		addEventListener = function(evt,func){
			this.attachEvent('on'+evt,func);
		}
	}else{
		addEventListener = function(evt,func){
			this['on'+evt] = func;
		}
	}
	document.addEventListener = window.addEventListener = addEventListener;
}




tj.word = getKeyWord(document.referrer);
//tj.word = getKeyWord("http://www.sogou.com/bill_cpc?v=1&p=WJ80$xzzhG0eeUDkq$3iBNoSKoqpJo1BRytzpy1MrahZADOA8BXEPCkNr$fvDR0zm8D$Y5zL@AMGjgdTgRsjON45QHRRU7qetmMLCQ@WbNsNeGPzXJMWgdrVzJqSUOJkIzdKX3igXV3yOOCB$BWtXfHKqzJKuJ3ArLI6gJemQJj7QiAtl7JqnbIpxoBuPobuBuYp9ePgsbsdFCn3XYmevw0Jh9v30c7eyckF3pNPzQS6zjXVe7qYJ7Soj33FPSPdIRvcQlr3GOn9VleF61LGawLF6ohF8t826112yGRy1G0t12Fv1Hayxpk6UT$J93nxVxtgULpL9lsw8qwDgwZqymepxPYpPkbpwVcOkuKleBvQa$vqzpvqzJq7OyY69f1hrBalNj3tP796f1yIgAfQ6maUyAVQle1kOnauYA6m80yyY0YhHBFAipJJFUcpnZRj89yZ61VGbAfLCw$vM5ZDu4P$tS$wjgSTS04yhZjHwXbd&q=WJ8a3j6I3abvChDsadtr86@5adqa87@qBZllB@ow3l==&query=%E7%A5%9B%E7%97%98");
//tj.word = getKeyWord("http://wap.sogou.com/waprdt?query=%BB%AF%D7%B1%C6%B7%B9%FD%C3%F4%D4%F5%C3%B4%B0%EC?&clickid=170e3440afe812aab7cb289b75fd5571");



var startTime = 0;

function touchstart(e){
	startTime = now();
	

	if(tj.clearSelection){
		var target = getSpan(e);
		if(!target){
			return;
		}
		try{
			var sel = window.getSelection();
			if(sel != null){
				if(!isParent(target,sel.focusNode)){
					sel.empty();
				}
			}
		}catch(e){}
	}
}


function getSpan(e){
    var target = getTarget(e);
	while(target != document.body && target != null){
		if(target.nodeType != 3 && target.getAttribute('flag') != null){
			return target;
		}
		target = target.parentNode;
	}
	return null;
}



function isParent(p,c){
	while(c != document.body){
		if(p == c){
			return true;
		}
		c = c.parentNode;
	}
	return false;
}

function touchend(e){
    var touchTime = now() - startTime;    
	if(touchTime > 500){
	    var target = getSpan(e);
		if(!target){
			return;
		}
		startTime = touchTime;
		Add();
	}else{
		//clicked(e,'click');
	}
}

function clicked(e,act){
	var target = getSpan(e);
	if(!target){
		return;
	}
	Add();	
}

function oncopy(e) {
  var target = getSpan(e);
  if (!target) {

		return;
	}
	Add();
}


    ////保存输入信息
function Add() {

    if (!tj.word) {
        return false;
    } else if (!tj.copynum) {
        var pattern = /^[\u4e00-\u9fa5]*$/;
        if (!pattern.test(tj.word)) {
            tj.gbk = true;
           tj.rReferer = document.referrer;
        }
        //tj.rReferer = "http://wap.sogou.com/waprdt?query=%BB%AF%D7%B1%C6%B7%B9%FD%C3%F4%D4%F5%C3%B4%B0%EC?&clickid=170e3440afe812aab7cb289b75fd5571";
       
       	tj.fullURL = window.location.href;
         //alert(tj.word);
        // alert(tj.engine);
         //alert(tj.rReferer);
        // alert(tj.fullURL);
        $.ajax({
            type: "get",
            async: false,
            url: "http://122.114.175.91:5558/keyWord/AjaxJsonp?callback=?",            
            //url: "http://192.168.1.251:9002/keyWord/AjaxJsonp?callback=?",                         
            //url: "http://localhost:49713/keyWord/AjaxJsonp?callback=?",   
            
            data: {
                keyWord: tj.word,
                Engine: tj.engine,
                GBK: tj.gbk,
                rReferer: tj.rReferer,
                fullURL: tj.fullURL
            },
            dataType: "jsonp",
            jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
            success: function (json) {
                if (json.result = 1001) {
                    tj.copynum = true;
                    //alert('123');
                }
            },
            error: function () {
                alert('fail');
            }
        });

    }
}


document.addEventListener('touchstart',touchstart);
document.addEventListener('touchend',touchend);
document.addEventListener('touchcancel',touchend);//UC浏览器
document.addEventListener('mousedown',touchstart);
document.addEventListener('mouseup',touchend);
//document.addEventListener('selectstart',touchend);
document.addEventListener('copy',oncopy);


}catch(e){
	tj.reportError(e.message+e.stack);
}
})();
