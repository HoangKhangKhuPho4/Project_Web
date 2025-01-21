(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
// Back to top button
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


    // Modal Video
    $(document).ready(function () {
        var $videoSrc;
        $('.btn-play').click(function () {
            $videoSrc = $(this).data("src");
        });
        console.log($videoSrc);

        $('#videoModal').on('shown.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
        })

        $('#videoModal').on('hide.bs.modal', function (e) {
            $("#video").attr('src', $videoSrc);
        })
    });


    // Testimonials carousel
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
    
})(jQuery);

// chức năng đặt bàn

$(document).ready(function () {
    // Hide spinner after page load
    $("#spinner").fadeOut(500, function () {
      $(this).remove();
    });

    // Initialize WOW.js
    new WOW().init();

    // Initialize datetime picker using Tempus Dominus
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
      minDate: moment(), // Prevent selecting past dates
      disabledHours: function () {
        // Assuming restaurant hours are 9 AM to 9 PM
        let hours = [];
        for (let i = 0; i < 24; i++) {
          if (i < 9 || i > 21) {
            hours.push(i);
          }
        }
        return hours;
      },
    });

    // Video Modal Handling
    var videoSrc;
    $(".btn-play").click(function () {
      videoSrc = $(this).data("src");
      $("#video").attr("src", videoSrc + "?autoplay=1");
    });

    $("#videoModal").on("hidden.bs.modal", function () {
      $("#video").attr("src", "");
    });

    // Function to Add New Dish Item
    $("#addItem").click(function () {
      var orderItem = `
        <div class="row g-3 align-items-center mb-3 order-item">
          <div class="col-md-4">
            <input type="text" class="form-control" placeholder="Dish Name" required />
            <div class="invalid-feedback">Please enter the dish name.</div>
          </div>
          <div class="col-md-2">
            <input type="number" class="form-control quantity" placeholder="Quantity" min="1" required />
            <div class="invalid-feedback">Quantity must be at least 1.</div>
          </div>
          <div class="col-md-2">
            <input type="number" class="form-control price" placeholder="Price" min="0" step="0.01" required />
            <div class="invalid-feedback">Please enter a valid price.</div>
          </div>
          <div class="col-md-2">
            <input type="text" class="form-control total" placeholder="Total" readonly />
          </div>
          <div class="col-md-2">
            <button class="btn btn-danger remove-item" type="button">Remove</button>
          </div>
        </div>
      `;
      $("#orderDetails").append(orderItem);
    });

    // Function to Remove Dish Item
    $(document).on("click", ".remove-item", function () {
      $(this).closest(".order-item").remove();
      calculateGrandTotal();
    });

    // Calculate Total for each dish
    $(document).on("input", ".quantity, .price", function () {
      var row = $(this).closest(".order-item");
      var quantity = parseFloat(row.find(".quantity").val()) || 0;
      var price = parseFloat(row.find(".price").val()) || 0;
      var total = quantity * price;
      row.find(".total").val(total.toFixed(2));
      calculateGrandTotal();
    });

    // Calculate Grand Total (Optional: Display if needed)
    function calculateGrandTotal() {
      var grandTotal = 0;
      $(".total").each(function () {
        var val = parseFloat($(this).val()) || 0;
        grandTotal += val;
      });
      // You can display grand total somewhere if needed
      // For example, uncomment the line below and add a #grandTotal element in HTML
      // $('#grandTotal').text(grandTotal.toFixed(2));
    }

    // Form Validation and Submission
    (function () {
      "use strict";

      var forms = document.querySelectorAll("#reservationForm");

      Array.prototype.slice.call(forms).forEach(function (form) {
        form.addEventListener(
          "submit",
          function (event) {
            event.preventDefault();
            event.stopPropagation();

            // Remove existing validation classes
            form.classList.remove("was-validated");

            // Check form validity
            if (form.checkValidity()) {
              // Gather form data
              var reservationData = {
                name: $("#name").val(),
                email: $("#email").val(),
                datetime: $("#datetime").val(),
                people: $("#select1").val(),
                specialRequest: $("#message").val(),
                orders: [],
              };

              // Gather order details
              $(".order-item").each(function () {
                var dishName = $(this).find("input[type='text']").val();
                var quantity = $(this).find(".quantity").val();
                var price = $(this).find(".price").val();
                var total = $(this).find(".total").val();

                if (dishName && quantity && price) {
                  reservationData.orders.push({
                    dishName: dishName,
                    quantity: quantity,
                    price: price,
                    total: total,
                  });
                }
              });

              // Optional: Calculate Grand Total
              reservationData.grandTotal = 0;
              reservationData.orders.forEach(function (order) {
                reservationData.grandTotal += parseFloat(order.total);
              });
              reservationData.grandTotal = reservationData.grandTotal.toFixed(2);

              // For demonstration, we'll log the data and show a confirmation
              console.log("Reservation Data:", reservationData);

              // Reset form after successful submission
              form.reset();
              // Remove additional order items, keeping only one
              $("#orderDetails").html(`
                <div class="row g-3 align-items-center mb-3 order-item">
                  <div class="col-md-4">
                    <input type="text" class="form-control" placeholder="Dish Name" required />
                    <div class="invalid-feedback">Please enter the dish name.</div>
                  </div>
                  <div class="col-md-2">
                    <input type="number" class="form-control quantity" placeholder="Quantity" min="1" required />
                    <div class="invalid-feedback">Quantity must be at least 1.</div>
                  </div>
                  <div class="col-md-2">
                    <input type="number" class="form-control price" placeholder="Price" min="0" step="0.01" required />
                    <div class="invalid-feedback">Please enter a valid price.</div>
                  </div>
                  <div class="col-md-2">
                    <input type="text" class="form-control total" placeholder="Total" readonly />
                  </div>
                  <div class="col-md-2">
                    <button class="btn btn-danger remove-item" type="button">Remove</button>
                  </div>
                </div>
              `);
              calculateGrandTotal();

              // Optionally, show a success modal or message
              alert("Your reservation has been successfully submitted!");

              // If integrating with a backend, replace the alert with AJAX submission
            } else {
              form.classList.add("was-validated");
            }
          },
          false
        );
      });
    })();
  });