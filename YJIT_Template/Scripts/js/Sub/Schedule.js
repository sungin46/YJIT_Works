////////////////////전역 변수//////////////////////////
//alert($("input[name='date_interval']:checked").val()); 체크박스 체크
var _vPage = 0;
var _vREQ_SVC = "";
var _Carr = "";
var _ObjCheck = new Object();
var _ObjNowSchedule = new Object();
var _OrderBy = "";
var _Sort = "";

////////////////////jquery event///////////////////////
$(function () {	
	//메인 페이지 기본 변수 세팅
	$("#input_ETD").val(new Date().getFullYear() + "-" + _pad(new Date().getMonth() + 1, 2) + "-" + _pad(new Date().getDate(), 2)); //ETD	
});

//sort 기능 - SEA
$(document).on("click", "#Main_SEATable_List th", function () {

	if ($(this).find("button").length > 0) {

		var vValue = "";

		if ($(this).find("button").hasClass("asc")) {
			vValue = "desc";
		}
		else if ($(this).find("button").hasClass("desc")) {
			vValue = "asc";
		} else {
			vValue = "asc";
		}

		//초기화
		$("#Main_SEATable_List th button").removeClass();
		$(this).find("button").addClass(vValue);

		if ($("#Main_SEA_Search_detail").css("display") == "block") {
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

			if (vChkValue != "") {
				_OrderBy = $(this).find("button").val();
				_Sort = vValue.toUpperCase();
				_vPage = 0;
				fnGetSeachkSchedule(vChkValue);
			} else {
				$("#Main_SEATable_List th button").removeClass();
            }
		} else {
			_OrderBy = $(this).find("button").val();
			_Sort = vValue.toUpperCase();
			_vPage = 0;
			if (fnVali_Schedule()) {
				fnGetSEAScheduleData();
			}
        }
		
		
	}
});

//sort 기능 - AIR
$(document).on("click", "#Main_AIRTable_List th", function () {

	if ($(this).find("button").length > 0) {

		var vValue = "";

		if ($(this).find("button").hasClass("asc")) {
			vValue = "desc";
		}
		else if ($(this).find("button").hasClass("desc")) {
			vValue = "asc";
		} else {
			vValue = "asc";
		}

		//초기화
		$("#Main_AIRTable_List th button").removeClass();
		$(this).find("button").addClass(vValue);

		if ($("#Main_AIR_Search_detail").css("display") == "block") {
			var vChkValue = "";

			//체크되어있는 내용이 있는지 없는지 확인.
			$("input[name='AIR_carrier']:checked").each(function () {
				if ($(this).val() != "All") {
					if (vChkValue == "") {
						vChkValue += "'" + $(this).val() + "'";
					} else {
						vChkValue += ",'" + $(this).val() + "'";
					}
				}
			});

			if (vChkValue != "") {
				_OrderBy = $(this).find("button").val();
				_Sort = vValue.toUpperCase();
				_vPage = 0;
				fnGetAirchkSchedule(vChkValue);
			} else {
				$("#Main_AIRTable_List th button").removeClass();
			}

		} else {
			_OrderBy = $(this).find("button").val();
			_Sort = vValue.toUpperCase();
			_vPage = 0;

			if (fnVali_Schedule()) {
				fnGetAIRScheduleData();
			}
		}

	}
});

//Carr 보여주기
$(document).on("click", "#carrier_menu", function () {

	if ($("input[name='vehicle']:checked").val() == "SEA") {
		//체크해서 검색으로 가야되는지 show hide를 시켜줘야되는지 확인.
		if (fnCheckCarr()) {
			if ($(this).prop("checked") == true) {
				$(".search_detail").hide();
				$(".search_detail").eq(0).show();				
			}
			else {
				$(".search_detail").hide();
			};
		} else {
			$(this).prop("checked", true);
			fnClick_Carr();
		}
	}
	else if ($("input[name='vehicle']:checked").val() == "AIR") {		
		if (fnCheckCarr()) {
			if ($(this).prop("checked") == true) {
				$(".search_detail").hide();
				$(".search_detail").eq(1).show();
			}
			else {
				$(".search_detail").hide();
			};
		} else {
			$(this).prop("checked", true);
			fnClick_Carr();
		}
	}
});

//체크박스 변경하면 POL POD 초기화
$(document).on("click", "input[name='vehicle']", function () {

	if ($("input[name='vehicle']:checked").val() == "SEA") {
		fnMakeSEAInit();
	}
	else if ($("input[name='vehicle']:checked").val() == "AIR") {
		fnMakeAIRInit();
	}
	
	_ObjCheck = new Object();
	$("div[name='Main_search_detail']").hide();
	$("#carrier_menu").prop("checked", false);
	$("#Main_SEA_Search_detail").hide();
	$("#input_Departure").val("");
	$("#input_Arrival").val("");
	$("#input_POL").val("");
	$("#input_POD").val("");
	$("#select_SEA_pop01").hide();
	$("#select_SEA_pop02").hide();
	$("#select_AIR_pop01").hide();
	$("#select_AIR_pop02").hide();
	$(".btns.icon.delete").hide();
	_OrderBy = "";
	_Sort = "";
});

//input_POL 초기화
$(document).on("keyup", "#input_Departure", function () {
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
$(document).on("click", "#input_Departure", function () {
	//SEA인 경우에만 퀵 Code 나오게 수정
	if ($("input[name='vehicle']:checked").val() == "SEA") {
		if ($("#input_Departure").val().length == 0) {
			$("#select_SEA_pop01").hide();
			$("#select_SEA_pop02").hide();
			selectPopOpen("#select_SEA_pop01");
		}
	} else if ($("input[name='vehicle']:checked").val() == "AIR") {
		if ($("#input_Departure").val().length == 0) {
			$("#select_AIR_pop01").hide();
			$("#select_AIR_pop02").hide();
			selectPopOpen("#select_AIR_pop01");
		}
    }

});

//퀵 Code - POD
$(document).on("click", "#input_Arrival", function () {
	if ($("input[name='vehicle']:checked").val() == "SEA") {
		if ($("#input_Arrival").val().length == 0) {
			$("#select_SEA_pop01").hide();
			$("#select_SEA_pop02").hide();
			selectPopOpen("#select_SEA_pop02");
		}
	} else if ($("input[name='vehicle']:checked").val() == "AIR") {
		if ($("#input_Arrival").val().length == 0) {
			$("#select_AIR_pop01").hide();
			$("#select_AIR_pop02").hide();
			selectPopOpen("#select_AIR_pop02");
		}
	}
});

//퀵 Code 데이터 - POL
$(document).on("click", "#quick_SEA_POLCD button", function () {

	//split 해서 네이밍 , POL_CD 넣기
	var vValue = $(this).val();
	var vSplit = vValue.split(";");

	$("#input_Departure").val(vSplit[0]);
	$("#input_POL").val(vSplit[1]);
	$("#select_SEA_pop01").hide();

	//X박스 만들기
	$(this).closest(".int_box").addClass("has_del");
	$(this).closest(".int_box").find(".delete").toggle(Boolean($(this).val()));
});

//퀵 Code 데이터 - POD
$(document).on("click", "#quick_SEA_PODCD button", function () {

	//split 해서 네이밍 , POL_CD 넣기
	var vValue = $(this).val();
	var vSplit = vValue.split(";");

	$("#input_Arrival").val(vSplit[0]);
	$("#input_POD").val(vSplit[1]);
	$("#select_SEA_pop02").hide();

	//X박스 만들기
	$(this).closest(".int_box").addClass("has_del");
	$(this).closest(".int_box").find(".delete").toggle(Boolean($(this).val()));
});

//퀵 Code 데이터 - POL
$(document).on("click", "#quick_AIR_POLCD button", function () {

	//split 해서 네이밍 , POL_CD 넣기
	var vValue = $(this).val();
	var vSplit = vValue.split(";");

	$("#input_Departure").val(vSplit[0]);
	$("#input_POL").val(vSplit[1]);
	$("#select_AIR_pop01").hide();

	//X박스 만들기
	$(this).closest(".int_box").addClass("has_del");
	$(this).closest(".int_box").find(".delete").toggle(Boolean($(this).val()));
});

//퀵 Code 데이터 - POD
$(document).on("click", "#quick_AIR_PODCD button", function () {

	//split 해서 네이밍 , POL_CD 넣기
	var vValue = $(this).val();
	var vSplit = vValue.split(";");

	$("#input_Arrival").val(vSplit[0]);
	$("#input_POD").val(vSplit[1]);
	$("#select_AIR_pop02").hide();

	//X박스 만들기
	$(this).closest(".int_box").addClass("has_del");
	$(this).closest(".int_box").find(".delete").toggle(Boolean($(this).val()));
});

//자동완성 기능 - POL
$(document).on("keyup", "#input_Departure", function () {

	//출발 도시 바로 선택 화면 가리기
	if ($("input[name='vehicle']:checked").val() == "SEA") {
		if ($(this).val().length > 0) {
			$("#select_SEA_pop01").hide();
		} else if ($(this).val().length == 0) {
			$("#select_SEA_pop01").show();
		}
	} else if ($("input[name='vehicle']:checked").val() == "AIR") {
		if ($(this).val().length > 0) {
			$("#select_AIR_pop01").hide();
		} else if ($(this).val().length == 0) {
			$("#select_AIR_pop01").show();
		}
    }

	//autocomplete
	$(this).autocomplete({
		minLength: 2,
		source: function (request, response) {
			var result = fnGetPortData($("#input_Departure").val().toUpperCase());
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
				$("#input_Departure").val(ui.item.value);
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
	if ($("input[name='vehicle']:checked").val() == "SEA") {
		if ($(this).val().length > 0) {
			$("#select_SEA_pop02").hide();
		} else if ($(this).val().length == 0) {
			$("#select_SEA_pop02").show();
		}
	} else {
		$("#select_SEA_pop02").hide();
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

	if ($("input[name='vehicle']:checked").val() == "SEA") {
		if (fnVali_Schedule()) {
			_OrderBy = "";
			_Sort = "";
			fnGetSEALinerData();
			_vPage = 0;
			fnGetSEAScheduleData();
			$('#container.schedule').css('padding-bottom', '50px');
        }
	}
	else if ($("input[name='vehicle']:checked").val() == "AIR") {		
		if (fnVali_Schedule()) {
			_OrderBy = "";
			_Sort = "";
			fnGetAIRLinerData();
			_vPage = 0;
			fnGetAIRScheduleData();
			$('#container.schedule').css('padding-bottom', '50px');
		}		
    }
});

//더보기 버튼 이벤트
$(document).on("click", "#Btn_ScheduleMore button", function () {
	
	if (_vREQ_SVC == "SEA") {
		if (_Carr == "Y") {
			if (fnCheckCarr()) {
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
				fnGetSeachkSchedule(vChkValue);
			} else {
				fnGetSEALinerData();
				_vPage = 0;
				fnGetSEAScheduleData();
            }
		} else if (_Carr == "") {
			if (fnCheckCarr()) {
				fnGetSEAScheduleData();
			} else {
				fnGetSEALinerData();
				_vPage = 0;
				fnGetSEAScheduleData();
            }
        }
	}
	else if (_vREQ_SVC == "AIR") {
		if (_Carr == "Y") {
			if (fnCheckCarr()) {
				var vChkValue = "";

				//체크되어있는 내용이 있는지 없는지 확인.
				$("input[name='AIR_carrier']:checked").each(function () {
					if ($(this).val() != "All") {
						if (vChkValue == "") {
							vChkValue += "'" + $(this).val() + "'";
						} else {
							vChkValue += ",'" + $(this).val() + "'";
						}
					}
				});
				fnGetAirchkSchedule(vChkValue);
			} else {
				fnGetAIRLinerData();
				_vPage = 0;
				fnGetAIRScheduleData();
			}
		} else if (_Carr == "") {
			if (fnCheckCarr()) {
				fnGetAIRScheduleData();
			} else {
				fnGetAIRLinerData();
				_vPage = 0;
				fnGetAIRScheduleData();
			}
		}
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

// T/S 포함 버튼 클릭 시 데이터 보여주기
$(document).on("click", "#sea_ts", function () {
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

	if (vChkValue != "") {
		_vPage = 0;
		fnGetSeachkSchedule(vChkValue);
    }
});

//전체 선택 눌렀을 떄 이벤트
$(document).on("click", "#air_carrier_All", function () {

	if ($("#air_carrier_All").is(":checked") == true) {
		$("input[name='AIR_carrier']").prop("checked", true);
	} else {
		$("input[name='AIR_carrier']").prop("checked", false);
	}

});

//AIr T/S 정보
$(document).on("click", "#air_ts", function () {
	var vChkValue = "";

	//체크되어있는 내용이 있는지 없는지 확인.
	$("input[name='AIR_carrier']:checked").each(function () {
		if ($(this).val() != "All") {
			if (vChkValue == "") {
				vChkValue += "'" + $(this).val() + "'";
			} else {
				vChkValue += ",'" + $(this).val() + "'";
			}
		}
	});

	if (vChkValue != "") {
		_vPage = 0;
		fnGetAirchkSchedule(vChkValue);
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
		_vPage = 0;
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
			_vPage = 0;
			fnGetSeachkSchedule(vChkValue);
		}
	}
});

//Carr - Air였을떄
$(document).on("click", "input[name='AIR_carrier']", function () {

	//Carr - 체크박스 관련 이벤트
	if ($("#air_carrier_All").is(":checked") == true) {
		$("input[name='AIR_carrier']").each(function (i) {	//현재 클릭 된 것이 checked인 경우 전체 체크 삭제
			if ($(this).prop("checked") == false) {
				if ($("#air_carrier_All").prop("checked") == true) {
					$("#air_carrier_All").prop("checked", false);
				}
			}
		});
	}
	else if ($("#air_carrier_All").is(":checked") == false) {
	
		var vCheck = true;
	
		$("input[name='AIR_carrier']").each(function (i) {	//현재 클릭 된 것이 checked인 경우 전체 체크 삭제
			if ($(this).prop("checked") == false) {
				if ($(this).val() != "All") {
					if ($(this).is(":checked") == false) {
						vCheck = false;
					}
				}
			}
		});
	
		if (vCheck) {
			$("#air_carrier_All").prop("checked", true);
		}
	}
	
	//스케줄 검색
	if ($("#air_carrier_All").is(":checked") == true) {
		//전체 검색으로 스케줄 다시 보여주기	
		_vPage = 0;
		fnGetAirchkSchedule("All");
	} else {
	
		var vChkValue = "";
	
		//체크되어있는 내용이 있는지 없는지 확인.
		$("input[name='AIR_carrier']:checked").each(function () {
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
			fnMakeAIRNoData();
		} else {
			_vPage = 0;
			fnGetAirchkSchedule(vChkValue);
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
function fnClick_Carr() {
	if ($("input[name='vehicle']:checked").val() == "SEA")
	{
		if (fnVali_Schedule()) {
			_vPage = 0;
			$("div[name='Main_search_detail']").hide();
			fnGetSEALinerData();
			$("div[name='Main_search_detail']").eq(0).show();
			fnGetSEAScheduleData();
			$('#container.schedule').css('padding-bottom', '50px');
        }
	}
	else if ($("input[name='vehicle']:checked").val() == "AIR")
	{
		if (fnVali_Schedule()) {
			_vPage = 0;
			$("div[name='Main_search_detail']").hide();
			fnGetAIRLinerData();
			$("div[name='Main_search_detail']").eq(1).show();
			fnGetAIRScheduleData();
			$('#container.schedule').css('padding-bottom', '50px');
		}
	}
}

//스케줄 벨리데이션
function fnVali_Schedule() {

	//ETD를 입력 해 주세요.
	if (_fnToNull($("#input_ETD").val().replace(/-/gi, "")) == "") {
		$("#Main_SEATable_List th button").removeClass();
		$("#Main_AIRTable_List th button").removeClass();
		$("#carrier_menu").prop("checked", false);
		alert("ETD를 입력 해 주세요. ");
		$("#input_ETD").focus();
		return false;
	}

	//POL을 입력 해 주세요.
	if (_fnToNull($("#input_POL").val()) == "") {
		$("#Main_SEATable_List th button").removeClass();
		$("#Main_AIRTable_List th button").removeClass();
		$("#carrier_menu").prop("checked", false);
		alert("출발 · 도착지를 선택해주세요.");
		$("#input_Departure").focus();
		return false;
	}

	//POD을 입력 해 주세요. 
	if (_fnToNull($("#input_POD").val()) == "") {
		$("#Main_SEATable_List th button").removeClass();
		$("#Main_AIRTable_List th button").removeClass();
		$("#carrier_menu").prop("checked", false);
		alert("출발 · 도착지를 선택해주세요.");
		$("#input_Arrival").focus();
		return false;
	}

	return true;
}

//SEA - Liner 코드 가져오기
function fnGetSEALinerData()
{
	try {
		var rtnJson;
		var objJsonData = new Object();		
						
		objJsonData.REQ_SVC = $("input[name='vehicle']:checked").val();
		objJsonData.POL_CD = $("#input_POL").val();
		objJsonData.POD_CD = $("#input_POD").val();
		objJsonData.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
		objJsonData.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""),$("input[name='date_interval']:checked").val());
		$.ajax({
			type: "POST",
			url: "/Schedule/fnGetSEALiner",
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
function fnGetSEAScheduleData() {

	try {
		var rtnJson;
		var objJsonData = new Object();
				
		objJsonData.REQ_SVC = $("input[name='vehicle']:checked").val();
		objJsonData.POL_CD = $("#input_POL").val();
		objJsonData.POD_CD = $("#input_POD").val();
		objJsonData.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
		objJsonData.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""), $("input[name='date_interval']:checked").val());

		if (_vPage == 0) {
			//검색시 데이터 확인.
			_ObjCheck.REQ_SVC = $("input[name='vehicle']:checked").val();
			_ObjCheck.POL_CD = $("#input_POL").val();
			_ObjCheck.POD_CD = $("#input_POD").val();
			_ObjCheck.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
			_ObjCheck.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""), $("input[name='date_interval']:checked").val());

			_vREQ_SVC = $("input[name='vehicle']:checked").val(); //처음에 들어가서 체크
			objJsonData.PAGE = 1;
			_vPage = 1;
		} else {
			_vPage++;
			objJsonData.PAGE = _vPage;
		}

		//Sort
		if (_fnToNull(_OrderBy) != "" || _fnToNull(_Sort) != "") {
			objJsonData.ORDERBY = _OrderBy;
			objJsonData.SORT = _Sort;
		} else {
			objJsonData.ORDERBY = "";
			objJsonData.SORT = "";
		}

		$.ajax({
			type: "POST",
			url: "/Schedule/fnGetSEASchedule",
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

		if (_vPage == 0) {	
			_Carr = "Y";
			objJsonData.PAGE = 1;
			_vPage = 1;
		} else {
			_vPage++;
			objJsonData.PAGE = _vPage;
		}

		if ($("#sea_ts").is(":checked")) {
			objJsonData.TS = "Y";
		} else {
			objJsonData.TS = "N";
        }

		//Sort
		if (_fnToNull(_OrderBy) != "" || _fnToNull(_Sort) != "") {
			objJsonData.ORDERBY = _OrderBy;
			objJsonData.SORT = _Sort;
		} else {
			objJsonData.ORDERBY = "";
			objJsonData.SORT = "";
		}

		$.ajax({
			type: "POST",
			url: "/Schedule/fnGetSEAChkSchedule",
			async: true,
			dataType: "json",
			//data: callObj,
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {
				//rtnJson = result;				
				//데이터 받은거 바로 그리기
				//$("#SEA_Schedule_AREA").eq(0).empty();
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

//AIR - Liner 코드 가져오기
function fnGetAIRLinerData() {
	try {
		var rtnJson;
		var objJsonData = new Object();

		objJsonData.REQ_SVC = $("input[name='vehicle']:checked").val();
		objJsonData.POL_CD = $("#input_POL").val();
		objJsonData.POD_CD = $("#input_POD").val();
		objJsonData.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
		objJsonData.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""), $("input[name='date_interval']:checked").val());
		$.ajax({
			type: "POST",
			url: "/Schedule/fnGetAIRLiner",
			async: true,
			dataType: "json",
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {
				//alert(result);
				fnMakeAIRLiner(result);
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
function fnGetAIRScheduleData() {

	try {
		var rtnJson;
		var objJsonData = new Object();

		objJsonData.REQ_SVC = $("input[name='vehicle']:checked").val();
		objJsonData.POL_CD = $("#input_POL").val();
		objJsonData.POD_CD = $("#input_POD").val();
		objJsonData.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
		objJsonData.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""), $("input[name='date_interval']:checked").val());

		if (_vPage == 0) {
			//검색시 데이터 확인.
			_ObjCheck.REQ_SVC = $("input[name='vehicle']:checked").val();
			_ObjCheck.POL_CD = $("#input_POL").val();
			_ObjCheck.POD_CD = $("#input_POD").val();
			_ObjCheck.ETD_START = $("#input_ETD").val().replace(/-/gi, "");
			_ObjCheck.ETD_END = fnSetWeekDate($("#input_ETD").val().replace(/-/gi, ""), $("input[name='date_interval']:checked").val());

			_vREQ_SVC = $("input[name='vehicle']:checked").val(); //처음에 들어가서 체크
			objJsonData.PAGE = 1;
			_vPage = 1;
		} else {
			_vPage++;
			objJsonData.PAGE = _vPage;
		}

		//Sort
		if (_fnToNull(_OrderBy) != "" || _fnToNull(_Sort) != "") {
			objJsonData.ORDERBY = _OrderBy;
			objJsonData.SORT = _Sort;
		} else {
			objJsonData.ORDERBY = "";
			objJsonData.SORT = "";
		}

		$.ajax({
			type: "POST",
			url: "/Schedule/fnGetAIRSchedule",
			async: true,
			dataType: "json",
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {
				fnMakeAIRSchedule(result);
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
function fnGetAirchkSchedule(ChkValues) {

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

		if (_vPage == 0) {
			_Carr = "Y";
			objJsonData.PAGE = 1;
			_vPage = 1;
		} else {
			_vPage++;
			objJsonData.PAGE = _vPage;			
		}

		if ($("#air_ts").is(":checked")) {
			objJsonData.TS = "Y";
		} else {
			objJsonData.TS = "N";
		}

		//Sort
		if (_fnToNull(_OrderBy) != "" || _fnToNull(_Sort) != "") {
			objJsonData.ORDERBY = _OrderBy;
			objJsonData.SORT = _Sort;
		} else {
			objJsonData.ORDERBY = "";
			objJsonData.SORT = "";
		}

		$.ajax({
			type: "POST",
			url: "/Schedule/fnGetAIRChkSchedule",
			async: true,
			dataType: "json",
			//data: callObj,
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {
				//rtnJson = result;				
				//데이터 받은거 바로 그리기
				//$("#SEA_Schedule_AREA").eq(0).empty();
				fnMakeAIRSchedule(result);
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

//SEA랑 AIR에서도 가능하게 수정
function fnOpenQuickMenu(vValue) {

	if ($("input[name='vehicle']:checked").val() == "SEA") {
		selectPopOpen("#select_SEA"+vValue);
	} else if ($("input[name='vehicle']:checked").val() == "AIR") {
		selectPopOpen("#select_AIR"+vValue);
    }

}

/////////////////function MakeList/////////////////////
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

					//,면 indexof 써서 한칸 내리기
					if (_fnToNull(vResult[i]["POL_TRMN"]).indexOf(",") > -1) {
						var vSplit = vResult[i]["POL_TRMN"].split(",");

						for (var j = 0; j < vSplit.length; j++) {
							if (j == 0) {
								vHTML += vSplit[0] + "<br />";
							} else {
								vHTML += vSplit[j] + " ";
							}
						}
					} else {
						vHTML += _fnToNull(vResult[i]["POL_TRMN"]);
					}

					vHTML += "   	</td> ";
					vHTML += "   	<td> ";
					vHTML += String(_fnToNull(vResult[i]["ETA"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETA"]))) + ")<br /> ";

					//,면 indexof 써서 한칸 내리기
					if (_fnToNull(vResult[i]["POD_TRMN"]).indexOf(",") > -1) {
						var vSplit = vResult[i]["POD_TRMN"].split(",");

						for (var j = 0; j < vSplit.length; j++) {
							if (j == 0) {
								vHTML += vSplit[0] + "<br />";
							} else {
								vHTML += vSplit[j] + " ";
							}
						}
					} else {
						vHTML += _fnToNull(vResult[i]["POD_TRMN"]);
					}

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

					if (_fnToNull(vResult[i]["CARGO_CLOS_YMD"]) == "" || _fnToNull(vResult[i]["CARGO_CLOS_YMD"]) == "0") {
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
					vHTML += "   	<td class=\"btns_w2\"><a class=\"plus\" id=\"plus\" href=\"javascript:void(0)\"><span class=\"btn_minus\"></span><span class=\"btn_plus\"></span></a></td> ";

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
					vHTML += "   						<td>" + String(_fnToNull(vResult[i]["ETD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + "(" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETD"]))) + " " + _fnToNull(vResult[i]["POL_TRMN"]) + "</td> ";
					vHTML += "   					</tr> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>Arrival :</th> ";
					vHTML += "   						<td>" + String(_fnToNull(vResult[i]["ETA"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + "(" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETA"]))) + " " + _fnToNull(vResult[i]["POD_TRMN"]) + "</td> ";
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

					if (_fnToNull(vResult[i]["CARGO_CLOS_YMD"]) == "" || _fnToNull(vResult[i]["CARGO_CLOS_YMD"]) == "0") {
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
		$("#SEA_Schedule_AREA").show();
		$(".empty_padding").hide();

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

//SEA 초기화
function fnMakeSEAInit() {

	$("#SEA_Schedule_AREA").eq(0).empty();

	var vHTML = "";

	vHTML += "   <tr class=\"row\" data-row=\"row_5\"> ";
	vHTML += "   	<td colspan=\"10\"> ";
	vHTML += "   		<ul class=\"etc_info\"> ";
	vHTML += "   			<li class=\"no_data\"> ";
	vHTML += "   				<em></em> ";
	vHTML += "   			</li> ";
	vHTML += "   		</ul> ";
	vHTML += "   	</td> ";
	vHTML += "   	<!-- mobile area --> ";
	vHTML += "   	<td class=\"mobile_layout\" colspan=\"9\"> ";
	vHTML += "   		<div class=\"layout_type3\"> ";
	vHTML += "   			<ul class=\"etc_info\"> ";
	vHTML += "   				<li class=\"no_data\"> ";
	vHTML += "   					<em></em> ";
	vHTML += "   				</li> ";
	vHTML += "   			</ul> ";
	vHTML += "   		</div>  ";
	vHTML += "		</td> ";
	vHTML += "   	<!-- //mobile area --> ";
	vHTML += "   </tr> ";

	$("#Btn_ScheduleMore").hide();
	$("#SEA_Schedule_AREA").eq(0).append(vHTML);
}

//AIR Liner 만들기
function fnMakeAIRLiner(vJsonData) {
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
			vHTML += "    		<input type=\"checkbox\" id=\"air_ts\" name=\"ts\" class=\"chk\" checked> ";
			vHTML += "    		<label for=\"air_ts\">T/S 포함</label> ";
			vHTML += "    	</span> ";
			vHTML += "    </div> ";
			vHTML += "    <div class=\"cont\"> ";
			vHTML += "    	<span class=\"check\"> ";
			vHTML += "    		<input type=\"checkbox\" id=\"air_carrier_All\" name=\"AIR_carrier\" class=\"chk\" value=\"All\" checked> ";
			vHTML += "    		<label for=\"air_carrier_All\">모두선택</label> ";
			vHTML += "    	</span> ";

			//show hide로 조지자. Check박스에는 해당 선사 Class명 or name명
			if (vResult.length > 0) {
				$.each(vResult, function (i) {
					//_fnToNull(vResult[i]["SHORT_NM"]) , _fnToNull(vResult[i]["CARR_CD"])
					vHTML += "    	<span class=\"check\"> ";
					vHTML += "    		<input type=\"checkbox\" id=\"air_carrier0" + i + "\" name=\"AIR_carrier\" class=\"chk\" value=\"" + _fnToNull(vResult[i]["CARR_CD"]) + "\" checked> ";
					vHTML += "    		<label for=\"air_carrier0" + i + "\">" + _fnToNull(vResult[i]["SHORT_NM"]) + "</label> ";
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

		$("div[name='Main_search_detail']")[1].innerHTML = vHTML;

	} catch (e) {
		console.log(e.message);
	}
}


//AIR 스케줄 만들기
function fnMakeAIRSchedule(vJsonData) {
	var vHTML = "";

	try {
		//스케줄 데이터 만들기
		vResult = JSON.parse(vJsonData).Schedule;
		var vMorePage = true;

		//초기화
		if (_vPage == 1) {
			$("#AIR_Schedule_AREA").eq(0).empty();
		}
		if (vResult == undefined) {
			vHTML += "   <tr class=\"row\" data-row=\"row_5\"> ";
			vHTML += "   	<td colspan=\"7\"> ";
			vHTML += "   		<ul class=\"etc_info\"> ";
			vHTML += "   			<li class=\"no_data\"> ";
			vHTML += "   				<em>데이터가 없습니다.</em> ";
			vHTML += "   			</li> ";
			vHTML += "   		</ul> ";
			vHTML += "   	</td> ";
			vHTML += "   	<!-- mobile area --> ";
			vHTML += "   	<td class=\"mobile_layout\" colspan=\"7\"> ";
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

					//,면 indexof 써서 한칸 내리기
					if (_fnToNull(vResult[i]["POL_TRMN"]).indexOf(",") > -1) {
						var vSplit = vResult[i]["POL_TRMN"].split(",");

						for (var j = 0; j < vSplit.length; j++) {
							if (j == 0) {
								vHTML += vSplit[0] + "<br />";
							} else {
								vHTML += vSplit[j] + " ";
							}
						}
					} else {
						vHTML += _fnToNull(vResult[i]["POL_TRMN"]);
					}

					vHTML += "   	</td> ";
					vHTML += "   	<td> ";
					vHTML += String(_fnToNull(vResult[i]["ETA"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETA"]))) + ")<br /> ";

					//,면 indexof 써서 한칸 내리기
					if (_fnToNull(vResult[i]["POD_TRMN"]).indexOf(",") > -1) {
						var vSplit = vResult[i]["POD_TRMN"].split(",");

						for (var j = 0; j < vSplit.length; j++) {
							if (j == 0) {
								vHTML += vSplit[0] + "<br />";
							} else {
								vHTML += vSplit[j] + " ";
							}
						}
					} else {
						vHTML += _fnToNull(vResult[i]["POD_TRMN"]);
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
					vHTML += "		<td class=\"btns_w2\"><a class=\"plus\" id=\"plus\" href=\"javascript:void(0)\"><span class=\"btn_minus\"></span><span class=\"btn_plus\"></span></a></td> ";

					/* mobile_layout  */
					vHTML += "   <td class=\"mobile_layout\" colspan=\"7\"> ";
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

		$("#AIR_Schedule_AREA").eq(0).append(vHTML);
		$("#AIR_Schedule_AREA").show();
		$(".empty_padding").hide();

	} catch (e) {
		console.log(e.message);
	}
}

//스케줄 Nodata 그려주기
function fnMakeAIRNoData() {

	$("#AIR_Schedule_AREA").eq(0).empty();

	var vHTML = "";

	vHTML += "   <tr class=\"row\" data-row=\"row_5\"> ";
	vHTML += "   	<td colspan=\"8\"> ";
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
	$("#AIR_Schedule_AREA").eq(0).append(vHTML);
}

//SEA 초기화
function fnMakeAIRInit() {

	$("#AIR_Schedule_AREA").eq(0).empty();

	var vHTML = "";

	vHTML += "   <tr class=\"row\" data-row=\"row_5\"> ";
	vHTML += "   	<td colspan=\"8\"> ";
	vHTML += "   		<ul class=\"etc_info\"> ";
	vHTML += "   			<li class=\"no_data\"> ";
	vHTML += "   				<em></em> ";
	vHTML += "   			</li> ";
	vHTML += "   		</ul> ";
	vHTML += "   	</td> ";
	vHTML += "   	<!-- mobile area --> ";
	vHTML += "   	<td class=\"mobile_layout\" colspan=\"9\"> ";
	vHTML += "   		<div class=\"layout_type3\"> ";
	vHTML += "   			<ul class=\"etc_info\"> ";
	vHTML += "   				<li class=\"no_data\"> ";
	vHTML += "   					<em></em> ";
	vHTML += "   				</li> ";
	vHTML += "   			</ul> ";
	vHTML += "   		</div>  ";
	vHTML += "		</td> ";
	vHTML += "   	<!-- //mobile area --> ";
	vHTML += "   </tr> ";

	$("#Btn_ScheduleMore").hide();
	$("#AIR_Schedule_AREA").eq(0).append(vHTML);
}

////////////////////////API////////////////////////////

