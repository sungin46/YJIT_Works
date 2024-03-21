$(function () {

	if ($('#hid_Seq').val() == "1") {
		var offset = $(".greeting_cont:nth-child(3)").eq(0).offset();
		$('.greeting_box .greeting_cont:nth-child(1)').removeClass('on');
		$('.greeting_box .greeting_cont:nth-child(1) .greeting_desc').removeClass('show');
		$('.pc .greeting_desc:nth-child(1)').removeClass('show');
		$('.greeting_box').css('border-bottom-left-radius', '0px');
		$('.greeting_box').css('border-bottom-right-radius', '0px');
        $('.greeting .greeting_cont:nth-child(3)').addClass('on');
        if (matchMedia("screen and (max-width: 1024px)").matches) {
            //$('.greeting_box .greeting_cont:nth-child(3)').addClass('show');
            $('.greeting_box .greeting_cont:nth-child(3) .greeting_desc').addClass('show');
        }
        else {
            $('.pc .greeting_desc:nth-child(3)').addClass('show');
        }
        $('html, body').animate({ scrollTop: offset.top - 240 }, 1);
    }


    //$(".panel").hide();
    //if ($("#hid_Seq").val() == "3") {
    //    $(".panel").eq(2).show();
    //    $("#eq3").addClass("on");
    //    $("#eq1").removeClass("on");
    //    $("#eq2").removeClass("on");
	//
    //} else if ($("#hid_Seq").val() == "2") {
    //    $(".panel").eq(1).show();
    //    $("#eq2").addClass("on");
    //    $("#eq1").removeClass("on");
    //    $("#eq3").removeClass("on");
    //} else {
    //    $(".panel").eq(0).show();
    //}

	// 탭
	//$('.tab.spt > li').on("click", function () {
	//	var $panel = $('.tab_panel.spt .panel').eq($(this).index());
	//	$('.tab.spt > li').removeClass("on");
	//	$(this).addClass("on");
	//	$('.tab.spt > li').eq($(this).index()).addClass("on");
	//	$('.tab_panel.spt .panel').hide();
	//	$panel.show();
	//});

	$(".greeting_info").on("click", function () {
		var $panel = $('.greeting_desc.grt_pc').eq($(this).closest('.greeting_cont').index());
		var $panelMo = $('.greeting_desc').eq($(this).closest('.greeting_cont').index());
		if ($(this).closest(".greeting_cont").hasClass("on")) {
			$(".greeting_cont").removeClass("on");
			$panel.removeClass("show");
			$panelMo.removeClass("show");
			$(".greeting_box").css("border-bottom-left-radius", "4px");
			$(".greeting_box").css("border-bottom-right-radius", "4px");
		}
		else {
			if ($(".greeting_cont").hasClass("on")) {
				$(".greeting_cont").removeClass("on");
				$(".greeting_desc.grt").removeClass("show");
				$(".greeting_desc.grt_pc").removeClass("show");
				$(".greeting_box").css("border-bottom-left-radius", "4px");
				$(".greeting_box").css("border-bottom-right-radius", "4px");
				fnMovePage($(this).closest('.greeting_info').attr('id'));
			}
			$(".greeting_box").css("border-bottom-left-radius", "0");
			$(".greeting_box").css("border-bottom-right-radius", "0");
			$(this).closest(".greeting_cont").addClass("on");
			$panelMo.addClass("show");
			$panel.addClass("show");
			fnMovePage($(this).closest('.greeting_info').attr('id'));
		}
	})
});

//공지사항 클릭시 내용 show / hide 이벤트
$(document).on("click", "#notice_list .notice_tit", function () {
	var $par = $(this).closest("li");
	var inx = $par.index();
	if ($par.hasClass("on") == true) {
		$('#notice_list > li:eq(' + inx + ')').find(".notice_cont").stop().slideUp();
		$par.removeClass("on");
	} else {
		if ($('.notice_list > li').hasClass("on")) {
			$('.notice_list > li').removeClass("on");
			$('.notice_list > li').find(".notice_cont").slideUp();
		}
		$('#notice_list > li:eq(' + inx + ')').addClass("on");
		$par.find(".notice_cont").slideDown();
	}
});

$(document).on("click", "#notice_list2 .notice_tit", function () {
	var $par = $(this).closest("li");
	var inx = $par.index();
	if ($par.hasClass("on") == true) {
		$('#notice_list2 > li:eq(' + inx + ')').find(".notice_cont").stop().slideUp();
		$par.removeClass("on");
	} else {
		if ($('.notice_list > li').hasClass("on")) {
			$('.notice_list > li').removeClass("on");
			$('.notice_list > li').find(".notice_cont").slideUp();
		}
		$('#notice_list2 > li:eq(' + inx + ')').addClass("on");
		$par.find(".notice_cont").slideDown();
	}
});

// sihong 20210910 - select에 따라 map 변경
$("#MapSelect").on("change", function () {
	var mapNum = $("#MapSelect option:selected").index();
	var mapPanel = $(".map .map_panel").eq(mapNum);

	$(".map .map_panel").hide();
	mapPanel.show();

})

// sihong 20210910 - select에 따라 map 변경
$("#MapSelect2").on("change", function () {
	var mapNum = $("#MapSelect2 option:selected").index();
	var mapPanel = $(".grt_pc .map .map_panel").eq(mapNum);

	$(".map .map_panel").hide();
	mapPanel.show();

})
