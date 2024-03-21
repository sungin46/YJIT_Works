//메인 탭처리

var _vIndex = $("input[name=Business_index]").val();

$(function () {

    if (_fnToNull(_vIndex) != "") {
        if (_vIndex == "1") {
            var offset = $(".item01").eq(0).offset();
        }
        else if (_vIndex == "2") {
            var offset = $(".item02").eq(0).offset();
        }
        else if (_vIndex == "3") {
            var offset = $(".item03").eq(0).offset();
        }
        
        else if (_vIndex == "4") {
            var offset = $(".item04").eq(0).offset();
        }
        
        else if (_vIndex == "5") {
            var offset = $(".item05").eq(0).offset();
        }
        
        else if (_vIndex == "6") {
            var offset = $(".item06").eq(0).offset();
        }

        $('html, body').animate({ scrollTop: offset.top - 30 }, 1);
	}

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