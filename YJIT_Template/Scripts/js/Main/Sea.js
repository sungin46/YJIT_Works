////////////////////전역 변수//////////////////////////


////////////////////jquery event///////////////////////
//$(function () {
//
//});

//input_POL 초기화
$(document).on("keyup", "#input_SEA_Departture", function () {
	//alert(_fnToNull($(this).val()));
	if (_fnToNull($(this).val()) == "") {
		$("#input_SEA_POL").val("");
	}
});

//input_POD 초기화
$(document).on("keyup", "#input_SEA_Arrival", function () {
	if (_fnToNull($(this).val()) == "") {
		$("#input_SEA_POD").val("");
	}
});

//퀵 Code - POL
$(document).on("click", "#input_SEA_Departture", function () {
	if ($("#input_SEA_Departture").val().length == 0) {
		$("#select_SEA_pop01").hide();
		$("#select_SEA_pop02").hide();
		selectPopOpen("#select_SEA_pop01");
	}
});

//퀵 Code - POD
$(document).on("click", "#input_SEA_Arrival", function () {
	if ($("#input_SEA_Arrival").val().length == 0) {
		$("#select_SEA_pop01").hide();
		$("#select_SEA_pop02").hide();
		selectPopOpen("#select_SEA_pop02");
	}
});

//퀵 Code 데이터 - POL
$(document).on("click", "#quick_SEA_POLCD button", function () {

	//split 해서 네이밍 , POL_CD 넣기
	var vValue = $(this).val();
	var vSplit = vValue.split(";");

	$("#input_SEA_Departture").val(vSplit[0]);
	$("#input_SEA_POL").val(vSplit[1]);
	$("#select_SEA_pop01").hide();

	//X박스 만들기
	$(this).closest(".int_box").addClass("has_del");
	$(this).closest(".int_box").find(".delete").toggle(Boolean($(this).val()));
});

//퀵 Code 데이터 - POL
$(document).on("click", "#quick_SEA_PODCD button", function () {

	//split 해서 네이밍 , POL_CD 넣기
	var vValue = $(this).val();
	var vSplit = vValue.split(";");

	$("#input_SEA_Arrival").val(vSplit[0]);
	$("#input_SEA_POD").val(vSplit[1]);
	$("#select_SEA_pop02").hide();

	//X박스 만들기
	$(this).closest(".int_box").addClass("has_del");
	$(this).closest(".int_box").find(".delete").toggle(Boolean($(this).val()));
});

//자동완성 기능 - POL
$(document).on("keyup", "#input_SEA_Departture", function () {

	//출발 도시 바로 선택 화면 가리기
	if ($(this).val().length > 0) {
		$("#select_SEA_pop01").hide();
	} else if ($(this).val().length == 0) {
		$("#select_SEA_pop01").show();
	}

	//autocomplete
	$(this).autocomplete({
		minLength: 2,
		source: function (request, response) {
			var result = fnGetSEAPortData($("#input_SEA_Departture").val().toUpperCase());
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
				$("#input_SEA_Departture").val(ui.item.value);
				$("#input_SEA_POL").val(ui.item.code);
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
$(document).on("keyup", "#input_SEA_Arrival", function () {

	//출발 도시 바로 선택 화면 가리기
	if ($(this).val().length > 0) {
		$("#select_SEA_pop02").hide();
	} else if ($(this).val().length == 0) {
		$("#select_SEA_pop02").show();
	}

	//autocomplete
	$(this).autocomplete({
		minLength: 2,
		source: function (request, response) {
			var result = fnGetSEAPortData($("#input_SEA_Arrival").val().toUpperCase());
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
				$("#input_SEA_Arrival").val(ui.item.value);
				$("#input_SEA_POD").val(ui.item.code);
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

//스케줄 검색
$(document).on("click", "#btn_SEASchdule_Search", function () {		
	_vPage = 0;
	fnGetSEAScheduleData();
	$('#seaSchedule').css('padding-bottom', '0px');
	//$.fn.fullpage.reBuild();
});

//더보기 버튼 이벤트
$(document).on("click", "#Btn_SEAScheduleMore button", function () {
	fnGetSEAScheduleData();
	//$.fn.fullpage.reBuild();
});


////////////////////////function///////////////////////
//port 정보 가져오는 함수
function fnGetSEAPortData(vValue) {
	try {
		var rtnJson;
		var objJsonData = new Object();

		objJsonData.LOC_TYPE = "S";
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

//스케줄 벨리데이션
function fnVali_SEASchedule() {

	//ETD를 입력 해 주세요.
	if (_fnToNull($("#input_SEA_ETD").val().replace(/-/gi, "")) == "") {
		alert("POL을 입력 해 주세요.");
		$("#input_SEA_ETD").focus();
		return false;
	}

	//POL을 입력 해 주세요.
	if (_fnToNull($("input_SEA_POL").val()) == "") {
		alert("POL을 입력 해 주세요.");
		$("input_SEA_Departture").focus();
		return false;
	}

	if (_fnToNull($("input_SEA_POD").val()) == "") {
		alert("POD을 입력 해 주세요.");
		$("input_SEA_Arrival").focus();
		return false;
	}

	return true;
}

//스케줄 데이터 가져오는 함수
function fnGetSEAScheduleData() {

	try {
		var rtnJson;
		var objJsonData = new Object();

		//실제 데이터 전송
		objJsonData.REQ_SVC = "SEA";
		objJsonData.POL_CD = $("#input_SEA_POL").val();
		objJsonData.POD_CD = $("#input_SEA_POD").val();
		objJsonData.ETD_START = $("#input_SEA_ETD").val().replace(/-/gi, "");
		objJsonData.ETD_END = "";		

		if (_vPage == 0) {			
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

/////////////////function MakeList/////////////////////
//SEA 스케줄 만들기
function fnMakeSEASchedule(vJsonData) {
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

					vHTML += "   	<td class=\"btns_w1\"><a href=\"javascript:void(0)\" class=\"btn_type1\">Booking</a></td> ";
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
					vHTML += "   						<td>" + String(_fnToNull(vResult[i]["ETD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + "(" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETD"]))) + ") " + _fnToNull(vResult[i]["POL_CD"]) + "</td> ";
					vHTML += "   					</tr> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>Arrival :</th> ";
					vHTML += "   						<td>" + String(_fnToNull(vResult[i]["ETA"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + "(" + (_fnGetWhatDay(_fnToNull(vResult[i]["ETA"]))) + ") " + _fnToNull(vResult[i]["POD_CD"]) + "</td> ";
					vHTML += "   					</tr> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>Doc Closing :</th> ";

					if (_fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "" || _fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "0") {
						vHTML += "   						<td></td> ";
					} else {
						vHTML += "   						<td>" + String(_fnToNull(vResult[i]["DOC_CLOS_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["DOC_CLOS_YMD"]))) + ") " + _fnFormatTime(_fnToNull(vResult[i]["DOC_CLOS_HM"])) + "</td> ";
					}

					vHTML += "   					</tr> ";
					vHTML += "   					<tr> ";
					vHTML += "   						<th>Cargo Closing :</th> ";

					if (_fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "" || _fnToNull(vResult[i]["DOC_CLOS_YMD"]) == "0") {
						vHTML += "   						<td></td> ";
					} else {
						vHTML += "   						<td>" + String(_fnToNull(vResult[i]["CARGO_CLOS_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " (" + (_fnGetWhatDay(_fnToNull(vResult[i]["CARGO_CLOS_YMD"]))) + ") " + _fnFormatTime(_fnToNull(vResult[i]["CARGO_CLOS_HM"])) + "</td> ";
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
					vHTML += "   		<a href=\"#none\" class=\"btn_type1\">Booking</a> ";
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
					$("#Btn_SEAScheduleMore").show();
				} else {
					$("#Btn_SEAScheduleMore").hide();
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
////////////////////////API////////////////////////////

