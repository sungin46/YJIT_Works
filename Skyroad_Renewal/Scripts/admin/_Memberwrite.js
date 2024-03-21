$(function () {

    //게시글 삭제
    $("._btn_del").on('click', function (e) {
        if ($("#memb_no").val() != "") {  //아이디가 있어야함
            var memb_no = $("#memb_no").val();
            var result = confirm("정말로 삭제하시겠습니까?");
            if (result) {
                $("#del_flag").val("y");
                $("#insert_form").submit();
            }
        }
    });

    //게시글 등록
    $("._btn_reg").on('click', function (e) {
        var memb_no = $("#memb_no").val();
        if (memb_no != "") {
            if (check_msg('name', '성명', 'required') == false) return false;
            if (check_msg('mobile1', '모바일앞자리', 'required') == false) return false;
            if (check_msg('mobile2', '모바일중간자리', 'required') == false) return false;
            if (check_msg('mobile3', '모바일뒷자리', 'required') == false) return false;
        } else {
            if ($("#m_id").val() == "") {
                alert("아이디를 입력해 주세요");
                $("#m_id").focus();
                return false;
            } else {
                if ($("#use_yn").val() == "") {
                    alert("아이디 중복 확인을 해주세요");
                    $("#id_check").focus();
                    return false;
                } else {
                    if ($("#use_yn").val() == "n") {
                        alert("사용할 수 없는 아이디 입니다. 다시 입력후 중복확인 해주세요");
                        $("#m_id").val("");
                        $("#use_yn").val("");
                        $("#m_id").focus();
                        return false;
                    }
                }
            }
            if (check_msg('password', '비밀번호', 'required') == false) return false;
            if (check_msg('password', '비밀번호', 'password') == false) return false;
            if (check_msg('name', '성명', 'required') == false) return false;
            if (check_msg('mobile1', '모바일앞자리', 'required') == false) return false;
            if (check_msg('mobile2', '모바일중간자리', 'required') == false) return false;
            if (check_msg('mobile3', '모바일뒷자리', 'required') == false) return false;
        }
        var result = confirm("저장 하시겠습니까?");
        if (result) {
            $("#insert_form").submit();
        }
    });

    $('#id_check').on('click', function () {
        var m_id = $("#m_id").val();
        if (m_id != "") {
            $.ajax({
                type: "POST",
                url: "/Admin/id_check?m_id=" + m_id,
                dataType: "json",
                success: function (data) {
                    $("#error_id").html(data.msg);
                    $("#error_id").css('color', data.color);
                    $("#use_yn").val(data.use_yn);
                }
            });
        }
    });
});