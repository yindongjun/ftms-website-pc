//车型角度and颜色改变
var TempArray =[];
function showOnOff(obj,showObj){
	if(obj.hasClass("hty_fuActive")){
		showObj.show();
	}else{
		showObj.hide();
	};
};
$(function(){
	var hty_ImgSrcStr=$("#hty_ImgSrc").attr("src").substring(0,$("#hty_ImgSrc").attr("src").indexOf(".")-1);
	$(".hty_cxBg a").click(function(){
		hty_ImgSrcStr=$(this).attr("data-img");
		$("#hty_ImgSrc").attr("src",hty_ImgSrcStr+$("#hty_ImgSrc").attr("data-imgColor")+".png");
		if($(this).hasClass("D0")){
			$(".hty_imgD0Box").show();
			$(".hty_imgD360Box,.hty_imgD180Box").hide();
		}else if($(this).hasClass("D360")){
			$(".hty_imgD0Box,.hty_imgD180Box").hide();
			$(".hty_imgD360Box").show();
		}else if($(this).hasClass("D180")){
			$(".hty_imgD0Box,.hty_imgD360Box").hide();
			$(".hty_imgD180Box").show();
		}
	});
	$(".colorBox li").click(function(){
		var hty_ImgSrcStr=$("#hty_ImgSrc").attr("src").substring(0,$("#hty_ImgSrc").attr("src").indexOf(".")-1);
		$(this).find("span").css("opacity","1").end().siblings().find("span").css("opacity","0");
		$(this).addClass("active").siblings().removeClass("active");
		
		//颜色改变
		$("#hty_ImgSrc").attr("src",hty_ImgSrcStr+$(this).attr("data-ImgColor")+".png").attr("data-imgColor",$(this).attr("data-ImgColor"));
	});
	//导航切换
	$(".hty_CpMenu li").click(function(){
		$(this).addClass("active").siblings().removeClass("active");
		if($(this).attr("data-index")=="0"){
			$("#hty_wzjpBox").show().siblings(".hty_shopBox").hide();
			var hty_shopBox_top=$("#hty_wzjpBox").offset().top-100;
		}else if($(this).attr("data-index")=="1"){
			$("#hty_nzjpBox").show().siblings(".hty_shopBox").hide();
			var hty_shopBox_top=$("#hty_nzjpBox").offset().top-100;
		}else if($(this).attr("data-index")=="2"){
			$("#hty_dzypBox").show().siblings(".hty_shopBox").hide();
			var hty_shopBox_top=$("#hty_dzypBox").offset().top-100;
		}else if($(this).attr("data-index")=="3"){
			$("#hty_qtypBox").show().siblings(".hty_shopBox").hide();
			var hty_shopBox_top=$("#hty_qtypBox").offset().top-100;
		}else if($(this).attr("data-index")=="4"){
			$("#hty_ylbBox").show().siblings(".hty_shopBox").hide();
			var hty_shopBox_top=$("#hty_ylbBox").offset().top;
		}
		$("html,body").stop(false,true).animate({
			"scrollTop":hty_shopBox_top
		},500);
	});
	//获取点击菜单锚点
	var locationUrl=location.href;
	locationUrl=locationUrl.substring(locationUrl.indexOf("#")+1);
	switch(locationUrl){
		case "outside":
		$(".hty_CpMenu li[data-index='0']").click();
		break;
		case "built":
		$(".hty_CpMenu li[data-index='1']").click();
		break
		case "elect":
		$(".hty_CpMenu li[data-index='2']").click();
		break;
		case "other":
		$(".hty_CpMenu li[data-index='3']").click();
		break;
	};
	//外装精品切换
	$("#hty_wzjpBox .hty_cpList .hty_cpImgBox").click(function(){
		if($(this).find(".hty_fuText").hasClass("hty_fuActive")){
			$(this).find(".hty_fuText").removeClass("hty_fuActive");
			$(".hty_money").html(Number($(".hty_money").html())-Number($(this).parent().attr("data-money")));
			//产品显示
			$(""+$(this).attr('data-show')+"").hide();
		}else{
			$(this).find(".hty_fuText").addClass("hty_fuActive");
			$(".hty_money").html(Number($(".hty_money").html())+Number($(this).parent().attr("data-money")));
			//产品显示
			$(""+$(this).attr('data-show')+"").show();
		};
		var imgName=$(this).attr("data-show");
		if(imgName.indexOf("wzjp_front")>0){
			$(".D0").click();
		}else if(imgName.indexOf("wzjp_behind")>0){
			$(".D360").click();
		}else if(imgName.indexOf("wzjp_Middle")>0){
			$(".D180").click();
		};
		test();
	});
	//内装精品点击
	$("#content").on("click","#hty_nzjpBox .hty_cpList .hty_cpImgBox,#hty_dzypBox .hty_cpList .hty_cpImgBox,#hty_qtypBox .hty_cpList .hty_cpImgBox",function(){
		if($(this).find(".hty_fuText").hasClass("hty_fuActive")){
			$(this).find(".hty_fuText").removeClass("hty_fuActive");
			$(".hty_money").html(Number($(".hty_money").html())-Number($(this).parent().attr("data-money")));
		}else{
			$(this).find(".hty_fuText").addClass("hty_fuActive");
			$(".hty_money").html(Number($(".hty_money").html())+Number($(this).parent().attr("data-money")));
		};
		test();
	});
	//查看详情
	var activeIndex=0;
	var activeParent;
	var clickOnOff=true;
	
	$("#content").on("click",".hty_cpXq",function(){
		activeIndex=$(this).parent("li").index();
		activeParent=$(this).parents(".hty_shopBox").attr("id");
		$(".hty_RgbaBg,.hty_ckxqFc").stop().fadeIn(200);
		if($(this).parent().find(".hty_fuText").hasClass("hty_fuActive")){
			clickOnOff=false;
			$(".hty_ckxqFc a:first").addClass("Off");
		}else{
			clickOnOff=true;
			$(".hty_ckxqFc a:first").removeClass("Off");
		}
		//改变图片
		$(".hty_gtCpImg img").attr("src",$(this).siblings(".hty_cpImgBox").find("img").attr("src"));
		//改变名称
		$(".hty_geName").html($(this).siblings(".hty_cpImgBox").find(".hty_fuText").html());
		//产品描述语
		$(".hty_gtCon").html($(this).parent().attr("data-con"));
		//改变价格
		$(".hty_gtImgMouey").html("￥"+$(this).parent().attr("data-money"));
		TempArray=[];
		TempArray.push({pid:alias,name:$(".hty_geName").html(),price:$(this).parent().attr("data-money"),thumb:$(".hty_gtCpImg img").attr("src")})

		var price=$(this).parent().attr("data-money");
		var name=$(this).siblings(".hty_cpImgBox").find(".hty_fuText").html();
		// $("#a").attr('href','/shop_onebest/name/'+name+'/price/'+price);
	});
	//关闭详情
	$("#content").on("click",".hty_guanbBut",function(){
		$(".hty_RgbaBg,.hty_ckxqFc").stop().fadeOut(200);
	});
	//加入预订单点击
	$(".hty_ckxqFc a:first").click(function(){
		if(clickOnOff){
			$("#"+activeParent).find("li").eq(activeIndex).find(".hty_cpImgBox").click();
			$(".hty_guanbBut").click();
		}
	});
});
//订购
function test(){
	var div = $('.hty_fuActive');
	if(div.length<=0){
		$(".hty_allDg a").addClass("btn_gray");
	}else{
		$(".hty_allDg a").removeClass("btn_gray");
	}
}
function T()
{
	
	$.ajax({
		url:'/shop_setcookie',
		type:'POST',
		dataType:"json",
		data:{data:JSON.stringify(TempArray)},
		success: function(data){
			// window.location.href='/shopbest';
            window.location.href='/shopbest/'+data.Data;
		}
	})
}
function best()
{
	var div = $('.hty_fuActive');
	if(div.length<=0){
		return false;
	}
	var arr =[]
	var data =[];
	$.each(div,function(k,v){
		var _t = $(this);
		var name = _t.html().replace(/(^\s*)|(\s*$)/g,"");
		var price = _t.data('money');
		var id = _t.data('id');
		var thumb = _t.prev().attr("src");
		arr.push({pid:alias,id:id,name:name,price:price,thumb:thumb});
	});
	$.ajax({
		url:'/shop_setcookie',
		type:'POST',
		dataType:"json",
		data:{data:JSON.stringify(arr)},
		success: function(data){
			// console.log(data)
            window.location.href='/shopbest/'+data.Data;
			// window.location.href='/shopbest';
		}
	})
}
	