////////////////////전역 변수//////////////////////////
//alert($("input[name='date_interval']:checked").val()); 체크박스 체크
var _vPage = 0;
var _vREQ_SVC = "";
var _ObjCheck = new Object();

////////////////////jquery event///////////////////////
$(function () {
	//메인 페이지 기본 변수 세팅
	$("#input_SEA_ETD").val(new Date().getFullYear() + "-" + _pad(new Date().getMonth() + 1, 2) + "-" + _pad(new Date().getDate(), 2)); //ETD	
	$("#input_AIR_ETD").val(new Date().getFullYear() + "-" + _pad(new Date().getMonth() + 1, 2) + "-" + _pad(new Date().getDate(), 2)); //ETD	

});

//데이터 전부다 초기화.
$(document).on("click", ".tab > li", function () {

	//해운 스케줄 조회 상세조회 초기화
	$("#input_SEA_ETD").val(new Date().getFullYear() + "-" + _pad(new Date().getMonth() + 1, 2) + "-" + _pad(new Date().getDate(), 2)); //ETD	
	$("#input_SEA_Departture").val("");
	$("#input_SEA_POL").val("");
	$("#input_SEA_Arrival").val("");
	$("#input_SEA_POD").val("");
	$("#select_SEA_pop01").hide();
	$("#select_SEA_pop02").hide();
	$(".btns.icon.delete").hide();

	//항공 스케줄 조회
	$("#input_AIR_ETD").val(new Date().getFullYear() + "-" + _pad(new Date().getMonth() + 1, 2) + "-" + _pad(new Date().getDate(), 2)); //ETD	
	$("#input_AIR_Departture").val("");
	$("#input_AIR_POL").val("");
	$("#input_AIR_Arrival").val("");
	$("#input_AIR_POD").val("");

	//선박/항공기 위치추적 초기화
	$("#input_GetTrackVessel").val("");
	$("#Input_GetTrackAir").val("");
	$("#frm_tracklocation").attr("src", "");
	$("input[name='tracking']").prop("checked", false);
	$("#tracking01").prop("checked", true);
	$("div[name='Export_Performance_Input_Box']").hide();
	$("div[name='Export_Performance_Input_Box']").eq(0).show();

	//화물진행정보 초기화
	$("input[name='cargo']").prop("checked", false);
	$("#cargo01").prop("checked", true);
	$("div[name='Cargo_Express_Input_Box']").hide();
	$("div[name='Cargo_Express_Input_Box']").eq(0).show();
	$("#input_UniCargoMBL").val("");
	$("#input_UniCargoHBL").val("");
	$("#select_UniCargoYear option").eq(1).prop("selected", true);
	$("#input_UniCargoMtno").val();

	//수출이행내역 초기화
	$("input[name='export']").prop("checked", false);
	$("#export01").prop("checked", true);
	$("div[name='UniPass_Export_Box']").hide();
	$("div[name='UniPass_Export_Box']").eq(0).show();
	$("#input_UniOBnum").val("");
	$("#input_UniOBbl").val("");
});

//버튼 클릭시 데이터 초기화
$(document).on("click", "input[name='tracking']", function () {
	("#input_GetTrackVessel").val("");
	("#Input_GetTrackAir").val("");
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
		$("div[name='UniPass_Export_Box']").eq(0).show();
		$("div[name='UniPass_Export_Box']").eq(1).hide();
	} else if ($(this).attr("id") == "export02") {		
		$("div[name='UniPass_Export_Box']").eq(0).hide();
		$("div[name='UniPass_Export_Box']").eq(1).show();
	}
});

//선박 - 항공 위치추적 검색
$(document).on("click", "#btn_Tracking_Search", function () {

	var vValue = "";
	var vUrl = "";

	$("#ProgressBar_Loading").show();
	$("#frm_tracklocation").attr("src", "");

	//select 된게 어떤거인지 확인.
	if ($("input[name='tracking']:checked").val() == "VESSEL")
	{
		vValue = $("#input_GetTrackVessel").val();
		vUrl = "https://www.pier2pier.com/links/trackingvessel.php?VesselName=" + vValue + "&Client=YJIT";

		$("#frm_tracklocation").attr("src", vUrl);
		$('#mainTracking').css('padding-bottom', '0px');
	}
	else if ($("input[name='tracking']:checked").val() == "FLIGHT")
	{
		vValue = $("#Input_GetTrackAir").val();
		//vUrl = "https://www.radarbox.com/data/flights/" + vValue + "#map-container";
		vUrl = "https://www.radarbox.com/data/flights/" + vValue;

		$("#frm_tracklocation").attr("src", vUrl);
		$('#mainTracking').css('padding-bottom', '0px');
    }
});

//tracking 로딩 끝나면 프로그래스 바 닫기
$("#frm_tracklocation").on("load", function () {
	$("#ProgressBar_Loading").hide();
});

//tracking 닫기
$(document).on("click","#btn_Tracklocation_close", function () {
	$("#frm_tracklocation").attr("src", "");
});
////////////////////////function///////////////////////
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

$('.btn_top').on("click", function () {
	$('html, body').animate({ scrollTop: 0 }, 400);
	return false;
});

/////////////////function MakeList/////////////////////
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
////////////////////////API////////////////////////////

