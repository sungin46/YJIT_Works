﻿$(function () {

	//$(document).ready(function () {
	//	$(".visual_slide .item:eq(0) .bg").load(function () {
	//		alert("hello");
			
	//	});
	//});

	//var $visualSlide = $('.visual_slide');
	//if ($visualSlide.length > 0) {
	//	var itemBgUrl = $(".visual_slide .item:eq(0) .bg").css('background-image').match(/^url\("?(.+?)"?\)$/)[1];
	//	$('<img>').attr('src', itemBgUrl).one('load', function () {
	//		$(".visual_slide").addClass("load");
	//		$visualSlide.on('init', function (event, slick) {

	//			var $item = $visualSlide.find(".item");
	//			var $itemActive = $visualSlide.find(".slick-active");
	//			$item.removeClass("on");
	//			$item.find(".txt01").removeClass('fadeInDown');
	//			$item.find(".txt02").removeClass('fadeInUp');
	//			$itemActive.addClass("on");
	//			$itemActive.find(".txt01").addClass('fadeInDown');
	//			$itemActive.find(".txt02").addClass('fadeInUp');


	//			$(".slick-dots").append("<button type='button' class='pause'>정지</button><button type='button' class='play'>재생</button>");

	//		});
	//		$visualSlide.slick({
	//			dots: true,
	//			infinite: true,
	//			speed: 0,
	//			fade: true,
	//			arrows: false,
	//			autoplay: true,
	//			autoplaySpeed: 4000,
	//			pauseOnHover: false
	//		});
	//		$visualSlide.on('afterChange', function (event, slick, currentSlide, nextSlide) {
	//			var $item = $visualSlide.find(".item");
	//			var $itemActive = $visualSlide.find(".slick-active");
	//			$item.removeClass("on");
	//			/*
	//			$item.find(".txt01").removeClass('fadeInDown');
	//		$item.find(".txt02").removeClass('fadeInUp');
	//		*/
	//			$itemActive.addClass("on");
	//			/*
	//			$itemActive.find(".txt01").addClass('fadeInDown');
	//			$itemActive.find(".txt02").addClass('fadeInUp');
	//			*/
	//		});
	//	});

	//	$(document).on("click", ".pause", function (event) {
	//		$visualSlide.slick('slickPause');
	//		$(this).hide();
	//		$('.play').show();
	//	});
	//	$(document).on("click", ".play", function (event) {
	//		$visualSlide.slick('slickPlay');
	//		$(this).hide();
	//		$('.pause').show();
	//	});
	//	$(document).on("click", ".slick-dots > li", function (event) {
	//		$visualSlide.slick('slickPause');
	//		var slickTimer = setTimeout(function () {
	//			$visualSlide.slick('slickPlay');
	//			clearTimeout(slickTimer);
	//		}, 1000);
	//	});

	//	if (matchMedia("screen and (max-width: 767px)").matches) { // 모바일
	//		$('#mn_info .box:eq(0)').waypoint(function () {
	//			$('#mn_info .box:eq(0)').addClass('fadeInUp');
	//		}, { offset: '100%' });
	//		$('#mn_info .box:eq(1)').waypoint(function () {
	//			$('#mn_info .box:eq(1)').addClass('fadeInUp');
	//		}, { offset: '100%' });
	//		$('#mn_info .box:eq(2)').waypoint(function () {
	//			$('#mn_info .box:eq(2)').addClass('fadeInUp');
	//		}, { offset: '100%' });
	//	} else {
	//		$('#mn_info .animate').waypoint(function () {
	//			$('#mn_info .box.type1.animate').addClass('fadeInDown');
	//			$('#mn_info .box.type2.animate').addClass('fadeInUp');
	//			$('#mn_info .pc_txt.animate').addClass('fadeIn');
	//		}, { offset: '70%' });
	//	}

	//	//Test
	//	setTimeout(function () {			
	//		$(".bg").css("opacity", "1");
	//		$(".bg").css("visibility", "visible");
	//	}, 500);
	//}

	/* twkim / 20200624 / swiper  */
	/* 1. 배경 + 세로 슬라이드 */
	//var swiper_inbox = new Swiper('#swiper-container-inbox', {
	//	direction: 'vertical',
	//	slidesPerView: 1,
	//	spaceBetween: 30,
	//	mousewheel: true,
	//	pagination: {
	//		el: '.swiper-pagination',
	//		clickable: true,
	//	},
	//});
	var swiper = new Swiper(".skyroadSwiper", {
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		autoplay: {
			delay: 4000,
			disableOnInteraction: false,
		},
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		//effect: "fade",
		//creativeEffect: {
		//	prev: {
		//		opacity:0.5,
		//		scale: 1.2,
        //    },
		//	next: {
		//		opacity:0.5,
		//		scale: 1.2,
        //    }
        //},
		centeredSlides: false,
		speed: 1000,
	});

	//if (matchMedia("screen and (min-width: 1025px)").matches) {
    //    //fullpage 설정
    //    $('#fullpage').fullpage({
	//
    //        //이동 관련
    //        anchors: ['part1', 'part2', 'part3', 'part4'],
    //        //navigation: true,
    //        //navigationTooltips: ['PRIME', 'SERVICE', 'TRACKING', 'SOLUTION', ''],
    //        showActiveTooltip: true,
    //        navigationPosition: 'right',
	//
    //        //스크롤 관련
    //        autoScrolling: true,
    //        scrollHoriaontally: true,
    //        dragAndMove: true
    //    });
    //    $("#fp-nav ul li:last-child").addClass("last");
    //}
});
