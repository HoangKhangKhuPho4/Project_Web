document.getElementById('fpassform').addEventListener('submit', function (e) {
    e.preventDefault(); // Ngăn không cho form tự động gửi

    const email = document.getElementById('email').value;
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    // Kiểm tra email hợp lệ
    if (!email.match(emailRegex)) {
        // Hiển thị modal lỗi
        document.getElementById('errorMessage').textContent = 'Please enter a valid email address.';
        const errorModal = new bootstrap.Modal(document.getElementById('errorModal'));
        errorModal.show();
        return;
    }

    // Giả sử yêu cầu reset mật khẩu thành công
    const successModal = new bootstrap.Modal(document.getElementById('successModal'));
    successModal.show();
});