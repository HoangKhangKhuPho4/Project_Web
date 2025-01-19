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

  // Add New Dish Item
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

  // Remove Dish Item
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

  // Calculate Grand Total
  function calculateGrandTotal() {
    var grandTotal = 0;
    $(".total").each(function () {
      var val = parseFloat($(this).val()) || 0;
      grandTotal += val;
    });
    // You can display grand total somewhere if needed
    // For example:
    // $('#grandTotal').text(grandTotal.toFixed(2));
  }

  // Form Validation and Submission Handling
  (function () {
    "use strict";

    var forms = document.querySelectorAll("#reservationForm");

    Array.prototype.slice.call(forms).forEach(function (form) {
      form.addEventListener(
        "submit",
        function (event) {
          // Prevent form submission
          event.preventDefault();
          event.stopPropagation();

          // Check form validity
          if (form.checkValidity()) {
            // Collect form data
            var reservationData = {
              name: $("#name").val(),
              email: $("#email").val(),
              datetime: $("#datetime").val(),
              people: $("#select1").val(),
              specialRequest: $("#message").val(),
              orders: [],
            };

            // Collect order details
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

            // Calculate grand total (optional)
            reservationData.grandTotal = 0;
            reservationData.orders.forEach(function (order) {
              reservationData.grandTotal += parseFloat(order.total);
            });
            reservationData.grandTotal = reservationData.grandTotal.toFixed(2);

            // Display reservation data in console (replace with actual processing)
            console.log("Reservation Data:", reservationData);

            // Send data to Formspree via AJAX
            $.ajax({
              url: form.action, // URL endpoint from Formspree
              method: form.method, // POST
              data: JSON.stringify(reservationData),
              contentType: "application/json",
              success: function () {
                // Reset form and display success modal
                form.reset();
                // Remove additional order items and keep one default item
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

                // Display success modal
                $("#successModal").modal("show");
              },
              error: function () {
                // Display error message
                alert(
                  "An error occurred while submitting your reservation. Please try again later."
                );
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
