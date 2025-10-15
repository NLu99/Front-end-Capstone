$(document).ready(function () {
  //dropdown menu
  $("#galleryDrop").click(function () {
    $(".dropdown").slideToggle();
  });

  //show the quote when the mouse enters the div
  $(".quote").mouseenter(function () {
    $("#quote").fadeIn("slow");
  });

  // add hover effect to buttons
  $(".button").hover(
    function () {
      $(this).css("background-color", "orange");
    },
    function () {
      $(this).css("background-color", "#243026");
    }
  );
});

// === LIKE FUNCTIONALITY ===

// Handle like click
//get html elements
const hearts = document.querySelectorAll(".fa-heart");
const likeDiv = document.getElementById("liked-imgs");

//create an array to store images
let likedImages = JSON.parse(localStorage.getItem("likedImages")) || [];

// update hearts on load
hearts.forEach((heart) => {
  const currentParent = heart.closest(".image-wrapper");
  const img = currentParent.querySelector("img");
  if (likedImages.includes(img.src)) {
    heart.classList.remove("fa-regular");
    heart.classList.add("fa-solid");
  }
});

//apply the following loop for each heart
hearts.forEach((heart) => {
  heart.addEventListener("click", function () {
    // find the heart's parent div
    const heartParent = heart.closest(".image-wrapper");
    const image = heartParent.querySelector("img");
    const imgSrc = image?.src;

    //change the heart icon's class
    if (heart.classList.contains("fa-regular")) {
      heart.classList.remove("fa-regular");
      heart.classList.add("fa-solid");

      // add the item to storage
      likedImages.push(imgSrc);
      localStorage.setItem("likedImages", JSON.stringify(likedImages));
    } else {
      // change the heart's class
      heart.classList.remove("fa-solid");
      heart.classList.add("fa-regular");

      // remove the item from list
      likedImages = likedImages.filter((item) => item !== imgSrc);
      // update array
      localStorage.setItem("likedImages", JSON.stringify(likedImages));
    }
  });
});

// show images on Liked page
function loadImages() {
  likedImages = JSON.parse(localStorage.getItem("likedImages"));
  if (!likedImages || likedImages.length === 0) {
    const noImgs = document.createElement("p");
    noImgs.innerText = "No images have been added yet.";
    likeDiv.appendChild(noImgs);
  }

  likedImages.forEach((src) => {
    const newImg = document.createElement("img");
    newImg.src = src;
    likeDiv.appendChild(newImg);
  });
}

//

// === SAVE FOR LATER FUNCTIONALITY ===

// get html elements
const bookmarks = document.querySelectorAll(".fa-bookmark");
const savedDiv = document.getElementById("saved-imgs");
let saveCounter = 0;

// create an array to store items
let savedImages = JSON.parse(localStorage.getItem("savedImages")) || [];

// update bookmarks on load
bookmarks.forEach((mark) => {
  const currentParent = mark.closest(".image-wrapper");
  const img = currentParent.querySelector("img");
  if (savedImages.includes(img.src)) {
    mark.classList.remove("fa-regular");
    mark.classList.add("fa-solid");
  }
});

// loop for each bookmark
bookmarks.forEach((bookmark) => {
  bookmark.addEventListener("click", function () {
    // find the bookmark's parent div
    const bookParent = bookmark.closest(".image-wrapper");
    const image = bookParent.querySelector("img");
    const imgSrc = image?.src;

    //change the heart icon's class
    if (bookmark.classList.contains("fa-regular")) {
      bookmark.classList.remove("fa-regular");
      bookmark.classList.add("fa-solid");

      // add the item to storage
      savedImages.push(imgSrc);

      // alert
      saveCounter = savedImages.length;
      alert(`You have ${saveCounter} saved items`);

      localStorage.setItem("savedImages", JSON.stringify(savedImages));
    } else {
      // change the heart's class
      bookmark.classList.remove("fa-solid");
      bookmark.classList.add("fa-regular");

      // remove the item from list
      savedImages = savedImages.filter((item) => item !== imgSrc);
      saveCounter = savedImages.length;

      // update array
      localStorage.setItem("savedImages", JSON.stringify(savedImages));
    }
  });
});

// show images on Liked page
function loadSavedImages() {
  savedImages = JSON.parse(localStorage.getItem("savedImages"));

  if (!savedImages || savedImages.length === 0) {
    const noImgs = document.createElement("p");
    noImgs.innerText = "No images have been added yet.";
    savedDiv.appendChild(noImgs);
  }

  savedImages.forEach((src) => {
    const newImg = document.createElement("img");
    newImg.src = src;
    savedDiv.appendChild(newImg);
  });
}

// === comment section ===
// localStorage.clear();
let commentArr = JSON.parse(localStorage.getItem("comments")) || [];

// add a new comment
document.getElementById("post-btn").addEventListener("click", function () {
  // get the html elements
  const newComment = document.getElementById("new-comment").value.trim();
  const commentContainer = document.getElementById("comment-container");

  if (newComment === "") return;

  // create the new comment
  const commentElement = document.createElement("p");
  commentElement.innerText = newComment;
  commentContainer.appendChild(commentElement);

  // add the comment to storage
  commentArr.push(newComment);
  console.log(commentArr);
  localStorage.setItem("comments", JSON.stringify(commentArr));

  // reset the textbox
  document.getElementById("new-comment").value = "";
});

// load comments on the page
function loadComments() {
  commentArr = JSON.parse(localStorage.getItem("comments")) || [];
  const commentContainer = document.getElementById("comment-container");

  commentArr.forEach((commentTxt) => {
    // create the new comment
    const commentElement = document.createElement("p");
    commentElement.innerText = commentTxt;
    commentContainer.appendChild(commentElement);
  });
}
