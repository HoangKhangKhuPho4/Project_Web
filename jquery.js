const searchbar = document.getElementById("search-bar");
const searchDown = document.getElementsByClassName("search-down");

searchbar.addEventListener("focus",(event) =>{
  if(searchDown.length != 0){
    searchDown[0].style.display ="block";
  }
  
});

searchbar.addEventListener("click",(event) =>{
  if(searchDown.length != 0){
    searchMenu();
  } 
});

searchbar.addEventListener("search",(event) =>{
  searchEnter();
});
  
// searchbar.addEventListener("blur",(event) =>{
//   searchDown[0].style.display ="none";
// });


// $(function() {
//     $("#search-bar").on("focus", function(){
//         const searchDown = document.getElementsByClassName("search-down");
//         searchDown[0].style.display ="block";
//     });

//     $("#search-bar").on("blur", function(){
//         const searchDown = document.getElementsByClassName("search-down");
//         searchDown[0].style.display ="none";
//     });
// });


/**mảng đồ ăn trong menu */
const menu =[];

const food1 = {
  title: 'Classic Pancakes',
  price: 10900,
  description: 'Classic pancakes, served with maple syrup and fresh berries, are a popular breakfast dish in many parts of the world.',
  ingredients: 'Bột mì, Trứng, Sữa, Bơ, Đường, Bột nở',
  preparation: 'Bước 1: Trộn bột mì, đường và bột nở trong một bát lớn. Bước 2: Đánh trứng và thêm sữa vào hỗn hợp bột. Bước 3: Đun nóng chảo với bơ và đổ từng phần bột vào chảo. Bước 4: Nướng mỗi mặt cho đến khi vàng đều. Bước 5: Thưởng thức với siro maple và quả mọng tươi.',
  images: './img/pancakes.jpg, ./img/pancakes2.jpg',
  present_img: './img/pancakes.jpg',
  video: 'https://www.youtube.com/embed/vkcHmpKxFwg',
  rating: '★★★★★',
  reviews: '10 đánh giá'
};

const food2 = {
  title: 'Avocado Toast',
  price: 8990,
  description: "Toast with avocado and cherry tomatoes is a modern culinary trend, loved for its combination of fresh flavor and nutrition.",
  ingredients: 'Bánh mì, Bơ, Cà chua bi, Pho mát feta, Muối, Tiêu',
  preparation: 'Bước 1: Nướng bánh mì đến khi giòn. Bước 2: Trộn bơ với một chút muối và tiêu. Bước 3: Phết hỗn hợp bơ lên bánh mì nướng. Bước 4: Thêm cà chua bi cắt đôi và rắc pho mát feta lên trên. Bước 5: Thưởng thức ngay khi còn ấm.',
  images: './img/menu-avocado-toast.jpg, ./img/menu-avocado-toast2.jpg',
  present_img: './img/menu-avocado-toast.jpg',
  video: 'https://www.youtube.com/embed/li-pPc6KNho',
  rating: '★★★★☆',
  reviews: '8 đánh giá'
};

const food3 = { 
  title: 'Avocado Toast 2',
  price: 8990,
  description: "The combination of creamy avocado, the crunch of the toast, and the tangy flavors of the toppings make it a delicious and satisfying meal or snack. Enjoy it while it's still warm for the best experience!",
  ingredients: 'Bánh mì, Bơ, Cà chua bi, Pho mát feta, Muối, Tiêu',
  preparation: 'Bước 1: Nướng bánh mì đến khi giòn. Bước 2: Trộn bơ với một chút muối và tiêu. Bước 3: Phết hỗn hợp bơ lên bánh mì nướng. Bước 4: Thêm cà chua bi cắt đôi và rắc pho mát feta lên trên. Bước 5: Thưởng thức ngay khi còn ấm.',
  images: './img/menu-avocado-toast.jpg, ./img/menu-avocado-toast2.jpg',
  present_img: './img/menu-avocado-toast.jpg',
  video: 'https://www.youtube.com/embed/li-pPc6KNho',
  rating: '★★★★☆',
  reviews: '8 đánh giá'
};
menu[0] = food1;
menu[1] = food2;
menu[2] = food3;


/** */
function searchEnter(){
  // alert("enter click");
  const text = searchbar.value.trim().toLowerCase();
  if(text == ""){
    if(searchDown.length != 0){
      searchDown[0].replaceChildren();
    }
    return;
  }else{
    window.location="./search.html?search="+text;
  }
}
const search_button = document.getElementById('search-button');
search_button.addEventListener("click" ,(event) =>{
  searchEnter();
});


function searchMenu(){
    const text = searchbar.value.trim().toLowerCase();
    searchDown[0].replaceChildren();
    if(text == ""){
        return;
    }else{
        try {
            console.log("---start---");
            let menu_name;
            for(let i=0; i <= menu.length; i++){
                menu_name = menu[i].title.toLowerCase().trim();
                if(menu_name.includes(text)){
                    searchDown[0].innerHTML += 
                    
                    "<div class='search-detail card mb-3' style='max-width: 540px;'>"
+"                  <div class='row g-0'>"
+"                     <div class='col-md-5'>"
+"                       <img src='"+menu[i].present_img+"' class='img-fluid rounded-start'>"
+"                     </div>"
+"                     <div class='col-md-7'>"
+"                       <div class='card-body'>"
+"                         <a class='card-title fs-5 fw-bold' data-bs-toggle='modal' data-bs-target='#menuDetailModal'"
+"                              data-title='"+menu[i].title+"' data-price='"+menu[i].price+"' data-description='"+menu[i].description+"' data-ingredients='"+menu[i].ingredients+"' data-preparation='"+menu[i].preparation+"' data-images='"+menu[i].images+"' data-video='"+menu[i].video+"' data-rating='"+menu[i].rating+"' data-reviews='"+menu[i].reviews+"'>"+menu[i].title+"</a>"
+"                         <div class='row'>"
+"                           <div class='col-12 text-truncate'>"
+                              menu[i].description
+"                           </div>"
+"                         </div>"
+"                       </div>"
+"                    </div>"
+"                   </div>"
+"                 </div>";
                    console.log(menu_name);
                }
            }
          } catch (e) {

          }  
        
    }
}

// Hàm để lấy và hiển thị dữ liệu từ URL
function displayDataFromURL() {
  // Lấy query string từ URL
  const params = new URLSearchParams(window.location.search);

  // Kiểm tra nếu có tham số nào được truyền
  if (params.has('search')) {
      // Lấy giá trị của tham số 'page'
      const data = params.get('search');
      
      //focus vào thanh search bar
      // searchbar.focus();

      if(data == ""){
        return;
      }else{
        search(data);
      }
      
  } else {
      console.log("Không có dữ liệu nào trong URL.");
  }
}

//chuc nang nay trong trang search
function search(search_text) {
  let menuListS = document.getElementById("menu_list");
  let numberOfDish =0;
  menuListS.replaceChildren();

  try {
    console.log("---start---");
    let menu_name;
    for (let i = 0; i <= menu.length; i++) {
      menu_name = menu[i].title.toLowerCase().trim();
      if (menu_name.includes(search_text)) {
        menuListS.innerHTML +=

          "<div class='col-lg-12'>"
          + "                    <div class='menu-item position-relative' data-bs-toggle='modal' data-bs-target='#menuDetailModal'"
          + "                              data-title='" + menu[i].title + "' data-price='" + menu[i].price + "' data-description='" + menu[i].description + "' data-ingredients='" + menu[i].ingredients + "' data-preparation='" + menu[i].preparation + "' data-images='" + menu[i].images + "' data-video='" + menu[i].video + "' data-rating='" + menu[i].rating + "' data-reviews='" + menu[i].reviews + "'>"
          + "                        <img src='" + menu[i].present_img + "' class='img-fluid flex-shrink-0 rounded' loading='lazy' data-bs-toggle='tooltip' data-bs-placement='top' title='Nhấn để xem chi tiết' />"
          + "                        <div class='w-100 d-flex flex-column text-start ps-4'>"
          + "                            <h5 class='d-flex justify-content-between'>"
          + "                                <span>" + menu[i].title + "</span>"
          + "                                <span class='text-primary'>" + parseInt(menu[i].price).toLocaleString()+" VNĐ</span>"
          + "                            </h5>"
          + "                            <small class='fst-italic'>" + menu[i].description + "</small>"
          + "                        </div>"
          + "                        <button class='btn btn-primary btn-view-details px-5' style='width:max-content'>"
          + "                            Xem Chi Tiết"
          + "                        </button>"
          + "                    </div>"
          + "                </div>";
        console.log(menu_name);
        numberOfDish = numberOfDish +1;
      }else{

      }
    }

  } catch (e) {

  }

  
    let notifySearch = document.getElementById("notification-search");
    let text_notify = "Có " + numberOfDish +" kết quả cho tìm kiếm: "+ search_text;
    notifySearch.innerHTML = text_notify;
}
// Gọi hàm khi trang được load
window.onload = displayDataFromURL;



//BOOKING
function bookingSubmit(event) {
  const bookingForm = document.getElementById("booking_form");
  const bookingConfirm = document.getElementsByClassName("booking_confirm");
  const bookingMessage = document.getElementById("booking_message");
  // Thu thập dữ liệu từ form
  event.preventDefault(); // Ngăn chặn gửi form mặc định

  const name = document.getElementById("name_booking").value.trim();
  const email = document.getElementById("email_booking").value.trim();
  const dateTime = document.getElementById("datetime_booking").value.trim();
  const numberofPeople = document.getElementById("select1").value.trim();
  const specialRequest = document.getElementById("special_request_booking").value.trim();


  const position = dateTime.indexOf(" ");

  const date = dateTime.slice(0, position);
  const time = dateTime.slice(position, dateTime.length);
  //
  document.getElementById("booking_name").innerHTML = name;
  document.getElementById("booking_date").innerHTML = date;
  document.getElementById("booking_time").innerHTML = time;
  document.getElementById("booking_numOfPeople").innerHTML = numberofPeople;
  //show
  bookingForm.style.display = "none";

  bookingConfirm[0].style.display = "block";
  bookingConfirm[0].style.animation = "appear 2s";
  
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
  menuDetailModal.querySelector(
    "#menuDetailDescription"
  ).textContent = description;
  menuDetailModal.querySelector(
    "#menuDetailPrice"
  ).textContent = `${parseInt(price).toLocaleString()} VNĐ`;

  // Handle images carousel
  var carouselInner =
    menuDetailModal.querySelector(".carousel-inner");
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
  var reviews =
    menuItem.getAttribute("data-reviews") || "(0 đánh giá)";
  var ratingContainer =
    menuDetailModal.querySelector("#menuDetailRating");
  ratingContainer.innerHTML = ""; // Clear existing stars

  // Render stars based on rating
  for (let i = 0; i < 5; i++) {
    if (i < rating.length && rating[i] === "★") {
      ratingContainer.innerHTML += '<i class="fas fa-star"></i>';
    } else {
      ratingContainer.innerHTML +=
        '<i class="fas fa-star text-muted"></i>';
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
    // Split by ". Bước" to separate steps
    preparation.split(". Bước").forEach(function (step, index) {
      step = step.trim();
      if (index === 0 && step.startsWith("Bước")) {
        step = step.replace("Bước ", "").trim();
      }
      if (step) {
        preparationList.innerHTML += `<li>Bước ${
          index + 1
        }: ${step}.</li>`;
      }
    });
  }
});

// Clear video when modal is hidden
menuDetailModal.addEventListener("hidden.bs.modal", function () {
  document.getElementById("menuDetailVideo").src = "";
});