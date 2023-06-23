document.addEventListener('DOMContentLoaded', function() {
    var passwordConfirmInput = document.getElementById('password_confirm');
    var passwordInput = document.getElementById('password');
    var passwordError = document.getElementById('password_error');

    passwordConfirmInput.addEventListener('keyup', function() {
        var password = passwordInput.value;
        var passwordConfirm = this.value;

        if (password !== passwordConfirm) {
            passwordError.textContent = '비밀번호가 일치하지 않습니다.';
            passwordError.style.color = 'red';
        } else {
            passwordError.textContent = '비밀번호가 일치합니다.';
            passwordError.style.color = 'green';
        }
    });
});

function updateEmailDomain() {
    var selectBox = document.getElementById("emailDomainSelect");
    var emailDomainInput = document.getElementById("emailDomain");
    var selectedDomain = selectBox.value;

    if (selectedDomain === "직접입력") {
        emailDomainInput.value = "";
        emailDomainInput.disabled = false;
    } else {
        emailDomainInput.value = selectedDomain;
        emailDomainInput.disabled = true;
    }
}

$(document).ready(function() {
        $("#phoneChk").click(function() {
            alert("인증번호 발송이 완료되었습니다.\n휴대폰에서 인증번호 확인을 해주십시오.");
            var phone = $("#phone").val();
            $.ajax({
                type: "GET",
                url: "phoneCheck?phone=" + phone,
                cache: false,
                success: function(data) {
                    if (data == "error") {
                        alert("휴대폰 번호가 올바르지 않습니다.");
                        $(".successPhoneChk").text("유효한 번호를 입력해주세요.");
                        $(".successPhoneChk").css("color", "red");
                        $("#phone").attr("autofocus", true);
                    } else {
                        $("#phone2").attr("disabled", false);
                        $("#phoneChk2").css("display", "inline");
                        $(".successPhoneChk").text("인증번호를 입력한 뒤 본인인증을 눌러주십시오.");
                        $(".successPhoneChk").css("color", "green");
                        $("#phone").attr("readonly", true);
                        code2 = data;
                    }
                }
            });
        });
    });

    $(document).ready(function() {
        $("#phoneChk2").click(function() {
            if ($("#phone2").val() == code2) {
                $(".successPhoneChk").text("인증번호가 일치합니다.");
                $(".successPhoneChk").css("color", "green");
                $("#phoneDoubleChk").val("true");
                $("#phone2").attr("disabled", true);
            } else {
                $(".successPhoneChk").text("인증번호가 일치하지 않습니다. 확인해주시기 바랍니다.");
                $(".successPhoneChk").css("color", "red");
                $("#phoneDoubleChk").val("false");
                $("#phone2").focus();
            }
        });
    });