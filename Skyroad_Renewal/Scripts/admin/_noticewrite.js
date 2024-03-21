$(function () {
    //게시글 등록
    $("._btn_reg").on('click', function (e) {
        if (check_msg('title', '제목', 'required') == false) return false;
        if ($("#s_type  option:selected").val() == "") {
            alert("구분을 선택해주세요.");
            $("#s_type").focus();
            return false;
        }

        $("#ajax_form").submit();
        return false;
    });

    $('#infile').bind('change', function () {
        //파일 사이즈 제한 - 김은빈
        if ($("#infile1").val() != "") {
            if (this.files[0].size > 10485759) {
                alert("10MB 이상되는 파일은 업로드 할 수 없습니다.");
                $("#infile").val("");
            }
        }
    });

    $('#infile1').bind('change', function () {
        //파일 사이즈 제한 - 김은빈
        if ($("#infile1").val() != "") {
        if (this.files[0].size > 10485759) {
            alert("10MB 이상되는 파일은 업로드 할 수 없습니다.");
            $("#infile1").val("");
            }
        }
    });

    $('#infile2').bind('change', function () {
        //파일 사이즈 제한 - 김은빈
        if ($("#infile1").val() != "") {
            if (this.files[0].size > 10485759) {
                alert("10MB 이상되는 파일은 업로드 할 수 없습니다.");
                $("#infile2").val("");
            }
        }
    });

    //게시글 삭제
    $("._btn_del").on('click', function (e) {
        if ($("#notice_id").val() != "") {  //아이디가 있어야함
            var Notice_ID = $("#notice_id").val();
            var result = confirm("정말로 삭제하시겠습니까?");
            //var obj = new Object();
            //obj.Notice_ID = Notice_ID;                                                                                        
            if (result) {
                $.ajax({
                    type: "POST",
                    url: "/Admin/Notice_DelAjax?Notice_ID=" + Notice_ID,
                    success: function (result) {
                        alert("삭제되었습니다");
                        location.href = "/Admin/Notice";
                    }, error: function (xhr) {
                        console.log("시스템 사정으로 요청하신 작업을 처리할 수 없습니다.");
                        console.log(xhr);
                        return;
                    }
                });
            }
        }
    });
});

function fnInputForm() {
    var notice_id = $("notice_id").val();
    var title = $("title").val();
    var notice_yn = $(":input:radio[name=notice_yn]:checked").val();
    var content = $("content").val();
}