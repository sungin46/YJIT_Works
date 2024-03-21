


///////////////////////jquery event////////////////////////////
//수출입화물정보 - 화물진행정보 검색 버튼
$(document).on("click", "#btn_Cargo_Search", function () {
    fnGetXml_Cargo();
});

//수출입화물정보 - 수출신고번호 검색 버튼
$(document).on("click", "#btn_Outbound_Search", function () {

    fnGetXml_OutBound();
});


/////////////////////function///////////////////////////////////

//수출입화물정보 - 화물진행정보 검색
function fnGetXml_Cargo() {
    try {
        //다른 input 초기화
        $("#input_UniOBnum").val("");
        $("#input_UniOBbl").val("");

        $(".unipass_output").hide();

        if ($("input:radio[name=cargo01]:checked").val() == "BL") {
            //수출신고번호 
            fnXmlParsing_Cargo(_fnGetAjaxData("GET", _HomeUrl + "/HP_Unipass", "GetCargoInfo?crkyCn=i220k129u161i054w030p040s2&mblNo=" + _fnToNull($("#input_UniCargoMBL").val().toUpperCase().trim()) + "&hblNo=" + _fnToNull($("#input_UniCargoHBL").val().toUpperCase().trim()) + "&blYy=" + $("#select_UniCargoYear option:selected").val(), false, "xml", ""));
        }
        else if ($("input:radio[name=cargo02]:checked").val() == "MTNO") {
            fnXmlParsing_Cargo(_fnGetAjaxData("GET", _HomeUrl + "/HP_Unipass", "GetCargoInfo?crkyCn=i220k129u161i054w030p040s2&cargMtNo=" + _fnToNull($("#input_UniCargoMtno").val().toUpperCase().trim()), false, "xml", ""));
        }

        $("#div_UniCargoArea").show();
    }
    catch (e) {
        console.log(e.message);
    }


}

//수출입화물정보 - 수출신고번호 검색
function fnGetXml_OutBound() {

    try {
        //input 화물진행정보 초기화
        $("#input_UniCargoMBL").val("");
        $("#input_UniCargoHBL").val("");
        $("#select_UniCargoYear option:eq(1)").prop("selected", true);
        $("#input_UniCargoMtno").val("");

        $(".unipass_output").hide();

        if ($("input:radio[name=export01]:checked").val() == "OUTBOUND") {
            //수출신고번호 
            fnXmlParsing_OBnum(_fnGetAjaxData("GET", _HomeUrl + "/HP_Unipass", "GetOBNumInfo?crkyCn=u270b149n161k024l060s050u1&expDclrNo=" + $("#input_UniOBnum").val(), false, "xml", ""));
            $("#div_UniOB_NumArea").show();
        }
        else if ($("input:radio[name=export02]:checked").val() == "BL") {
            fnXmlParsing_OBbl(_fnGetAjaxData("GET", _HomeUrl + "/HP_Unipass", "GetOBBLInfo?crkyCn=u270b149n161k024l060s050u1&blNo=" + $("#input_UniOBbl").val(), false, "xml", ""));
            $("#div_UniOB_BLArea").show();
        }
    }
    catch (e) {
        console.log(e.message);
    }


}



//////////////////////function makelist////////////////////////
function fnXmlParsing_Cargo(vXML) {

    var vHTML = "";

    if ($(vXML).find('tCnt').text() == "0") {

        //데이터 없을 경우	
        vHTML += " <table>                                        ";
        vHTML += "   <colgroup class=\"mo\"> ";
        vHTML += "   	<col class=\"w3\">  ";
        vHTML += "   	<col>               ";
        vHTML += "   	<col class=\"w3\">  ";
        vHTML += "   	<col>               ";
        vHTML += "   </colgroup>             ";
        vHTML += " 	<colgroup class=\"pc\">                      ";
        vHTML += " 		<col class=\"w3\">                       ";
        vHTML += " 		<col>                                    ";
        vHTML += " 	</colgroup>                                  ";
        vHTML += " 		<tr class=\"pc\">                        ";
        vHTML += " 			<td colspan=\"8\">데이터가 없습니다.</td> ";
        vHTML += " 		</tr>                                    ";
        vHTML += " 		<tr class=\"mo\">                        ";
        vHTML += " 			<td colspan=\"8\">데이터가 없습니다.</td> ";
        vHTML += " 		</tr>                                    ";
        vHTML += " </table>                                       ";

        $("#div_UniCargoFirst")[0].innerHTML = vHTML;

        $("#div_UniCargoSecond").hide();
        $(".notice_box").hide();
        $(".cnt_box").hide();
    }
    else if ($(vXML).find('tCnt').text() == "-1") {
        //데이터 없을 경우	
        vHTML += " <table>                                        ";
        vHTML += "   <colgroup class=\"mo\"> ";
        vHTML += "   	<col class=\"w3\">  ";
        vHTML += "   	<col>               ";
        vHTML += "   </colgroup>             ";
        vHTML += " 	<colgroup class=\"pc\">                      ";
        vHTML += " 		<col class=\"w3\">                       ";
        vHTML += " 		<col>                                    ";
        vHTML += " 	</colgroup>                                  ";
        vHTML += " 		<tr class=\"pc\">                        ";
        vHTML += " 			<td colspan=\"8\">[화물관리번호(cargMtNo)], [Master B/L번호와 BL년도], [House B/L번호과 BL년도] 중 한가지는 필수입력입니다. 또는 화물관리번호는 15자리 이상 자리로 입력하셔야 합니다.</td>              ";
        vHTML += " 		</tr>                                    ";
        vHTML += " 		<tr class=\"mo\">                        ";
        vHTML += " 			<td colspan=\"4\">[화물관리번호(cargMtNo)], [Master B/L번호와 BL년도], [House B/L번호과 BL년도] 중 한가지는 필수입력입니다. 또는 화물관리번호는 15자리 이상 자리로 입력하셔야 합니다.</td>              ";
        vHTML += " 		</tr>                                    ";
        vHTML += " </table>                                       ";

        $("#div_UniCargoFirst")[0].innerHTML = vHTML;

        $("#div_UniCargoSecond").hide();
        $(".notice_box").hide();
        $(".cnt_box").hide();
    }
    else {
        //데이터가 있을 경우expDclrNoPrExpFfmnBrkdQryRsltVo
        $(vXML).find('cargCsclPrgsInfoQryVo').each(function () {

            vHTML += " <table>                                        ";
            vHTML += " 	<colgroup class=\"mo\">                      ";
            vHTML += " 		<col class=\"w3\">                       ";
            vHTML += " 		<col>                                    ";
            vHTML += " 		<col class=\"w3\">                       ";
            vHTML += " 		<col>                                    ";
            vHTML += " 	</colgroup>                                  ";
            vHTML += " 	<colgroup class=\"pc\">                      ";
            vHTML += " 		<col class=\"w3\">                       ";
            vHTML += " 		<col>                                    ";
            vHTML += " 		<col class=\"w3\">                       ";
            vHTML += " 		<col>                                    ";
            vHTML += " 		<col class=\"w3\">                       ";
            vHTML += " 		<col>                                    ";
            vHTML += " 		<col class=\"w3\">                       ";
            vHTML += " 		<col>                                    ";
            vHTML += " 	</colgroup>                                  ";
            vHTML += " 	<tbody>                                      ";
            vHTML += " 		<tr>                                     ";
            vHTML += " 			<th>화물관리번호</th>                     ";
            vHTML += " 			<td>" + $(this).find('cargMtNo').text() + "</td>                            ";
            vHTML += " 			<th>진행상태</th>                       ";
            vHTML += " 			<td>" + $(this).find('prgsStts').text() + "</td>                            ";
            vHTML += " 			<th class=\"pc\">선사/항공사</th>        ";
            vHTML += " 			<td colspan=\"3\" class=\"pc\">" + $(this).find('shcoFlco').text() + "</td> ";
            vHTML += " 		</tr>                                    ";
            vHTML += " 		<tr>                                     ";
            vHTML += " 			<th>M B/L-H B/L</th>                 ";
            vHTML += " 			<td>" + $(this).find('mblNo').text() + "-" + $(this).find('hblNo').text() + "</td>                            ";
            vHTML += " 			<th>화물구분</th>                       ";
            vHTML += " 			<td>" + $(this).find('cargTp').text() + "</td>                            ";
            vHTML += " 			<th class=\"pc\">선박/항공편명</th>       ";
            vHTML += " 			<td colspan=\"3\" class=\"pc\">" + $(this).find('shipNm').text() + "</td> ";
            vHTML += " 		</tr>                                    ";
            vHTML += " 		<tr>                                     ";
            vHTML += " 			<th>통관진행상태</th>                     ";
            vHTML += " 			<td>" + $(this).find('csclPrgsStts').text() + "</td>                            ";
            vHTML += " 			<th>처리일시</th>                       ";
            vHTML += " 			<td>" + $(this).find('prcsDttm').text() + "</td>                            ";
            vHTML += " 			<th class=\"pc\">선박국적</th>          ";
            vHTML += " 			<td class=\"pc\">" + $(this).find('shipNatNm').text() + "</td>               ";
            vHTML += " 			<th class=\"pc\">선박대리점</th>         ";
            vHTML += " 			<td class=\"pc\">" + $(this).find('agnc').text() + "</td>               ";
            vHTML += " 		</tr>                                    ";
            vHTML += " 		<tr>                                     ";
            vHTML += " 			<th>품명</th>                          ";
            vHTML += " 			<td colspan=\"3\">" + $(this).find('prnm').text() + "</td>              ";
            vHTML += " 			<th class=\"pc\">적재항</th>           ";
            vHTML += " 			<td colspan=\"3\" class=\"pc\">" + $(this).find('ldprCd').text() + " : " + $(this).find('ldprNm').text() + ", " + $(this).find('lodCntyCd').text() + "</td> ";
            vHTML += " 		</tr>                                    ";
            vHTML += " 		<tr>                                     ";
            vHTML += " 			<th>포장개수</th>                       ";
            vHTML += " 			<td>" + $(this).find('pckGcnt').text() + " " + $(this).find('pckUt').text() + "</td>                            ";
            vHTML += " 			<th>총 중량</th>                       ";
            vHTML += " 			<td>" + $(this).find('ttwg').text() + " " + $(this).find('wghtUt').text() + "</td>                            ";
            vHTML += " 			<th class=\"pc\">양륙항</th>           ";
            vHTML += " 			<td class=\"pc\">" + $(this).find('dsprCd').text() + " : " + $(this).find('dsprNm').text() + "</td>               ";
            vHTML += " 			<th class=\"pc\">입항세관</th>          ";
            vHTML += " 			<td class=\"pc\">" + $(this).find('etprCstm').text() + "</td>               ";
            vHTML += " 		</tr>                                    ";
            vHTML += " 		<tr>                                     ";
            vHTML += " 			<th>용적</th>                          ";
            vHTML += " 			<td>" + $(this).find('msrm').text() + "</td>                            ";
            vHTML += " 			<th>B/L유형</th>                       ";
            vHTML += " 			<td>" + $(this).find('blPtNm').text() + "</td>                            ";
            vHTML += " 			<th class=\"pc\">입항일</th>           ";
            vHTML += " 			<td class=\"pc\">" + $(this).find('etprDt').text() + "</td>               ";
            vHTML += " 			<th class=\"pc\">항차</th>             ";
            vHTML += " 			<td class=\"pc\">" + $(this).find('vydf').text() + "</td>               ";
            vHTML += " 		</tr>                                    ";
            vHTML += " 		<tr>                                     ";
            vHTML += " 			<th>관리대상지정여부</th>                  ";
            vHTML += " 			<td>" + $(this).find('msrm').text() + "</td>                            ";
            vHTML += " 			<th>컨테이너개수</th>                     ";
            vHTML += " 			<td>" + $(this).find('blPtNm').text() + "</td>                            ";
            vHTML += " 			<th class=\"pc\">반출의무과태료</th>      ";
            vHTML += " 			<td class=\"pc\">" + $(this).find('etprDt').text() + "</td>               ";
            vHTML += " 			<th class=\"pc\">신고지연가산세</th>      ";
            vHTML += " 			<td class=\"pc\">" + $(this).find('vydf').text() + "</td>               ";
            vHTML += " 		</tr>                                    ";
            vHTML += " 		<tr class=\"pc\">                        ";
            vHTML += " 			<th>특수화물코드</th>                     ";
            vHTML += " 			<td>" + $(this).find('spcnCargCd').text() + "</td>                            ";
            vHTML += " 			<th>컨테이너번호</th>                     ";
            vHTML += " 			<td colspan=\"5\">" + $(this).find('cntrNo').text() + "</td>              ";
            vHTML += " 		</tr>                                    ";
            vHTML += " 	</tbody>                                     ";
            vHTML += " </table>                                       ";
        });

        $("#div_UniCargoFirst")[0].innerHTML = vHTML;
        $("#span_UniCount")[0].innerHTML = "전체 <em>" + $(vXML).find('cargCsclPrgsInfoDtlQryVo').length + "</em>건";

        vHTML = "";

        vHTML += "   <table>                                                ";
        vHTML += "   	<colgroup>                                         ";
        vHTML += "   		<col style=\"width: 10%\">                     ";
        vHTML += "   		<col style=\"width: 18%\">                     ";
        vHTML += "   		<col style=\"width: 18%\">                     ";
        vHTML += "   		<col style=\"width: 18%\">                     ";
        vHTML += "   		<col style=\"width: 18%\">                     ";
        vHTML += "   		<col style=\"width: 18%\">                     ";
        vHTML += "   	</colgroup>                                        ";
        vHTML += "   	<thead>                                            ";
        vHTML += "   		<tr>                                           ";
        vHTML += "   			<th rowspan=\"2\">No</th>                  ";
        vHTML += "   			<th>처리단계</th>                          ";
        vHTML += "   			<th>장치장/장치위치</th>                        ";
        vHTML += "   			<th>포장개수</th>                             ";
        vHTML += "   			<th>반출입(처리)일시</th>                       ";
        vHTML += "   			<th>신고번호</th>                             ";
        vHTML += "   		</tr>                                          ";
        vHTML += "   		<tr>                                           ";
        vHTML += "   			<th>처리일시</th>                             ";
        vHTML += "   			<th>장치장명</th>                             ";
        vHTML += "   			<th>중량</th>                                ";
        vHTML += "   			<th>반출입(처리)내용</th>                       ";
        vHTML += "   			<th>반출입근거번호</th>                         ";
        vHTML += "   		</tr>                                          ";
        vHTML += "   	</thead>                                           ";
        vHTML += "   	<tbody>                                            ";

        var vLength = $(vXML).find('cargCsclPrgsInfoDtlQryVo').length;

        $.each($(vXML).find('cargCsclPrgsInfoDtlQryVo'), function (i) {

            if (i % 2 == 1) {
                vHTML += "   		<tr style=\"background: #fafafa;\">                                           ";
            } else {
                vHTML += "   		<tr>                                           ";
            }

            vHTML += "   			<td class=\"a_center\" rowspan=\"2\">" + vLength + "</td> ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('cargTrcnRelaBsopTpcd').text() + "</td>               ";
            vHTML += "   			<td>" + $(this).find('shedSgn').text() + "</td>                                  ";
            vHTML += "   			<td class=\"a_right\">" + $(this).find('pckGcnt').text() + " " + $(this).find('pckUt').text() + "</td>                ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('rlbrDttm').text() + "</td>               ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('dclrNo').text() + "</td>               ";
            vHTML += "   		</tr>                                          ";

            if (i % 2 == 1) {
                vHTML += "   		<tr style=\"background: #fafafa;\">                                           ";
            }
            else {
                vHTML += "   		<tr>                                           ";
            }
            vHTML += "   			<td class=\"a_center\">" + $(this).find('prcsDttm').text().substring(0, 4) + "-" + $(this).find('prcsDttm').text().substring(4, 6) + "-" + $(this).find('prcsDttm').text().substring(6, 8) + " " + $(this).find('prcsDttm').text().substring(8, 10) + ":" + $(this).find('prcsDttm').text().substring(10, 12) + ":" + $(this).find('prcsDttm').text().substring(12, 14) + "</td>";
            vHTML += "   			<td>" + $(this).find('shedNm').text() + "</td>                                  ";
            vHTML += "   			<td class=\"a_right\">" + fnSetComma($(this).find('wght').text()) + " " + $(this).find('wghtUt').text() + "</td>                ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('rlbrCn').text() + "</td>               ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('rlbrBssNo').text() + "</td>               ";
            vHTML += "   		</tr>		                                   ";

            vLength = vLength - 1;
        });

        vHTML += "   	</tbody>                                           ";
        vHTML += "   </table>                                               ";

        $("#div_UniCargoSecond")[0].innerHTML = vHTML;

        $("#div_UniCargoSecond").show();
        $(".notice_box").show();
        $(".cnt_box").show();
    }
}

//수출이행내역 - 수출신고번호
function fnXmlParsing_OBnum(vXML) {

    var vHTML = "";

    if ($(vXML).find('tCnt').text() == "0") {
        //데이터 없을 경우	
        vHTML += " <table>                                        ";
        vHTML += "   <colgroup class=\"mo\"> ";
        vHTML += "   	<col class=\"w3\">  ";
        vHTML += "   	<col>               ";
        vHTML += "   	<col class=\"w3\">  ";
        vHTML += "   	<col>               ";
        vHTML += "   </colgroup>             ";
        vHTML += " 	<colgroup class=\"pc\">                      ";
        vHTML += " 		<col class=\"w3\">                       ";
        vHTML += " 		<col>                                    ";
        vHTML += " 	</colgroup>                                  ";
        vHTML += " 		<tr class=\"pc\">                        ";
        vHTML += " 			<td colspan=\"8\">데이터가 없습니다.</td> ";
        vHTML += " 		</tr>                                    ";
        vHTML += " 		<tr class=\"mo\">                        ";
        vHTML += " 			<td colspan=\"8\">데이터가 없습니다.</td> ";
        vHTML += " 		</tr>                                    ";
        vHTML += " </table>                                       ";

        $(".cnt_box").hide();
        $("#div_UniOB_NumSecond").hide();
        $("#div_UniOB_NumFirst")[0].innerHTML = vHTML;
    }
    else if ($(vXML).find('tCnt').text() == "-1") {
        //검색을 잘 못 하였을 경우
        vHTML += " <table>                                        ";
        vHTML += "   <colgroup class=\"mo\"> ";
        vHTML += "   	<col class=\"w3\">  ";
        vHTML += "   	<col>               ";
        vHTML += "   	<col class=\"w3\">  ";
        vHTML += "   	<col>               ";
        vHTML += "   </colgroup>             ";
        vHTML += " 	<colgroup class=\"pc\">                      ";
        vHTML += " 		<col class=\"w3\">                       ";
        vHTML += " 		<col>                                    ";
        vHTML += " 	</colgroup>                                  ";
        vHTML += " 		<tr class=\"pc\">                        ";
        vHTML += " 			<td colspan=\"8\">" + $(vXML).find('ntceInfo').text() + "</td> ";
        vHTML += " 		</tr>                                    ";
        vHTML += " 		<tr class=\"mo\">                        ";
        vHTML += " 			<td colspan=\"8\">" + $(vXML).find('ntceInfo').text() + "</td> ";
        vHTML += " 		</tr>                                    ";
        vHTML += " </table>                                       ";

        $(".cnt_box").hide();
        $("#div_UniOB_NumSecond").hide();
        $("#div_UniOB_NumFirst")[0].innerHTML = vHTML;
    }
    else {
        //데이터가 있을 경우
        $(vXML).find('expDclrNoPrExpFfmnBrkdQryRsltVo').each(function () {
            vHTML += "   <table>                           ";
            vHTML += "   	<colgroup>                    ";
            vHTML += "   		<col class=\"w3\">        ";
            vHTML += "   		<col>                     ";
            vHTML += "   		<col class=\"w3\">        ";
            vHTML += "   		<col>                     ";
            vHTML += "   	</colgroup>                   ";
            vHTML += "   	<tbody>                       ";
            vHTML += "   		<tr>                      ";
            vHTML += "   			<th>수출화주/대행자</th>   ";
            vHTML += "   			<td>" + $(this).find('exppnConm').text() + "</td> ";
            vHTML += "   			<th>제조자</th>         ";
            vHTML += "   			<td>" + $(this).find('mnurConm').text() + "</td> ";
            vHTML += "   		</tr>                     ";
            vHTML += "   		<tr>                      ";
            vHTML += "   			<th>적재의무기한</th>     ";
            vHTML += "   			<td>" + $(this).find('loadDtyTmIm').text() + "</td>   ";
            vHTML += "   			<th>수리일자</th>        ";
            vHTML += "   			<td>" + $(this).find('acptDt').text() + "</td>   ";
            vHTML += "   		</tr>                     ";
            vHTML += "   		<tr>                      ";
            vHTML += "   			<th>통관포장개수</th>     ";
            vHTML += "   			<td>" + $(this).find('csclPckGcnt').text() + " " + $(this).find('csclPckUt').text() + "</td>        ";
            vHTML += "   			<th>통관중량(KG)</th>    ";
            vHTML += "   			<td>" + $(this).find('csclWght').text() + "</td>       ";
            vHTML += "   		</tr>                     ";
            vHTML += "   		<tr>                      ";
            vHTML += "   			<th>선기적완료여부</th>    ";
            vHTML += "   			<td>" + $(this).find('shpmCmplYn').text() + "</td>            ";
            vHTML += "   			<th>선박/편명</th>       ";
            vHTML += "   			<td>" + $(this).find('sanm').text() + "</td>   ";
            vHTML += "   		</tr>                     ";
            vHTML += "   		<tr>                      ";
            vHTML += "   			<th>선기적포장개수</th>    ";
            vHTML += "   			<td>" + $(this).find('shpmPckGcnt').text() + " " + $(this).find('shpmPckUt').text() + "</td>        ";
            vHTML += "   			<th>선기적중량(KG)</th>   ";
            vHTML += "   			<td>" + $(this).find('shpmWght').text() + "</td>       ";
            vHTML += "   		</tr>                     ";
            vHTML += "   	</tbody>                      ";
            vHTML += "   </table>                          ";

            $("#div_UniOB_NumFirst")[0].innerHTML = vHTML;
            $("#span_UniOB_NumCount")[0].innerHTML = "전체 <em>" + $(vXML).find('expDclrNoPrExpFfmnBrkdDtlQryRsltVo').length + "</em>건";

            vHTML = "";

            vHTML += "   <table>                                                  ";
            vHTML += "   	<colgroup>                                           ";
            vHTML += "   		<col style=\"width: 25%\">                       ";
            vHTML += "   		<col style=\"width: 25%\">                       ";
            vHTML += "   		<col style=\"width: 25%\">                       ";
            vHTML += "   		<col style=\"width: 25%\">                       ";
            vHTML += "   	</colgroup>                                          ";
            vHTML += "   	<thead>                                              ";
            vHTML += "   		<tr>                                             ";
            vHTML += "   			<th>B/L 번호</th>                              ";
            vHTML += "   			<th>선적일자</th>                               ";
            vHTML += "   			<th>선기적포장개수</th>                           ";
            vHTML += "   			<th>선기적중량(KG)</th>                          ";
            vHTML += "   		</tr>                                            ";
            vHTML += "   	</thead>                                             ";
            vHTML += "   	<tbody>		                                         ";


            $(vXML).find('expDclrNoPrExpFfmnBrkdDtlQryRsltVo').each(function (i) {

                if (i % 2 == 1) {
                    vHTML += "   		<tr style=\"background: #fafafa;\">                                           ";
                }
                else {
                    vHTML += "   		<tr>                                           ";
                }
                vHTML += "   			<td class=\"a_center\">" + $(this).find('blNo').text() + "</td> ";
                vHTML += "   			<td class=\"a_center\">" + $(this).find('tkofDt').text() + "</td>       ";
                vHTML += "   			<td class=\"a_right\">" + $(this).find('shpmPckGcnt').text() + "</td>              ";
                vHTML += "   			<td class=\"a_right\">" + $(this).find('shpmWght').text() + " " + $(this).find('shpmPckUt').text() + "</td>    ";
                vHTML += "   		</tr>                                            ";

            });

            vHTML += "   	</tbody>                                             ";
            vHTML += "   </table>                                                 ";
        });

        $(".cnt_box").show();
        $("#div_UniOB_NumSecond").show();
        $("#div_UniOB_NumSecond")[0].innerHTML = vHTML;
    }
}

//수출이행내역 - BL
function fnXmlParsing_OBbl(vXML) {

    var vHTML = "";

    if ($(vXML).find('tCnt').text() == "0") {
        //데이터 없을 경우	
        vHTML += " <table>                                        ";
        vHTML += "   <colgroup class=\"mo\"> ";
        vHTML += "   	<col class=\"w3\">  ";
        vHTML += "   	<col>               ";
        vHTML += "   	<col class=\"w3\">  ";
        vHTML += "   	<col>               ";
        vHTML += "   </colgroup>             ";
        vHTML += " 	<colgroup class=\"pc\">                      ";
        vHTML += " 		<col class=\"w3\">                       ";
        vHTML += " 		<col>                                    ";
        vHTML += " 	</colgroup>                                  ";
        vHTML += " 		<tr class=\"pc\">                        ";
        vHTML += " 			<td colspan=\"8\">데이터가 없습니다.</td> ";
        vHTML += " 		</tr>                                    ";
        vHTML += " 		<tr class=\"mo\">                        ";
        vHTML += " 			<td colspan=\"8\">데이터가 없습니다.</td> ";
        vHTML += " 		</tr>                                    ";
        vHTML += " </table>                                       ";

        $(".cnt_box").hide();
        $("#div_UniOB_BlFirst")[0].innerHTML = vHTML;
    }



    else if ($(vXML).find('tCnt').text() == "-1") {
        //검색을 잘 못 하였을 경우
        vHTML += " <table>                                        ";
        vHTML += " 	<colgroup class=\"pc\">                      ";
        vHTML += " 		<col class=\"w3\">                       ";
        vHTML += " 		<col>                                    ";
        vHTML += " 	</colgroup>                                  ";
        vHTML += " 		<tr class=\"pc\">                        ";
        vHTML += " 			<td colspan=\"8\">" + $(vXML).find('ntceInfo').text() + "</td>              ";
        vHTML += " 		</tr>                                    ";
        vHTML += " 		<tr class=\"mo\">                        ";
        vHTML += " 			<td colspan=\"8\">" + $(vXML).find('ntceInfo').text() + "</td> ";
        vHTML += " 		</tr>                                    ";
        vHTML += " </table>                                       ";

        $("#div_UniOB_BlFirst")[0].innerHTML = vHTML;
    }
    else {

        $("#span_UniOB_BlCount")[0].innerHTML = "전체 <em>" + $(vXML).find('expDclrNoPrExpFfmnBrkdBlNoQryRsltVo').length + "</em>건";

        vHTML += "   <table>                                                           ";
        vHTML += "   	<colgroup>                                                    ";
        vHTML += "   		<col style=\"width: 15%\">                                ";
        vHTML += "   		<col style=\"width: 10%\">                                ";
        vHTML += "   		<col style=\"width: 10%\">                                ";
        vHTML += "   		<col style=\"width: 15%\">                                ";
        vHTML += "   		<col style=\"width: 10%\">                                ";
        vHTML += "   		<col style=\"width: 10%\">                                ";
        vHTML += "   		<col style=\"width: 10%\">                                ";
        vHTML += "   	</colgroup>                                                   ";
        vHTML += "   	<thead>                                                       ";
        vHTML += "   		<tr>                                                      ";
        vHTML += "   			<th colspan=\"3\">통관사항</th>                          ";
        vHTML += "   			<th colspan=\"4\">선적사항</th>                          ";
        vHTML += "   		</tr>                                                     ";
        vHTML += "   		<tr>                                                      ";
        vHTML += "   			<th>수출자</th>                                         ";
        vHTML += "   			<th>수리일자</th>                                        ";
        vHTML += "   			<th>통관포장개수</th>                                      ";
        vHTML += "   			<th rowspan=\"2\">적하목록관리번호</th>                     ";
        vHTML += "   			<th>선기적지</th>                                        ";
        vHTML += "   			<th>선기적포장개수</th>                                    ";
        vHTML += "   			<th>분할회수</th>                                        ";
        vHTML += "   		</tr>                                                     ";
        vHTML += "   		<tr>                                                      ";
        vHTML += "   			<th>수출신고번호</th>                                      ";
        vHTML += "   			<th>적재의무기한</th>                                      ";
        vHTML += "   			<th>통관중량(KG)</th>                                    ";
        vHTML += "   			<th>출항일자</th>                                        ";
        vHTML += "   			<th>선기적중량(KG)</th>                                   ";
        vHTML += "   			<th>선기적완료여부</th>                                    ";
        vHTML += "   		</tr>                                                     ";
        vHTML += "   	</thead>                                                      ";
        vHTML += "   	<tbody>                                                       ";

        $(vXML).find('expDclrNoPrExpFfmnBrkdBlNoQryRsltVo').each(function () {

            vHTML += "   		<tr>                                                      ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('exppnConm').text() + "</td>              ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('acptDt').text() + "</td>                ";
            vHTML += "   			<td class=\"a_right\">" + $(this).find('csclPckGcnt').text() + " " + $(this).find('csclPckUt').text() + "</td>                      ";
            vHTML += "   			<td class=\"a_center\" rowspan=\"2\">" + $(this).find('mrn').text() + "</td> ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('shpmAirptPortNm').text() + "</td>                      ";
            vHTML += "   			<td class=\"a_right\">" + $(this).find('shpmPckGcnt').text() + " " + $(this).find('shpmPckUt').text() + "</td>                     ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('dvdeWdrw').text() + "</td>                         ";
            vHTML += "   		</tr>                                                     ";
            vHTML += "   		<tr>                                                      ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('expDclrNo').text() + "</td>         ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('loadDtyTmIm').text() + "</td>                ";
            vHTML += "   			<td class=\"a_right\">" + $(this).find('csclWght').text() + "</td>                     ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('tkofDt').text() + "</td>                ";
            vHTML += "   			<td class=\"a_right\">" + $(this).find('shpmWght').text() + "</td>                     ";
            vHTML += "   			<td class=\"a_center\">" + $(this).find('shpmcmplYn').text() + "</td>                         ";
            vHTML += "   		</tr>                                                     ";
        });

        vHTML += "   	</tbody>                                                      ";
        vHTML += "   </table>                                                          ";

        $("#div_UniOB_BlFirst")[0].innerHTML = vHTML;
    }
}

/////////////////////API///////////////////////////////////////