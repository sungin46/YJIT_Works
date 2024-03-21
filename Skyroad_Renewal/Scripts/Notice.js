$(function () {
    goSearch();


    $("#btn_search").click(function () {
        goSearch();
    });

    $("#stx").keyup(function (e) {
        if (e.keyCode == 13) {
            goSearch();
        }

    });
});


function goView(pageID) {
    location.href = "/community/noticeView?id=" + pageID;
}

function goPage(pageIndex) {
    _fnSearchData(pageIndex);
}

function goSearch() {
    _fnSearchData(1);
}

function _fnSearchData(pageIndex) {

    var opt1 = $("#type option:selected").val();
    var opt = $("#sf1 option:selected").val();
    var txtVal = $("#stx").val();

    var rtnJson;
    var rtnVal;
    var callObj = new Object();

    callObj.Option = opt;
    callObj.Type = opt1;
    callObj.SearchText = txtVal;
    callObj.Page = pageIndex;

    $.ajax({
        type: "POST",
        url: "/customer/CallAjax",
        async: false,
        dataType: "json",
        data: callObj,
        success: function (result) {
            rtnVal = result;    //JSON.stringify(result);
        }, error: function (xhr) {
            console.log("시스템 사정으로 요청하신 작업을 처리할 수 없습니다.");
            console.log(xhr);
            return;
        }
    });

    //$(".board_list > table").remove();
    
    var innerText = "";
    var innerPage = "";
    var totPageCnt;
    var maxPageCnt = 0;
    var nPage = 1;
    

    var vHTML = "";
    var vResult = "";

    if ($("#board_lang").val() == "EN")
    {
        if (rtnVal == undefined) {
            innerText += "<table> ";
            innerText += "	<colgroup> ";
            innerText += "		<col class='w1' /> ";
            innerText += "		<col class='w4' /> ";
            innerText += "		<col /> ";
            innerText += "		<col class='w2' /> ";
            innerText += "		<col class='w3' /> ";
            innerText += "	</colgroup> ";
            innerText += "	<thead> ";
            innerText += "		<tr> ";
            innerText += "			<th>No</th> ";
            innerText += "			<th>Type</th> ";
            innerText += "			<th>Title</th> ";
            innerText += "			<th>Writer</th> ";
            innerText += "			<th>Date</th> ";
            innerText += "		</tr> ";
            innerText += "	</thead> ";
            innerText += "<tbody> ";
            innerText += "<tr> ";
            innerText += "<td colspan=\"5\">There is not Data.</td>";
            innerText += "</tr> ";
            innerText += "</tbody> ";
            innerText += "</table> ";
        } else {
            innerText += "<table> ";
            innerText += "	<colgroup> ";
            innerText += "		<col class='w1' /> ";
            innerText += "		<col class='w4' /> ";
            innerText += "		<col /> ";
            innerText += "		<col class='w2' /> ";
            innerText += "		<col class='w3' /> ";
            innerText += "	</colgroup> ";
            innerText += "	<thead> ";
            innerText += "		<tr> ";
            innerText += "			<th>No</th> ";
            innerText += "			<th>Type</th> ";
            innerText += "			<th>Title</th> ";
            innerText += "			<th>Writer</th> ";
            innerText += "			<th>Date</th> ";
            innerText += "		</tr> ";
            innerText += "	</thead> ";
            innerText += "	<tbody> ";
    
            $(rtnVal).each(function (i) {
                totPageCnt = rtnVal[i].TOTCNT;
                maxPageCnt = maxPageCnt + 1;
                nPage = rtnVal[i].PAGE;
    
                if (rtnVal[i].NOTICE_YN == "y") {
                    innerText += "<tr> ";
                    innerText += "	<td><img src='/Images/cont/icn_notice.png' alt='Notice' class='icn_notice'></td> ";
                    if (rtnVal[i].TYPE == 0) {
                        innerText += "	<td>Notice</td> ";
                    } else {
                        innerText += "	<td>News</td> ";
                    }
                    innerText += "	<td class='a_left'><a href='#' onclick='goView(" + rtnVal[i].NOTICE_ID + ")'>" + rtnVal[i].TITLE + "</a></td> ";
                    innerText += "	<td>" + rtnVal[i].WRITER + "</td> ";
                    innerText += "	<td>" + rtnVal[i].REGDT.substring(0, 10) + "</td> ";
                    innerText += "</tr> ";
                } else {
                    innerText += "<tr> ";
                    innerText += "	<td>" + rtnVal[i].NUM + "</td> ";
                    if (rtnVal[i].TYPE == 0) {
                        innerText += "	<td>Notice</td> ";
                    } else {
                        innerText += "	<td>News</td> ";
                    }
                    innerText += "	<td class='a_left'><a href='#' onclick='goView(" + rtnVal[i].NOTICE_ID + ")'>" + rtnVal[i].TITLE + "</a></td> ";
                    innerText += "	<td>" + rtnVal[i].WRITER + "</td> ";
                    innerText += "	<td>" + rtnVal[i].REGDT.substring(0, 10) + "</td> ";
                    innerText += "</tr> ";
                }
            });
            innerText += "		</tbody> ";
            innerText += "	</table> ";
    
            fnPaging(totPageCnt, 10, 5, pageIndex);
        }
    }
    else
    {
        if (rtnVal == undefined) {
            //innerText += "<table> ";
            //innerText += "	<colgroup> ";
            //innerText += "		<col class='w1' /> ";
            //innerText += "		<col class='w4' /> ";
            //innerText += "		<col /> ";
            //innerText += "		<col class='w2' /> ";
            //innerText += "		<col class='w3' /> ";
            //innerText += "	</colgroup> ";
            //innerText += "	<thead> ";
            //innerText += "		<tr> ";
            //innerText += "			<th>No</th> ";
            //innerText += "			<th>구분</th> ";
            //innerText += "			<th>제목</th> ";
            //innerText += "			<th>작성자</th> ";
            //innerText += "			<th>작성일</th> ";
            //innerText += "		</tr> ";
            //innerText += "	</thead> ";
            //innerText += "<tbody> ";
            //innerText += "<tr> ";
            //innerText += "<td colspan=\"5\">등록된 데이터가 없습니다</td>";
            //innerText += "</tr> ";
            //innerText += "</tbody> ";
            //innerText += "</table> ";
            innerText += "<li>";
            innerText += "    <div class=\"no_data\">";
            innerText += "        <span><strong>등록된 데이터가 없습니다.</strong></span>";
            innerText += "    </div>";
            innerText += "</li>";
        } else {
            $(rtnVal).each(function (i) {
                totPageCnt = rtnVal[i].TOTCNT;
                maxPageCnt = maxPageCnt + 1;
                nPage = rtnVal[i].PAGE;

                innerText += " <li> ";
                innerText += " 	<a href=\"javascript:void(0)\" class=\"notice_tit\"> ";
                innerText += " 		<span class=\"icn q\">" + _fnToNull(rtnVal[i]["REGDT"]) + "</span> ";
                innerText += " 		" + _fnToNull(rtnVal[i]["TITLE"]) + "  ";
                innerText += " 	</a> ";
                innerText += " 	<div class=\"notice_cont\"> ";
                innerText += " 		<div class=\"scrollbar_notice\"> ";
                innerText += " 			<div class=\"inner\"> " + _fnToNull(rtnVal[i]["CONTENT"]) + " ";
                innerText += " 			</div> ";
                innerText += " 		</div> ";

                if (_fnToNull(rtnVal[i]["FILE_NAME"]) != "") {
                    innerText += " 		<div class=\"notice_file\"> ";
                    innerText += " 			<ul> ";


                    //파일이 있는 경우 그리기
                    if (_fnToNull(rtnVal[i]["FILE_NAME"]) != "") {
                        innerText += " 				<li> ";
                        innerText += "					<a href=\"/File/Download?filename=" + _fnToNull(rtnVal[i]["FILE_NAME"]) + "&rFilename=" + _fnToNull(rtnVal[i]["FILE"]) + "\"> ";
                        innerText += "						<span>" + _fnToNull(rtnVal[i]["FILE_NAME"]) + "</span> ";
                        innerText += "					</a> ";
                        innerText += "				</li> ";
                    }

                    if (_fnToNull(rtnVal[i]["FILE1_NAME"]) != "") {
                        innerText += " 				<li> ";
                        innerText += "					<a href=\"/File/Download?filename=" + _fnToNull(rtnVal[i]["FILE1_NAME"]) + "&rFilename=" + _fnToNull(rtnVal[i]["FILE1"]) + "\"> ";
                        innerText += "						<span>" + _fnToNull(rtnVal[i]["FILE1_NAME"]) + "</span> ";
                        innerText += "					</a> ";
                        innerText += "				</li> ";
                    }

                    if (_fnToNull(rtnVal[i]["FILE2_NAME"]) != "") {
                        innerText += " 				<li> ";
                        innerText += "					<a href=\"/File/Download?filename=" + _fnToNull(rtnVal[i]["FILE2_NAME"]) + "&rFilename=" + _fnToNull(rtnVal[i]["FILE2"]) + "\"> ";
                        innerText += "						<span>" + _fnToNull(rtnVal[i]["FILE2_NAME"]) + "</span> ";
                        innerText += "					</a> ";
                        innerText += "				</li> ";
                    }

                    innerText += " 			</ul> ";
                    innerText += " 		</div> ";
                }
            })
            fnPaging(totPageCnt, 10, 5, pageIndex);
        }
    }

    $("#notice_list")[0].innerHTML = innerText;
    $("#notice_list2")[0].innerHTML = innerText;

    //데이터 넣고 슬림 스크롤 넣기
    if ($('.scrollbar_notice').length > 0) {
        $('.scrollbar_notice').slimScroll({
            height: '630px',
            width: '100%',
            color: '#005bac',
            alwaysVisible: false,
            railVisible: true,
        })
    }
}

//totalData = 총 데이터 count
//dataPerPage = 한페이지에 나타낼 데이터 수
// pageCount = 한화면에 나타낼 페이지 수
//currentPage = 선택한 페이지 
function fnPaging(totalData, dataPerPage, pageCount, currentPage) {

    var totalPage = Math.ceil(totalData / dataPerPage);    // 총 페이지 수
    var pageGroup = Math.ceil(currentPage / pageCount);    // 페이지 그룹
    if (pageCount > totalPage) pageCount = totalPage;
    var last = pageGroup * pageCount;    // 화면에 보여질 마지막 페이지 번호
    if (last > totalPage) last = totalPage;
    var first = last - (pageCount - 1);    // 화면에 보여질 첫번째 페이지 번호
    var next = last + 1;
    var prev = first - 1;

    $("#notice_paging_list").empty();

    var prevPage;
    var nextPage;
    if (currentPage - 1 < 1) { prevPage = 1; } else { prevPage = currentPage - 1; }
    if (last < totalPage) { nextPage = currentPage + 1; } else { nextPage = last; }

    var vHTML = "";

    vHTML += " <a href=\"javascript:void(0)\" onclick=\"fnNoticeGoPage(1)\" class=\"page first\"> ";
    vHTML += " 	<span class=\"blind\">처음페이지</span> ";
    vHTML += " </a> ";
    vHTML += " <a href=\"javascript:void(0)\" onclick=\"fnNoticeGoPage(" + prevPage + ")\" class=\"page prev\"> ";
    vHTML += " 	<span class=\"blind\">이전페이지로 가기</span> ";
    vHTML += " </a> ";

    for (var i = first; i <= last; i++) {
        if (i == currentPage) {
            vHTML += " <span class=\"number\"><span class=\"on\">" + i + "</span></span> ";
        } else {
            vHTML += " <span class=\"number\"><span onclick=\"fnNoticeGoPage(" + i + ")\">" + i + "</span></span> ";
        }
    }

    vHTML += " <a href=\"javascript:void(0)\" onclick=\"fnNoticeGoPage(" + nextPage + ")\" class=\"page next\"> ";
    vHTML += " 	<span class=\"blind\">다음페이지로 가기</span> ";
    vHTML += " </a> ";
    vHTML += " <a href=\"javascript:void(0)\" onclick=\"fnNoticeGoPage(" + totalPage + ")\" class=\"page last\"> ";
    vHTML += " 	<span class=\"blind\">마지막페이지로 가기</span> ";
    vHTML += " </a> ";

    $("#notice_paging_list").append(vHTML);    // 페이지 목록 생성		
}
