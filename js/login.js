   // Xử lý sự kiện gửi form
   document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();  // Ngừng hành động mặc định của form

    const password = document.getElementById('password').value;

    // Kiểm tra mật khẩu (thay thế bằng phương thức xác thực thực tế nếu cần)
    if (password.length < 8) {
        alert('Password must be at least 8 characters.');
        return;
    }

    // Nếu thông tin hợp lệ, chuyển hướng đến trang index.html
    alert('Login successful!');
    window.location.href = 'index.html';  // Chuyển hướng đến trang index.html
});

document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Email và mật khẩu mẫu
    const validEmail = "admin@nlu.com";
    const validPassword = "12345678";

    // Lấy giá trị email và mật khẩu từ form
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Kiểm tra thông tin đăng nhập
    if (email === validEmail && password === validPassword) {
        // Điều hướng đến trang admin.html
        window.location.href = "adminHCI/index.html";
    } else {
        // Hiển thị thông báo lỗi
        const errorDiv = document.getElementById('loginError');
        errorDiv.style.display = 'block';
    }
    });