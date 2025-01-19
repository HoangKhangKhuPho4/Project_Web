document.addEventListener("DOMContentLoaded", function () {
  var menuDetailModal = document.getElementById("menuDetailModal");
  var orderSidebar = document.getElementById("orderSidebar");
  var paymentSection = document.getElementById("paymentSection"); // Removed
  var paymentForm = document.getElementById("paymentForm");
  var selectedItemsDiv = document.getElementById("selectedItems");
  var totalAmountSpan = document.getElementById("totalAmount");
  var confirmOrderButton = document.getElementById("confirmOrderButton");

  let orderItems = [];
  let totalAmount = 0;

  // Function to add item to order
  function addToOrder(item) {
    const existingItem = orderItems.find((i) => i.title === item.title);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      orderItems.push({ ...item, quantity: 1 });
    }
    updateSidebar();
    showOrderSidebar();
  }

  // Function to remove item from order
  function removeFromOrder(itemTitle) {
    const index = orderItems.findIndex((i) => i.title === itemTitle);
    if (index > -1) {
      orderItems[index].quantity -= 1;
      if (orderItems[index].quantity <= 0) {
        // Remove item if quantity is 0
        orderItems.splice(index, 1);
      }
    }
    updateSidebar();
  }

  // Function to completely delete an item
  function deleteFromOrder(itemTitle) {
    orderItems = orderItems.filter((i) => i.title !== itemTitle);
    updateSidebar();
  }

  // Function to update the sidebar with selected items
  function updateSidebar() {
    selectedItemsDiv.innerHTML = ""; // Clear current items
    totalAmount = 0;

    orderItems.forEach((item) => {
      const itemTotal = item.price * item.quantity; // Calculate total for the item
      totalAmount += itemTotal;
      selectedItemsDiv.innerHTML += `
          <div class="item d-flex align-items-center">
            <img src="${item.image}" alt="${
        item.title
      }" class="cart-item-image me-3">
            <div class="item-details flex-grow-1">
              <strong>${item.title}</strong><br>
              <span>${item.price.toLocaleString()} VND x ${
        item.quantity
      } = ${itemTotal.toLocaleString()} VND</span>
            </div>
            <div class="item-actions">
              <button onclick="removeFromOrder('${
                item.title
              }')"><i class="fas fa-minus-circle"></i></button>
              <button onclick='addToOrder({"title": "${item.title}", "price": ${
        item.price
      }, "image": "${item.image}"})'><i class="fas fa-plus-circle"></i></button>
              <button onclick="deleteFromOrder('${
                item.title
              }')"><i class="fas fa-trash-alt text-danger"></i></button>
            </div>
          </div>
        `;
    });

    totalAmountSpan.textContent = totalAmount.toLocaleString();

    // Update the number of items in the cart
    var cartCount = orderItems.reduce(function (acc, item) {
      return acc + item.quantity;
    }, 0);
    document.getElementById("cart-count").innerText = cartCount;

    // Show or hide the confirm order button based on cart contents
    confirmOrderButton.style.display = orderItems.length > 0 ? "block" : "none";

    // If the cart is empty, hide the payment section (removed)
    /*
      if (orderItems.length === 0) {
        paymentSection.style.display = "none";
      }
      */
  }

  // Function to show the sidebar
  function showOrderSidebar() {
    orderSidebar.classList.add("show");
  }

  // Function to hide the sidebar
  function hideOrderSidebar() {
    orderSidebar.classList.remove("show");
    // Reset payment section if visible (removed)
    /*
      paymentSection.style.display = "none";
      */
    // Reset payment form fields
    /*
      paymentForm.reset();
      document.getElementById("creditCardFields").style.display = "none";
      document.getElementById("paypalFields").style.display = "none";
      */
  }

  // Handle modal show event to populate details
  menuDetailModal.addEventListener("show.bs.modal", function (event) {
    var menuItem = event.relatedTarget;

    var title = menuItem.getAttribute("data-title");
    var description = menuItem.getAttribute("data-description");
    var price = menuItem.getAttribute("data-price");
    var videoURL = menuItem.getAttribute("data-video");
    var images = menuItem.getAttribute("data-images");
    var ingredients = menuItem.getAttribute("data-ingredients");
    var preparation = menuItem.getAttribute("data-preparation");

    // Update modal content
    menuDetailModal.querySelector(".modal-title").textContent = title;
    menuDetailModal.querySelector("#menuDetailDescription").textContent =
      description;
    menuDetailModal.querySelector("#menuDetailPrice").textContent = `${parseInt(
      price
    ).toLocaleString()} VND`;

    // Handle images carousel
    var carouselInner = menuDetailModal.querySelector(".carousel-inner");
    carouselInner.innerHTML = ""; // Clear existing images
    var imageList = images
      ? images.split(",")
      : [menuItem.getAttribute("data-image")];
    imageList.forEach((imgSrc, index) => {
      carouselInner.innerHTML += `
          <div class="carousel-item ${index === 0 ? "active" : ""}">
            <img src="${imgSrc.trim()}" class="d-block w-100 rounded" alt="${title}">
          </div>
        `;
    });

    // Handle video URL
    var menuDetailVideo = document.getElementById("menuDetailVideo");
    if (videoURL) {
      // Convert YouTube URL to embed URL if necessary
      if (!videoURL.includes("youtube.com/embed/")) {
        var videoId = "";
        var ytRegex =
          /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?(?:.*&)?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
        var match = videoURL.match(ytRegex);
        if (match && match[1]) {
          videoId = match[1];
          videoURL = `https://www.youtube.com/embed/${videoId}`;
        } else {
          videoURL = "";
        }
      }
      if (videoURL) {
        menuDetailVideo.src = videoURL;
        menuDetailVideo.parentElement.style.display = "block";
      } else {
        menuDetailVideo.parentElement.style.display = "none";
      }
    } else {
      menuDetailVideo.parentElement.style.display = "none";
    }

    // Update rating and reviews
    var rating = menuItem.getAttribute("data-rating") || "★★★★★";
    var reviews = menuItem.getAttribute("data-reviews") || "(0 reviews)";
    var ratingContainer = menuDetailModal.querySelector("#menuDetailRating");
    ratingContainer.innerHTML = ""; // Clear existing stars

    // Render stars based on rating
    for (let i = 0; i < 5; i++) {
      if (i < rating.length && rating[i] === "★") {
        ratingContainer.innerHTML += '<i class="fas fa-star"></i>';
      } else {
        ratingContainer.innerHTML += '<i class="fas fa-star text-muted"></i>';
      }
    }

    menuDetailModal.querySelector(
      "#menuDetailReviews"
    ).textContent = `(${reviews})`;

    // Inject Ingredients
    var ingredientsList = menuDetailModal.querySelector(
      "#menuDetailIngredients"
    );
    ingredientsList.innerHTML = ""; // Clear existing
    if (ingredients) {
      ingredients.split(",").forEach(function (ingredient) {
        ingredientsList.innerHTML += `<li>${ingredient.trim()}</li>`;
      });
    }

    // Inject Preparation Steps
    var preparationList = menuDetailModal.querySelector(
      "#menuDetailPreparation"
    );
    preparationList.innerHTML = ""; // Clear existing
    if (preparation) {
      // Split by ". Step" to separate steps
      preparation.split(". Step").forEach(function (step, index) {
        step = step.trim();
        if (index === 0 && step.startsWith("Step")) {
          step = step.replace("Step", "").trim();
        }
        if (step) {
          preparationList.innerHTML += `<li>Step ${index + 1}: ${step}.</li>`;
        }
      });
    }
  });

  // Clear video when modal is hidden
  menuDetailModal.addEventListener("hidden.bs.modal", function () {
    document.getElementById("menuDetailVideo").src = "";
  });

  // Handle adding dish from modal
  document
    .getElementById("orderDishButton")
    .addEventListener("click", function () {
      const title = menuDetailModal.querySelector(".modal-title").textContent;
      const priceText =
        menuDetailModal.querySelector("#menuDetailPrice").textContent;
      const price = parseInt(priceText.replace(/[^0-9]/g, ""));

      // Get first image from carousel
      const imageSrc = menuDetailModal.querySelector(
        ".carousel-item.active img"
      ).src;

      const item = {
        title: title,
        price: price,
        image: imageSrc, // Add image field to the item object
      };

      addToOrder(item);

      // Show success toast
      var toastEl = document.getElementById("orderSuccessToast");
      var toast = new bootstrap.Toast(toastEl);
      toast.show();

      // Close the modal
      var modal = bootstrap.Modal.getInstance(menuDetailModal);
      modal.hide();
    });

  // Handle confirm order button click
  confirmOrderButton.addEventListener("click", function () {
    // Store cart data in localStorage
    localStorage.setItem("cartItems", JSON.stringify(orderItems));
    localStorage.setItem("totalAmount", totalAmount);

    // Redirect to payment.html
    window.location.href = "payment.html";
  });

  // Initialize tooltips
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });

  // Expose functions to the global scope for inline onclick handlers
  window.addToOrder = function (item) {
    if (typeof item === "string") {
      try {
        item = JSON.parse(item);
      } catch (e) {
        console.error("Invalid JSON string for addToOrder:", item);
        return;
      }
    }
    addToOrder(item);
  };

  window.removeFromOrder = function (itemTitle) {
    removeFromOrder(itemTitle);
  };

  window.deleteFromOrder = function (itemTitle) {
    deleteFromOrder(itemTitle);
  };

  window.hideOrderSidebar = hideOrderSidebar;
  window.showOrderSidebar = showOrderSidebar; // Added this line
});
