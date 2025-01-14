document.addEventListener("DOMContentLoaded", function () {
    let selectedRowToDelete; // Lưu trữ hàng được chọn để xóa

    // Hàm hiển thị thông báo trong modal
    function showMessageModal(message, continueLink) {
        // Cập nhật nội dung của modal
        document.getElementById('messageContent').textContent = message;

        // Cập nhật đường link "Continue"
        const continueButton = document.getElementById('continueButton');
        continueButton.setAttribute('href', continueLink);

        // Hiển thị modal
        const modal = new bootstrap.Modal(document.getElementById('messageModal'));
        modal.show();
    }

    // Khi nhấn vào nút Delete
    document.querySelectorAll('.btn-danger[data-bs-target="#deleteModal"]').forEach((button) => {
        button.addEventListener("click", function () {
            selectedRowToDelete = this.closest("tr"); // Lấy hàng hiện tại

            // Hiển thị modal xác nhận xóa
            const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
            deleteModal.show();
        });
    });

    // Khi nhấn nút Delete trong modal để xác nhận
    document.getElementById("confirmDelete").addEventListener("click", function () {
        if (selectedRowToDelete) {
            // Lấy ID của mục cần xóa (ví dụ: lấy từ thuộc tính data-id hoặc từ nội dung của một ô cột)
            const itemId = selectedRowToDelete.getAttribute("data-id");

            // Lưu ID mục đã xóa vào localStorage (giả sử bạn đang lưu một mảng các ID đã xóa)
            let deletedItems = JSON.parse(localStorage.getItem("deletedItems")) || [];
            deletedItems.push(itemId);
            localStorage.setItem("deletedItems", JSON.stringify(deletedItems));

            // Xóa hàng khỏi bảng
            selectedRowToDelete.remove();

            // Đóng modal xác nhận xóa
            const deleteModal = document.getElementById('deleteModal');
            deleteModal.classList.remove('show'); // Loại bỏ lớp 'show' để đóng modal
            deleteModal.setAttribute('aria-hidden', 'true'); // Thiết lập thuộc tính aria-hidden
            deleteModal.style.display = 'none'; // Ẩn modal

            // Hiển thị thông báo thành công
            showMessageModal("Record deleted successfully!", "manageChef.html");
        }
    });

    // Khi trang tải lại, loại bỏ các mục đã xóa dựa trên localStorage
    function removeDeletedItems() {
        const deletedItems = JSON.parse(localStorage.getItem("deletedItems")) || [];

        deletedItems.forEach(itemId => {
            // Tìm mục cần xóa trong bảng dựa trên ID (có thể thay đổi theo cách bạn lấy ID)
            const row = document.querySelector(`tr[data-id="${itemId}"]`);
            if (row) {
                row.remove();
            }
        });
    }

    // Gọi hàm để loại bỏ các mục đã xóa khi trang tải lại
    removeDeletedItems();
});

document.addEventListener("DOMContentLoaded", function () {
    let selectedRow; // Lưu trữ hàng được chọn

    function formatDate(dateStr) {
        const parts = dateStr.split('/');
        return `${parts[0]}/${parts[1]}/${parts[2]}`;
    }

    // Hàm hiển thị thông báo trong modal
    function showMessageModal(message, continueLink) {
        // Cập nhật nội dung của modal
        document.getElementById('messageContent').textContent = message;

        // Cập nhật đường link "Continue"
        const continueButton = document.getElementById('continueButton');
        continueButton.setAttribute('href', continueLink);

        // Hiển thị modal
        const modal = new bootstrap.Modal(document.getElementById('messageModal'));
        modal.show();
    }

    // Khi nhấn vào nút Edit
    document.querySelectorAll('.btn-primary[data-bs-target="#editModal"]').forEach((button) => {
        button.addEventListener("click", function () {
            selectedRow = this.closest("tr"); // Lấy hàng hiện tại

            // Lấy dữ liệu từ hàng và gán vào modal
            document.getElementById("editName").value = selectedRow.cells[0].textContent.trim();
            document.getElementById("editPosition").value = selectedRow.cells[1].textContent.trim();
            document.getElementById("editGender").value = selectedRow.cells[2].textContent.trim();
            document.getElementById("editAge").value = selectedRow.cells[3].textContent.trim();
            document.getElementById("editPhone").value = selectedRow.cells[4].textContent.trim();

            // Đảm bảo ngày được lấy đúng định dạng và hiển thị trong modal
            const startDate = selectedRow.cells[5].textContent.trim();
            const formattedStartDate = formatDate(startDate); // Đảm bảo ngày đúng định dạng
            document.getElementById("editStartDate").value = formattedStartDate;

            document.getElementById("editDepartment").value = selectedRow.cells[6].textContent.trim();
            document.getElementById("editEmployment").value = selectedRow.cells[7].textContent.trim();
            document.getElementById("editStatus").value = selectedRow.cells[8].textContent.trim();
            document.getElementById("editSalary").value = selectedRow.cells[9].textContent.trim();
        });
    });

    // Khi nhấn Save Changes
    document.getElementById("saveChanges").addEventListener("click", function (event) {
        event.preventDefault(); // Ngừng hành động mặc định của form

        if (selectedRow) {
            // Kiểm tra xem các giá trị có hợp lệ không
            const newName = document.getElementById("editName").value.trim();
            const newPosition = document.getElementById("editPosition").value.trim();
            const newGender = document.getElementById("editGender").value.trim();
            const newAge = document.getElementById("editAge").value.trim();
            const newPhone = document.getElementById("editPhone").value.trim();
            const newStartDate = document.getElementById("editStartDate").value.trim();
            const newDepartment = document.getElementById("editDepartment").value.trim();
            const newEmployment = document.getElementById("editEmployment").value.trim();
            const newStatus = document.getElementById("editStatus").value.trim();
            const newSalary = document.getElementById("editSalary").value.trim();

            if (!newName || !newPosition || !newGender || !newAge || !newPhone || !newStartDate || !newDepartment || !newEmployment || !newStatus || !newSalary) {
                showMessageModal("Please fill in employee information completely.", "manageChef.html");
                return;
            }

            // Cập nhật dữ liệu trong hàng
            selectedRow.cells[0].textContent = newName;
            selectedRow.cells[1].textContent = newPosition;
            selectedRow.cells[2].textContent = newGender;
            selectedRow.cells[3].textContent = newAge;
            selectedRow.cells[4].textContent = newPhone;
            selectedRow.cells[5].textContent = newStartDate; // Cập nhật lại ngày
            selectedRow.cells[6].textContent = newDepartment;
            selectedRow.cells[7].textContent = newEmployment;
            selectedRow.cells[8].textContent = newStatus;
            selectedRow.cells[9].textContent = `${newSalary}`;

            // Hiển thị thông báo thành công
            showMessageModal("Employee information updated successfully!", "#");
            // Đóng modal và hiển thị thông báo
            const editModal = bootstrap.Modal.getInstance(document.getElementById("editModal"));
            editModal.hide();

        }
    });
});

function saveNewEmployee() {
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const startDate = document.getElementById('startDate').value;
    const department = document.getElementById('department').value;
    const employment = document.getElementById('employment').value;
    const status = document.getElementById('status').value;
    const salary = document.getElementById('salary').value;

    // Kiểm tra dữ liệu không được trống
    if (!name || !position || !gender || !age || !phone || !startDate || !department || !employment || !status || !salary) {
        showMessageModal("Please fill in employee information completely.", "manageChef.html");
        return; // Dừng hàm nếu có trường không được điền
    }

    // Kiểm tra dữ liệu (nếu cần)
    console.log("New Employee Data:", {
        name, position, gender, age, phone, startDate, department, employment, status, salary
    });

    // Sau khi lưu thành công, đóng modal
    $('#employeeModal').modal('hide');
}

// Hàm hiển thị modal với thông báo tùy chỉnh
function showMessageModal(message, continueLink) {
    // Cập nhật nội dung của modal
    document.getElementById('messageContent').textContent = message;

    // Cập nhật đường link "Continue"
    const continueButton = document.getElementById('continueButton');
    continueButton.setAttribute('href', continueLink);

    // Hiển thị modal
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    modal.show();
}

// Sự kiện khi click "Save" để kiểm tra và lưu nhân viên
document.getElementById('saveEmployee').addEventListener('click', function () {
    // Lấy dữ liệu từ modal
    const name = document.getElementById('name').value;
    const position = document.getElementById('position').value;
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;
    const phone = document.getElementById('phone').value;
    const startDate = document.getElementById('startDate').value;
    const department = document.getElementById('department').value;
    const employment = document.getElementById('employment').value;
    const status = document.getElementById('status').value;
    const salary = document.getElementById('salary').value;

    // Kiểm tra dữ liệu không được trống
    if (!name || !position || !gender || !age || !phone || !startDate || !department || !employment || !status || !salary) {
        showMessageModal("Please fill in employee information completely.", "manageChef.html");
        return;
    }

    // Tạo một dòng mới với thông tin từ modal
    const newRow = `
<tr>
    <td>${name}</td>
    <td>${position}</td>
    <td>${gender}</td>
    <td>${age}</td>
    <td>${phone}</td>
    <td>${startDate}</td>
    <td>${department}</td>
    <td>${employment}</td>
    <td>${status}</td>
    <td>${salary}</td>
    <td class="text-center align-middle">
        <button class="btn btn-primary btn-sm" data-bs-toggle="modal" data-bs-target="#editModal">
            <i class="bi bi-pencil"></i>
        </button>
    </td>
    <td class="text-center align-middle">
        <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#deleteModal">
            <i class="bi bi-trash"></i>
        </button>
    </td>
</tr>
`;

    // Thêm dòng mới vào bảng
    document.querySelector('#employeeTable tbody').insertAdjacentHTML('beforeend', newRow);

    // Đóng modal
    $('#employeeModal').modal('hide');

    // Reset form
    document.getElementById('employeeForm').reset();
});

