function saveNewProduct() {
    const productName = document.getElementById('productName').value;
    const productImage = document.getElementById('productImage').files[0];
    const productPrice = document.getElementById('productPrice').value;
    const productStock = document.getElementById('productStock').value;
    const productCategory = document.getElementById('productCategory').value;
    const productionDate = document.getElementById('productionDate').value;
    const expirationDate = document.getElementById('expirationDate').value;
    const productDescription = document.getElementById('productDescription').value;

    // Kiểm tra dữ liệu không được để trống
    if (!productName || !productImage || !productPrice || !productStock || !productCategory || !productionDate || !expirationDate || !productDescription) {
        showMessageModal("Please fill in product information completely.", "manageProducts.html");
        return;
    }

    // Xử lý hiển thị hình ảnh (nếu cần)
    const reader = new FileReader();
    reader.onload = function (e) {
        const imageSrc = e.target.result;

        // Tạo một dòng mới với thông tin từ modal
        const newRow = `
<tr>
    <td>${productName}</td>
    <td><img src="${imageSrc}" alt="${productName}" class="img-thumbnail" style="max-width: 100px;"></td>
    <td>${productPrice}</td>
    <td>${productStock}</td>
    <td>${productCategory}</td>
    <td>${productionDate}</td>
    <td>${expirationDate}</td>
    <td>${productDescription}</td>
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
        document.querySelector('#productTable tbody').insertAdjacentHTML('beforeend', newRow);

        // Đóng modal
        $('#productModal').modal('hide');

        // Reset form
        document.getElementById('productForm').reset();
    };

    // Đọc file hình ảnh
    reader.readAsDataURL(productImage);
}

// Hàm hiển thị modal thông báo
function showMessageModal(message, continueLink) {
    document.getElementById('messageContent').textContent = message;
    const continueButton = document.getElementById('continueButton');
    continueButton.setAttribute('href', continueLink);
    const modal = new bootstrap.Modal(document.getElementById('messageModal'));
    modal.show();
}

// Sự kiện khi click "Save" để kiểm tra và lưu sản phẩm
document.getElementById('saveProduct').addEventListener('click', saveNewProduct);


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
            showMessageModal("Record deleted successfully!", "manageProduct.html");
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
    let selectedProductRow; // Lưu trữ hàng sản phẩm được chọn

    // Khi nhấn vào nút Edit
    document.querySelectorAll('.btn-primary[data-bs-target="#editProductModal"]').forEach((button) => {
        button.addEventListener("click", function () {
            selectedProductRow = this.closest("tr");

            // Gán dữ liệu từ hàng vào modal
            document.getElementById("editProductName").value = selectedProductRow.cells[0].textContent.trim();
            document.getElementById("editProductPrice").value = selectedProductRow.cells[2].textContent.trim();
            document.getElementById("editProductStock").value = selectedProductRow.cells[3].textContent.trim();
            document.getElementById("editProductCategory").value = selectedProductRow.cells[4].textContent.trim();
            document.getElementById("editManufactureDate").value = selectedProductRow.cells[5].textContent.trim();
            document.getElementById("editExpirationDate").value = selectedProductRow.cells[6].textContent.trim();

            // Hiển thị ảnh sản phẩm
            const imageSrc = selectedProductRow.cells[1].querySelector("img").src;
            const previewImage = document.getElementById("previewImage");
            previewImage.src = imageSrc;
            previewImage.style.display = "block";
        });
    });

    // Xem trước hình ảnh khi người dùng chọn ảnh mới
    document.getElementById("editProductImage").addEventListener("change", function () {
        const file = this.files[0];
        const previewImage = document.getElementById("previewImage");

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewImage.src = e.target.result;
                previewImage.style.display = "block";
            };
            reader.readAsDataURL(file);
        } else {
            previewImage.src = "#";
            previewImage.style.display = "none";
        }
    });

    // Lưu thay đổi
    document.getElementById("saveProductChanges").addEventListener("click", function () {
        if (selectedProductRow) {
            const newName = document.getElementById("editProductName").value.trim();
            const newCategory = document.getElementById("editProductCategory").value.trim();
            const newPrice = document.getElementById("editProductPrice").value.trim();
            const newStock = document.getElementById("editProductStock").value.trim();
            const newManufactureDate = document.getElementById("editManufactureDate").value.trim();
            const newExpirationDate = document.getElementById("editExpirationDate").value.trim();
            const newImage = document.getElementById("previewImage").src;

            // Cập nhật dữ liệu vào bảng
            selectedProductRow.cells[0].textContent = newName;
            selectedProductRow.cells[1].querySelector("img").src = newImage;
            
            selectedProductRow.cells[4].textContent = newCategory;
            selectedProductRow.cells[2].textContent = newPrice;
            selectedProductRow.cells[3].textContent = newStock;
            selectedProductRow.cells[5].textContent = newManufactureDate;
            selectedProductRow.cells[6].textContent = newExpirationDate;
        
            // Đóng modal
            const modalInstance = bootstrap.Modal.getInstance(document.getElementById("editProductModal"));
            modalInstance.hide();

            showMessageModal("Product updated successfully!", "manageProduct.html");

        }
    });
});
