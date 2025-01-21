document.addEventListener("DOMContentLoaded", function () {
  // Handle toggle for table of contents
  // Update to:
  const toggleButton = document.querySelector(".btn.btn-primary.mb-4");
  const contentTable = document.querySelector(".content-table");

  if (toggleButton && contentTable) {
    toggleButton.addEventListener("click", function () {
      if (
        contentTable.style.display === "none" ||
        !contentTable.style.display
      ) {
        contentTable.style.display = "block";
        toggleButton.innerText = "ARTICLE CONTENT [Hide]";
      } else {
        contentTable.style.display = "none";
        toggleButton.innerText = "ARTICLE CONTENT [Show]";
      }
    });
  }

  // Handle Back to Top button
  const backToTopButton = document.querySelector(".back-to-top");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 300) {
      backToTopButton.classList.add("show");
    } else {
      backToTopButton.classList.remove("show");
    }
  });

  backToTopButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Initialize Carousel for Related Posts
  var relatedPostsCarousel = document.querySelector("#relatedPostsCarousel");
  if (relatedPostsCarousel) {
    var carousel = new bootstrap.Carousel(relatedPostsCarousel, {
      interval: 5000, // Slide transition time (ms)
      ride: "carousel", // Automatically start carousel
      wrap: true, // Cycle slides
      pause: "hover", // Pause on hover
    });
  }

  // Handle COMMENT FORM
  const commentForm = document.getElementById("comment-form");
  const formMessage = document.getElementById("form-message");

  if (commentForm) {
    commentForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent default form submission

      // Collect data from form
      const comment = document.getElementById("comment").value.trim();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();

      // Validate data
      if (!comment || !name || !email) {
        formMessage.innerHTML =
          '<div class="alert alert-danger" role="alert">Please fill out all required fields.</div>';
        return;
      }

      // Validate email format
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email)) {
        formMessage.innerHTML =
          '<div class="alert alert-danger" role="alert">Please enter a valid email address.</div>';
        return;
      }

      // If no backend to process, display success message immediately
      formMessage.innerHTML =
        '<div class="alert alert-success" role="alert">Thank you for your feedback!</div>';
      commentForm.reset(); // Clear the form
    });
  }

  // Handle "Add to Cart" button clicks
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert("Product has been added to your cart!");
      // Logic to add product to cart can be added here
    });
  });

  // Handle "Compare Product" button clicks
  const compareProductButtons = document.querySelectorAll(".compare-product");
  compareProductButtons.forEach((button) => {
    button.addEventListener("click", function () {
      alert("Product has been added to the comparison list!");
      // Logic to add product to comparison list can be added here
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Function to update cart count displayed on navbar
  function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let totalQuantity = cart.reduce((acc, item) => acc + item.quantity, 0);
    const cartCountElement = document.getElementById("cart-count");
    if (cartCountElement) {
      cartCountElement.innerText = totalQuantity;
    }
  }

  updateCartCount();

  // Handle "Add to Cart" button clicks
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Get parent element containing product information
      const productCard = this.closest(".product-card");

      // Retrieve data from data attributes
      const name = productCard.dataset.name;
      const originalPrice = parseFloat(productCard.dataset.originalPrice);
      const discountedPrice = parseFloat(productCard.dataset.discountedPrice);
      const discount = productCard.dataset.discount;
      const image = productCard.dataset.image;

      // Create product object
      const product = {
        name,
        originalPrice,
        discountedPrice,
        discount,
        image,
      };

      // Get existing cart from LocalStorage or initialize a new one
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Check if product already exists in the cart
      const existingProduct = cart.find((item) => item.name === product.name);
      if (existingProduct) {
        existingProduct.quantity += 1; // Increase quantity if it exists
      } else {
        product.quantity = 1; // Add quantity attribute
        cart.push(product); // Add new product
      }

      // Save the updated cart back to LocalStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Update cart count displayed on navbar
      updateCartCount();

      // Display success notification (use simple alert or you can use Toast)
      alert(`${product.name} has been added to your cart!`);

      // If you want to automatically redirect to the cart page, you can use:
      // window.location.href = "shoppingCart.html";
    });
  });

  // Handle increase, decrease, and remove actions in the cart
  document.getElementById("cart-items").addEventListener("click", function (e) {
    if (e.target.classList.contains("increase-quantity")) {
      const name = e.target.getAttribute("data-name");
      const cart = loadCart();
      const product = cart.find((p) => p.name === name);
      if (product) {
        product.quantity += 1;
        saveCart(cart);
        updateCartCount();
        updateCartDisplay();
      }
    }

    if (e.target.classList.contains("decrease-quantity")) {
      const name = e.target.getAttribute("data-name");
      const cart = loadCart();
      const product = cart.find((p) => p.name === name);
      if (product && product.quantity > 1) {
        product.quantity -= 1;
        saveCart(cart);
        updateCartCount();
        updateCartDisplay();
      }
    }

    if (e.target.classList.contains("remove-item")) {
      const name = e.target.getAttribute("data-name");
      let cart = loadCart();
      cart = cart.filter((p) => p.name !== name);
      saveCart(cart);
      updateCartCount();
      updateCartDisplay();
    }
  });

  // When the modal opens, update the cart display
  const cartModal = document.getElementById("cartModal");
  if (cartModal) {
    cartModal.addEventListener("show.bs.modal", updateCartDisplay);
  }

  // Update cart count when the page loads
  updateCartCount();

  // Function to create Toast notification when adding to cart
  function createAddToCartToast() {
    const toastHTML = `
        <div class="toast align-items-center text-bg-primary border-0" id="addToCartToast" role="alert" aria-live="assertive" aria-atomic="true">
          <div class="d-flex">
            <div class="toast-body">
              Product has been added to your cart!
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      `;
    document.body.insertAdjacentHTML("beforeend", toastHTML);
  }

  // Create Toast when the page loads
  createAddToCartToast();
});
