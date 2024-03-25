$(function () {

  // fullpage 사용 시
	//if (matchMedia("screen and (min-width: 1025px)").matches) {
 //       //fullpage 설정
 //       $('#fullpage').fullpage({

 //           //이동 관련
 //           anchors: ['part1', 'part2', 'part3', 'part4', 'part5', 'Welcome', 'Company', 'Business', ''],
 //           //showActiveTooltip: true,
	
 //           //스크롤 관련
 //           scrollOverflow: true
 //       });
 //       $("#fp-nav ul li:last-child").addClass("last");
 //   }
    //$('#btnTop').on('click', function () {
    //    $.fn.fullpage.moveTo(1, 1); // 이동하고싶은 페이지
    //});
    //$('#btnWelcome').on('click', function () {
    //    $.fn.fullpage.moveTo(6);
    //});

	// Welcome
	//물류서비스 버튼
	$('.wel_btn').on("click", function () {
		var $this = $(this).closest('.wel_menu').index();
		var $panel = $('.wel_slider').eq($this);

		$('.wel_menu .wel_btn').removeClass('on');
		$('.wel_slider').removeClass('on');

		$('.wel_menu').eq($this).find('.wel_btn').addClass('on');
		$panel.addClass('on');
		$('#Counceling').removeClass('on');
	});

	$('.wel_inner').on("click", function () {
		$("#Counceling").removeClass('on');
    })

	//상담신청 버튼
	$('.btn_counceling').on('click', function () {
		$('.welcome.counceling').addClass('on');
		$('.int_box').find("input[type='text']").val('');
		$('.int_box').find("input[type='tel']").val('');
		$('.welcome.counceling .int_box').find(".delete").hide();
		$('.welcome.counceling').find('.int_box').removeClass("has_del");
		fnMovePage('Counceling');
	})

	// Greeting Port 탭
	$('.port_list a').on("click", function () {
		var $panel = $('.logi_panel').eq($(this).closest('.world_nm').index());

		$('.port_list a').removeClass("on");
		$('.logi_panel').removeClass("on");
		$(this).addClass("on");
		$panel.addClass("on");
		$('#MapSelect option:eq(' + $(this).closest('.world_nm').index() + ')').attr('selected', 'selected');
	})
	$("#MapSelect").on("change", function () {
		var mapNum = $("#MapSelect option:selected").index();
		var mapPanel = $(".maps .logi_panel").eq(mapNum);

		$(".maps .logi_panel").removeClass('on');
		$('.port_list a').removeClass("on");
		mapPanel.addClass('on');
		$('.port_list a').eq(mapPanel.index()).addClass('on');
	});

	//PRIME 에서 넘어온 URL 판별하여 웰컴매니저로
	const urlParams = new URLSearchParams(window.location.search);

	if (urlParams.get('WelcomeMgr') == 'Y') {
		fnMovePage("Welcome");
		if (urlParams.get('Cntrtype') == 'FCL') {
			var $WelMenu = $('.wel_menu').index()+1;

			$('.wel_menu .wel_btn').removeClass('on');
			$('.wel_slider').removeClass('on');

			$('.wel_menu').eq($WelMenu).find('.wel_btn').addClass('on');
			$('#WelcomeMgr').find('.wel_slider:nth-child(2)').addClass('on');
        }
		else if (urlParams.get('Cntrtype') == 'AIR') {
			var $WelMenu = $('.wel_menu').index()+2;

			$('.wel_menu .wel_btn').removeClass('on');
			$('.wel_slider').removeClass('on');

			$('.wel_menu').eq($WelMenu).find('.wel_btn').addClass('on');
			$('#WelcomeMgr').find('.wel_slider:nth-child(3)').addClass('on');
        }
		else if (urlParams.get('Cntrtype') == 'BULK') {
			var $WelMenu = $('.wel_menu').index()+3;

			$('.wel_menu .wel_btn').removeClass('on');
			$('.wel_slider').removeClass('on');

			$('.wel_menu').eq($WelMenu).find('.wel_btn').addClass('on');
			$('#WelcomeMgr').find('.wel_slider:nth-child(4)').addClass('on');
        }
		else if (urlParams.get('Cntrtype') == 'IMPORT') {
			var $WelMenu = $('.wel_menu').index()+4;

			$('.wel_menu .wel_btn').removeClass('on');
			$('.wel_slider').removeClass('on');

			$('.wel_menu').eq($WelMenu).find('.wel_btn').addClass('on');
			$('#WelcomeMgr').find('.wel_slider:nth-child(5)').addClass('on');
        }
		else if (urlParams.get('Cntrtype') == 'CS') {
			var $WelMenu = $('.wel_menu').index()+5;

			$('.wel_menu .wel_btn').removeClass('on');
			$('.wel_slider').removeClass('on');

			$('.wel_menu').eq($WelMenu).find('.wel_btn').addClass('on');
			$('#WelcomeMgr').find('.wel_slider:nth-child(6)').addClass('on');
        }
    }
});

// Welcome
$(document).ready(function () {
	$('.welSlider01').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		fade: true,
		adaptiveHeight: true,
		asNavFor: '.slider-nav01',
		draggable: false,
		swipe: false
	});
	$('.slider-nav01').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		vertical: true,
		focusOnSelect: true,
		asNavFor: '.welSlider01',
		centerMode: false,
		draggable: false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					vertical: false
				}
			}
		],
		swipe: false
	});

	$('.welSlider02').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		fade: true,
		adaptiveHeight: true,
		asNavFor: '.slider-nav02',
		draggable: false,
		swipe: false
	});
	$('.slider-nav02').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		vertical: true,
		focusOnSelect: true,
		asNavFor: '.welSlider02',
		centerMode: false,
		draggable: false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					vertical: false
				}
			}
		],
		swipe: false
	});

	$('.welSlider03').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		fade: true,
		adaptiveHeight: true,
		asNavFor: '.slider-nav03',
		draggable: false,
		swipe: false
	});
	$('.slider-nav03').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		vertical: true,
		focusOnSelect: true,
		asNavFor: '.welSlider03',
		centerMode: false,
		draggable: false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					vertical: false
				}
			}
		],
		swipe: false
	});

	$('.welSlider04').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		fade: true,
		adaptiveHeight: true,
		asNavFor: '.slider-nav04',
		draggable: false,
		swipe: false
	});
	$('.slider-nav04').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		vertical: true,
		focusOnSelect: true,
		asNavFor: '.welSlider04',
		centerMode: false,
		draggable: false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					vertical: false
				}
			}
		],
		swipe: false
	});

	$('.welSlider05').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		fade: true,
		adaptiveHeight: true,
		asNavFor: '.slider-nav05',
		draggable: false,
		swipe: false
	});
	$('.slider-nav05').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		vertical: true,
		focusOnSelect: true,
		asNavFor: '.welSlider05',
		centerMode: false,
		draggable: false,
		swipe: false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					vertical: false
				}
			}
		]
	});

	$('.welSlider06').slick({
		infinite: false,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		fade: true,
		adaptiveHeight: true,
		asNavFor: '.slider-nav06',
		draggable: false,
		swipe: false,
	});
	$('.slider-nav06').slick({
		infinite: false,
		slidesToShow: 3,
		slidesToScroll: 1,
		arrows: false,
		dots: false,
		swipeToSlide: false,
		vertical: true,
		focusOnSelect: true,
		asNavFor: '.welSlider06',
		centerMode: false,
		draggable: false,
		swipe: false,
		responsive: [
			{
				breakpoint: 1025,
				settings: {
					vertical: false
				}
			}
		]
	});
	$('.helpSlider').on('init reInit afterChange', function (event, slick, currentSlide, nextSlide) {
		var i = (currentSlide ? currentSlide : 0) + 1;
		$('.pagingInfo span.num').text('0' + i);
		$('.pagingInfo span.current').text('0' + slick.slideCount);
	})
	$('.helpSlider').slick({
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: true,
		dots: false,
		swipeToSlide: true,
		adaptiveHeight: false,
		draggable: true,
		autoplay: 5000
	});



	// input X버튼
	$(".int_box .delete").on("click", function () {
		var intBox = $(this).closest(".int_box");
		intBox.find("input[type='text']").val('').focus();
		intBox.find("input[type='tel']").val('').focus();
		intBox.find(".delete").hide();
		intBox.removeClass("has_del");
		intBox.find(".input_hidden").val("");
	});
	$(".int_box input[type='text'], .int_box input[type='tel']").bind("change keyup input", function (event) {
		var intBox = $(this).closest(".int_box");
		intBox.addClass("has_del");
		intBox.find(".delete").toggle(Boolean($(this).val()));
	});

});

// 스크롤 시 메뉴에 addClass on 시켜주기
$(window).on('scroll', function () {

	var pos = $(window).scrollTop();
	var pos2 = pos + 100;

	if (pos2 <= $('#Welcome').offset().top) {
		$('.lnb > li').removeClass('on');
		$('#header').removeClass('scroll');
    }
	if (pos2 > $('#Welcome').offset().top) {
		highlightLink('menu1');
		$('#header').addClass('scroll');
	}
	if (pos2 > $('#Greeting').offset().top) { highlightLink('menu2'); }
	if (pos2 > $('#Business').offset().top || pos + $(window).height() === $(document).height()) {
		highlightLink('menu3');
	}
});
function highlightLink(anchor) {
	$('.lnb > li').removeClass('on');
	$(".lnb").find('#' + anchor).closest("li").addClass('on');
}


$(document).on("keyup", "input[type=tel]", function () {
	$(this).val(
		$(this).val().replace(/[^0-9]/g, "").replace(/(^02|^0505|^1[0-9]{3}|^0[0-9]{2})([0-9]+)?([0-9]{4})$/, "$1-$2-$3").replace("--", "-"));
});

$(document).on('click', '#BtnCounceling', function () {
	fnSendMail();
	//fnMovePage('Welcome');
})

$(document).on('click', '.btn_counceling', function () {
	var name = $(this).closest('.wel_desc').find('span[name="welcomeMgr"]').text();
	var part = $(this).closest(".wel_desc").find("[name='welcomePart']").text();
	var welEmail = $(this).closest('.wel_desc').find("[name='welcomeMgrEmail']").text();

	$('#welcomeMgr').text(name);
	$('#welcomePart').text(part);
	$('#WelcomeMgrEmail').val(welEmail);
	$('#WelcomeMgrName').val(name);
})

// 페이지 이동
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

//이메일 전송
function fnSendMail() {

	//alert("준비중 입니다.");

	try {
		if (fnVali_Counceling()) {

			var objJsonData = new Object();

			var vReturnValue = "";

			objJsonData.fst_EndAddr = $("#CouncelingName").val();
			objJsonData.mail_Contact = $("#CouncelingPhone").val();
			objJsonData.mail_Email = $("#CouncelingEmail").val();
			objJsonData.welcome_Email = $("#WelcomeMgrEmail").val();
			objJsonData.welcome_Manager = $("#WelcomeMgrName").val();

			$.ajax({
				type: "POST",
				url: "/Home/fnSendEmail",
				async: true,
				dataType: "json",
				data: {"vJsonData": _fnMakeJson(objJsonData)},
				success: function (result) {
					if (result == null) {
						console.log(result);
						vReturnValue = "N";
					} else {
						if (JSON.parse(result).Result[0]["trxCode"] == "Y") {
							vReturnValue = "Y";
							//alert("상담 신청이 완료되었습니다.");
							if ($('html').attr('lang') == 'en') {
								_fnAlertMsg("Your request has been filed successfully.");
							}
							else {
								_fnAlertMsg("상담 신청이 완료되었습니다.");
                            }

							$('#Counceling').find("input[type='text']").val('').focus();
							$('#Counceling').find("input[type='tel']").val('').focus();
							$('#Counceling').find(".delete").hide();
							$('#Counceling').find(".int_box").removeClass("has_del");
							$('#Counceling').find('#CouncelingChkbox').prop("checked", false);
							$('#Counceling').removeClass('on');
							fnMovePage('Welcome');
						}
						else if (JSON.parse(result).Result[0]["trxCode"] == "N") {
							console.log(JSON.parse(result).Result[0]["trxMsg"]);
							vReturnValue = "N";
						}
						else if (JSON.parse(result).Result[0]["trxCode"] == "E") {
							console.log(JSON.parse(result).Result[0]["trxMsg"]);
							vReturnValue = "N";
						}
                    }
					//if (result != "Y") {
					//	alert("메일 전송이 실패하였습니다. \n 관리자에게 문의 하세요.");
					//	console.log(result)
					//}
					//else if (result == "Y") {
					//	alert("상담 신청이 완료되었습니다.");
					//	//fnDataInit();
					//}
				},
				error: function (xhr) {
					console.log(xhr);
					$("#ProgressBar_Loading").hide();
				}
			});
		}
	}
	catch (e) {
		console.log(e.message);
	}
}

function fnVali_Counceling(){
	if (_fnToNull($("#CouncelingName").val().replace(/-/gi, "")) == "") {
		//alert("이름 입력은 필수입니다.");
		if ($('body').hasClass('eng')) {
			_fnAlertMsg("Please enter your name.", "CouncelingName");
		} else {
			_fnAlertMsg("이름 입력은 필수입니다.", "CouncelingName");
		}
		return false;
	}
	if (_fnToNull($("#CouncelingPhone").val().replace(/-/gi, "")) == "" && _fnToNull($("#CouncelingEmail").val().replace(/-/gi, "")) == "") {
		//alert("연락처 혹은 이메일 중 하나를 입력해주세요.");
		if ($('body').hasClass('eng')) {
			_fnAlertMsg("Please enter either your contact information or e-mail address.", "CouncelingPhone");
		} else {
			_fnAlertMsg("연락처 혹은 이메일 중 하나를 입력해주세요.", "CouncelingPhone");
		}
		return false;
	}
	if ($("#CouncelingChkbox").prop("checked") != true) {
		//alert("이용약관이 체크되지 않았습니다.");
		if ($('body').hasClass('eng')) {
			_fnAlertMsg("Please check the terms and conditions.", "CouncelingChkbox");
		} else {
			_fnAlertMsg("이용약관이 체크되지 않았습니다.", "CouncelingChkbox");
		}
		return false;
	}
	return true;
}

function _fnAlertMsg(msg, id) {
	$(".alert_cont .inner").html("");
	$(".alert_cont .inner").html(msg);
	if (_fnToNull(id) != "") {
		layerPopup('#alert01', "", true, id);
	} else {
		layerPopup('#alert01', "");
	}
	$("#alert_close").focus();
}

/* 레이어팝업 */
var layerPopup = function (obj, target, bool, id) {
	var $laybtn = $(obj),
		$glayer_zone = $(".layer_zone");
	$focus = target;
	if ($glayer_zone.length === 0) { return; }
	$glayer_zone.hide();
	$("body").addClass("layer_on");
	$laybtn.fadeIn(200);

	$glayer_zone.on("click", ".close", function (e) {
		var $this = $(this),
			t_layer = $this.parents(".layer_zone");
		$("body").removeClass("layer_on");
		t_layer.fadeOut(300);
	});

	$glayer_zone.on("click", function (e) {
		if (bool != false) {
			var $this = $(this),
				$t_item = $this.find(".layer_cont");
			if (id != undefined) {
				$("#" + id).focus();
			}
			if ($(e.target).parents(".layer_cont").length > 0) {
				return;
			}
			$("body").removeClass("layer_on");
			$this.fadeOut(300);
		}
	});

};



/* Greeting - 포트 정보 팝업 띄우기 */
if (matchMedia("screen and (min-width: 1025px)").matches) {
	$('.port_nm').on('mouseenter focusin', function () {
		$(this).find('.port_detail').addClass('on');
		if ($(this).offset().left + $(this).outerWidth() > $('html').outerWidth() - 360) {
			$(this).find('.port_detail').addClass('right');
		}
	});
	$('.port_nm').on('mouseleave focusout', function () {
		$('.port_detail').removeClass('on');
		$('.port_detail').removeClass('right');
	});
}

function _fnMakeJson(data) {
	if (data != undefined) {
		var str = JSON.stringify(data);
		if (str.indexOf("[") == -1) {
			str = "[" + str + "]";
		}
		return str;
	}
}

function fnChangeManager() {
	fnMovePage('Welcome');

	var $WelMenu = $('.wel_menu').index(0);
	//var $WelSlider = $('#WelcomeMgr').find('.wel_slider').index(0);

	$('.wel_menu .wel_btn').removeClass('on');
	$('.wel_slider').removeClass('on');

	$('.wel_menu').eq($WelMenu).find('.wel_btn').addClass('on');
	$('#WelcomeMgr').find('.wel_slider:nth-child(1)').addClass('on');

}
