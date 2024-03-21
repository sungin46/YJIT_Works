$(function () {

	// 탭
	$('.tab.pt1 > li').on("click", function () {
		var $panel = $('.tab_panel.pt1 .panel').eq($(this).index());
		var $all = $('.all_tab.pt1');

		if ($all.hasClass("hide")) {
			if ($(this).hasClass("on")) {
				$all.removeClass("hide");
				$(".tab.pt1 > li").removeClass("on");
				$(".tab_panel.pt1 .panel").hide();
			}
			else {
				$('.tab.pt1 > li').removeClass("on");
				$(".tab_panel.pt1 .panel").hide();
				$(this).addClass("on");
				$panel.show();
			}
		}
		else {
			$(this).addClass("on");
			$('.tab_panel.pt1 .panel').hide();
			$all.addClass("hide");
			$panel.show();
		}
	});

	$('.tab.pt2 > li').on("click", function () {
		var $panel = $('.tab_panel.pt2 .panel').eq($(this).index());
		var $all = $('.all_tab.pt2');

		if ($all.hasClass("hide")) {
			if ($(this).hasClass("on")) {
				$all.removeClass("hide");
				$(".tab.pt2 > li").removeClass("on");
				$(".tab_panel.pt2 .panel").hide();
			}
			else {
				$('.tab.pt2 > li').removeClass("on");
				$(".tab_panel.pt2 .panel").hide();
				$(this).addClass("on");
				$panel.show();
            }
		}
		else {
			$(this).addClass("on");
			$('.tab_panel.pt2 .panel').hide();
			$all.addClass("hide");
			$panel.show();
		}
	});

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
