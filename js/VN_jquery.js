const searchbar = document.getElementById("search-bar");
const searchDown = document.getElementsByClassName("search-down");

searchbar.addEventListener("search", (event) => {
  searchEnter();
});

/**mảng booking */
let bookingList;

/**mảng đồ ăn trong menu */
const menu = [];

addFood();

/** */
function searchEnter() {
  // alert("enter click");
  const text = searchbar.value.trim().toLowerCase();
  if (text == "") {
    if (searchDown.length != 0) {
      searchDown[0].replaceChildren(); //xóa những cái còn lại trong searchDown
    }
    return;
  } else {
    window.location = "./search.html?search=" + text; //nếu có chữ thì vào trang search + thêm chữ đó để nó tìm kiếm
  }
}

/*cái này là để hiển thị tìm kiếm sau mỗi lần nhấn trong search bar*/
function searchMenu() {
  const text = searchbar.value.trim().toLowerCase();
  searchDown[0].replaceChildren();
  if (text == "") {
    return;
  } else {
    try {
      console.log("---start---");
      let menu_name;
      let count = 1;
      for (let i = 0; i <= menu.length; i++) {
        menu_name = menu[i].title.toLowerCase().trim();
        if (menu_name.includes(text)) {
          if (count > 4) break;
          searchDown[0].innerHTML +=
            "<div class='search-detail card mb-3' style='max-width: 540px;'>" +
            "                  <div class='row g-0'>" +
            "                     <div class='col-md-5'>" +
            "                       <img src='" +
            menu[i].present_img +
            "' class='img-fluid rounded-start'>" +
            "                     </div>" +
            "                     <div class='col-md-7'>" +
            "                       <div class='card-body'>" +
            "                         <a class='card-title fs-5 fw-bold' data-bs-toggle='modal' data-bs-target='#menuDetailModal'" +
            "                              data-title='" +
            menu[i].title +
            "' data-price='" +
            menu[i].price +
            "' data-description='" +
            menu[i].description +
            "' data-ingredients='" +
            menu[i].ingredients +
            "' data-preparation='" +
            menu[i].preparation +
            "' data-images='" +
            menu[i].images +
            "' data-video='" +
            menu[i].video +
            "' data-rating='" +
            menu[i].rating +
            "' data-reviews='" +
            menu[i].reviews +
            "'>" +
            menu[i].title +
            "</a>" +
            "                         <div class='row'>" +
            "                           <div class='col-12 text-truncate'>" +
            menu[i].description +
            "                           </div>" +
            "                         </div>" +
            "                       </div>" +
            "                    </div>" +
            "                   </div>" +
            "                 </div>";
          console.log(menu_name);
          count++;
        }
      }
    } catch (e) {}
  }
}

// Hàm để lấy và hiển thị dữ liệu từ URL trong search page
function displayDataFromURL() {
  // Lấy query string từ URL
  const params = new URLSearchParams(window.location.search);

  // Kiểm tra nếu có tham số nào được truyền
  if (params.has("search")) {
    // Lấy giá trị của tham số 'page'
    const data = params.get("search");

    //focus vào thanh search bar
    // searchbar.focus();

    if (data == "") {
      return;
    } else {
      search(data);
    }
  } else {
    console.log("Không có dữ liệu nào trong URL.");
  }
}

/*chuc nang nay trong trang search */
function search(search_text) {
  let menuListS = document.getElementById("menu_list");
  let numberOfDish = 0;
  menuListS.replaceChildren();

  try {
    console.log("---start---");
    let menu_name;
    for (let i = 0; i <= menu.length; i++) {
      menu_name = menu[i].title.toLowerCase().trim();
      if (menu_name.includes(search_text)) {
        menuListS.innerHTML +=
          "<div class='col-lg-12'>" +
          "                    <div class='menu-item position-relative' data-bs-toggle='modal' data-bs-target='#menuDetailModal'" +
          "                              data-title='" +
          menu[i].title +
          "' data-price='" +
          menu[i].price +
          "' data-description='" +
          menu[i].description +
          "' data-ingredients='" +
          menu[i].ingredients +
          "' data-preparation='" +
          menu[i].preparation +
          "' data-images='" +
          menu[i].images +
          "' data-video='" +
          menu[i].video +
          "' data-rating='" +
          menu[i].rating +
          "' data-reviews='" +
          menu[i].reviews +
          "'>" +
          "                        <img src='" +
          menu[i].present_img +
          "' class='img-fluid flex-shrink-0 rounded' data-bs-toggle='tooltip' data-bs-placement='top' title='Nhấn để xem chi tiết' />" +
          "                        <div class='w-100 d-flex flex-column text-start ps-4'>" +
          "                            <h5 class='d-flex justify-content-between'>" +
          "                                <span>" +
          menu[i].title +
          "</span>" +
          "                                <span class='text-primary'>" +
          parseInt(menu[i].price).toLocaleString() +
          " VNĐ</span>" +
          "                            </h5>" +
          "                            <small class='fst-italic'>" +
          menu[i].description +
          "</small>" +
          "                        </div>" +
          "                        <button class='btn btn-primary btn-view-details px-5' style='width:max-content'>" +
          "                            Xem Chi Tiết" +
          "                        </button>" +
          "                    </div>" +
          "                </div>";
        console.log(menu_name);
        numberOfDish = numberOfDish + 1;
      } else {
      }
    }
  } catch (e) {}

  let notifySearch = document.getElementById("notification-search");
  let text_notify =
    (numberOfDish > 1 ? "there are " : "there is ") +
    numberOfDish +
    " result for the search: " +
    search_text;
  notifySearch.innerHTML = text_notify;
}
// Gọi hàm khi trang được load
window.onload = displayDataFromURL;

//BOOKING
function bookingSubmit(event) {
  //
  const bookingForm = document.getElementById("booking_form");
  const bookingConfirm = document.getElementsByClassName("booking_confirm");
  const bookingMessage = document.getElementById("booking_message");
  // Thu thập dữ liệu từ form
  event.preventDefault(); // Ngăn chặn gửi form mặc định

  const name = document.getElementById("name_booking").value.trim();
  const email = document.getElementById("email_booking").value.trim();
  const dateTime = document.getElementById("datetime_booking").value.trim();
  const numberofPeople = document.getElementById("select1").value.trim();
  const specialRequest = document
    .getElementById("special_request_booking")
    .value.trim();

  const position = dateTime.indexOf(" ");

  const date = dateTime.slice(0, position);
  const time = dateTime.slice(position, dateTime.length);
  //
  document.getElementById("booking_name").innerHTML = name;
  document.getElementById("booking_date").innerHTML = date;
  document.getElementById("booking_time").innerHTML = time;
  document.getElementById("booking_numOfPeople").innerHTML = numberofPeople;
  //show success booking
  bookingForm.style.display = "none";

  bookingConfirm[0].style.display = "block";
  bookingConfirm[0].style.animation = "appear 2s";

  bookingList = [];
  //thêm bookingGuess vào bookingList
  let bookingGuess = {
    name: name,
    email: email,
    dateTime: dateTime,
    numberofPeople: numberofPeople,
    specialRequest: specialRequest,
  };

  bookingList[0] = bookingGuess;
}

function addFood() {
  const food1 = {
    title: "Classic Pancakes",
    price: 10900,
    description:
      "Classic pancakes, served with maple syrup and fresh berries, are a popular breakfast dish in many parts of the world.",
    ingredients: "Bột mì, Trứng, Sữa, Bơ, Đường, Bột nở",
    preparation:
      "Bước 1: Trộn bột mì, đường và bột nở trong một bát lớn. Bước 2: Đánh trứng và thêm sữa vào hỗn hợp bột. Bước 3: Đun nóng chảo với bơ và đổ từng phần bột vào chảo. Bước 4: Nướng mỗi mặt cho đến khi vàng đều. Bước 5: Thưởng thức với siro maple và quả mọng tươi.",
    images: "./img/pancakes.jpg, ./img/pancakes2.jpg",
    present_img: "./img/pancakes.jpg",
    video: "https://www.youtube.com/embed/vkcHmpKxFwg",
    rating: "★★★★★",
    reviews: "10 đánh giá",
  };

  const food2 = {
    title: "Avocado Toast",
    price: 8990,
    description:
      "Toast with avocado and cherry tomatoes is a modern culinary trend, loved for its combination of fresh flavor and nutrition.",
    ingredients: "Bánh mì, Bơ, Cà chua bi, Pho mát feta, Muối, Tiêu",
    preparation:
      "Bước 1: Nướng bánh mì đến khi giòn. Bước 2: Trộn bơ với một chút muối và tiêu. Bước 3: Phết hỗn hợp bơ lên bánh mì nướng. Bước 4: Thêm cà chua bi cắt đôi và rắc pho mát feta lên trên. Bước 5: Thưởng thức ngay khi còn ấm.",
    images: "./img/menu-avocado-toast.jpg, ./img/menu-avocado-toast2.jpg",
    present_img: "./img/menu-avocado-toast.jpg",
    video: "https://www.youtube.com/embed/li-pPc6KNho",
    rating: "★★★★☆",
    reviews: "8 đánh giá",
  };

  const food3 = {
    title: "French Omelette",
    price: 12500,
    description:
      "TA light and fluffy omelette filled with a blend of herbs and melted cheese, creating a savory and satisfying breakfast option.",
    ingredients: "Eggs, Butter, Cheese, Fresh herbs, Salt, Pepper",
    preparation:
      "Step 1: Beat eggs with salt and pepper. Step 2: Heat butter in a pan until melted. Step 3: Pour eggs into the pan and stir gently to create bubbles. Step 4: Add cheese and fresh herbs as the eggs begin to set. Step 5: Fold the omelette in half and cook a bit more until the cheese melts. Step 6: Serve on a plate with a side of green salad.",
    images: "./img/menu-french-omelette.jpg, ./img/menu-french-omelette2.jpg",
    present_img: "./img/menu-french-Omelette.jpg",
    video: "https://www.youtube.com/embed/_Wb5Crj917I",
    rating: "★★★★★",
    reviews: "15 reviews",
  };

  const food4 = {
    title: "Berry Smoothie",
    price: 6750,
    description:
      "A refreshing blend of mixed berries and creamy yogurt, perfect for a healthy and delicious start to your morning.",
    ingredients: "Berries, Yogurt, Honey, Ice cubes, Vanilla extract",
    preparation:
      "Step 1: Add berries, yogurt, and honey to a blender. Step 2: Add ice cubes and a bit of vanilla extract. Step 3: Blend until smooth. Step 4: Pour into a glass and enjoy cold.",
    images: "./mg/menu-berry-smoothie.jpg, ./img/menu-berry-smoothie2.jpg",
    present_img: "./img/menu-berry-smoothie.jpg",
    video: "https://www.youtube.com/embed/EDL46b7TlZ8",
    rating: "★★★★☆",
    reviews: "12 reviews",
  };

  const food5 = {
    title: "Protein Granola Bowl",
    price: 11500,
    description:
      "Crunchy granola mixed with a variety of nuts and a scoop of protein powder, served with your choice of milk or yogurt.",
    ingredients:
      "Granola, Almonds, Cashews, Chia seeds, Nut milk, Protein powder",
    preparation:
      "Step 1: Mix granola and nuts in a large bowl. Step 2: Add a scoop of protein powder. Step 3: Pour nut milk over the top. Step 4: Stir well and enjoy.",
    images: "./img/menu-granola-parfait.jpg, ./img/menu-granola-bowl2.jpg",
    present_img: "./img/menu-granola-parfait.jpg",
    video: "https://www.youtube.com/embed/2nWi37RKzmw?si=JKiqSi8Qnv9hiZaA",
    rating: "★★★★☆",
    reviews: "9 reviews",
  };

  const food6 = {
    title: "Spinach & Feta Breakfast Wrap",
    price: 9800,
    description:
      "A warm tortilla filled with fresh spinach, crumbled feta cheese, and scrambled eggs, making for a nutritious and tasty breakfast wrap.",
    ingredients:
      "Large tortilla, Eggs, Spinach, Feta cheese, Butter, Salt, Pepper",
    preparation:
      "Step 1: Sauté spinach with butter until wilted. Step 2: Scramble eggs until soft. Step 3: Place tortilla on a flat surface, add spinach and scrambled eggs. Step 4: Add feta cheese on top. Step 5: Fold the tortilla into a wrap and lightly toast until the tortilla is crispy and the cheese melts. Step 6: Cut in half and enjoy.",
    images:
      "./img/spinach-and-feta-egg-white-wraps.jpg, ./img/spinach-feta-wrap2.jpg",
    present_img: "./img/spinach-and-feta-egg-white-wraps.jpg",
    video: "https://www.youtube.com/embed/-mNnf13pkv4?si=5sG2l_EkuuEp32nB",
    rating: "★★★★★",
    reviews: "14 reviews",
  };

  const food7 = {
    title: "Chia Seed Pudding",
    price: 8500,
    description:
      "Creamy chia pudding topped with a medley of fresh fruits and a drizzle of honey, offering a delightful and healthy treat.",
    ingredients: "Chia seeds, Nut milk, Honey, Fresh fruits, Vanilla extract",
    preparation:
      "Step 1: Mix chia seeds with nut milk and vanilla extract in a jar. Step 2: Refrigerate for at least 4 hours or overnight to allow chia seeds to expand. Step 3: Before serving, stir well and add honey. Step 4: Top with fresh fruits and enjoy.",
    images: "./img/chia-seeds-with-almond-milk.jpg, ./img/chia-pudding2.jpg",
    present_img: "./img/chia-seeds-with-almond-milk.jpg",
    video: "https://www.youtube.com/embed/uNiRYEsT3ac?si=NgL_ViQcChhv9jzk",
    rating: "★★★★☆",
    reviews: "11 reviews",
  };

  const food8 = {
    title: "Breakfast Burrito",
    price: 11500,
    description:
      "A hearty burrito stuffed with scrambled eggs, savory sausage, and melted cheese, wrapped in a soft tortilla for a satisfying breakfast on the go.",
    ingredients: "Large tortilla, Eggs, Sausage, Cheese, Salsa, Butter",
    preparation:
      "Step 1: Scramble eggs until soft. Step 2: Cook sausages until golden brown. Step 3: Place tortilla on a flat surface, add scrambled eggs, sausages, cheese, and salsa on top. Step 4: Fold the edges of the tortilla and tightly roll into a burrito. Step 5: Lightly toast on a pan until the tortilla is crispy and the cheese melts. Step 6: Cut in half and enjoy.",
    images:
      "./img/Breakfast-Burritos-850x636.jpg, ./img/breakfast-burrito2.jpg",
    present_img: "./img/Breakfast-Burritos-850x636.jpg",
    video: "https://www.youtube.com/embed/uNiRYEsT3ac?si=NgL_ViQcChhv9jzk",
    rating: "★★★★★",
    reviews: "13 reviews",
  };

  const food9 = {
    title: "Grilled Chicken Sandwich",
    price: 13990,
    description:
      "Juicy grilled chicken breast served with fresh lettuce, tomatoes, and a tangy mayo sauce, all packed in a toasted bun. Perfect for a hearty and satisfying meal.",
    ingredients: "Bread, Grilled chicken, Lettuce, Tomato, Mayonnaise, Butter",
    preparation:
      "Step 1: Grill chicken with seasoning until cooked and tender. Step 2: Toast the bread until crispy. Step 3: Spread mayonnaise on both sides of the bread. Step 4: Add lettuce and sliced tomato on one side of the bread. Step 5: Place the grilled chicken on top and cover with the other slice of bread. Step 6: Cut the sandwich in half and enjoy.",
    images:
      "./img/menu-grilled-chicken-sandwich.jpg, ./img/grilled-chicken-sandwich2.jpg",
    present_img: "./img/menu-grilled-chicken-sandwich.jpg",
    video: "https://www.youtube.com/embed/h59xGkKmhPY",
    rating: "★★★★★",
    reviews: "22 reviews",
  };

  const food10 = {
    title: "Beef Burger Deluxe",
    price: 15500,
    description:
      "A deluxe beef burger featuring a juicy beef patty, crispy bacon, melted cheese, fresh lettuce, and tomatoes, all topped with a special sauce and served in a toasted bun. A true delight for burger lovers.",
    ingredients:
      "Hamburger bun, Ground beef, Cheddar cheese, Bacon, Special sauce, Lettuce, Tomato",
    preparation:
      "Step 1: Form ground beef into patties and grill to desired doneness. Step 2: Grill bacon until crispy. Step 3: Toast hamburger buns in a pan with a bit of butter. Step 4: Place cheddar cheese on patties while they are still hot to melt the cheese. Step 5: Add lettuce and tomato to one side of the bun. Step 6: Place the cheese-topped patties on top and add grilled bacon. Step 7: Spread special sauce on the other side of the bun and assemble the sandwich.",
    images: "./img/menu-beef-burger-deluxe.jpg, ./img/beef-burger-deluxe2.jpg",
    present_img: "./img/menu-beef-burger-deluxe.jpg",
    video: "https://www.youtube.com/embed/YTW57fxs8VQ",
    rating: "★★★★☆",
    reviews: "19 reviews",
  };

  const food11 = {
    title: "Veggie Wrap",
    price: 9750,
    description:
      "A healthy and delicious wrap filled with a mix of fresh vegetables, including lettuce, tomatoes, cucumbers, and bell peppers, all complemented by a creamy hummus spread. Ideal for a light and nutritious lunch.",
    ingredients:
      "Whole wheat tortilla, Lettuce, Carrots, Onions, Hummus, Lemon juice",
    preparation:
      "Step 1: Mix lettuce, shredded carrots, and thinly sliced onions in a large bowl. Step 2: Add hummus and lemon juice, and mix well. Step 3: Place the mixture in the center of the tortilla. Step 4: Fold the edges of the tortilla and tightly roll into a wrap. Step 5: Cut in half and enjoy immediately.",
    images: "./img/menu-veggie-wrap.jpg, ./img/menu-veggie-wrap2.jpg",
    present_img: "./img/menu-veggie-wrap.jpg",
    video: "https://www.youtube.com/embed/ymlCrXz3iA4",
    rating: "★★★★★",
    reviews: "17 reviews",
  };

  const food12 = {
    title: "Shrimp Tacos",
    price: 14000,
    description:
      "Spicy shrimp tacos featuring succulent shrimp seasoned with a blend of spices, topped with crunchy cabbage and a zesty sauce, all wrapped in soft tortillas. A flavorful and satisfying option.",
    ingredients:
      "Small tortillas, Fresh shrimp, Thinly sliced cabbage, Creamy sauce, Onions, Spicy seasoning",
    preparation:
      "Step 1: Season shrimp with spicy spices and grill or fry until cooked. Step 2: Prepare cabbage slaw by mixing cabbage with creamy sauce. Step 3: Heat tortillas in a pan. Step 4: Place shrimp on tortillas, add cabbage slaw, and drizzle with creamy sauce if desired. Step 5: Fold the tortillas and enjoy while hot.",
    images: "./img/menu-shrimp-tacos.jpg, ./img/shrimp-tacos2.jpg",
    present_img: "./img/menu-shrimp-tacos.jpg",
    video: "https://www.youtube.com/embed/ij4XIP1TUOA?si=5wtZE09VVIXoidjr",
    rating: "★★★★★",
    reviews: "13 reviews",
  };

  const food13 = {
    title: "Turkey Club Sandwich",
    price: 12500,
    description:
      "A classic turkey club sandwich with layers of tender turkey slices, crispy bacon, fresh lettuce, tomatoes, and a creamy mayo spread, all served in toasted bread. A perfect combination of flavors and textures.",
    ingredients:
      "Soft bread, Turkey breast, Bacon, Lettuce, Tomato, Mayonnaise, Butter",
    preparation:
      "Step 1: Grill bacon until crispy. Step 2: Toast the soft bread until crispy and golden brown. Step 3: Spread mayonnaise on both sides of the bread. Step 4: Add lettuce and sliced tomato on one side of the bread. Step 5: Place grilled turkey breast on top and add crispy bacon. Step 6: Spread mayonnaise on the other side of the bread and assemble the sandwich. Step 7: Cut the sandwich in half and enjoy.",
    images:
      "./img/menu-turkey-club-sandwich.jpg, ./img/turkey-club-sandwich2.jpg",
    present_img: "./img/menu-turkey-club-sandwich.jpg",
    video: "https://www.youtube.com/embed/XkX2NgT0QZA",
    rating: "★★★★★",
    reviews: "23 reviews",
  };

  const food14 = {
    title: "Fish and Chips",
    price: 16000,
    description:
      "Crispy fried fish fillets served with golden, crunchy fries and a side of tartar sauce. A classic dish that never disappoints.",
    ingredients:
      "White fish, Batter, Cold water, Potatoes, Tartar sauce, Frying oil",
    preparation:
      "Step 1: Prepare the batter with flour, salt, and pepper. Step 2: Dip fish into the batter and fry in hot oil until golden and crispy. Step 3: Cut potatoes into sticks and fry until crispy and golden. Step 4: Serve the fried fish with french fries and tartar sauce.",
    images: "./img/menu-fish-and-chips.jpg, ./img/fish-and-chips2.jpg",
    present_img: "./img/menu-fish-and-chips.jpg",
    video: "https://www.youtube.com/embed/CYEFR_kg6Us?si=bVvRU2KcLf-ILJ_Y",
    rating: "★★★★★",
    reviews: "13 reviews",
  };

  const food15 = {
    title: "BBQ Pulled Pork Sandwich",
    price: 14500,
    description:
      "Slow-cooked pulled pork smothered in a rich BBQ sauce, topped with coleslaw, and served in a soft bun. A deliciously messy and satisfying sandwich.",
    ingredients:
      "Soft bread, Shredded pork, BBQ sauce, Cabbage, Carrots, Pickles, BBQ seasoning",
    preparation:
      "Step 1: Cook pork with BBQ sauce and seasoning until the meat is tender and easily shredded. Step 2: Shred the pork into small pieces. Step 3: Prepare coleslaw by mixing cabbage and carrots with a light dressing. Step 4: Cut the soft bread into halves and lightly toast. Step 5: Place shredded pork on one half of the bread, add coleslaw and pickles. Step 6: Place the other half of the bread on top and enjoy.",
    images: "./img/menu-bbq-pulled-pork.jpg, ./img/bbq-pulled-pork2.jpg",
    present_img: "./img/menu-bbq-pulled-pork.jpg",
    video: "https://www.youtube.com/embed/XkX2NgT0QZA",
    rating: "★★★★★",
    reviews: "23 reviews",
  };

  const food16 = {
    title: "Caesar Salad",
    price: 9000,
    description:
      "Fresh romaine lettuce tossed with Caesar dressing, crunchy croutons, and grated Parmesan cheese. A simple yet classic salad that pairs well with any meal.",
    ingredients:
      "Romaine lettuce, Caesar dressing, Croutons, Parmesan cheese, Anchovy (optional)",
    preparation:
      "Step 1: Wash and chop romaine lettuce. Step 2: Mix Caesar dressing with romaine lettuce in a large bowl. Step 3: Add croutons and sprinkle Parmesan cheese on top. Step 4: Toss well and serve immediately while fresh.",
    images: "./img/menu-caesar-salad.jpg, ./img/caesar-salad2.jpg",
    present_img: "./img/menu-caesar-salad.jpg",
    video: "https://www.youtube.com/embed/IGlWE4AFQ5Q",
    rating: "★★★★★",
    reviews: "14 reviews",
  };

  const food17 = {
    title: "Steak Au Poivre",
    price: 22990,
    description:
      "A succulent filet mignon cooked to perfection and topped with a rich peppercorn sauce. Served with a side of roasted vegetables.",
    ingredients:
      "Filet mignon, Cracked black pepper, Butter, Heavy cream, Cognac, Salt",
    preparation:
      "Step 1: Sprinkle cracked black pepper on both sides of the filet mignon and season with salt. Step 2: Heat a pan with butter and grill the filet mignon to desired doneness. Step 3: Remove the meat from the pan and keep warm. Step 4: Add Cognac to the pan to deglaze and infuse with pepper flavor. Step 5: Add heavy cream and cook until the sauce thickens. Step 6: Pour the sauce over the filet mignon and serve with vegetables or roasted potatoes.",
    images: "./img/menu-steak-au-poivre.jpg, ./img/steak-au-poivre2.jpg",
    present_img: "./img/menu-steak-au-poivre.jpg",
    video: "https://www.youtube.com/embed/_Wb5Crj917I",
    rating: "★★★★★",
    reviews: "15 reviews",
  };

  const food18 = {
    title: "Lobster Ravioli",
    price: 18750,
    description:
      "Delicate ravioli filled with tender lobster meat, served in a creamy and flavorful sauce. A luxurious treat for seafood lovers.",
    ingredients:
      "Fresh ravioli, Lobster meat, Creamy tomato sauce, Parmesan cheese, Fresh herbs, Butter",
    preparation:
      "Step 1: Prepare the filling by mixing lobster meat with Parmesan cheese and fresh herbs. Step 2: Stuff each ravioli with the filling. Step 3: Boil the ravioli in boiling water until they float to the surface. Step 4: Heat the creamy tomato sauce with a bit of butter. Step 5: Cook the sauce until it thickens. Step 6: Pour the sauce over the ravioli and sprinkle additional Parmesan cheese before serving.",
    images: "./img/menu-lobster-ravioli.jpg, ./img/lobster-ravioli2.jpg",
    present_img: "./img/menu-lobster-ravioli.jpg",
    video: "https://www.youtube.com/embed/RjuG46WZgNs?si=LGBTBdSQO35Sqbgk",
    rating: "★★★★☆",
    reviews: "15 reviews",
  };

  const food19 = {
    title: "Herb-Crusted Salmon",
    price: 20000,
    description:
      "Fresh salmon fillet coated with a blend of herbs and baked to a crispy finish. Accompanied by a medley of roasted vegetables.",
    ingredients:
      "Salmon, Fresh herbs (basil, thyme), Flour, Butter, Roasted vegetables, Salt, Pepper",
    preparation:
      "Step 1: Season salmon with salt and pepper. Step 2: Mix fresh herbs with flour. Step 3: Coat the salmon with the herb mixture. Step 4: Heat butter in a pan and cook the salmon until the herb crust is golden and crispy. Step 5: Roast vegetables (carrots, squash, bell peppers) until tender and golden. Step 6: Serve the salmon with roasted vegetables and optional cream sauce.",
    images:
      "./img/menu-herb-crusted-salmon.jpg, ./img/herb-crusted-salmon2.jpg",
    present_img: "./img/menu-herb-crusted-salmon.jpg",
    video: "https://www.youtube.com/embed/wdk7CoD5H10?si=LXqq8s-Yy2bV0A9A",
    rating: "★★★★★",
    reviews: "14 reviews",
  };

  const food20 = {
    title: "Mushroom Risotto",
    price: 16500,
    description:
      "Creamy risotto cooked with a variety of wild mushrooms and finished with a sprinkle of Parmesan cheese. A comforting and hearty dish.",
    ingredients:
      "Riso Carnaroli, Wild mushrooms, Parmesan cheese, Butter, Onions, White sauce, Fresh herbs",
    preparation:
      "Step 1: Heat butter in a pot, add onions, and sauté until soft. Step 2: Add riso and cook until the grains absorb the butter. Step 3: Add broth gradually, stirring constantly until the riso is tender. Step 4: Add sautéed wild mushrooms and Parmesan cheese, stirring until the mixture becomes creamy. Step 5: Season with salt and pepper to taste. Step 6: Serve hot, sprinkled with fresh herbs.",
    images: "./img/menu-mushroom-risotto.jpg, ./img/mushroom-risotto2.jpg",
    present_img: "./img/menu-mushroom-risotto.jpg",
    video: "https://www.youtube.com/embed/ju9H1RlYNxk?si=hlPwOJBIfDaScoNP",
    rating: "★★★★☆",
    reviews: "11 reviews",
  };

  const food21 = {
    title: "Beef Wellington",
    price: 25000,
    description:
      "Tender beef tenderloin wrapped in a flaky pastry crust and baked to perfection. Served with a rich and savory sauce.",
    ingredients:
      "Fresh beef, Puff pastry, Mushrooms, Onions, Butter, Madeira sauce, Eggs",
    preparation:
      "Step 1: Prepare mushroom duxelles by sautéing mushrooms and onions with butter until soft and moisture is reduced. Step 2: Season beef with salt and pepper, then quickly sear in a pan with butter to keep it moist. Step 3: Place beef on the duxelles layer, then wrap in puff pastry brushed with beaten egg to create a crispy crust. Step 4: Bake in a hot oven until the puff pastry is golden and crispy and the beef reaches desired doneness. Step 5: Slice and serve with Madeira sauce.",
    images: "./img/menu-beef-wellington.jpg, ./img/beef-wellington2.jpg",
    present_img: "./img/menu-beef-wellington.jpg",
    video: "https://www.youtube.com/embed/XkX2NgT0QZA",
    rating: "★★★★★",
    reviews: "23 reviews",
  };

  const food22 = {
    title: "Pesto Pasta",
    price: 14000,
    description:
      "Al dente pasta tossed with a fresh basil pesto sauce and cherry tomatoes. A simple yet flavorful dish.",
    ingredients:
      "Pasta, Fresh basil, Garlic, Pinch nuts (pine nuts), Parmesan cheese, Olive oil, Cherry tomatoes",
    preparation:
      "Step 1: Cook pasta in boiling water until al dente, then drain and reserve some pasta water. Step 2: In a blender, blend fresh basil, garlic, pine nuts, Parmesan cheese, and a bit of olive oil to make pesto sauce. Step 3: Toss the pesto sauce with the cooked pasta, add cherry tomatoes, and a little reserved pasta water to make the sauce smooth. Step 4: Season with salt and pepper to taste. Step 5: Serve hot, topped with additional Parmesan cheese.",
    images: "./img/menu-pesto-pasta.jpg, ./img/pesto-pasta2.jpg",
    present_img: "./img/menu-pesto-pasta.jpg",
    video: "https://www.youtube.com/embed/p7edUxCLOGw?si=eagsWNtSLSry-kUO",
    rating: "★★★★☆",
    reviews: "11 reviews",
  };

  const food23 = {
    title: "Lamb Chops",
    price: 24500,
    description:
      "Grilled lamb chops seasoned with rosemary and served with a mint sauce. A classic and delicious choice for meat lovers.",
    ingredients:
      "Lamb, Potatoes, Fresh rosemary, Butter, Mint sauce, Salt, Pepper",
    preparation:
      "Step 1: Season lamb with salt, pepper, and fresh rosemary. Step 2: Heat the grill and cook lamb chops until desired doneness. Step 3: Roast potatoes with rosemary and butter until crispy and golden. Step 4: Prepare mint sauce by blending fresh mint with a bit of water and sugar. Step 5: Serve lamb chops with roasted potatoes and mint sauce.",
    images: "./img/menu-lamb-chops.jpg, ./img/lamb-chops2.jpg",
    present_img: "./img/menu-lamb-chops.jpg",
    video: "https://www.youtube.com/embed/1X8fUEU8JHk?si=O6JEpopsjFJAsiK3",
    rating: "★★★★★",
    reviews: "23 reviews",
  };

  const food24 = {
    title: "Vegan Buddha Bowl",
    price: 13000,
    description:
      "A nutritious bowl of quinoa topped with a variety of roasted vegetables and drizzled with a creamy tahini dressing. Perfect for a healthy and satisfying meal.",
    ingredients:
      "Quinoa, Roasted vegetables (carrots, squash, bell peppers), Brown rice, Brown nuts, Green peas, Tahini sauce, Chickpeas",
    preparation:
      "Step 1: Cook quinoa according to package instructions. Step 2: Roast vegetables with olive oil and seasoning until tender and golden. Step 3: Prepare chickpeas by rinsing and cooking until tender if needed. Step 4: In a large bowl, layer quinoa, roasted vegetables, chickpeas, and green peas. Step 5: Mix tahini sauce with a bit of water and lemon to make a smooth dressing. Step 6: Drizzle tahini sauce over the bowl and enjoy.",
    images: "./img/menu-vegan-buddha-bowl.jpg, ./img/vegan-buddha-bowl2.jpg",
    present_img: "./img/menu-vegan-buddha-bowl.jpg",
    video: "https://www.youtube.com/embed/0rILcTHxlLE?si=b_rLf5h9JOMetEuZ",
    rating: "★★★★☆",
    reviews: "13 reviews",
  };

  menu[0] = food1;
  menu[1] = food2;
  menu[2] = food3;
  menu[3] = food4;
  menu[4] = food5;
  menu[5] = food6;
  menu[6] = food7;
  menu[7] = food8;
  menu[8] = food9;
  menu[9] = food10;
  menu[10] = food11;
  menu[11] = food12;
  menu[12] = food13;
  menu[13] = food14;
  menu[14] = food15;
  menu[15] = food16;
  menu[16] = food17;
  menu[17] = food18;
  menu[18] = food19;
  menu[19] = food20;
  menu[20] = food21;
  menu[21] = food22;
  menu[22] = food23;
  menu[23] = food24;
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
  ).toLocaleString()} VNĐ`;

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
  var reviews = menuItem.getAttribute("data-reviews") || "(0 đánh giá)";
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
  var ingredientsList = menuDetailModal.querySelector("#menuDetailIngredients");
  ingredientsList.innerHTML = ""; // Clear existing
  if (ingredients) {
    ingredients.split(",").forEach(function (ingredient) {
      ingredientsList.innerHTML += `<li>${ingredient.trim()}</li>`;
    });
  }

  // Inject Preparation Steps
  var preparationList = menuDetailModal.querySelector("#menuDetailPreparation");
  preparationList.innerHTML = ""; // Clear existing
  if (preparation) {
    // Split by ". Bước" to separate steps
    preparation.split(". Step").forEach(function (step, index) {
      step = step.trim();
      if (index === 0 && step.startsWith("Step")) {
        step = step.replace("Step ", "").trim();
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
