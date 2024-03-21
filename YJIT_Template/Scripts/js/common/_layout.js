////////////////////전역 변수//////////////////////////

////////////////////jquery event///////////////////////
//$(function () {
//
//});

//Main 화물추적 레이어 팝업 버튼
$(document).on("click", "#btn_Main_Tracking", function () {
	//fnGetTracklayer($("#Input_Main_Tracking").val());
	$('#delivery_pop').show();
});

//Main 상단 화물추적 레이어 팝업 버튼
$(document).on("click", ".btn_search", function () {
	$('#delivery_pop').show();
});

//Main 화물추적 엔터키 이벤트
$(document).on("keyup", "#Input_Main_Tracking", function (e) {
	if (e.keyCode == 13) {
		fnGetTracklayer($(this).val());
	}
});

//top 화물추적 레이어 팝업 버튼
$(document).on("click", "#btn_Top_Tracking", function () {
	fnGetTracklayer($("#Input_Top_Tracking").val());
});

//Top 화물추적 엔터키 이벤트
$(document).on("keyup", "#Input_Top_Tracking", function (e) {
	if (e.keyCode == 13) {
		fnGetTracklayer($(this).val());
	}
});

//top 화물추적 레이어 팝업 버튼
$(document).on("click", "#btn_layer_Tracking", function () {
	fnGetTracklayer($("#Input_layer_Tracking").val());
});

//Top 화물추적 엔터키 이벤트
$(document).on("keyup", "#Input_layer_Tracking", function (e) {
	if (e.keyCode == 13) {
		fnGetTracklayer($(this).val());
	}
});

//tracking 데이터 정보 가져오기
$(document).on("click", "#layer_delivery_list tr", function () {

	$("#layer_delivery_list tr").css("background-color", "#fff");
	$(this).css("background-color", "#f5f5f5");

	//table에 table로 되어있어서 공백일 경우는 확인 하지 않게
	if (_fnToNull($(this).find("input[name='hdn_layer_cntrNo']").val()) != "" && _fnToNull($(this).find("input[name='hdn_layer_hblNo']").val()) != "") {
		fnGetTrackLayerData(_fnToNull($(this).find("input[name='hdn_layer_cntrNo']").val()), _fnToNull($(this).find("input[name='hdn_layer_hblNo']").val()));
	}
});

////////////////////////function///////////////////////
//화물추적 리스트 & 데이터 가져오기
function fnGetTracklayer(vValue) {
	try {
		var rtnJson;
		var objJsonData = new Object();

		//실제 데이터 전송
		objJsonData.TRACK_DATA = vValue;

		$.ajax({
			type: "POST",
			url: "/Home/fnGetTrackingList",
			async: true,
			dataType: "json",
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {
				if (result == null) {
					alert("오류가 발생 하였습니다. 담당자에게 문의 해주세요.");
				} else {
					if (JSON.parse(result).Result[0]["trxCode"] == "Y") {
						fnMakeTrackLayerData(result);
						fnMakeTrackLayerList(result);
						layerPopup('#delivery_pop');
					}
					else if (JSON.parse(result).Result[0]["trxCode"] == "N") {
						alert("컨테이너 번호 및 House B/L를 다시 확인 해주시기 바랍니다.");
					}
				}
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
		alert("담당자에게 문의 하세요.");
		console.log(e.message);
	}

}
//화물추적 데이터 가져오기
function fnGetTrackLayerData(vCntrNo, vHblNo) {
	try {
		var rtnJson;
		var objJsonData = new Object();

		//실제 데이터 전송
		objJsonData.CNTR_NO = vCntrNo;
		objJsonData.HBL_NO = vHblNo;

		$.ajax({
			type: "POST",
			url: "/Home/fnGetTrackingData",
			async: false,
			dataType: "json",
			data: { "vJsonData": _fnMakeJson(objJsonData) },
			success: function (result) {
				if (result == null) {
					alert("오류가 발생 하였습니다. 담당자에게 문의 해주세요.");
				} else {
					if (JSON.parse(result).Result[0]["trxCode"] == "Y") {
						fnMakeTrackLayerData(result);
					}
					else if (JSON.parse(result).Result[0]["trxCode"] == "N") {
						alert("오류가 발생 하였습니다. 담당자에게 문의 해주세요.");
					}
				}
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
		alert("담당자에게 문의 하세요.");
		console.log(e.message);
	}
}

/////////////////function MakeList/////////////////////
//tracking 데이터 그리기
function fnMakeTrackLayerData(vJsonData) {
	var vHTML = "";

	//스케줄 데이터 만들기
	var vResult = JSON.parse(vJsonData).TrackingData;

	try {

		if (vResult != undefined) {
			if (vResult.length > 0) {
				if (vResult[0]["EX_IM_TYPE"] == "I") {
					vHTML += " <ul class=\"delivery_step import\"> ";

					var vMAX_SEQ = Number(vResult[0]["MAX_SEQ"]);
					var arrImport = ['선적지 출항', '입항', '통관', '컨테이너 양하', '컨테이너 반출'];
					arrImport.splice(0, Number(vResult[0]["MAX_SEQ"]));

					//SEQ돌리기
					for (var j = 0; j < vMAX_SEQ; j++) {
						if (vResult[j]["SEQ"] == vResult[j]["MAX_SEQ"]) {
							vHTML += " 	<li class=\"on now layer\"> ";
							vHTML += " 		<div class=\"step_box\"> ";
							vHTML += " 			<div class=\"col\"> ";
							vHTML += " 				<em class=\"step\">" + _fnToNull(vResult[j]["EVENT_NM"]) + "</em> ";
							vHTML += " 			</div> ";
							vHTML += " 			<div class=\"col\"> ";
							vHTML += " 				<span class=\"icn red\"><i></i></span> ";
							//vHTML += " 				<strong class=\"location\" style=\"height: 40px;\">" + vResult[j]["ACT_LOC_NM"] +"<br>Busan, Korea</strong> ";
							vHTML += " 				<strong class=\"location\">" + _fnToNull(vResult[j]["ACT_LOC_NM"]) + "</strong> ";
							vHTML += " 				<p class=\"date\">" + String(_fnToNull(vResult[j]["ACT_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " <span>" + _fnFormatTime(_fnToNull(vResult[j]["ACT_HM"])) + "</span></p> ";
							vHTML += " 			</div> ";
							vHTML += " 		</div>                 ";
							vHTML += " 	</li> ";
						} else {
							vHTML += " 	<li class=\"on layer\"> ";
							vHTML += " 		<div class=\"step_box\"> ";
							vHTML += " 			<div class=\"col\"> ";
							vHTML += " 				<em class=\"step\">" + _fnToNull(vResult[j]["EVENT_NM"]) + "</em> ";
							vHTML += " 			</div> ";
							vHTML += " 			<div class=\"col\"> ";
							vHTML += " 				<span class=\"icn blue\"><i></i></span> ";
							//vHTML += " 				<strong class=\"location\" style=\"height: 40px;\">" + vResult[j]["ACT_LOC_NM"] +"<br>Busan, Korea</strong> ";
							vHTML += " 				<strong class=\"location\">" + _fnToNull(vResult[j]["ACT_LOC_NM"]) + "</strong> ";
							vHTML += " 				<p class=\"date\">" + String(_fnToNull(vResult[j]["ACT_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " <span>" + _fnFormatTime(_fnToNull(vResult[j]["ACT_HM"])) + "</span></p> ";
							vHTML += " 			</div> ";
							vHTML += " 		</div>                 ";
							vHTML += " 	</li> ";
						}
					}

					//남은 데이터 처리
					for (var j = 0; j < 5 - vMAX_SEQ; j++) {
						vHTML += " 	<li class=\"layer\"> ";
						vHTML += " 		<div class=\"step_box\"> ";
						vHTML += " 			<div class=\"col\"> ";
						vHTML += " 				<em class=\"step\">" + arrImport[j] + "</em> ";
						vHTML += " 			</div> ";
						vHTML += " 			<div class=\"col\"> ";
						vHTML += " 				<span class=\"icn\"><i></i></span> ";
						vHTML += " 				<strong class=\"location\"></strong> ";
						vHTML += " 				<p class=\"date\"><span></span></p> ";
						vHTML += " 			</div> ";
						vHTML += " 		</div>  ";
						vHTML += " 	</li> ";
					}

					vHTML += " </ul> ";

				} else if (vResult[0]["EX_IM_TYPE"] == "E") {

					vHTML += " <ul class=\"delivery_step export\"> ";

					var vMAX_SEQ = Number(vResult[0]["MAX_SEQ"]);
					var arrExport = ['공 컨테이너 반출', '터미널 반입', '컨테이너 산적', '출항', '도착'];
					arrExport.splice(0, Number(vResult[0]["MAX_SEQ"]));

					//SEQ돌리기
					for (var j = 0; j < vMAX_SEQ; j++) {

						if (vResult[j]["SEQ"] == vResult[j]["MAX_SEQ"]) {
							vHTML += " 	<li class=\"on now layer\"> ";
							vHTML += " 		<div class=\"step_box\"> ";
							vHTML += " 			<div class=\"col\"> ";
							vHTML += " 				<em class=\"step\">" + _fnToNull(vResult[j]["EVENT_NM"]) + "</em> ";
							vHTML += " 			</div> ";
							vHTML += " 			<div class=\"col\"> ";
							vHTML += " 				<span class=\"icn red\"><i></i></span> ";
							//vHTML += " 				<strong class=\"location\" style=\"height: 40px;\">" + vResult[j]["ACT_LOC_NM"] +"<br>Busan, Korea</strong> ";
							vHTML += " 				<strong class=\"location\">" + _fnToNull(vResult[j]["ACT_LOC_NM"]) + "</strong> ";
							vHTML += " 				<p class=\"date\">" + String(_fnToNull(vResult[j]["ACT_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " <span>" + _fnFormatTime(_fnToNull(vResult[j]["ACT_HM"])) + "</span></p> ";
							vHTML += " 			</div> ";
							vHTML += " 		</div>                 ";
							vHTML += " 	</li> ";
						} else {
							vHTML += " 	<li class=\"on layer\"> ";
							vHTML += " 		<div class=\"step_box\"> ";
							vHTML += " 			<div class=\"col\"> ";
							vHTML += " 				<em class=\"step\">" + _fnToNull(vResult[j]["EVENT_NM"]) + "</em> ";
							vHTML += " 			</div> ";
							vHTML += " 			<div class=\"col\"> ";
							vHTML += " 				<span class=\"icn blue\"><i></i></span> ";
							//vHTML += " 				<strong class=\"location\" style=\"height: 40px;\">" + vResult[j]["ACT_LOC_NM"] +"<br>Busan, Korea</strong> ";
							vHTML += " 				<strong class=\"location\">" + _fnToNull(vResult[j]["ACT_LOC_NM"]) + "</strong> ";
							vHTML += " 				<p class=\"date\">" + String(_fnToNull(vResult[j]["ACT_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " <span>" + _fnFormatTime(_fnToNull(vResult[j]["ACT_HM"])) + "</span></p> ";
							vHTML += " 			</div> ";
							vHTML += " 		</div>                 ";
							vHTML += " 	</li> ";
						}
					}

					//남은 데이터 처리
					for (var j = 0; j < 5 - vMAX_SEQ; j++) {
						vHTML += " 	<li class=\"layer\"> ";
						vHTML += " 		<div class=\"step_box\"> ";
						vHTML += " 			<div class=\"col\"> ";
						vHTML += " 				<em class=\"step\">" + arrExport[j] + "</em> ";
						vHTML += " 			</div> ";
						vHTML += " 			<div class=\"col\"> ";
						vHTML += " 				<span class=\"icn\"><i></i></span> ";
						vHTML += " 				<strong class=\"location\"></strong> ";
						vHTML += " 				<p class=\"date\"><span></span></p> ";
						vHTML += " 			</div> ";
						vHTML += " 		</div>  ";
						vHTML += " 	</li> ";
					}

					vHTML += " </ul> ";
				}
				$("#layer_delivery_mo").show();
				$("#layer_delivery_mo")[0].innerHTML = vHTML;
			}
			else {
				$("#layer_delivery_mo").empty();
				$("#layer_delivery_mo").hide();
			}
		}
		else {
			$("#layer_delivery_mo").empty();
			$("#layer_delivery_mo").hide();
		}
	}
	catch (e) {
		console.log("[Error]fnMakeTrackLayerData : " + e.message);
	}
}

//레이어 팝업 - List
function fnMakeTrackLayerList(vJsonData) {
	var vHTML = "";

	var vResult = JSON.parse(vJsonData).Tracking;

	try {

		if (vResult == undefined) {
			vHTML += "   <tr class=\"row\" data-row=\"row_1\"> ";
			vHTML += "   	<td colspan=\"6\">데이터가 없습니다.</td> ";
			vHTML += "   	<td class=\"mobile_layout\" colspan=\"6\"> ";
			vHTML += "			데이터가 없습니다.";
			vHTML += "   	</td>";
			vHTML += "   </tr> ";
		} else {
			if (vResult.length > 0) {

				$.each(vResult, function (i) {

					if (i == 0) {
						vHTML += "   <tr class=\"row\" data-row=\"row_1\" style=\"background-color:#f5f5f5\"> ";
					} else {
						vHTML += "   <tr class=\"row\" data-row=\"row_1\"> ";
					}
					vHTML += "   	<td>" + _fnToNull(vResult[i]["HBL_NO"]) + "</td> ";
					vHTML += "   	<td>" + _fnToNull(vResult[i]["CNTR_NO"]) + "</td> ";
					vHTML += "   	<td>" + _fnToNull(vResult[i]["MBL_NO"]) + "</td> ";
					vHTML += "   	<td>" + _fnToNull(vResult[i]["EVENT_NM"]) + "</td> ";
					vHTML += "   	<td> ";
					if (_fnToNull(vResult[i]["ACT_LOC_NM"]) != "") {
						vHTML += "   		" + _fnToNull(vResult[i]["ACT_LOC_NM"]) + "<br> ";
					}
					vHTML += "   		" + String(_fnToNull(vResult[i]["ACT_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " " + _fnFormatTime(_fnToNull(vResult[i]["ACT_HM"])) + " ";
					vHTML += "   	</td> ";
					vHTML += "   	<td> ";
					//vHTML += "   		<button type=\"button\" class=\"file\" onclick=\"layerPopup('#file_pop');\"><img src=\"images/icn_file.png\" class=\"첨부파일\"><span class=\"num\">1</span></button> ";
					vHTML += "   	</td> ";
					vHTML += "   	<!-- mobile_layout --> ";
					vHTML += "   	<td class=\"mobile_layout\" colspan=\"6\"> ";
					vHTML += "   		<div class=\"layout_type5\"> ";
					vHTML += "   			<div class=\"row s1\"> ";
					vHTML += "   				<div class=\"col w1\">House B/L :</div> ";
					vHTML += "   				<div class=\"col\">" + _fnToNull(vResult[i]["HBL_NO"]) + "</div> ";
					vHTML += "   			</div> ";
					vHTML += "   			<div class=\"row s2\"> ";
					vHTML += "   				<table> ";
					vHTML += "   					<tbody> ";
					vHTML += "   						<tr> ";
					vHTML += "   							<th>Container No :</th> ";
					vHTML += "   							<td>" + _fnToNull(vResult[i]["CNTR_NO"]) + "</td> ";
					vHTML += "   						</tr> ";
					vHTML += "   						<tr> ";
					vHTML += "   							<th>Status :</th> ";
					vHTML += "   							<td>" + _fnToNull(vResult[i]["MBL_NO"]) + "</td> ";
					vHTML += "   						</tr> ";
					vHTML += "   						<tr> ";
					vHTML += "   							<th>Last Location :</th> ";
					vHTML += "   							<td> ";
					if (_fnToNull(vResult[i]["ACT_LOC_NM"]) != "") {
						vHTML += "   		" + _fnToNull(vResult[i]["ACT_LOC_NM"]) + "<br> ";
					}
					vHTML += "   								" + String(_fnToNull(vResult[i]["ACT_YMD"])).replace(/(\d{4})(\d{2})(\d{2})/, '$1.$2.$3') + " " + _fnFormatTime(_fnToNull(vResult[i]["ACT_HM"])) + " ";
					vHTML += "   							</td> ";
					vHTML += "   						</tr> ";
					vHTML += "   						<tr> ";
					vHTML += "   							<th>Doc :</th> ";
					vHTML += "   							<td>";
					//vHTML += "									< button type=\"button\" class=\"file\" onclick=\"layerPopup('#file_pop');\"><img src=\"images/mo/icn_file.png\" class=\"첨부파일\"><span class=\"num\">1</span></button>
					vHTML += "								</td > ";
					vHTML += "   						</tr> ";
					vHTML += "   					</tbody> ";
					vHTML += "   				</table> ";
					vHTML += "   			</div> ";
					//vHTML += "   			<button type=\"button\" class=\"btn_type1\">상세</button> ";
					vHTML += "   		</div> ";
					vHTML += "   	</td> ";
					vHTML += "   	<!-- //mobile_layout --> ";

					vHTML += " <input type=\"hidden\" name=\"hdn_layer_cntrNo\" value=\"" + _fnToNull(vResult[i]["CNTR_NO"]) + "\">";
					vHTML += " <input type=\"hidden\" name=\"hdn_layer_hblNo\" value=\"" + _fnToNull(vResult[i]["HBL_NO"]) + "\">";

					vHTML += "   </tr> ";

				});
			} else {
				vHTML += "   <tr class=\"row\" data-row=\"row_1\"> ";
				vHTML += "   	<td colspan=\"6\">데이터가 없습니다.</td> ";
				vHTML += "   	<td class=\"mobile_layout\" colspan=\"6\"> ";
				vHTML += "			데이터가 없습니다.";
				vHTML += "   	<td>";
				vHTML += "   </tr> ";
			}
		}

		$("#layer_delivery_list")[0].innerHTML = vHTML;

		if (vResult.length > 6) {
			$('#layer_tracking_scrollbar').slimScroll({
				height: '215px'
			});
		}
	}
	catch (e) {
		console.log("[Error]fnMakeTrackLayerList : " + e.message);
	}
}
////////////////////////API////////////////////////////

