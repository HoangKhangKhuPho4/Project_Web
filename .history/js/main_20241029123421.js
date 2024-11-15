(function ($) {
    "use strict";

    $(document).ready(function () {
        // 1. Spinner
        var spinner = function () {
            setTimeout(function () {
                if ($('#spinner').length > 0) {
                    $('#spinner').removeClass('show');
                }
            }, 500); // Tăng thời gian để đảm bảo spinner hiển thị đủ lâu
        };
        spinner();

        // 2. Khởi tạo WOW.js
        new WOW().init();

        // 3. Sticky Navbar
        $(window).scroll(function () {
            if ($(this).scrollTop() > 45) {
                $('.navbar').addClass('sticky-top shadow-sm');
            } else {
                $('.navbar').removeClass('sticky-top shadow-sm');
            }
        });

        // 4. Dropdown on mouse hover
        const $dropdown = $(".dropdown");
        const showClass = "show";

        $(window).on("load resize", function() {
            if (this.matchMedia("(min-width: 992px)").matches) {
                $dropdown.hover(
                    function() {
                        $(this).addClass(showClass);
                        $(this).find(".dropdown-toggle").attr("aria-expanded", "true");
                        $(this).find(".dropdown-menu").addClass(showClass);
                    },
                    function() {
                        $(this).removeClass(showClass);
                        $(this).find(".dropdown-toggle").attr("aria-expanded", "false");
                        $(this).find(".dropdown-menu").removeClass(showClass);
                    }
                );
            } else {
                $dropdown.off("mouseenter mouseleave");
            }
        });

        // 5. Back to top button
        $(window).scroll(function () {
            if ($(this).scrollTop() > 300) {
                $('.back-to-top').fadeIn('fast');
            } else {
                $('.back-to-top').fadeOut('fast');
            }
        });

        $('.back-to-top').click(function () {
            smoothScrollToTop();
            return false;
        });

        function smoothScrollToTop() {
            const scrollDuration = 800; // Thời gian cuộn lên (ms)
            const startScroll = window.pageYOffset;
            const startTime = performance.now();

            function scrollStep(currentTime) {
                const elapsedTime = currentTime - startTime;
                const scrollProgress = Math.min(elapsedTime / scrollDuration, 1);
                const easeOutCubic = 1 - Math.pow(1 - scrollProgress, 3); // Hàm easing cho hiệu ứng mượt
                window.scrollTo(0, startScroll * (1 - easeOutCubic));

                if (scrollProgress < 1) {
                    requestAnimationFrame(scrollStep);
                }
            }

            requestAnimationFrame(scrollStep);
        }

        // 6. Modal Video
        var videoSrc;
        $('.btn-play').click(function () {
            videoSrc = $(this).data("src");
        });

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        });

        $('#videoModal').on('hidden.bs.modal', function (e) {
            $("#video").attr('src', "");
        });

        // 7. Testimonials carousel
        $(".testimonial-carousel").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: true,
            margin: 24,
            dots: true,
            loop: true,
            nav : false,
            responsive: {
                0:{
                    items:1
                },
                768:{
                    items:2
                },
                992:{
                    items:3
                }
            }
        });

        // 8. Chức Năng Đặt Bàn
        // 8.1. Khởi tạo datetime picker sử dụng Tempus Dominus
        $("#datetimepicker").datetimepicker({
            icons: {
                time: "fa fa-clock",
                date: "fa fa-calendar",
                up: "fa fa-arrow-up",
                down: "fa fa-arrow-down",
                previous: "fa fa-chevron-left",
                next: "fa fa-chevron-right",
                today: "fa fa-calendar-check-o",
                clear: "fa fa-trash",
                close: "fa fa-times",
            },
            format: "L LT",
            minDate: moment(), // Ngăn chọn ngày trong quá khứ
            disabledHours: function () {
                // Giả sử giờ mở cửa nhà hàng là 9 AM đến 9 PM
                let hours = [];
                for (let i = 0; i < 24; i++) {
                    if (i < 9 || i > 21) {
                        hours.push(i);
                    }
                }
                return hours;
            },
        });

        // 8.2. Thêm mục đặt món ăn mới
        $("#addItem").click(function () {
            var orderItem = `
                <div class="row g-3 align-items-center mb-3 order-item">
                    <div class="col-md-4">
                        <input type="text" class="form-control" name="dishName[]" placeholder="Dish Name" required />
                        <div class="invalid-feedback">Please enter the dish name.</div>
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control quantity" name="quantity[]" placeholder="Quantity" min="1" required />
                        <div class="invalid-feedback">Quantity must be at least 1.</div>
                    </div>
                    <div class="col-md-2">
                        <input type="number" class="form-control price" name="price[]" placeholder="Price" min="0" step="0.01" required />
                        <div class="invalid-feedback">Please enter a valid price.</div>
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control total" name="total[]" placeholder="Total" readonly />
                    </div>
                    <div class="col-md-2">
                        <button class="btn btn-danger remove-item" type="button">Remove</button>
                    </div>
                </div>
            `;
            $("#orderDetails").append(orderItem);
        });

        // 8.3. Xóa mục đặt món ăn
        $(document).on("click", ".remove-item", function () {
            $(this).closest(".order-item").remove();
            calculateGrandTotal();
        });

        // 8.4. Tính tổng tiền cho mỗi món
        $(document).on("input", ".quantity, .price", function () {
            var row = $(this).closest(".order-item");
            var quantity = parseFloat(row.find(".quantity").val()) || 0;
            var price = parseFloat(row.find(".price").val()) || 0;
            var total = quantity * price;
            row.find(".total").val(total.toFixed(2));
            calculateGrandTotal();
        });

        // 8.5. Tính tổng tiền tất cả các món (tùy chọn: hiển thị nếu cần)
        function calculateGrandTotal() {
            var grandTotal = 0;
            $(".total").each(function () {
                var val = parseFloat($(this).val()) || 0;
                grandTotal += val;
            });
            // Bạn có thể hiển thị grand total ở đâu đó nếu cần
            // Ví dụ, thêm một phần tử để hiển thị tổng cộng:
            // $('#grandTotal').text(grandTotal.toFixed(2));
        }

        // 8.6. Xác thực và xử lý form đặt bàn
        (function () {
            "use strict";

            var forms = document.querySelectorAll("#reservationForm");

            Array.prototype.slice.call(forms).forEach(function (form) {
                form.addEventListener(
                    "submit",
                    function (event) {
                        event.preventDefault();
                        event.stopPropagation();

                        // Kiểm tra tính hợp lệ của form
                        if (form.checkValidity()) {
                            // Thu thập dữ liệu form
                            var reservationData = {
                                name: $("#name").val(),
                                email: $("#email").val(),
                                datetime: $("#datetime").val(),
                                people: $("#select1").val(),
                                specialRequest: $("#message").val(),
                                orders: [],
                            };

                            // Thu thập thông tin đặt món ăn
                            $(".order-item").each(function () {
                                var dishName = $(this).find("input[name='dishName[]']").val();
                                var quantity = $(this).find("input[name='quantity[]']").val();
                                var price = $(this).find("input[name='price[]']").val();
                                var total = $(this).find("input[name='total[]']").val();

                                if (dishName && quantity && price) {
                                    reservationData.orders.push({
                                        dishName: dishName,
                                        quantity: quantity,
                                        price: price,
                                        total: total,
                                    });
                                }
                            });

                            // Tính tổng tiền (tùy chọn)
                            reservationData.grandTotal = 0;
                            reservationData.orders.forEach(function (order) {
                                reservationData.grandTotal += parseFloat(order.total);
                            });
                            reservationData.grandTotal = reservationData.grandTotal.toFixed(2);

                            // Gửi dữ liệu tới Formspree bằng AJAX
                            $.ajax({
                                url: form.action, // URL endpoint từ Formspree
                                method: form.method, // POST
                                data: JSON.stringify(reservationData),
                                contentType: "application/json",
                                success: function () {
                                    // Reset form và hiển thị modal thành công
                                    form.reset();
                                    // Xóa các mục đặt món ăn thêm, giữ lại một mục
                                    $("#orderDetails").html(`
                                        <div class="row g-3 align-items-center mb-3 order-item">
                                            <div class="col-md-4">
                                                <input type="text" class="form-control" name="dishName[]" placeholder="Dish Name" required />
                                                <div class="invalid-feedback">Please enter the dish name.</div>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="number" class="form-control quantity" name="quantity[]" placeholder="Quantity" min="1" required />
                                                <div class="invalid-feedback">Quantity must be at least 1.</div>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="number" class="form-control price" name="price[]" placeholder="Price" min="0" step="0.01" required />
                                                <div class="invalid-feedback">Please enter a valid price.</div>
                                            </div>
                                            <div class="col-md-2">
                                                <input type="text" class="form-control total" name="total[]" placeholder="Total" readonly />
                                            </div>
                                            <div class="col-md-2">
                                                <button class="btn btn-danger remove-item" type="button">Remove</button>
                                            </div>
                                        </div>
                                    `);
                                    calculateGrandTotal();

                                    // Hiển thị modal thành công
                                    $('#successModal').modal('show');
                                },
                                error: function () {
                                    // Hiển thị thông báo lỗi
                                    alert("Có lỗi xảy ra khi gửi đặt bàn. Vui lòng thử lại sau.");
                                },
                            });
                        } else {
                            form.classList.add("was-validated");
                        }
                    },
                    false
                );
            });
        })();
    });
})(jQuery);
