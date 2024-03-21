////////////////////전역 변수//////////////////////////
//alert($("input[name='date_interval']:checked").val()); 체크박스 체크
var _vPage = 0;
var _vREQ_SVC = "";
var _ObjCheck = new Object();

////////////////////jquery event///////////////////////
$(function () {	

	// 메인 > 주요 노선 운임 슬라이드
	if ($('.route_slide').length > 0) {
		$('.route_slide').slick({
			infinite: true,
			slidesToShow: 4,
			slidesToScroll: 1,
			dots: false,
			arrows: true,
			responsive: [
				{
					breakpoint: 1300,
					settings: {
						slidesToShow: 3,
					}
				},
				{
					breakpoint: 767,
					settings: {
						slidesToShow: 2,
					}
				}
			]
		});
	}

	//메인 페이지 기본 변수 세팅
	$("#input_ETD").val(new Date().getFullYear() + "-" + _pad(new Date().getMonth() + 1, 2) + "-" + _pad(new Date().getDate(), 2)); //ETD	
});

//Carr 보여주기
$(document).on("click", "#carrier_menu", function () {

	//체크해서 검색으로 가야되는지 show hide를 시켜줘야되는지 확인.
	if (fnCheckCarr()) {
		if ($(this).prop("checked") == true) {
			$(".search_detail").hide();

			if ($("input[name='vehicle']:checked").attr("id") == "vehicle01") {
				$(".search_detail").eq(0).show();
			} else {
				$(".search_detail").eq(1).show();
			}
		}
		else {
			$(".search_detail").hide();
		};
	} else {
		$(this).prop("checked", true);
		fnClick_Carr();
    }
});

//input_POL 초기화
$(document).on("keyup", "#input_Departture", function () {
	//alert(_fnToNull($(this).val()));
	if (_fnToNull($(this).val()) == "") {
		$("#input_POL").val("");
	}
});

//input_POD 초기화
$(document).on("keyup", "#input_Arrival", function () {
	if (_fnToNull($(this).val()) == "") {
		$("#input_POD").val("");
	}
});

//퀵 Code - POL
$(document).on("click", "#input_Departture", function () {
	if ($("#input_Departture").val().length == 0) {
		$("#select_pop01").hide();
		$("#select_pop02").hide();
		selectPopOpen("#select_pop01");		
	}
});

//퀵 Code - POD
$(document).on("click", "#input_Arrival", function () {
	if ($("#input_Arrival").val().length == 0) {
		$("#select_pop01").hide();
		$("#select_pop02").hide();
		selectPopOpen("#select_pop02");
	}
});

//퀵 Code 데이터 - POL
$(document).on("click", "#quick_POLCD button", function () {

	//split 해서 네이밍 , POL_CD 넣기
	var vValue = $(this).val();
	var vSplit = vValue.split(";");

	$("#input_Departture").val(vSplit[0]);
	$("#input_POL").val(vSplit[1]);
	$("#select_pop01").hide();

	//X박스 만들기
	$(this).closest(".int_box").addClass("has_del");
	$(this).closest(".int_box").find(".delete").toggle(Boolean($(this).val()));
});

//퀵 Code 데이터 - POD
$(document).on("click", "#quick_PODCD button", function () {

	//split 해서 네이밍 , POL_CD 넣기
	var vValue = $(this).val();
	var vSplit = vValue.split(";");

	$("#input_Arrival").val(vSplit[0]);
	$("#input_POD").val(vSplit[1]);
	$("#select_pop02").hide();

	//X박스 만들기
	$(this).closest(".int_box").addClass("has_del");
	$(this).closest(".int_box").find(".delete").toggle(Boolean($(this).val()));
});



//자동완성 기능 - POL
$(document).on("keyup", "#input_Departture", function () {

	//출발 도시 바로 선택 화면 가리기
	if ($(this).val().length > 0) {
		$("#select_pop01").hide();
	} else if ($(this).val().length == 0) {
		$("#select_pop01").show();
    }

	//autocomplete
	$(this).autocomplete({
		minLength: 2,
		source: function (request, response) {
			var result = fnGetPortData($("#input_Departture").val().toUpperCase());
			if (result != undefined) {
				result = JSON.parse(result).Table
				response(
					$.map(result, function (item) {
						return {
							label: item.NAME,
							value: item.NAME,
							code: item.CODE
						}
					})
				);
			}
		},
		select: function (event, ui) {
			if (ui.item.value.indexOf('데이터') == -1) {
				$("#input_Departture").val(ui.item.value);
				$("#input_POL").val(ui.item.code);
			} else {
				ui.item.value = "";
			}
		},		
	}).autocomplete("instance")._renderItem = function (ul, item) {
			return $("<li>")
				.append("<div>" + item.value + "<br>" + item.code + "</div>")
				.appendTo(ul);
		};
});

//자동완성 기능 - POD
$(document).on("keyup", "#input_Arrival", function () {

	//출발 도시 바로 선택 화면 가리기
	if ($(this).val().length > 0) {
		$("#select_pop02").hide();
	} else if ($(this).val().length == 0) {
		$("#select_pop02").show();
	}

	//autocomplete
	$(this).autocomplete({
		minLength: 2,
		source: function (request, response) {
			var result = fnGetPortData($("#input_Arrival").val().toUpperCase());
			if (result != undefined) {
				result = JSON.parse(result).Table
				response(
					$.map(result, function (item) {
						return {
							label: item.NAME,
							value: item.NAME,
							code: item.CODE
						}
					})
				);
			}
		},
		select: function (event, ui) {
			if (ui.item.value.indexOf('데이터') == -1) {
				$("#input_Arrival").val(ui.item.value);
				$("#input_POD").val(ui.item.code);
			} else {
				ui.item.value = "";
			}
		},		
	}).autocomplete("instance")._renderItem = function (ul, item) {
			return $("<li>")
				.append("<div>" + item.value + "<br>" + item.code + "</div>")
				.appendTo(ul);
		};
});

//해상 , 항공 데이터 보여주기
$(document).on("click", "input[name='vehicle']", function () {

	if ($(this).attr("id") == "vehicle01") {
		$("table[name='Main_Table_List']").eq(0).show();
		$("table[name='Main_Table_List']").eq(1).hide();
	} else if ($(this).attr("id") == "vehicle02") {
		$("table[name='Main_Table_List']").eq(0).hide();
		$("table[name='Main_Table_List']").eq(1).show();
	}

});

//포트 정보 확인 및 오토컴플리트 넣기
$(document).on("click", "#Port_Data", function () {
	fnGetPortData();	
});

//스케줄 검색
$(document).on("click", "#btn_Schdule_Search", function () {

	fnGetLinerData();
	_vPage = 0;
	fnGetScheduleData();
});

//화물진행정보 M B/L-H B/L, 화물관리번호 인풋박스 보여주기
$(document).on("click", "input[name='cargo']", function () {

	if ($(this).attr("id") == "cargo01") {
		$("div[name='Cargo_Express_Input_Box']").eq(0).show();
		$("div[name='Cargo_Express_Input_Box']").eq(1).hide();
	} else if ($(this).attr("id") == "cargo02") {
		$("div[name='Cargo_Express_Input_Box']").eq(0).hide();
		$("div[name='Cargo_Express_Input_Box']").eq(1).show();
	}

});

//수출이행내역 수출신고번호, B/L 인풋박스 보여주기
$(document).on("click", "input[name='export']", function () {

	if ($(this).attr("id") == "export01") {
		$("div[name='Export_Performance_Input_Box']").eq(0).show();
		$("div[name='Export_Performance_Input_Box']").eq(1).hide();
	} else if ($(this).attr("id") == "export02") {
		$("div[name='Export_Performance_Input_Box']").eq(0).hide();
		$("div[name='Export_Performance_Input_Box']").eq(1).show();
	}

});

//더보기 버튼 이벤트
$(document).on("click", "#Btn_ScheduleMore button", function () {
	
	if (_vREQ_SVC == "SEA") {
		fnGetScheduleData();
	}
	else if (_vREQ_SVC == "AIR") {
		alert("항공 더보기");
	}
});

//Carr - 전체선택 체크박스
$(document).on("click", "#sea_carrier_All", function () {
			
	if ($("#sea_carrier_All").is(":checked") == true) {
		$("input[name='SEA_carrier']").prop("checked", true);
	} else {
		$("input[name='SEA_carrier']").prop("checked", false);
	}

});

//Carr - 체크 클릭 시 데이터 검색
$(document).on("click", "input[name='SEA_carrier']", function () {	

	//Carr - 체크박스 관련 이벤트
	if ($("#sea_carrier_All").is(":checked") == true) {
		$("input[name='SEA_carrier']").each(function (i) {	//현재 클릭 된 것이 checked인 경우 전체 체크 삭제
			if ($(this).prop("checked") == false) {
				if ($("#sea_carrier_All").prop("checked") == true) {
					$("#sea_carrier_All").prop("checked", false);
				}
			}
		});
	}
	else if ($("#sea_carrier_All").is(":checked") == false) {

		var vCheck = true;

		$("input[name='SEA_carrier']").each(function (i) {	//현재 클릭 된 것이 checked인 경우 전체 체크 삭제
			if ($(this).prop("checked") == false) {
				if ($(this).val() != "All") {
					if ($(this).is(":checked") == false) {
						vCheck = false;
                    }
                }
			}
		});

		if (vCheck) {
			$("#sea_carrier_All").prop("checked", true);
        }
    }	

	//스케줄 검색
	if ($("#sea_carrier_All").is(":checked") == true) {
		//전체 검색으로 스케줄 다시 보여주기	
		fnGetSeachkSchedule("All");
	} else {
	
		var vChkValue = "";
	
		//체크되어있는 내용이 있는지 없는지 확인.
		$("input[name='SEA_carrier']:checked").each(function () {
			if ($(this).val() != "All") {
				if (vChkValue == "") {
					vChkValue += "'" + $(this).val() + "'";
				} else {
					vChkValue += ",'" + $(this).val() + "'";
				}
            }
		});
	
		if (_fnToNull(vChkValue) == "") {
			//$(this).prop("checked", true);
			fnMakeSEANoData();
		} else {			
			fnGetSeachkSchedule(vChkValue);
        }
	}
});
////////////////////////function///////////////////////
//port 정보 가져오는 함수
function fnGetPortData(vValue)
{
	try {
		var rtnJson;
		var objJsonData = new Object();

		if ($("input[name='vehicle']:checked").val() == "SEA") {
			objJsonData.LOC_TYPE = "S";
		} else if ($("input[name='vehicle']:checked").val() == "AIR") {
			objJsonData.LOC_TYPE = "A";
        }
		
		objJsonData.LOC_CD = vValue;

		$.ajax({
			type: "POST",
			url: "/Common/fnGetPort",
			async: false,
			dataType: "json",
			//data: callObj,
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {
				rtnJson = result;
			}, error: function (xhr, status, error) {
				$("#ProgressBar_Loading").hide(); //프로그래스 바
				alert("담당자에게 문의 하세요.");
				console.log(error);
			},
			beforeSend: function () {
				$("#ProgressBar_Loading").show(); //프로그래스 바
			},
			complete: function () {
				$("#ProgressBar_Loading").hide(); //프로그래스 바
			}
		});

		return rtnJson;
	} catch (e) {
		console.log(e.message);
	}
}

//스케줄 화면 - Carr 버튼
function fnClick_Carr()
{	
	_vPage = 0;
	$("div[name='Main_search_detail']").hide();

	fnGetLinerData();	
	//SEA 면 0 , AIR 1
	$("div[name='Main_search_detail']").eq(0).show();
	//
	fnGetScheduleData();
}

//스케줄 화면 - Search 버튼 
function fnClick_ScheduleSearch()
{
	//SEA , AIR 확인
	if ($("input[name='vehicle']:checked").val() == "SEA") {
		_vPage = 0;
		fnGetLinerData(); //Liner 데이터 가져오기
		fnGetScheduleData(); //스케줄 데이터 가져오기
	} else if ($("input[name='vehicle']:checked").val() == "AIR") {
		_vPage = 0;
		alert("항공은 준비 중 입니다.");
    }
}

//스케줄 벨리데이션
function fnVali_Schedule() {

	//ETD를 입력 해 주세요.
	if (_fnToNull($("#input_ETD").val().replace(/-/gi, "")) == "") {
		alert("POL을 입력 해 주세요.");
		$("#input_ETD").focus();
		return false;
	}

	//POL을 입력 해 주세요.
	if (_fnToNull($("input_POL").val()) == "") {
		alert("POL을 입력 해 주세요.");
		$("input_Departture").focus();
		return false;
	}

	if (_fnToNull($("input_POD").val()) == "") {
		alert("POD을 입력 해 주세요.");
		$("input_Arrival").focus();
		return false;
	}

	return true;
}

//Liner 코드 가져오기
function fnGetLinerData()
{
	try {
		var rtnJson;
		var objJsonData = new Object();

		//TEST
		//objJsonData.REQ_SVC = "SEA,AIR";
		//objJsonData.POL_CD = "KRINC";
		//objJsonData.POD_CD = "CNSHK";
		//objJsonData.ETD_START = "20201206";
		//objJsonData.ETD_END = "20201214";		
		//alert($("input[name='date_interval']:checked").val());
						
		objJsonData.REQ_SVC = $("input[name='vehicle']:checked").val();
		objJsonData.POL_CD = $("#input_POL").val();
		objJsonData.POD_CD = $("#input_POD").val();
		objJsonData.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
		objJsonData.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""),$("input[name='date_interval']:checked").val());
		$.ajax({
			type: "POST",
			url: "/Home/fnGetSEALiner",
			async: true,
			dataType: "json",
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {
				fnMakeSEALiner(result);
			}, error: function (xhr, status, error) {
				$("#ProgressBar_Loading").hide(); //프로그래스 바
				alert("담당자에게 문의 하세요.");
				console.log(error);
			},
			beforeSend: function () {
				$("#ProgressBar_Loading").show(); //프로그래스 바
			},
			complete: function () {
				$("#ProgressBar_Loading").hide(); //프로그래스 바
			}
		});
	} catch (e) {
		console.log(e.message);
	}
}

//스케줄 데이터 가져오는 함수
function fnGetScheduleData() {

	try {
		var rtnJson;
		var objJsonData = new Object();

		//TEST
		//objJsonData.REQ_SVC = "SEA,AIR";
		//objJsonData.POL_CD = "KRINC";
		//objJsonData.POD_CD = "CNSHK";
		//objJsonData.ETD_START = "20201206";
		//objJsonData.ETD_END = "20201214";		
		//alert($("input[name='date_interval']:checked").val());

		//검색시 데이터 확인.
		_ObjCheck.REQ_SVC = $("input[name='vehicle']:checked").val();
		_ObjCheck.POL_CD = $("#input_POL").val();
		_ObjCheck.POD_CD = $("#input_POD").val();
		_ObjCheck.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
		_ObjCheck.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""), $("input[name='date_interval']:checked").val());

		//실제 데이터 전송
		objJsonData.REQ_SVC = $("input[name='vehicle']:checked").val();
		objJsonData.POL_CD = $("#input_POL").val();
		objJsonData.POD_CD = $("#input_POD").val();
		objJsonData.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
		objJsonData.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""), $("input[name='date_interval']:checked").val());

		if (_vPage == 0) {
			_vREQ_SVC = $("input[name='vehicle']:checked").val(); //처음에 들어가서 체크
			objJsonData.PAGE = 1;
			_vPage = 1;
		} else {
			objJsonData.PAGE = _vPage;
			_vPage++;
        }

		$.ajax({
			type: "POST",
			url: "/Home/fnGetSEASchedule",
			async: true,
			dataType: "json",
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {								
				fnMakeSEASchedule(result);
			}, error: function (xhr, status, error) {
				$("#ProgressBar_Loading").hide(); //프로그래스 바
				alert("담당자에게 문의 하세요.");
				console.log(error);
			},
			beforeSend: function () {
				$("#ProgressBar_Loading").show(); //프로그래스 바
			},
			complete: function () {
				$("#ProgressBar_Loading").hide(); //프로그래스 바
			}
		});
	} catch (e) {
		console.log(e.message);
	}
}

//Carr에서 체크된 스케줄만 가지고 데이터 보여주기
function fnGetSeachkSchedule(ChkValues) {

	try {
		var rtnJson;
		var objJsonData = new Object();

		//objJsonData.REQ_SVC = "SEA,AIR";
		//objJsonData.POL_CD = "KRINC";
		//objJsonData.POD_CD = "CNSHK";
		//objJsonData.ETD_START = "20201206";
		//objJsonData.ETD_END = "20201214";
		objJsonData.REQ_SVC = $("input[name='vehicle']:checked").val();
		objJsonData.POL_CD = $("#input_POL").val();
		objJsonData.POD_CD = $("#input_POD").val();
		objJsonData.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
		objJsonData.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""), $("input[name='date_interval']:checked").val());
		objJsonData.LINE_CD = ChkValues;

		if ($("#sea_ts").is(":checked")) {
			objJsonData.TS = "Y";
		} else {
			objJsonData.TS = "N";
        }

		$.ajax({
			type: "POST",
			url: "/Home/fnGetSEAChkSchedule",
			async: true,
			dataType: "json",
			//data: callObj,
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {
				//rtnJson = result;				
				//데이터 받은거 바로 그리기
				$("#SEA_Schedule_AREA").eq(0).empty();
				fnMakeSEASchedule(result);
			}, error: function (xhr, status, error) {
				$("#ProgressBar_Loading").hide(); //프로그래스 바
				alert("담당자에게 문의 하세요.");
				console.log(error);
			},
			beforeSend: function () {
				$("#ProgressBar_Loading").show(); //프로그래스 바
			},
			complete: function () {
				$("#ProgressBar_Loading").hide(); //프로그래스 바
			}
		});
	} catch (e) {
		console.log(e.message);
	}
}

//1주후 , 한달후 , 3달후 날짜 가져오는 로직
function fnSetWeekDate(vNow, vDate) {

	var vPrevDate;	
	//var vNowDate = new Date().getFullYear() + "-" + _pad(new Date().getMonth() + 1, 2) + "-" + + _pad(new Date().getDate(), 2);

	var vYYYY = vNow.substring(0, 4);
	var vMM = vNow.substring(4, 6);
	var vDD = vNow.substring(6, 8);

	var d = new Date(vMM+"/"+vDD+"/"+vYYYY);
	var dayOfMonth = d.getDate();
	var monthOfYear = d.getMonth();

	if (vDate == "1week") {
		d.setDate(dayOfMonth + 7);
		vPrevDate = d.getFullYear() + _pad(d.getMonth() + 1, 2) + _pad(d.getDate(), 2);
	}	
	else if (vDate == "1month") {
		d.setMonth(monthOfYear + 1);
		vPrevDate = d.getFullYear() + _pad(d.getMonth() + 1, 2) + _pad(d.getDate(), 2);
	}
	else if (vDate == "3month") {
		d.setMonth(monthOfYear + 3);
		vPrevDate = d.getFullYear() + _pad(d.getMonth() + 1, 2) + _pad(d.getDate(), 2);
	}

	return vPrevDate;
}

//Carr 동일한 데이터인지 확인
function fnCheckCarr() {
	var vCheck = true;

	if (_ObjCheck.REQ_SVC != $("input[name='vehicle']:checked").val()) {
		vCheck = false;
	} else if (_ObjCheck.POL_CD != $("#input_POL").val()) {
		vCheck = false;
	}
	else if (_ObjCheck.POD_CD != $("#input_POD").val()) {
		vCheck = false;
	}
	else if (_ObjCheck.ETD_START != $("#input_ETD").val().replace(/-/gi, "")) {
		vCheck = false;
	}
	else if (_ObjCheck.ETD_END != fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""), $("input[name='date_interval']:checked").val())) {
		vCheck = false;
	}

	return vCheck;
}


/////////////////function MakeList/////////////////////
function fnMakeMenuPop(vHtml) {
	var vHtml = "";

	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_quot_FCL.png\"/><br />견적문의<br>(FCL)</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_quot_LCL.png\"/><br />견적문의<br>(LCL)</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_quot_AIR.png\"/><br />견적문의<br>(AIR)</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_tracking.png\"/><br />화물추적<br>　</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_schedule.png\"/><br />서비스<br>스케줄</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_bkg_input.png\"/><br />부킹등록<br>　</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_bkg_search.png\"/><br />부킹조회<br>　</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_bl_dashboard.png\"/><br />B/L<br>대시보드</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_inv.png\"/><br />Invoice<br>조회</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_logout.png\"/><br />로그아웃</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_Regist.png\"/><br />정보수정</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_memberInfo.png\"/><br />회원정보관리</a></li>";

	return vHtml;
}

function fnMakeLoginPop(vHtml) {
	var vHtml = "";

	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_login.png\"/><br />로그인</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_join.png\"/><br />회원가입</a></li>";

	return vHtml;
}

function fnMakeLoginPop(vHtml) {
	var vHtml = "";

	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_login.png\"/><br />로그인</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_join.png\"/><br />회원가입</a></li>";

	return vHtml;
}

function fnMakeLogoutPop(vHtml) {
	var vHtml = "";

	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_logout.png\"/><br />로그아웃</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_Regist.png\"/><br />정보수정</a></li>";
	vHtml += "<li><a href=\"#none\"><img src=\"~/Images/icn_memberInfo.png\"/><br />회원정보관리</a></li>";

	return vHtml;
}

//SEA Liner 만들기
function fnMakeSEALiner(vJsonData)
{
	var vHTML = "";

	try {
		//선사 코드 만들기
		var vResult = JSON.parse(vJsonData).Liner;

		if (vResult == undefined) {
			vHTML += "    </div> ";
			vHTML += "    <div class=\"no_data\"> ";
			vHTML += "    	<span>데이터가 없습니다.</span> ";
			vHTML += "    </div> ";
			vHTML += "    </div> ";
		} else {
			vHTML += "    <div class=\"row\"> ";
			vHTML += "    <h4 class=\"title02\">선사 선택</h4> ";
			vHTML += "    <div class=\"grid_col\"> ";
			vHTML += "    	<span class=\"check\"> ";
			vHTML += "    		<input type=\"checkbox\" id=\"sea_ts\" name=\"ts\" class=\"chk\" checked> ";
			vHTML += "    		<label for=\"sea_ts\">T/S 포함</label> ";
			vHTML += "    	</span> ";
			vHTML += "    </div> ";
			vHTML += "    <div class=\"cont\"> ";
			vHTML += "    	<span class=\"check\"> ";
			vHTML += "    		<input type=\"checkbox\" id=\"sea_carrier_All\" name=\"SEA_carrier\" class=\"chk\" value=\"All\" checked> ";
			vHTML += "    		<label for=\"sea_carrier_All\">모두선택</label> ";
			vHTML += "    	</span> ";

			//show hide로 조지자. Check박스에는 해당 선사 Class명 or name명
			if (vResult.length > 0) {
				$.each(vResult, function (i) {
					//_fnToNull(vResult[i]["SHORT_NM"]) , _fnToNull(vResult[i]["CARR_CD"])
					vHTML += "    	<span class=\"check\"> ";
					vHTML += "    		<input type=\"checkbox\" id=\"sea_carrier0" + i + "\" name=\"SEA_carrier\" class=\"chk\" value=\"" + _fnToNull(vResult[i]["CARR_CD"]) + "\" checked> ";
					vHTML += "    		<label for=\"sea_carrier0" + i + "\">" + _fnToNull(vResult[i]["SHORT_NM"]) + "</label> ";
					vHTML += "    	</span>	 ";
				});
			}
			else {
				vHTML += "    </div> ";
				vHTML += "    <div class=\"no_data\"> ";
				vHTML += "    	<span>데이터가 없습니다.</span> ";
				vHTML += "    </div> ";
				vHTML += "    </div> ";
			}
        }

		$("div[name='Main_search_detail']")[0].innerHTML = vHTML;

	} catch (e) {
		console.log(e.message);
	}
}

//SEA 스케줄 만들기
function fnMakeSEASchedule(vJsonData)
{	
	var vHTML = "";		

	try {
		//스케줄 데이터 만들기
		vResult = JSON.parse(vJsonData).Schedule;
		var vMorePage = true;

		//초기화
		if (_vPage == 1) {
			$("#SEA_Schedule_AREA").eq(0).empty();
		}
		if (vResult == undefined) {
			vHTML += "   <tr class=\"row\" data-row=\"row_5\"> ";
			vHTML += "   	<td colspan=\"10\"> ";
			vHTML += "   		<ul class=\"etc_info\"> ";
			vHTML += "   			<li class=\"no_data\"> ";
			vHTML += "   				<em>데이터가 없습니다.</em> ";
			vHTML += "   			</li> ";
			vHTML += "   		</ul> ";
			vHTML += "   	</td> ";
			vHTML += "   	<!-- mobile area --> ";
			vHTML += "   	<td class=\"mobile_layout\" colspan=\"9\"> ";
			vHTML += "   		<div class=\"layout_type3\"> ";
			vHTML += "   			<ul class=\"etc_info\"> ";
			vHTML += "   				<li class=\"no_data\"> ";
			vHTML += "   					<em>데이터가 없습니다.</em> ";
			vHTML += "   				</li> ";
			vHTML += "   			</ul> ";
			vHTML += "   		</div>  ";
			vHTML += "		</td> ";
			vHTML += "   	<!-- //mobile area --> ";
			vHTML += "   </tr> ";
		} else {
			if (vResult.length > 0) {
				$.each(vResult, function (i) {
					vHTML += "   <tr class=\"row Schedule_" + _fnToNull(vResult[i]["LINE_CD"]) + "\" data-row=\"row_1\"> ";
					vHTML += "   	<td><img src=\"" + _fnToNull(vResult[i]["IMG_PATH"]) + "\" alt=\"\"></td> ";
					vHTML += "   	<td> ";
					vHTML += _fnToNull(vResult[i]["LINE_CD"]) + "<br />";
					vHTML += _fnToNull(vResult[i]["VSL"]);
					vHTML += "   	</td> ";
					vHTML += "   	<td> ";
					vHTML += String(_fnToNull(vResult[i]["ETD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETD"]))) + ")<br /> ";
					vHTML += _fnToNull(vResult[i]["POL_CD"]);
					vHTML += "   	</td> ";
					vHTML += "   	<td> ";
					vHTML += String(_fnToNull(vResult[i]["ETA"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETA"]))) + ")<br /> ";
					vHTML += _fnToNull(vResult[i]["POD_CD"]);
					vHTML += "   	</td> ";
					vHTML += "   	<td> ";

					if (_fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "" || _fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "0") {
						vHTML += "";
					} else {
						vHTML += String(_fnToNull(vResult[i]["DOC_CLOS_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["DOC_CLOS_YMD"]))) + ")<br /> ";
						vHTML += _fnFormatTime(_fnToNull(vResult[i]["DOC_CLOS_HM"]));
					}

					vHTML += "   	</td> ";
					vHTML += "   	<td> ";

					if (_fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "" || _fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "0") {
						vHTML += "";
					} else {
						vHTML += String(_fnToNull(vResult[i]["CARGO_CLOS_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["CARGO_CLOS_YMD"]))) + ")<br /> ";
						vHTML += _fnFormatTime(_fnToNull(vResult[i]["CARGO_CLOS_HM"]));
					}

					vHTML += "   	</td> ";

					if (Number(_fnToNull(vResult[i]["TT_DAY"])) > 1) {
						if (Number(_fnToNull(vResult[i]["TT_DAY"]) > 1)) {
							vHTML += "   	<td>" + _fnToNull(vResult[i]["TT_DAY"]) + "Days</td> ";
						} else {
							vHTML += "   	<td>" + _fnToNull(vResult[i]["TT_DAY"]) + "Day</td> ";
						}
					} else {
						vHTML += "   	<td></td> ";
					}

					if (_fnToNull(vResult[i]["TS_YN"]) == "Y") {
						vHTML += "   	<td>T/S</td> ";
					} else if (_fnToNull(vResult[i]["TS_YN"]) == "N") {
						vHTML += "   	<td>Direct</td> ";
					} else {
						vHTML += "   	<td></td> ";
					}

					vHTML += "   	<td class=\"btns_w1\"><a href=\"javascript:void(0)\" class=\"btn_type1\">BOOKING</a></td> ";
					vHTML += "   	<td class=\"btns_w2\"><a href=\"javascript:void(0)\" class=\"btn_type6\"></a></td> ";

					/* mobile_layout  */
					vHTML += "   <td class=\"mobile_layout\" colspan=\"9\"> ";
					vHTML += "   	<div class=\"layout_type2\"> ";
					vHTML += "   		<div class=\"row s1\"> ";
					vHTML += "   			<img src=\"" + _fnToNull(vResult[i]["IMG_PATH"]) + "\" alt=\"\"> ";
					vHTML += "   		</div> ";
					vHTML += "   		<div class=\"row s2\"> ";
					vHTML += "   			" + _fnToNull(vResult[i]["LINE_CD"]) + " " + _fnToNull(vResult[i]["VSL"]);
					vHTML += "   		</div> ";
					vHTML += "   		<div class=\"row s3\"> ";
					vHTML += "   			<table> ";
					vHTML += "   				<tbody> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>Departure :</th> ";
					vHTML += "   						<td>" + String(_fnToNull(vResult[i]["ETD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + "(" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETD"]))) + " " + _fnToNull(vResult[i]["POL_CD"]) + "</td> ";
					vHTML += "   					</tr> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>Arrival :</th> ";
					vHTML += "   						<td>" + String(_fnToNull(vResult[i]["ETA"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + "(" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETA"]))) + " " + _fnToNull(vResult[i]["POD_CD"]) + "</td> ";
					vHTML += "   					</tr> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>Doc Closing :</th> ";

					if (_fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "" || _fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "0") {
						vHTML += "   						<td></td> ";
					} else {
						vHTML += "   						<td>" + String(_fnToNull(vResult[i]["DOC_CLOS_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["DOC_CLOS_YMD"]))) + " " + _fnFormatTime(_fnToNull(vResult[i]["DOC_CLOS_HM"])) + "</td> ";
					}

					vHTML += "   					</tr> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>Cargo Closing :</th> ";

					if (_fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "" || _fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "0") {
						vHTML += "   						<td></td> ";
					} else {
						vHTML += "   						<td>" + String(_fnToNull(vResult[i]["CARGO_CLOS_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["CARGO_CLOS_YMD"]))) + " " + _fnFormatTime(_fnToNull(vResult[i]["CARGO_CLOS_HM"])) + "</td> ";
					}

					vHTML += "   					</tr> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>T/time :</th> ";

					if (Number(_fnToNull(vResult[i]["TT_DAY"])) > 1) {
						if (Number(_fnToNull(vResult[i]["TT_DAY"]) > 1)) {
							vHTML += "   	<td>" + _fnToNull(vResult[i]["TT_DAY"]) + "Days</td> ";
						} else {
							vHTML += "   	<td>" + _fnToNull(vResult[i]["TT_DAY"]) + "Day</td> ";
						}
					} else {
						vHTML += "   	<td></td> ";
					}

					vHTML += "   					</tr> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>T/S :</th> ";

					if (_fnToNull(vResult[i]["TS_YN"]) == "Y") {
						vHTML += "   	<td>T/S</td> ";
					} else if (_fnToNull(vResult[i]["TS_YN"]) == "N") {
						vHTML += "   	<td>Direct</td> ";
					} else {
						vHTML += "   	<td></td> ";
					}

					vHTML += "   					</tr> ";
					vHTML += "   				</tbody> ";
					vHTML += "   			</table> ";
					vHTML += "   		</div> ";
					vHTML += "   		<a href=\"#none\" class=\"btn_type1\">BOOKING</a> ";
					vHTML += "   	</div> ";
					vHTML += "   </td> ";
					/* mobile_layout  */
					vHTML += "   </tr> ";
					vHTML += "   <tr class=\"related_info\" id=\"row_1\"> ";
					vHTML += "   	<td colspan=\"10\"> ";
					vHTML += "   		<ul class=\"etc_info\"> ";
					vHTML += "   			<li class=\"item\"> ";
					vHTML += "   				<em>반입지 :</em> ";
					//vHTML += "   				인터지스7부두 ";
					vHTML += "   			</li> ";
					vHTML += "   			<li class=\"item\"> ";
					vHTML += "   				<em>담당자 :</em> ";
					//vHTML += "   				김성은 부장 ";
					vHTML += "   			</li> ";
					vHTML += "   			<li class=\"item\"> ";
					vHTML += "   				<em>비고 :</em> ";
					vHTML += _fnToNull(vResult[i]["RMK"]);
					vHTML += "   			</li> ";
					vHTML += "   		</ul> ";
					vHTML += "   	</td> ";
					vHTML += "   </tr> ";

					//더보기 체크 RNUM == TOTCNT
					if (_fnToNull(vResult[i]["RNUM"]) == _fnToNull(vResult[i]["TOTCNT"])) {
						vMorePage = false;
					} else {
						vMorePage = true;
					}
				});

				//더보기 영역
				if (vMorePage) {
					$("#Btn_ScheduleMore").show();
				} else {
					$("#Btn_ScheduleMore").hide();
				}
			}
			else {
				vHTML += "   <tr class=\"row\" data-row=\"row_5\"> ";
				vHTML += "   	<td colspan=\"10\"> ";
				vHTML += "   		<ul class=\"etc_info\"> ";
				vHTML += "   			<li class=\"no_data\"> ";
				vHTML += "   				<em>데이터가 없습니다.</em> ";
				vHTML += "   			</li> ";
				vHTML += "   		</ul> ";
				vHTML += "   	</td> ";
				vHTML += "   	<!-- mobile area --> ";
				vHTML += "   	<td class=\"mobile_layout\" colspan=\"9\"> ";
				vHTML += "   		<div class=\"layout_type3\"> ";
				vHTML += "   			<ul class=\"etc_info\"> ";
				vHTML += "   				<li class=\"no_data\"> ";
				vHTML += "   					<em>데이터가 없습니다.</em> ";
				vHTML += "   				</li> ";
				vHTML += "   			</ul> ";
				vHTML += "   		</div>  ";
				vHTML += "		</td> ";
				vHTML += "   	<!-- //mobile area --> ";
				vHTML += "   </tr> ";
			}
        }

		$("#SEA_Schedule_AREA").eq(0).append(vHTML);

	} catch (e) {
		console.log(e.message);
    }

}

//스케줄 Nodata 그려주기
function fnMakeSEANoData() {

	$("#SEA_Schedule_AREA").eq(0).empty();

	var vHTML = "";

	vHTML += "   <tr class=\"row\" data-row=\"row_5\"> ";
	vHTML += "   	<td colspan=\"10\"> ";
	vHTML += "   		<ul class=\"etc_info\"> ";
	vHTML += "   			<li class=\"no_data\"> ";
	vHTML += "   				<em>데이터가 없습니다.</em> ";
	vHTML += "   			</li> ";
	vHTML += "   		</ul> ";
	vHTML += "   	</td> ";
	vHTML += "   	<!-- mobile area --> ";
	vHTML += "   	<td class=\"mobile_layout\" colspan=\"9\"> ";
	vHTML += "   		<div class=\"layout_type3\"> ";
	vHTML += "   			<ul class=\"etc_info\"> ";
	vHTML += "   				<li class=\"no_data\"> ";
	vHTML += "   					<em>데이터가 없습니다.</em> ";
	vHTML += "   				</li> ";
	vHTML += "   			</ul> ";
	vHTML += "   		</div>  ";
	vHTML += "		</td> ";
	vHTML += "   	<!-- //mobile area --> ";
	vHTML += "   </tr> ";

	$("#Btn_ScheduleMore").hide();
	$("#SEA_Schedule_AREA").eq(0).append(vHTML);
}


//AIR 스케줄 만들기
function fnMakeAIRSchedule(vJsonData)
{
	var vHTML = "";

	try {
		//선사 코드 만들기
		var vResult = JSON.parse(vJsonData).Liner;

		//스케줄 데이터 만들기
		vResult = JSON.parse(vJsonData).Schedule;

	} catch (e) {
		console.log(e.message);
	}
}


////////////////////////API////////////////////////////

