////////////////////전역 변수//////////////////////////

////////////////////jquery event///////////////////////
//$(function () {
        
//});

////////////////////////function///////////////////////
function _fnMakeJson(data) {
    if (data != undefined) {
        var str = JSON.stringify(data);
        if (str.indexOf("[") == -1) {
            str = "[" + str + "]";
        }
        return str;
    }
}

//Null 값 ""
function _fnToNull(data) {
    // undifined나 null을 null string으로 변환하는 함수. 
    if (String(data) == 'undefined' || String(data) == 'null') {
        return ''
    } else {
        return data
    }
}

//Null 값 0으로
function _fnToZero(data) {
    // undifined나 null을 null string으로 변환하는 함수. 
    if (String(data) == 'undefined' || String(data) == 'null' || String(data) == '' || String(data) == 'NaN') {
        return '0'
    } else {
        return data
    }
}

//숫자 width만큼 앞에 0 붙혀주는 함수 EX) widht = 2일떄 1은 01로 찍힘
function _pad(n, width) {
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

//콤마 찍기
function fnSetComma(n) {
    var reg = /(^[+-]?\d+)(\d{3})/;   // 정규식
    n += '';                          // 숫자를 문자열로 변환         
    while (reg.test(n)) {
        n = n.replace(reg, '$1' + ',' + '$2');
    }
    return n;
}

//날짜 yyyy-mm-dd 만들어 주는 포멧
function _fnFormatDate(vDate) {

    if (_fnToNull(vDate) == "") {
        return "";
    }

    var rxDatePattern = /^(\d{4})(\d{1,2})(\d{1,2})$/; //Declare Regex                  
    var vValue = vDate.replace(/-/gi, "");

    var dtArray = vValue.match(rxDatePattern); // is format OK?

    dtYear = dtArray[1];
    dtMonth = dtArray[2];
    dtDay = dtArray[3];

    return dtYear + "-" + _pad(dtMonth, 2) + "-" + _pad(dtDay, 2);
}

//사업자 번호 123-45-67890 만들어 주는 포멧
function _fnFormatCRN(vCRN) {

    if (_fnToNull(vCRN) == "") {
        return "";
    }

    var rxDatePattern = /^(\d{3})(\d{1,2})(\d{1,5})$/; //Declare Regex    
    var vValue = vCRN.replace(/-/gi, "");

    var dtArray = vValue.match(rxDatePattern); // is format OK?

    dtCrn1 = dtArray[1];
    dtCrn2 = dtArray[2];
    dtCrn3 = dtArray[3];

    return dtCrn1 + "-" + dtCrn2 + "-" + dtCrn3;
}

/* 지연 함수 - ms 시간만큼 지연하여 실행. */
function _fnsleep(delay) {
    var start = new Date().getTime();
    while (new Date().getTime() < start + delay);
}

// url 에서 parameter 추출
function _fnGetParam(sname) {
    var params = location.search.substr(location.search.indexOf("?") + 1);
    var sval = "";
    params = params.split("&");
    for (var i = 0; i < params.length; i++) {
        temp = params[i].split("=");
        if ([temp[0]] == sname) { sval = temp[1]; }
    }
    return sval;
}

//유비폼 인쇄 데이터 보여주기
function _fn_viewer_open(projectName, formName, datasetList, paramList) {

    var _params = {
        "projectName": projectName      //fn_setViewParam 함수에서 가져와 프로젝트명 셋팅
        , "formName": formName            //fn_setViewParam 함수에서 가져와 서식명 셋팅
    };

    for (var datasetValue in datasetList) {
        _params[datasetValue] = encodeURIComponent(datasetList[datasetValue]);
    }

    for (var paramValue in paramList) {
        _params[paramValue] = paramList[paramValue];
    }

    console.log(_params);

    //var _url = window.location.origin + contextPath + "/UView5/index.jsp"; //UBIFORM Viewer URL
    //var _url = "http://110.45.209.81:8572/UBIFORM/UView5/index.jsp"; //양재 IT 개발 서버에 설치한 UBIFORM Viewer URL
    //var _url = "http://110.45.218.43:8072/UBIFORM/UView5/index.jsp"; //양재 IT 개발 서버에 설치한 UBIFORM Viewer URL =====================운영운영운영============== 
    var _url = _ReportUrl;
    var d = new Date();
    var n = d.getTime();

    var name = "UBF_" + n;

    //팝업 오픈 Option 해당 설정은 window.open 설정을 참조0,status=0,toolbar=0,menubar=0, width=1280px,height=650px,left=0, top=0,scrollbars=0';  //팝업사이즈 window.open참고
    var windowoption = '/';  //팝업사이즈 window.open참고
    //var windowoption = 'location=0, directories=0,resizable=
    var form = document.createElement("form");

    form.setAttribute("method", "post");
    form.setAttribute("action", _url);

    for (var i in _params) {
        if (_params.hasOwnProperty(i)) {
            var param = document.createElement('input');[]
            param.type = 'hidden';
            param.name = i;
            param.value = encodeURI(_params[i]);
            form.appendChild(param);
        }
    }

    document.body.appendChild(form);
    form.setAttribute("target", name);
    //window.open("", name, windowoption);
    //window.open("/");
    form.submit();
    document.body.removeChild(form);
}

//Alert창
function _fnalert(vValue) {
    $(".layerPopup_bg").show();
    $(".alert").show();
    $("#Edoc_Alert_Content").text(vValue); //alert 내용 넣기
    $("#wrap").addClass("noscroll");
}

//Alert 창 끄기
function _fnalert_Close() {
    $(".layerPopup_bg").hide();
    $(".alert").hide();
    $("#Edoc_Alert_Content").text(""); //alert 내용 넣기
    $("#wrap").removeClass("noscroll");
}

//날짜 입력 시 무슨 요일인지 찾아주는 함수
function _fnGetWhatDay(vDate) {

    if (String(vDate).length != 8) {
        return vDate;
    }
    else
    {
        var vformat = String(vDate);
        vformat = vformat.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3'); 

        var week = ['일', '월', '화', '수', '목', '금', '토'];
        var dayOfWeek = week[new Date(vformat).getDay()];

        return dayOfWeek;
    }    
}

//시간 시간:분분 format 만들기
function _fnFormatTime(vTime)
{
    if (String(vTime).length > 3) {
        return String(vTime).replace(/(\d{2})(\d{2})/, '$1:$2');
    }
    else {
        var vValue = "0" + String(vTime)
        return vValue.replace(/(\d{2})(\d{2})/, '$1:$2');
    }
}

function _fnGetAjaxData(type, url, action, param_Obj, chk_obj) {
    //    alert("Call Custom");

    var rtnJson;
    var urlpaths = "/" + url + "/" + action;
    var callObj = new Object();

    if (url == null) return rtnJson;

    if (chk_obj) {
        callObj = param_Obj;
    } else {
        if (action == "MailSend") {
            callObj.paramObj = _fnMakeJson2(param_Obj);
        } else {
            callObj.paramObj = _fnMakeJson(param_Obj);
        }
    }

    $.ajax({
        type: "POST",
        url: urlpaths,
        async: false,
        dataType: "json",
        data: callObj,
        success: function (result) {
            rtnJson = result; // JSON.stringify(result);
        }, error: function (xhr) {
            console.log("시스템 사정으로 요청하신 작업을 처리할 수 없습니다.");
            console.log(xhr);
            return;
        }
    });
    //    alert(rtnJson);
    return rtnJson;

}

function _fnAlertMsg(msg, id) {
    $(".alert_cont .inner").html("");
    $(".alert_cont .inner").html(msg);
    if (_fnToNull(id) != "") {
        layerPopup('#alert01', "", true, id);
    } else {
        layerPopup('#alert01', "");
    }
    $("#alert_close").focus();
}

/* 레이어팝업 */
var layerPopup = function (obj, target, bool) {
    var $laybtn = $(obj),
        $glayer_zone = $(".layer_zone");
    $focus = target;
    if ($glayer_zone.length === 0) { return; }
    $glayer_zone.hide();
    $("body").addClass("layer_on");
    $laybtn.fadeIn(200);

    $glayer_zone.on("click", ".close", function (e) {
        var $this = $(this),
            t_layer = $this.parents(".layer_zone");
        $("body").removeClass("layer_on");
        t_layer.fadeOut(300);
    });

    $glayer_zone.on("click", function (e) {
        if (bool != false) {
            var $this = $(this),
                $t_item = $this.find(".layer_cont");
            if ($(e.target).parents(".layer_cont").length > 0) {
                return;
            }
            $("body").removeClass("layer_on");
            $this.fadeOut(300);
        }
    });
};

/* 레이어팝업 닫기 */
var layerClose = function (obj) {
    var $laybtn = $(obj);
    $("body").removeClass("layer_on");
    $laybtn.hide();
};
/////////////////function MakeList/////////////////////

////////////////////////API////////////////////////////

