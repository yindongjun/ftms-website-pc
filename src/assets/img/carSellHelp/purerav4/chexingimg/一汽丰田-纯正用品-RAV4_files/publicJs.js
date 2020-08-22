if(!window.console)
    window.console = {};  
var console = window.console;

var funcs = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml',
             'error', 'exception', 'group', 'groupCollapsed', 'groupEnd',
             'info', 'log', 'markTimeline', 'profile', 'profileEnd',
             'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
for(var i=0,l=funcs.length;i<l;i++) {
    var func = funcs[i];
    if(!console[func])
        console[func] = function(){};
}
if(!console.memory)
    console.memory = {};
//百度分享
window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"16"},"share":{}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];

//页面加载动画
var loading_timeOut;
var loading_number=0;
var loading_number2=0;
var loading_bl=100/parseInt($(window).width());
var max_nuber1=Number($(window).width())*0.2;
var max_nuber2=Number($(window).width())*0.4;
var max_nuber3=Number($(window).width())*0.6;
var end_nuber=Number($(window).width())*0.88;
clearInterval(loading_timeOut);
loading_timeOut=setInterval(function(){
	if(loading_number>=max_nuber1 && loading_number<max_nuber2 && loading_number<max_nuber3){
		loading_number+=0.4;
	}else if(loading_number>=max_nuber2  && loading_number<max_nuber3){
		loading_number+=0.7;
	}else if(loading_number>=max_nuber3){
		loading_number+=0.1;
	}else{
		loading_number+=1;
	}
	loading_number2=loading_number/end_nuber*100;
	if(parseInt(loading_number2)>=100){
		loading_number2=100;
		clearInterval(loading_timeOut);
	}
	$(".loading_cx_img,.loading_nubmer").css("left",""+loading_number+"px");
	$(".loading_nubmer").html(parseInt(loading_number2)+"%");
},10)
//页面动画加载完毕
//等待页面所有文件加载完成时隐藏loding动画
$("img").ready(function() {
	//图片懒加载
	setTimeout(function(){
		$(".lazyImg").each(function(){
//			console.log($(this).attr("data-imgSrc"));
			$(this).attr("src",$(this).attr("data-imgSrc"));
		});
		$(".lazyBgImg").each(function(){
//			console.log($(this).attr("data-imgSrc"));
			$(this).css({
				"background":"url("+$(this).attr("data-imgSrc")+") center no-repeat",
				"background-size":"cover"
			});
		});
		img_loading();
	},750);

	function img_loading(){
		$(".lazyImg[src='']").each(function(){
			$(this).attr("src",$(this).attr("data-imgSrc"));
		})
	}

	clearInterval(loading_timeOut);
	loading_timeOut=setInterval(function(){
		if(loading_number >= end_nuber){
			$("#hty_loading").stop(false,true).slideUp(600);
			clearInterval(loading_timeOut);
			return false;
		}
		loading_number+=10;
		loading_number2=loading_number/end_nuber*100;
		$(".loading_cx_img,.loading_nubmer").css("left",""+loading_number+"px");
		$(".loading_nubmer").html(parseInt(loading_number2)+"%");
	},1);
    //获取点击菜单锚点
	var locationUrl = location.search.substring(6);
	switch(locationUrl) {
		case "1":
			$(".zxdt").click();
			break;
		case "2":
			$(".xwzx").click();
			break;
		case "3":
			$(".mtzx").click();
			break;
	};
	setTimeout(function(){
		var windowWidth = $(window).width();
	    var widowHeight = $(window).height();
	    var footHeight = widowHeight - $("#foot").outerHeight(true);
	    $(".DownMenu").css({
	        "width": windowWidth + "px",
	        "height": footHeight + "px"
	    });
	},3000);

    // 如果是打开 电商中心 执行函数(动态创建div 补空)
    var location_href = location.href;
    if(location_href.indexOf('shop')>0){
        try{
            setTimeout(function(){
                var div1 = $('<div>')
                    div1.addClass('div_1')
                $("body").append(div1)
                div1.css({
                    width:"1px",
                    height:4*$('.vehicle').find('li').eq(1).outerHeight(true),
                    position:'absolute',
                    left:$('.vehicle').offset().left,
                    top:$('.vehicle').offset().top,
                    backgroundColor:"#eaeaea",
                    zIndex:'10'
                })
                // #eaeaea
                var div2 = $('<div>')
                div2.addClass('div_2')
                $("body").append(div2)
                div2.css({
                    width:"1px",
                    height:3*$('.vehicle').find('li').eq(1).outerHeight(true),
                    position:'absolute',
                    left:$('.vehicle').find('li').eq(3).offset().left+$('.vehicle').find('li').eq(3).outerWidth(true),
                    top:$('.vehicle').offset().top,
                    backgroundColor:"#eaeaea",
                    zIndex:'99'
                })
                var div3 = $('<div>')
                div3.addClass('div_3')
                $("body").append(div3)
                div3.css({
                    width:'1px',
                    height:$('.vehicle').find('li').eq(9).outerHeight(true),
                    position:'absolute',
                    left:$('.vehicle').find('li').eq(9).offset().left,
                    top:$('.vehicle').offset().top+3*$('.vehicle').find('li').eq(1).outerHeight(true),
                    backgroundColor:"#eaeaea",
                    zIndex:'10'
                })

                var div4 = $('<div>')
                div4.addClass('div_4')
                $("body").append(div4)
                div4.css({
                    width:4*$('.vehicle').find('li').eq(11).outerWidth(true),
                    height:'2px',
                    position:'absolute',
                    left:$('.vehicle').offset().left,
                    top:$('.vehicle').find('li').eq(9).offset().top+$('.vehicle').find('li').eq(9).outerHeight(true),
                    backgroundColor:"#eaeaea",
                    zIndex:'-1'
                })
                var div5 = $('<div>')
                div5.addClass('div_5')
                $("body").append(div5)
                div5.css({
                    width:$('.vehicle').find('li').eq(11).outerWidth(),
                    height:'1px',
                    position:'absolute',
                    left:$('.vehicle').offset().left,
                    top:$('.vehicle').find('li').eq(12).offset().top+$('.vehicle').find('li').eq(12).outerHeight(true),
                    backgroundColor:"#eaeaea",
                    zIndex:'10'
                })
            },2000)
        }catch(e){

        }
    }
});

$(function() {
	//个人中心点击判断是否登录
	$(".grzx-url").click(function(){
		$.ajax({
			type:"post",
			url:"/shop/userstatus",
			async: true,
			success: function(res) {
				if(res.code == "200") {
					window.location.href="/Shop/PersonalIndex.html";
				}else{
					window.location.href="/Shop/signIn.html";
				}
			}
		});
	});

//	城市选择开始
	var timerTw=null;
//	$(".selCs").hover(function(){
//		$(".pinpcxSlide").hide();
//		clearTimeout(timerTw);
//		$(".auto-city").addClass("this-city");
//		$(".dorpdown").stop(false,true).slideDown(200);
//		$(".RedJtIcon").addClass("triangle");
//	},function(){
//		clearTimeout(timerTw);
//		timerTw=setTimeout(function(){
//			$(".dorpdown").stop(false,true).slideUp(200,function(){
//				$(".auto-city").removeClass("this-city");
//				$(".RedJtIcon").removeClass("triangle");
//			});
//		},300);
//	})
//	$(".dorpdown-r span,.dorpdown-r b").click(function(){
//		clearTimeout(timerTw);
//      $(".CsName").html($(this).text());
//      $(".dorpdown").stop(false,true).slideUp(200,function(){
//      	$(".auto-city").removeClass("this-city");
//      	$(".RedJtIcon").removeClass("triangle");
//      });
//  })
//	城市选择结束
    //搜索
    var secInputObj=$(".secInput");
    var NavObj=$("#Nav");
    $(".secBut").click(function(e) {
        e.stopPropagation();
        $(this).hide();
        secInputObj.fadeIn(400);
        NavObj.addClass("NavMargin");
    });
    $(".GoBut").click(function() {
        secInputObj.hide();
        $(".secBut").fadeIn(400);
        NavObj.removeClass("NavMargin");
    });
    secInputObj.click(function(e) {
        e.stopPropagation();
    });
    $(document).click(function() {
        secInputObj.hide();
        $(".secBut").fadeIn(400);
        NavObj.removeClass("NavMargin");
    });
    var pinpcxSlideObj=$(".pinpcxSlide");
    pinpcxSlideObj.on("mouseenter", ".cxContent li", function() {
        $(".linkBox", $(this)).stop(false,true).fadeIn(200);
    });
    pinpcxSlideObj.on("mouseleave", ".cxContent li", function() {
        $(".linkBox", $(this)).stop(false,true).fadeOut(200);
    });
    //品牌车型下拉
    var TimeOut;
    var TimeOut2;
    var slideMenuObj=$(".slideMenu");
    var TopJtIconObj=$(".pinpcxSlide .TopJtIcon");
    $(".pinpCxBox").hover(function() {
        clearTimeout(TimeOut);
        slideMenuObj.hide();
        $(".dorpdown").hide();
        pinpcxSlideObj.stop(false,true).slideDown(200);
//      TopJtIconObj.stop(false,true).slideDown(400);
    }, function() {
        clearTimeout(TimeOut);
//      TopJtIconObj.stop(false,true).slideUp(400);
        TimeOut = setTimeout(function() {
            pinpcxSlideObj.stop(false,true).slideUp(200);
        }, 200);
    });
    $("#Nav>li:gt(1)").hover(function() {
        pinpcxSlideObj.hide();
        clearTimeout(TimeOut2);
        $(this).siblings().find(".slideMenu").hide();
//      $(this).siblings().find(".TopJtIcon").stop(false,true).slideUp(200);
//		$(this).find(".slideMenu .TopJtIcon").stop(false,true).slideDown(400);
        $(this).find(".slideMenu").stop(false,true).slideDown(200);
    }, function() {
        $(this).siblings().find(".slideMenu").stop(false,true).slideUp(200);
//      $(this).find(".slideMenu .TopJtIcon").stop(false,true).slideUp(200);
        TimeOut2 = setTimeout(function() {
            slideMenuObj.stop(false,true).stop(false,true).slideUp(200);
        }, 200)
    });
    //悬浮菜单
    var btn_gray_length=$(".btn_gray").length;
    if(btn_gray_length>0){
    	$(".fucMenuBox li").hover(function() {
	        $(".fcShow", $(this)).stop(false,true).animate({
	            "left": "50px"
	        }, 500);
	    }, function() {
	        $(".fcShow", $(this)).stop(false,true).animate({
	            "left": "-300px"
	        }, 500);
	    }).click(function(){
	    	$(".hty_cxBg,#vehicles_show").show();
	    });

    	//电子用品
    	$(".ChaxBut").parent("li").click(function(){
	    	$(".hty_CpMenu li[data-index='0']").click()
	    })
    	$(".fenxBut").parent("li").click(function(){
	    	$(".hty_CpMenu li[data-index='1']").click()
	    })
	    $(".Top_Icon_But").parent("li").click(function(){
	    	$(".hty_CpMenu li[data-index='2']").click()
	    })
	    $(".Top_qtyp_But").parent("li").click(function(){
	    	$(".hty_CpMenu li[data-index='3']").click()
	    })
    }else{
    	$(".fucMenuBox li").hover(function() {
	        $(".fcShow", $(this)).stop(false,true).animate({
	            "right": "50px"
	        }, 500);
	    }, function() {
	        $(".fcShow", $(this)).stop(false,true).animate({
	            "right": "-300px"
	        }, 500);
	    })
    $(".shijia,.TopBut").on("click",function(){
    	$(".capital").show();
//		$('html,body').animate({scrollTop: '0px'}, 800);
//		$("body").attr("onmousewheel","return false;");
    })

    	//返回顶部
	    $(".Top_Icon_But").parent("li").click(function(){
	    	$("html,body").stop(false,true).animate({
	    		"scrollTop":"0"
	    	},250);
	    })
    }


    $(document).scroll(function(){
    	if($(document).scrollTop()>$(window).height()){
    		$(".hty_lastLi").show();
    	}else{
    		$(".hty_lastLi").hide();
    	}
    })
    $('.weix').click(function () {
        $('.wx_qrcode').fadeIn()
    });
    $('.wx_close').click(function () {
        $('.wx_qrcode').fadeOut()
    });
    $('.app').click(function () {
        $('.wx_qrcode_see').fadeIn()
    });


	//预约试驾js开始
	//浏览器检测
	var browser=navigator.appName,
	b_version=navigator.appVersion,
	version=b_version.split(";"),
	trim_Version=version[0];
	//性别选择
    $(".gender li").on("click",function(){
        $(this).addClass('xuez').siblings().removeClass('xuez');

    });

    //改变省 联动市区
  $('#province6').change(function() {
        cid = $(this).find('option:selected').val();
        $.ajax({
            type: "get",
            url: "/openapi/setClues/getCity2",
            dataType: "json",
            data: {
                'cid': cid
            },
            success: function(data) {
                CityDealer =data;
                var list='<option value="0">请选择市/区</option>';
                var jxs1='<option value="0">请选择经销商</option>';
              
                $.each(CityDealer,function(k,v){
                    list+='<option value="'+v.cid+'" data-key="'+k+'">'+v.name+'</option>';
                    // $.each(v.dealer,function(jk,jv){
                    //     // jxs+='<option value="'+jv.id+'" data-pkey="'+k+'" data-key="'+jk+'">'+jv.name+'</option>';
                    // });

                });

                $('#city6').empty().append(list);
                $('#dealer6').empty().append(jxs1);
                markerArr = CityDealer;
            
            }
        })
    });

     //改变市 联动市区
  $('#city6').change(function() {

       var cid = $(this).find('option:selected').val();
          var jxs='<option value="0">请选择经销商</option>';
        for (var i = 0;i<markerArr.length; i++) {
            if(cid == markerArr[i].cid){
                for (var j =0;j<markerArr[i].dealer.length;j++) {
                     jxs+='<option value="'+markerArr[i].dealer[j].id+'" data-pkey="" data-key="">'+markerArr[i].dealer[j].name+'</option>';
                }
                
            }
        }
        $('#dealer6').empty().append(jxs);
    });
     

     //改变车系    搜索车型
    //  $('#jibie').change(function() {
    //     cid = $(this).find('option:selected').val();
    //     var list='<option value="0">请选择车型</option>';
    //     if(cid==0){
    //         $('#models').empty().append(list);
    //     }else{

    //     $.ajax({
    //         type: "get",
    //         url: "/app/car/vehicle_level_one",
    //         dataType: "json",
    //         data: {
    //             'cid': cid
    //         },
    //         success: function(data) {
              
    //             $.each(data,function(k,v){
    //                     list+='<option value="'+v.cid+'" data-key="'+k+'">'+v.name+'</option>';
    //             });
    //             $('#models').empty().append(list);
    //             // $('#dealer').empty().append(jxs);
    //             // markerArr = CityDealer;
    //             // var k = $('#city').find('option:selected').data('key');
    //         }
    //     })

    // }


    // });









    //预约保养表单验证
    $('#capital input,#capital select').on('blur',function(){
        var ids = $(this);
        var idsval = ids.val();
        var html = ids.data('value');

        if(!idsval || idsval == 0){
            ids.addClass("red-border");
            $('.wrong-m6').html(html);
            return false;
        }else{
            ids.removeClass("red-border");
            $('.wrong-m6').html('');
        }
    });

    var _clicks = true;
    $('#but6').on('click',function(){
    	// 点击预约时加  GA 事件
    	ga('clientWtPcWap.send', 'event', 'buy', 'appointment','button', {
		  nonInteraction: true
		});

        if (trim_Version.indexOf('MSIE 8.0') >= 0){
            var curDate = new Date(),
                smtDate = parseInt($('#time6').val().substr(8));
            if (smtDate < curDate.getDate()) {
                alert('请填写一个正确的预约时间');
                return false;
            }
        };
        var Idarray = ['name6','phone6','province6','city6','dealer6','models6','time6','dels6','xuanzhong6'];
        for(var i=0;i<Idarray.length;i++)
        {
            var idObj = $('#' + Idarray[i]);
            if(Idarray[i]=="models6"){
            	var NameData = idObj.attr("data-cid");
            }else{
            	var NameData = idObj.val();
            }
            var html = idObj.data('value');
            if(!NameData || NameData == 0  ){
                idObj.addClass("red-border");
                $('.wrong-m6').html(html);
                return false;
            }else{

                switch(Idarray[i])
                {
                    case 'phone6':
//                      if (!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9])\d{8}$/i.test(NameData)) {
                        if (!/^1\d{10}$/i.test(NameData)) {
                            idObj.addClass("red-border");
                            $('.wrong-m6').html('输入的手机号不正确，请重新输入');
                            return false;
                        }
                        break;
                    case 'xuanzhong6':
                        if(!idObj.prop('checked')){
                            $('.wrong-m6').html(html);
                            return false;
                        }else{
                            $('.wrong-m6').html('');
                        }
                        break;
                    case 'time6':
                        if(NameData=='请选择预约到店时间'){
                        	$("#time6").addClass("red-border");
                            $('.wrong-m6').html(html);
                            return false;
                        }else{
                        	$("#time6").removeClass("red-border");
                            $('.wrong-m6').html('');
                        }
                        break;
                    case 'models6':
                        if(NameData=='请选择车型'){
                        	$(".ht_qxText").addClass("red-border");
                            $('.wrong-m6').html(html);
                            return false;
                        }else{
                            $('.wrong-m6').html('');
                        }
                        break;
                }

                idObj.removeClass("red-border");
                $('.wrong-m6').html('');
            }

        }
        var _qxcool = _qxcool || [];
        //    _qxcool.push(["setRequestMethod", "POST"]);
        var sex = $('.xuez').html();
        if(sex=='先生'){
            sex=1;
        }else{
            sex=2;
        }

        _qxcool = {
            "name":$('#name6').val(),//姓名
            "sex":sex,//性别
            "mobile":$('#phone6').val(),//手机号
            "provinceId":$('#province6 option:selected').val(),//省
            "cityId":$('#city6 option:selected').val(),//市/区
            "dealerCode":$('#dealer6 option:selected').val(),//经销商
            'channelKeyId':1,

            'driveTime':$('#time6').val(),//预约时间
            "leverId":$('#dels6').val(),//计划购车时间
            "clationId":$('#models6').attr("data-cid"),//车型
            "parentid":73,                //预约驾驶
            "utm_medium":  utm_medium,  //广告媒介
            "utm_content": utm_content, //浏览器设备（pc/wap）
            "utm_source":  utm_source,  //广告来源
            "utm_campaign":utm_campaign,//广告系列
            "utm_term":    utm_term     //广告位置

        };
        // qiming dmp begin
		_paq.push(['setCustomVariable', 1, 'name', $('#name').val(), 'visit']); //姓名
		_paq.push(['setCustomVariable', 2, 'sex', (sex == 1 ? '男' : '女'), 'visit']); //性别
		_paq.push(['setCustomVariable', 3, 'mobile', $('#phone').val(), 'visit']); //手机号码
		_paq.push(['setCustomVariable', 4, 'email', '', 'visit']); //电子邮箱
		_paq.push(['setCustomVariable', 5, 'province', $('#province option:selected').text(), 'visit']); //联系地址省
		_paq.push(['setCustomVariable', 6, 'city', $('#city option:selected').text(), 'visit']); //联系地址市
		_paq.push(['setCustomVariable', 7, 'address', '', 'visit']); //联系地址详细

		_paq.push(['setCustomVariable', 8, 'model', $('.duihao').attr('data-value'), 'visit']); //预约车型
		_paq.push(['setCustomVariable', 9, 'buyTime', $('#dels').val(), 'visit']); //意向购车时间
		_paq.push(['setCustomVariable', 10, '预约到店', '', 'visit']);
		_paq.push(['trackPageView']);
		ftUserTracker.reservationForm("name=" + $('#name').val() + "&sex=" + (sex == 1 ? '男' : '女') + "&mobile=" + $('#phone').val() + "&email=&province=" + $('#province option:selected').text() + "&city=" + $('#city option:selected').text() + "&address=&model=" + $('.duihao').attr('data-value') + "&buyTime=" + $('#dels').val())
		;// qiming dmp end

        // var protocolStr = document.location.protocol;
        // if(protocolStr == "http")
        // {
        //    console.log("protocol = " + protocolStr);
        // }
        // else if(protocolStr == "https")
        // {
        //    console.log("protocol = " + protocolStr);
        // }
        if(_clicks){
            _clicks = false;
            $.ajax({
                type:"POST",
                url:"/openapi/setClues/test_drive",
                data:_qxcool,

                success:function(data){
                    if(data.code == 0){
                        // 提交成功 加 GA 事件
                        ga('clientWtPcWap.send', 'event', 'buy', 'success','popup', {
                          nonInteraction: true
                        });
                        $(".capital").hide();
                        $(".wrong-m2").html("");
                        $(".mask").show();
                        $(".mask h1").html('恭喜您预约成功');
                        // $(".mask .time").html(data.info.date);
                        $(".mask .time").html(_qxcool.driveTime);
                        $(".close").click(function() {
                            $(".mask").hide();
                        })
                    }else if(data.code==-1){
                        $("#wrong6").html("请勿重复提交数据！");
                    }
                    else{
                        $(".wrong-m2").html("提交时出错1，请重试");
                    }
                    _clicks = true;
                },error:function(data){
                    $(".wrong-m6").html("提交时出错，请重试");
                    _clicks = true;
                }
            });
        }

    });;

    //隐私政策弹出
    $(".policy_but").click(function(){
        $(".Privacy_policy").stop(false,true).fadeIn(200);
    });
    $(".Close_but").click(function(){
        $(".Privacy_policy").stop(false,true).fadeOut(200);
    });
    //表单提示信息
    $(".input-tips").click(function () {
        $(this).hide().siblings().focus()
    });
    $('.date-tips').click(function () {
        $('.pika-single').css({'display':'block', 'top':'365px', 'left':'1035px'}).removeClass('is-hidden')

    });
    $('input').on('focus', function () {
        if ($(this).val() == ''){
            $(this).siblings('.input-tips').hide()
        }
    });
    $('input').on('blur', function () {
        if ($(this).val() == ''){
            $(this).siblings('.input-tips').show()
        }
    });
    $(".cap-close").on("click",function(){
    	$(".capital").hide();
//		$("body").attr("onmousewheel","");
    })
	//选择车型模拟下拉框
	$(".ht_qxText").click(function(event) {
			$(".ht_box").stop().slideToggle(250);
			event.stopPropagation(); 
	});
	$(".ht_qxSlideBox").on("click",".ht_qxSlideUl li",function(event) {
		var thisHtml=$(this).html();
		var carId=$(this).attr("value");
		$("#models6").val(thisHtml).attr("data-cid",carId);
		$(".ht_box").hide();
		event.stopPropagation(); 
	})
	$(".cap-box").click(function(event){
		$(".ht_box").hide();
	})
//预约试驾js结束
});



//菜单加载信息
loadTP = (function() {
    var devnull = function() {};
	//取得浏览器环境的baidu命名空间，非浏览器环境符合commonjs规范exports出去
    //修正在nodejs环境下，采用baidu.template变量名
    var baidu = typeof module === 'undefined' ? (window.baidu = window.baidu || {}) : module.exports;

    //模板函数（放置于baidu.template命名空间下）
    baidu.template = function(str, data){

        //检查是否有该id的元素存在，如果有元素则获取元素的innerHTML/value，否则认为字符串为模板
        var fn = (function(){

            //判断如果没有document，则为非浏览器环境
            if(!window.document){
                return bt._compile(str);
            };

            //HTML5规定ID可以由任何不包含空格字符的字符串组成
            var element = document.getElementById(str);
            if (element) {
                    
                //取到对应id的dom，缓存其编译后的HTML模板函数
                if (bt.cache[str]) {
                    return bt.cache[str];
                };

                //textarea或input则取value，其它情况取innerHTML
                var html = /^(textarea|input)$/i.test(element.nodeName) ? element.value : element.innerHTML;
                return bt._compile(html);

            }else{

                //是模板字符串，则生成一个函数
                //如果直接传入字符串作为模板，则可能变化过多，因此不考虑缓存
                return bt._compile(str);
            };

        })();

        //有数据则返回HTML字符串，没有数据则返回函数 支持data={}的情况
        var result = bt._isObject(data) ? fn( data ) : fn;
        fn = null;

        return result;
    };

    //取得命名空间 baidu.template
    var bt = baidu.template;

    //标记当前版本
    bt.versions = bt.versions || [];
    bt.versions.push('1.0.6');

    //缓存  将对应id模板生成的函数缓存下来。
    bt.cache = {};
    
    //自定义分隔符，可以含有正则中的字符，可以是HTML注释开头 <! !>
    bt.LEFT_DELIMITER = bt.LEFT_DELIMITER||'<%';
    bt.RIGHT_DELIMITER = bt.RIGHT_DELIMITER||'%>';

    //自定义默认是否转义，默认为默认自动转义
    bt.ESCAPE = true;

    //HTML转义
    bt._encodeHTML = function (source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/\\/g,'&#92;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;');
    };

    //转义影响正则的字符
    bt._encodeReg = function (source) {
        return String(source).replace(/([.*+?^=!:${}()|[\]/\\])/g,'\\$1');
    };

    //转义UI UI变量使用在HTML页面标签onclick等事件函数参数中
    bt._encodeEventHTML = function (source) {
        return String(source)
            .replace(/&/g,'&amp;')
            .replace(/</g,'&lt;')
            .replace(/>/g,'&gt;')
            .replace(/"/g,'&quot;')
            .replace(/'/g,'&#39;')
            .replace(/\\\\/g,'\\')
            .replace(/\\\//g,'\/')
            .replace(/\\n/g,'\n')
            .replace(/\\r/g,'\r');
    };

    //将字符串拼接生成函数，即编译过程(compile)
    bt._compile = function(str){
        var funBody = "var _template_fun_array=[],i_template_fun_array=[];\nvar fn=(function(__data__){\nvar _template_varName='';\nfor(name in __data__){\n_template_varName+=('var '+name+'=__data__[\"'+name+'\"];');\n};\neval(_template_varName);\n_template_fun_array.push('"+bt._analysisStr(str)+"');\n_template_varName=null;\n})(_template_object);\nfn = null;\nreturn _template_fun_array.join('');\n";
        return new Function("_template_object",funBody);
    };

    //判断是否是Object类型
    bt._isObject = function (source) {
        return 'function' === typeof source || !!(source && 'object' === typeof source);
    };

    //解析模板字符串
    bt._analysisStr = function(str){

        //取得分隔符
        var _left_ = bt.LEFT_DELIMITER;
        var _right_ = bt.RIGHT_DELIMITER;

        //对分隔符进行转义，支持正则中的元字符，可以是HTML注释 <!  !>
        var _left = bt._encodeReg(_left_);
        var _right = bt._encodeReg(_right_);

        str = String(str)
            
            //去掉分隔符中js注释
            .replace(new RegExp("("+_left+"[^"+_right+"]*)//.*\n","g"), "$1")

            //去掉注释内容  <%* 这里可以任意的注释 *%>
            //默认支持HTML注释，将HTML注释匹配掉的原因是用户有可能用 <! !>来做分割符
            .replace(new RegExp("<!--.*?-->", "g"),"")
            .replace(new RegExp(_left+"\\*.*?\\*"+_right, "g"),"")

            //把所有换行去掉  \r回车符 \t制表符 \n换行符
            .replace(new RegExp("[\\r\\t\\n]","g"), "")

            //用来处理非分隔符内部的内容中含有 斜杠 \ 单引号 ‘ ，处理办法为HTML转义
            .replace(new RegExp(_left+"(?:(?!"+_right+")[\\s\\S])*"+_right+"|((?:(?!"+_left+")[\\s\\S])+)","g"),function (item, $1) {
                var str = '';
                if($1){

                    //将 斜杠 单引 HTML转义
                    str = $1.replace(/\\/g,"&#92;").replace(/'/g,'&#39;');
                    while(/<[^<]*?&#39;[^<]*?>/g.test(str)){

                        //将标签内的单引号转义为\r  结合最后一步，替换为\'
                        str = str.replace(/(<[^<]*?)&#39;([^<]*?>)/g,'$1\r$2')
                    };
                }else{
                    str = item;
                }
                return str ;
            });


        str = str 
            //定义变量，如果没有分号，需要容错  <%var val='test'%>
            .replace(new RegExp("("+_left+"[\\s]*?var[\\s]*?.*?[\\s]*?[^;])[\\s]*?"+_right,"g"),"$1;"+_right_)

            //对变量后面的分号做容错(包括转义模式 如<%:h=value%>)  <%=value;%> 排除掉函数的情况 <%fun1();%> 排除定义变量情况  <%var val='test';%>
            .replace(new RegExp("("+_left+":?[hvu]?[\\s]*?=[\\s]*?[^;|"+_right+"]*?);[\\s]*?"+_right,"g"),"$1"+_right_)

            //按照 <% 分割为一个个数组，再用 \t 和在一起，相当于将 <% 替换为 \t
            //将模板按照<%分为一段一段的，再在每段的结尾加入 \t,即用 \t 将每个模板片段前面分隔开
            .split(_left_).join("\t");

        //支持用户配置默认是否自动转义
        if(bt.ESCAPE){
            str = str

                //找到 \t=任意一个字符%> 替换为 ‘，任意字符,'
                //即替换简单变量  \t=data%> 替换为 ',data,'
                //默认HTML转义  也支持HTML转义写法<%:h=value%>  
                .replace(new RegExp("\\t=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'");
        }else{
            str = str
                
                //默认不转义HTML转义
                .replace(new RegExp("\\t=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':$1,'");
        };

        str = str

            //支持HTML转义写法<%:h=value%>  
            .replace(new RegExp("\\t:h=(.*?)"+_right,"g"),"',typeof($1) === 'undefined'?'':baidu.template._encodeHTML($1),'")

            //支持不转义写法 <%:=value%>和<%-value%>
            .replace(new RegExp("\\t(?::=|-)(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':$1,'")

            //支持url转义 <%:u=value%>
            .replace(new RegExp("\\t:u=(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':encodeURIComponent($1),'")

            //支持UI 变量使用在HTML页面标签onclick等事件函数参数中  <%:v=value%>
            .replace(new RegExp("\\t:v=(.*?)"+_right,"g"),"',typeof($1)==='undefined'?'':baidu.template._encodeEventHTML($1),'")

            //将字符串按照 \t 分成为数组，在用'); 将其合并，即替换掉结尾的 \t 为 ');
            //在if，for等语句前面加上 '); ，形成 ');if  ');for  的形式
            .split("\t").join("');")

            //将 %> 替换为_template_fun_array.push('
            //即去掉结尾符，生成函数中的push方法
            //如：if(list.length=5){%><h2>',list[4],'</h2>');}
            //会被替换为 if(list.length=5){_template_fun_array.push('<h2>',list[4],'</h2>');}
            .split(_right_).join("_template_fun_array.push('")

            //将 \r 替换为 \
            .split("\r").join("\\'");

        return str;
    };
	function template(path, data)
	{
		var tempdata = path.data || [];
		var types = (path.type || 'json');
		switch(types)
		{
			case 'json':
				tempdata['list'] = data;
				$('.' + path.c).html(baidu.template(path.i,tempdata));
			break;

			default:
				$('.' + path.c).html(data);
			break;
		}
	}
    /**
	 * 加载单个文件。
	 * @param {string}路径,文件路径
	 * @param {Function} callbackFn——回调函数

	 */
    function loadAjax(path, callbackFn, async) {
        var returnType = 'json';
		
        var def={src:'',type:'',src:''};
        var newPath = $.extend({},def,path);
		if(newPath.type!=''){
            returnType = newPath.type;
        }
        path = newPath;
        $.ajax({
            type: "GET",
            url: path.src,
            dataType: returnType,
            success: function(data) {
				template(path,data);
                callbackFn(path.src, 's');
            },
            error: function(data) {
                callbackFn(path.src, 'e');
            }
        });
        // execute callback
    }
    /**
	 * 加载多个URL。
	 * @param { string[]}路径——文件路径
	 * @param {Function} callbackFn——回调函数

	*/
    function loadAjaxs(paths, callbackFn) {

        // listify路径
       var paths = paths.push ? paths : [paths];
        var numWaiting = paths.length,
            x = numWaiting,
            AjaxError = [],
            fn, i;
        // 定义回调函数
        fn = function(path, result) {
            // 处理错误
            if (result == 'e') AjaxError.push(path);
            numWaiting--;
            if (!numWaiting) callbackFn(AjaxError);
        };
        // load scripts
        for (i = 0; i < x; i++) loadAjax(paths[i], fn);
    }
    /**
     * Load individual file.
     * @param {string} path - The file path
     * @param {Function} callbackFn - The callback function
     */
    function loadFile(path, callbackFn, async) {
        var doc = document,
            isCss,
            e;
        if (/\.css$/.test(path)) {
            isCss = true;
            // css
            e = doc.createElement('link');
            e.rel = 'stylesheet';
            e.href = path;
        } else {
            // javascript
            e = doc.createElement('script');
            e.src = path;
            e.async = (async === undefined) ? true : async;
        }
        e.onload = e.onerror = e.onbeforeload = function(ev) {
            var result = ev.type[0];
            // Note: The following code isolates IE using `hideFocus` and treats empty
            // stylesheets as failures to get around lack of onerror support
            if (isCss && 'hideFocus' in e) {
                try {
                    if (!e.sheet.cssText.length) result = 'e';
                } catch (x) {
                    // sheets objects created from load errors don't allow access to
                    // `cssText`
                    result = 'e';
                }
            }
            // execute callback
            callbackFn(path, result, ev.defaultPrevented);
        };
        // add to document
		document.getElementsByTagName("head")[0].appendChild(e);
		//alert(document.getElementsByTagName("head")[0].innerHTML);
       // doc.head.appendChild(e);
    }
    /**
     * Load multiple files.
     * @param {string[]} paths - The file paths
     * @param {Function} callbackFn - The callback function
     */
    function loadFiles(paths, callbackFn, async) {
		
		var numWaiting=0;
		var _paths
		if(!(typeof paths=='undefined')){
			 var _paths = paths.push ? paths : [paths];
			 numWaiting = _paths.length;
		}else{
			
		}
		var paths = _paths;
        var x = numWaiting,
            pathsNotFound = [],
            fn, i;
        fn = function(path, result, defaultPrevented) {
            // handle error
            if (result == 'e') pathsNotFound.push(path);
            if (result == 'b') {
                if (defaultPrevented) pathsNotFound.push(path);
                else return;
            }
            numWaiting--;
            if (!numWaiting) callbackFn(pathsNotFound);
        };
        for (i = 0; i < x; i++) loadFile(paths[i], fn, async);
    }
    /**
     * 初始化脚本加载和注册包。
     * @param {(string|string[])}路径——文件路径
     */
    function loadTP(paths, jsPaths, callbackFn) {
        // load
        loadAjaxs(paths, function(AjaxError) {
            // 如果页面加载成功 进行加载JS
            if (AjaxError.length) {
                (callbackFn || devnull)(AjaxError);
            } 
			
			if(typeof jsPaths!=undefined){
				//加载JS
                loadFiles(jsPaths, function(pathsNotFound) {
                    if (pathsNotFound.length)(callbackFn || devnull)(pathsNotFound);
                    else(callbackFn || devnull)();
                });
			}
        });
    }
    // export
    return loadTP;
})();


//储存第三方媒体信息
var utm_medium="";
var utm_content="";
var utm_source="";
var utm_campaign="";
var utm_term="";
//进入页面储存信息
if(getQueryString("utm_medium")!=null){
	setSessionS("utm_medium",getQueryString("utm_medium"));
	setSessionS("utm_content",getQueryString("utm_content"));
	setSessionS("utm_source",getQueryString("utm_source"));
	setSessionS("utm_campaign",getQueryString("utm_campaign"));
	setSessionS("utm_term",getQueryString("utm_term"));
}
//进入页面查找是否存在信息
if(getSessionS("utm_medium")!=null){
	utm_medium=getSessionS("utm_medium");
	utm_content=getSessionS("utm_content");
	utm_source=getSessionS("utm_source");
	utm_campaign=getSessionS("utm_campaign");
	utm_term=getSessionS("utm_term");
}
function getQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = decodeURIComponent(window.location.search).substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}
function setSessionS(name, val) {
	sessionStorage.setItem(name, val);
}
//获取cook的方法
function getSessionS(name) {
	return sessionStorage.getItem(name);
}

