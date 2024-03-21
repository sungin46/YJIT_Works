(function (window, $) {
	var PrimeHeaderNav = null;
	PrimeHeaderNav = {
		init : function(){
			var funcThis = this,
				$header = $("#header"),
				$window = $(window),
				$naviTab = $("#navi_tab"),
				$navigation = $('.navigation');
			funcThis.bind();
			
			$window.on('scroll', function() {
				if($window.scrollTop() > 0){
					$header.addClass("scroll");
					$navigation.addClass("scroll");
			 		if($('#hamberger').hasClass('show')){
						$('.nav_dim').show();
					}
			  	}else{
					$header.removeClass("scroll");
					$navigation.removeClass("scroll");
			  		$('.nav_dim').attr('style', '');
			  	}
			});

			$window.on('scroll', function () {
				if ($window.scrollTop() > 400) {
					$naviTab.show();
				}
				else {
					$naviTab.hide();
                }
            })
			
			$window.resize(function(e){
				if(matchMedia("screen and (min-width: 1025px)").matches){
					if($('#hamberger').hasClass('show')){
						funcThis.totalMenuClose();
					}
				}else{
					if($('#checkerboard').hasClass('show')){
						$('#checkerboard').removeClass("show");
						$(".menu_pop").hide();
					}
					if($('.user_link').css('display') == 'block'){
						$(".user_link").hide();
					}
				}
			});
			
			if($window.scrollTop() > 0){
				$header.addClass("scroll");
				$naviTab.addClass("scroll");

		  	}else{
				$header.removeClass("scroll");
				$naviTab.removeClass("scroll");
		  	}
		  	$header.fadeIn(100);
		},
        bind : function(){ // 이벤트 바인딩
        	var $hamberger = $('#hamberger'),
				$header = $("#header"),
				$checkerboard = $("#checkerboard"),
				funcThis = this;
				     
            // 전체메뉴버튼
			$('#hamberger, .nav_dim').on('click',function(e){
				e.preventDefault();
				if(!$hamberger.hasClass("show")){
					if (matchMedia("screen and (max-width: 1024px)").matches) { 
						$('.total_menu').show();
						$('#header .logo').css('color', '#000');
						$('body').addClass("layer_on");
						noScrollRun();
						$('body').on('scroll touchmove mousewheel', function(event) { 
							event.preventDefault();     
							event.stopPropagation();     
							return false; 
						});
					}else{
						$header.addClass("active");
						if($header.hasClass("scroll")){
							$('.nav_dim').show();
						}
					}
					$hamberger.addClass('show');
				}else{
					$hamberger.removeClass('show');
					funcThis.totalMenuClose();
					$header.removeClass("active");
					$('.nav_dim').hide();
					$('#header .logo').css('color', '#fff');
				}
			});
			
			// lnb
			$('.lnb > li').on('click',function(){
				if (matchMedia("screen and (max-width: 1024px)").matches) { 
					$(this).toggleClass("on");
					$(this).find(".sub_depth").stop().slideToggle();
				}
			});
			$(".lnb > li").on('mouseenter focusin', function(){
				if (!$checkerboard.hasClass('show')) {
					$header.addClass("active");
				}
			});
			$(".lnb").on('mouseleave focusout', function(){
				if(!$hamberger.hasClass('show')){
					$header.removeClass("active");
				}
			});
			$('#checkerboard').on('click',function(){
				var $menuPop = $(".menu_pop"),
				     $this = $(this);
				$menuPop.toggle();
				$this.toggleClass("show");
				
				$(document).mouseup(function(e){
				    if (!$menuPop.is(e.target) && $menuPop.has(e.target).length === 0 && !$this.is(e.target) && $this.has(e.target).length === 0) {
				    	$menuPop.hide();
				    	$this.removeClass("show");
				    }
				});
			});
			
			$('.user_box').on('click',function(){
				var $userLink = $(".user_link"),
				     $this = $(this);
				$userLink.toggle();
				
				$(document).mouseup(function(e){
				    if (!$this.is(e.target) && $this.has(e.target).length === 0) {
				    	$userLink.hide();
				    }
				});
			});
        },
        totalMenuClose : function(){
        	$('body').removeClass("layer_on");
			noScrollClear();
			$('body').off('scroll touchmove mousewheel');
			$('#hamberger').removeClass('show');
			$('.total_menu').attr('style', '');
			$('.total_menu .lnb > li').removeClass("on");
			$(".total_menu .sub_depth").attr('style', '');
			$("#header").removeClass("active");
			$('.nav_dim').attr('style', '');
        }
	};
	window.PrimeHeaderNav = PrimeHeaderNav;
	
	// delivery_step 각 항목의 .location 길이 통일
	var DeliveryStep = null;
	DeliveryStep = {
		init : function(){
			var funcThis = this;
			funcThis.locationH();
			$(window).resize(function(e){
				funcThis.locationH();
			});
		},
		locationH : function(){
			var $deliveryStep = $(".delivery_step"),
				 $deliveryStepItem = $(".delivery_step li");
			$deliveryStepItem.find(".location").attr("style", '');
			if (!matchMedia("screen and (max-width: 1024px)").matches) { 
				$deliveryStep.each(function(){
					var maxH = 0;
					$(this).find("li").each(function(){
						var h = $(this).find(".location").height();
						if(maxH < h){
							maxH = h;
						}
					});
					$(this).find(".location").css("height", maxH);
				});
			}
		}
	};
	window.DeliveryStep = DeliveryStep;
})(window, jQuery);	

$(function(){
	PrimeHeaderNav.init();
	
	// TOP버튼
	$('.btn_top').on("click", function() {
		$('html, body').animate({ scrollTop : 0 }, 400);
		return false;
	});
	
	// 탭
	$('.tab > li').on("click", function() {
		var $panel = $('.tab_panel .panel').eq($(this).index());
		var $navi = $('.navi_tab .navi_list').eq($(this).index());
		$('.tab > li').removeClass("on");
		$('.navi_tab .navi_list').removeClass("on");
		$(this).addClass("on");
		$navi.addClass("on");
		$('.tab_panel .panel').hide();
		$panel.show();
		
		if($('.slick-slider').length > 0) {
			$('.slick-slider').slick('setPosition');
		}
	});

	// 네비게이션 탭
	$('.navi_tab .navi_list').on("click", function () {
		var $panel = $('.tab_panel .panel').eq($(this).index());
		var $tab_li = $('.tab > li').eq($(this).index());
		var windowWidth = $(window).width();
		$('.tab > li').removeClass("on");
		$('.navi_tab .navi_list').removeClass("on");
		if (windowWidth < 1025) { // sihong - 모바일일 때 탭 포커싱 바꾸기 추가
			if ($(this).index() > 1) {
				$('.tab.mo >li').eq($(this).index()).addClass("on");
				$(this).addClass("on");
			}
			else {
				$(this).addClass("on");
				$tab_li.addClass("on");
            }
		}
		else {
			$(this).addClass("on");
			$tab_li.addClass("on");
		}
		$('.tab_panel .panel').hide();
		$panel.show();
		//$.fn.fullpage.reBuild();

		if ($('.slick-slider').length > 0) {
			$('.slick-slider').slick('setPosition');
		}
	});
	
	// 달력플러그인 Type1 - 단독
	var calDate = $(".cal_date");
	if(calDate.length > 0) {
		calDate.datetimepicker({
			timepicker:false,
			format:'Y-m-d',
			/*startDate:'2018.02.01',*/
			onSelectDate:function(dp,$input){
		        var str = $input.val();
		        var m = str.substr(0,10);
		        calDate.find(".date").val(m);
			 }
		});
	}

	var calDate2 = $(".cal_date2");
	if (calDate2.length > 0) {
		calDate2.datetimepicker({
			timepicker: false,
			format: 'Y-m-d',
			/*startDate:'2018.02.01',*/
			onSelectDate: function (dp, $input) {
				var str = $input.val();
				var m = str.substr(0, 10);
				calDate2.find(".date").val(m);
			}
		});
	}
	
	// 달력플러그인 Type2 - 시작일~종료일
	// 달력플러그인
	var sDate = $(".start_date");
	sDate.datetimepicker({
		timepicker:false,
		format:'Y-m-d',
		onShow:function( ct ){
		   this.setOptions({
		    	maxDate: eDate.find(".date").val()? eDate.find(".date").val():false
		 	});
		},
		/*startDate:'2018.02.01',*/
		onSelectDate:function(dp,$input){
	        var str = $input.val();
	        var m = str.substr(0,10);
	        sDate.find(".date").val(m);
	   }
	});
	var eDate = $(".end_date");
	eDate.datetimepicker({
		timepicker:false,
		format:'Y-m-d',
		 onShow:function( ct ){
		   this.setOptions({
		    minDate:sDate.find(".date").val()?sDate.find(".date").val():false
		   });
		 },
		/*startDate:'2018.02.01',*/
		onSelectDate:function(dp,$input){
	        var str = $input.val();
	        var m = str.substr(0,10);
	        eDate.find(".date").val(m);
	    }
	});
	
	$(document).on("click", ".plus", function () {
		$relatedInfo = $(this).parents(".row").next("tr");

		if ($relatedInfo.css("display") == "none") {
			$relatedInfo.show();
		} else {
			$relatedInfo.hide();
		}
	});
	
	// 상세검색 펼치기
	$('.btn_detail').on("click", function() {
		if($('.search_detail').length > 0) {
			$(this).toggleClass("on");
			$('.search_detail').toggle();
		}
	});
	
	// input X버튼
	$(".int_box .delete").on("click",function(){
		var intBox = $(this).closest(".int_box");
		intBox.find("input[type='text']").val('').focus();
		intBox.find(".delete").hide();
		intBox.removeClass("has_del");
		intBox.find(".input_hidden").val("");		
	});
	$(".int_box input[type='text']").bind("change keyup input", function(event) {
		var intBox = $(this).closest(".int_box");
		intBox.addClass("has_del");
		intBox.find(".delete").toggle(Boolean($(this).val()));
	});
	
	// 스크롤바 커스텀
	if($('.scrollbar').length > 0) {
		$('.scrollbar').slimScroll({
			height: '100%',
			alwaysVisible: true,
			railVisible: false,
		});
	}
	if ($('.scrollbar_bkfile').length > 0) {
		$('.scrollbar_bkfile').slimScroll({
			height: '72px',
			width: '100%',
			alwaysVisible: false,
			railVisible: false,
        })
	}
	if ($('.scrollbar_filelist').length > 0) {
		$('.scrollbar_filelist').slimScroll({
			height: '100px',
			width: '100%',
			alwaysVisible: false,
			railVisible: false,
        })
    }

	// 소개영상 레이어 팝업 키고 끄기
	$(".youtube_a").on("click", function () {
		$('#youtube_layer').show();
	})

	$(".layer_zone3").on("click", function () {
		$('#youtube_layer').hide();
	})

	//google recaptcha 렌더링
	//var onloadCallback = function () {
	//	grecapcha.render('#recaptcha', {
	//		'': ''
	//	});
    //}

});


function increase(obj){
	var num = 0;
	var $input = $(obj).siblings(".int");
	if($input.val() != null && $input.val() != '' && $input.val() != 'undefined'){
		num = $input.val();
	}
	num = parseInt(num);
	$input.val(++num);
}
function decrease(obj){
	var num = 0;
	var $input = $(obj).siblings(".int");
	if($input.val() == null || $input.val() == '' || $input.val() == 'undefined'){
		return false;
	}else{
		num = $input.val();
	}
	num = parseInt(num);
	if(num > 1){
		$input.val(--num);
	}else{
		$input.val('');
	}
}

function selectPopOpen(obj){
	var $obj = $(obj),
	     $intBox = $(obj).closest(".int_box");
	    
	if($obj.css("display") == 'block'){
		$obj.hide();
	}else{
		if(matchMedia("screen and (min-width: 1025px)").matches){
			var wrapWidth = $("#wrap").outerWidth(),
			     intBoxLeft = $intBox.offset().left,
			     objWidth = $obj.outerWidth(true);
			if ((wrapWidth - intBoxLeft) < objWidth) {
				var left = (wrapWidth - intBoxLeft)-objWidth;
				$obj.css('left', left);
			}
		}else{
			$obj.attr('style', '');
		}
				
		$obj.show();
	}
	
	$(document).mouseup(function(e){
	    if (!$obj.is(e.target) &&$obj.has(e.target).length === 0 && !$intBox.is(e.target) && $intBox.has(e.target).length === 0) {
	    	$obj.hide();
	    }
	});
}
function selectPopClose(obj){
	$(obj).hide();
} 

function selectQuotePopOpen(obj) {
	var $obj = $(obj),
		$cell = $(obj).closest(".cell");

	if ($obj.css("display") == 'block') {
		$obj.hide();
	} else {
		if (matchMedia("screen and (min-width: 1025px)").matches) {
			var wrapWidth = $("#wrap").outerWidth(),
				cellLeft = $cell.offset().left,
				objWidth = $obj.outerWidth(true);
			if ((wrapWidth - cellLeft) < objWidth) {
				var left = (wrapWidth - cellLeft) - objWidth;
				$obj.css('left', left);
			}
		} else {
			$obj.attr('style', '');
		}

		$obj.show();
	}

	$(document).mouseup(function (e) {
		if (!$obj.is(e.target) && $obj.has(e.target).length === 0 && !$cell.is(e.target) && $cell.has(e.target).length === 0) {
			$obj.hide();
		}
	});
}
function selectQuotePopClose(obj) {
	$(obj).hide();
} 

$(window).resize(function() {
    if(this.resizeTO) {
        clearTimeout(this.resizeTO);
    }
    this.resizeTO = setTimeout(function() {
        $(this).trigger('resizeEnd');
    }, 0);
});
$(window).on('resizeEnd', function() {
	
});

$(window).resize(function(e){
	if($('.select_pop').css("display") == 'block'){
		$('.select_pop').attr('style', '');
		$('.select_pop').hide();
	}
});

//$(document).ready(function () {
//	$.fn.fullpage({
		
//    })
//});

/* 레이어팝업 */
var layerPopup = function(obj){
	var $laybtn = $(obj),
		$glayer_zone = $(".layer_zone");
	if($glayer_zone.length===0){return;}
	$glayer_zone.hide();
	//$("body").addClass("layer_on");   // ★본문스크롤 제거
	$laybtn.fadeIn(200);
	
	$glayer_zone.on("click",".close",function(e){
		var $this = $(this),
			t_layer = $this.parents(".layer_zone");
		//$("body").removeClass("layer_on");   // ★본문스크롤 제거
		t_layer.fadeOut(300);
	});
	$glayer_zone.on("click",function(e){
		var $this = $(this),
			$t_item = $this.find(".layer_cont");
		if($(e.target).parents(".layer_cont").length>0){
			return;
		}
		//$("body").removeClass("layer_on");  // ★본문스크롤 제거
		$this.fadeOut(300);
	});
};

/* 레이어팝업 닫기 */
var layerClose = function(obj){
	var $laybtn = $(obj);
	//$("body").removeClass("layer_on");  // ★본문스크롤 제거
	$laybtn.hide();
};

function BrowserVersionCheck() {
    var agent = navigator.userAgent.toLowerCase();
    if (agent.indexOf("kakaotalk") != -1 || agent.indexOf("iphone") != -1 || agent.indexOf("ipad") != -1 || agent.indexOf("ipod") != -1 || agent.indexOf("safari") != -1) {
    	return true;
    }else{
    	return false;
    }
}
var posY;
function noScrollRun() {
	if(BrowserVersionCheck()){
	    posY = $(window).scrollTop();
	    $('body').addClass('noscroll');
	    $("#wrap").css("top",-posY);
   }
}
function noScrollClear() {
	if(BrowserVersionCheck()){
	    $('body').removeClass('noscroll');
	    posY = $(window).scrollTop(posY);
	    $("#wrap").attr("style","");
	}
}

function showSwitchOp(obj1, obj2) {
	$(obj1).show();
	$(obj2).hide();
} 

// 메인페이지 tab_area로 자동 스크롤
function fnMovePage(vId) {

	var offset = $("#" + vId).offset();

	//클릭시 window width가 몇인지 체크
	var windowWidth = $(window).width();
	var vHeaderHeight = $("#header").height();

	if (windowWidth < 1025) {
		$('html, body').animate({ scrollTop: offset.top - vHeaderHeight }, 350);
		$('.total_menu, .dim').fadeOut(300, function () {
			$('.total_menu, .dim').attr('style', '');
		});
	}
	else {
		$('html, body').animate({ scrollTop: offset.top - 71 }, 350);
	}

}

//스케줄 조회 plus 버튼 바꾸기
$(document).on("click", ".plus", function () {

	var checkPlusBtn = $(this);

	var tr = checkPlusBtn.closest('tr');
	if (!tr.hasClass("add_minus")) {
		tr.addClass("add_minus");
	} else {
		tr.removeClass("add_minus");
	}
});
