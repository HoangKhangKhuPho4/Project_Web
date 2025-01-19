document.addEventListener("DOMContentLoaded", () => {
  // Example data for Provinces/Cities, Districts, Wards for Vietnam
  const vietnamData = {
    "Hà Nội": {
      "Ba Đình": ["Phường Giảng Võ", "Phường Phúc Xá", "Phường Trúc Bạch"],
      "Hoàn Kiếm": ["Phường Hoàn Kiếm", "Phường Đồng Xuân", "Phường Hàng Buồm"],
      // Add other Districts if needed
    },
    "TP. Hồ Chí Minh": {
      "Quận 1": [
        "Phường Bến Nghé",
        "Phường Bến Thành",
        "Phường Nguyễn Thái Bình",
      ],
      "Quận 3": [
        "Phường Nguyễn Thái Học",
        "Phường Võ Thị Sáu",
        "Phường Phạm Ngũ Lão",
      ],
      // Add other Districts if needed
    },
    "Đà Nẵng": {
      "Quận Hải Châu": [
        "Phường Thạch Thang",
        "Phường Chính Gián",
        "Phường Mỹ An",
      ],
      "Quận Sơn Trà": [
        "Phường Khuê Trung",
        "Phường Hòa Cường Bắc",
        "Phường Hòa Cường Nam",
      ],
      // Add other Districts if needed
    },
    // Add other Provinces/Cities if needed
  };

  // Country options
  const countrySelect = document.getElementById("country");
  const vietnamAddress = document.getElementById("vietnam-address");
  const generalAddress = document.getElementById("general-address");
  const citySelect = document.getElementById("city");
  const districtSelect = document.getElementById("district");
  const wardSelect = document.getElementById("ward");
  const addressGeneralInput = document.getElementById("address-general");

  // Function to add provinces/cities to Vietnam dropdown
  function populateVietnamCities() {
    citySelect.innerHTML =
      '<option value="">--- Select Province/City ---</option>';
    for (let city in vietnamData) {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      citySelect.appendChild(option);
    }
    citySelect.disabled = false;
  }

  // Function to add districts based on selected province/city
  function populateVietnamDistricts(selectedCity) {
    districtSelect.innerHTML =
      '<option value="">--- Select District ---</option>';
    wardSelect.innerHTML = '<option value="">--- Select Ward ---</option>';
    wardSelect.disabled = true;

    if (selectedCity && vietnamData[selectedCity]) {
      const districts = vietnamData[selectedCity];
      for (let district in districts) {
        const option = document.createElement("option");
        option.value = district;
        option.textContent = district;
        districtSelect.appendChild(option);
      }
      districtSelect.disabled = false;
    } else {
      districtSelect.disabled = true;
      wardSelect.disabled = true;
    }
  }

  // Function to add wards based on selected district
  function populateVietnamWards(selectedCity, selectedDistrict) {
    wardSelect.innerHTML = '<option value="">--- Select Ward ---</option>';

    if (
      selectedCity &&
      selectedDistrict &&
      vietnamData[selectedCity] &&
      vietnamData[selectedCity][selectedDistrict]
    ) {
      const wards = vietnamData[selectedCity][selectedDistrict];
      wards.forEach((ward) => {
        const option = document.createElement("option");
        option.value = ward;
        option.textContent = ward;
        wardSelect.appendChild(option);
      });
      wardSelect.disabled = false;
    } else {
      wardSelect.disabled = true;
    }
  }

  // Function to show/hide address fields based on selected country
  function toggleAddressFields(selectedCountry) {
    if (selectedCountry === "Vietnam") {
      vietnamAddress.style.display = "block";
      generalAddress.style.display = "none";
      addressGeneralInput.required = false;
      // Clear and disable general address field
      addressGeneralInput.value = "";
    } else if (selectedCountry === "USA" || selectedCountry === "Japan") {
      vietnamAddress.style.display = "none";
      generalAddress.style.display = "block";
      addressGeneralInput.required = true;
      // Clear and disable Vietnam address fields
      citySelect.value = "";
      districtSelect.value = "";
      wardSelect.value = "";
      citySelect.disabled = true;
      districtSelect.disabled = true;
      wardSelect.disabled = true;
    } else {
      vietnamAddress.style.display = "none";
      generalAddress.style.display = "none";
      addressGeneralInput.required = false;
      // Clear and disable all address fields
      addressGeneralInput.value = "";
      citySelect.value = "";
      districtSelect.value = "";
      wardSelect.value = "";
      citySelect.disabled = true;
      districtSelect.disabled = true;
      wardSelect.disabled = true;
    }
  }

  // Event when country changes
  countrySelect.addEventListener("change", () => {
    const selectedCountry = countrySelect.value;
    toggleAddressFields(selectedCountry);

    if (selectedCountry === "Vietnam") {
      populateVietnamCities();
    }
  });

  // Event when province/city changes (Vietnam)
  citySelect.addEventListener("change", () => {
    const selectedCity = citySelect.value;
    populateVietnamDistricts(selectedCity);
  });

  // Event when district changes (Vietnam)
  districtSelect.addEventListener("change", () => {
    const selectedCity = citySelect.value;
    const selectedDistrict = districtSelect.value;
    populateVietnamWards(selectedCity, selectedDistrict);
  });

  // Initialize address fields based on default selected country (if any)
  toggleAddressFields(countrySelect.value);

  // Cart data from localStorage
  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  let totalAmount = parseInt(localStorage.getItem("totalAmount")) || 0;
  let discount = 0;

  const cartItemsContainer = document.getElementById("cartItemsContainer");
  const itemCountSpan = document.getElementById("item-count");
  const subtotalP = document.getElementById("subtotal");
  const shippingFeeP = document.getElementById("shipping-fee");
  const totalP = document.getElementById("total");
  const applyDiscountButton = document.getElementById("apply-discount");
  const discountCodeInput = document.getElementById("discount-code");
  const orderForm = document.getElementById("order-form");

  // Function to display cart items
  function displayCartItems() {
    cartItemsContainer.innerHTML = ""; // Xóa nội dung hiện tại
    if (cartItems.length === 0) {
      cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
      itemCountSpan.textContent = "0";
      subtotalP.textContent = "0₫";
      shippingFeeP.textContent = "-";
      totalP.textContent = "0₫";
      return;
    }

    let itemCount = 0;
    let calculatedSubtotal = 0; // Biến mới để tính lại subtotal

    cartItems.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      itemCount += item.quantity; // Tăng itemCount theo số lượng sản phẩm
      calculatedSubtotal += itemTotal; // Cộng vào subtotal

      const itemDiv = document.createElement("div");
      itemDiv.classList.add("cart-item");

      itemDiv.innerHTML = `
  <div class="item-left">
    <img src="${item.image}" alt="${item.title}" />
    <div class="item-title">
      <p class="mb-0">${item.title}</p>
      <p class="mb-0">${item.price.toLocaleString()}₫ x ${item.quantity}</p>
    </div>
  </div>
  <div class="item-price">
    ${itemTotal.toLocaleString()}₫
  </div>
`;
      cartItemsContainer.appendChild(itemDiv);
    });

    itemCountSpan.textContent = itemCount;
    subtotalP.textContent = `${calculatedSubtotal.toLocaleString()}₫`;
    shippingFeeP.textContent = "-";
    totalP.textContent = `${(calculatedSubtotal - discount).toLocaleString()}₫`;
  }

  // Handle applying discount code
  applyDiscountButton.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default button action
    const code = discountCodeInput.value.trim();
    if (code === "") {
      alert("Please enter a discount code.");
      return;
    }

    // Check discount code (e.g., "DISCOUNT10" for 10% off)
    if (code === "DISCOUNT10") {
      discount = totalAmount * 0.1;
      alert("Discount code applied successfully! You get a 10% discount.");
    } else if (code === "DISCOUNT20") {
      discount = totalAmount * 0.2;
      alert("Discount code applied successfully! You get a 20% discount.");
    } else {
      discount = 0;
      alert("Invalid discount code.");
    }

    totalP.textContent = `${(totalAmount - discount).toLocaleString()}₫`;
  });

  // Function to show order success modal
  function showOrderSuccessModal() {
    var orderSuccessModal = new bootstrap.Modal(
      document.getElementById("orderSuccessModal")
    );
    orderSuccessModal.show();
  }

  // Handle order submission
  orderForm.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent default form submission
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    // Get shipping information from form
    const email = document.getElementById("email").value.trim();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const country = document.getElementById("country").value.trim();
    let city, district, ward, addressGeneral;
    if (country === "Vietnam") {
      city = document.getElementById("city").value.trim();
      district = document.getElementById("district").value.trim();
      ward = document.getElementById("ward").value.trim();
    } else {
      addressGeneral = document.getElementById("address-general").value.trim();
    }
    const note = document.getElementById("note").value.trim();
    const paymentMethod = document.querySelector(
      'input[name="payment"]:checked'
    ).value;

    // Check required fields
    if (
      email === "" ||
      name === "" ||
      phone === "" ||
      note === "" ||
      (country === "Vietnam" && city === "") ||
      (country !== "Vietnam" && addressGeneral === "")
    ) {
      alert(
        "Please fill in all required information (Email, Full Name, Phone Number, Note, Province/Address)."
      );
      return;
    }

    // Validate Phone Number format (e.g., only numbers and minimum length)
    const phonePattern = /^[0-9]{10,15}$/;
    if (!phonePattern.test(phone)) {
      alert("Please enter a valid phone number (10-15 digits).");
      return;
    }

    // TODO: Add processing to send order to server or store order information
    // Example: Send order information via AJAX to server

    // Show order success modal
    showOrderSuccessModal();

    // Remove cart data from localStorage
    localStorage.removeItem("cartItems");
    localStorage.removeItem("totalAmount");

    // Update cart interface
    displayCartItems();

    // Reset form
    orderForm.reset();
    discount = 0;
    totalP.textContent = "0₫";

    // Hide address fields
    vietnamAddress.style.display = "none";
    generalAddress.style.display = "none";
  });

  // Initialize cart when page loads
  displayCartItems();

  // Function to initialize hidden Vietnam address fields
  toggleAddressFields(countrySelect.value);
});

document.addEventListener("DOMContentLoaded", () => {
  const countryCodeSelect = document.getElementById("country-code");

  // Event when country code changes
  countryCodeSelect.addEventListener("change", function () {
    const selectedOption = this.options[this.selectedIndex];
    const flagUrl = selectedOption.getAttribute("data-flag");

    if (flagUrl) {
      // Change flag image in dropdown
      this.style.backgroundImage = `url('${flagUrl}')`;
    } else {
      // If no flag, remove background image
      this.style.backgroundImage = "none";
    }
  });

  // Initialize flag display when page loads
  const initialOption =
    countryCodeSelect.options[countryCodeSelect.selectedIndex];
  const initialFlag = initialOption.getAttribute("data-flag");
  if (initialFlag) {
    countryCodeSelect.style.backgroundImage = `url('${initialFlag}')`;
  }
});
