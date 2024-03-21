$(function () {
    goSearch();

    $("._btn_write").on('click', function (e) {
        location.href = "/Admin/MemberWrite";
    });

    $("._search_btn").on('click', function (e) {
        _fnSearchData(1);
    });

    $("._select").on('change', function (e) {
        $("._search_btn").trigger('click');
    });
});

function _isnull(value) {
    if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
        return "";
    } else {
        return value;
    }
}

function goSearch() {
    _fnSearchData(1);
}

function goView(usrID) {
    location.href = "/Admin/MemberWrite?id=" + usrID;
}

function _fnSearchData(pageIndex) {
    var rtnVal;
    $.ajax({
        type: "POST",
        url: "/Admin/Member_CallAjax",
        async: false,
        dataType: "json",
        //data: callObj,
        success: function (result) {
            rtnVal = result;    // JSON.stringify(result);
        }, error: function (xhr) {
            console.log("시스템 사정으로 요청하신 작업을 처리할 수 없습니다.");
            console.log(xhr);
            return;
        }
    });

    $("#dataTbl > table").remove();

    var innerText = "";
    var innerPage = "";
    var totPageCnt;
    var maxPageCnt = 0;
    var nPage = 1;

    innerText += "<table width='100%' class='table table-bordered table-hover tb_style' id='data_table'> ";
    innerText += "	<colgroup> ";
    innerText += "		<col width='10%' /> ";
    innerText += "		<col width='*' /> ";
    innerText += "		<col width='15%' /> ";
    innerText += "		<col width='15%' /> ";
    innerText += "		<col width='15%' /> ";
    innerText += "	</colgroup> ";
    innerText += "	<thead> ";
    innerText += "		<tr> ";
    innerText += "			<th>번호</th> ";
    innerText += "			<th>아이디</th> ";
    innerText += "			<th>성명</th> ";
    innerText += "			<th>핸드폰</th> ";
    innerText += "			<th>등록일</th> ";
    innerText += "		</tr> ";
    innerText += "	</thead> ";
    innerText += "	<tbody> ";

    $(rtnVal).each(function (i) {
        innerText += "<tr> ";
        innerText += "	<td>" + rtnVal[i].RNUM + "</td> ";
        innerText += "	<td><a href='javascript:void(0);' onclick='goView(" + rtnVal[i].MEMB_NO + ")' class='_btn_edit' >" + rtnVal[i].M_ID + "</a></td> ";
        innerText += "	<td>" + rtnVal[i].M_NAME + "</td> ";
        innerText += "	<td>" + rtnVal[i].MOBILE + "</td> ";
        innerText += "	<td>" + _isnull(rtnVal[i].REGDT) + "</td> ";
        innerText += "</tr> ";
    });

    innerText += "		</tbody> ";
    innerText += "	</table> ";

    $("#dataTbl").append(innerText);
}