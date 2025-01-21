document.getElementById("registerForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Kiểm tra độ dài mật khẩu
    if (password.length < 8) {
        showErrorModal("Password must be at least 8 characters long!");
        return; 
    }

    // Kiểm tra mật khẩu và xác nhận mật khẩu
    if (password !== confirmPassword) {
        showErrorModal("Password and Confirm Password do not match!");
        return; 
    }

    alert("Register successfully!");
    window.location.href = "login.html"; // Thay "login.html" bằng URL của trang đăng nhập của bạn
});


// Hàm hiển thị modal lỗi
function showErrorModal(message) {
    const modalMessage = document.getElementById("errorModalMessage");
    modalMessage.textContent = message;

    const errorModal = new bootstrap.Modal(document.getElementById("passwordErrorModal"));
    errorModal.show();
}


