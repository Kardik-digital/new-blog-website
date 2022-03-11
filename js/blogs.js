// GET ALL THE LATEST BLOGS

const blogContainer = document.querySelector(".blog-container");
const categories = document.querySelectorAll(".category");
const search = document.querySelector(".search");
const searchText = document.querySelector("#search-text");
const message = document.querySelector(".message");
const closeMessage = document.querySelector(".close-message");
const messageContent = document.querySelector(".message-content");

// EVENT LISTENER
search.addEventListener("click", () => {
  blogContainer.innerHTML = "";
  searchBlogs(searchText.value);
});

closeMessage.addEventListener("click", closeMessageDiv);

// CONTENT LOADS AFTER THE WINDOW LOADS
window.onload = function () {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "./php/getblogs.php?get_blogs", true);
  xhr.onload = function () {
    if (this.status == 200) {
      if (this.responseText != "") {
        const blogs = JSON.parse(this.responseText);
        for (let index in blogs) {
          let blogContent =
            "<div class='blog'>" +
            "<h2 class='blog-title'>" +
            blogs[index].blog_title +
            "</h2>" +
            "<span class='blog-date' >posted on: " +
            blogs[index].date_posted +
            "</span>" +
            "<a href='blog?blogid=" +
            blogs[index].blog_id +
            "' class='cta'>Read Blog</a>" +
            "</div > ";

          blogContainer.innerHTML += blogContent;
        }
      }
    }
  };
  xhr.send();
};

categories.forEach((category) => {
  category.addEventListener("click", () => {
    blogContainer.innerHTML = "";
    filterBlogs(category.attributes.id.value);
  });
});

function filterBlogs(tag) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "./php/getblogs.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (this.status == 200) {
      if (this.responseText != "") {
        closeMessageDiv();
        const blogs = JSON.parse(this.responseText);
        for (let index in blogs) {
          let blogContent =
            "<div class='blog'>" +
            "<h2 class='blog-title'>" +
            blogs[index].blog_title +
            "</h2>" +
            "<span class='blog-date' >posted on: " +
            blogs[index].date_posted +
            "</span>" +
            "<a href='blog?blogid=" +
            blogs[index].blog_id +
            "' class='cta'>Read Blog</a>" +
            "</div > ";

          blogContainer.innerHTML += blogContent;
        }
      } else {
        message.classList.add("message-show", "error-message");
        messageContent.innerHTML = "No blogs found";
      }
    }
  };
  xhr.send("filter_categories=&tag=" + tag);
}

function searchBlogs(searchText) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "./php/getblogs.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhr.onload = function () {
    if (this.status == 200) {
      if (this.responseText != "") {
        closeMessageDiv();
        const blogs = JSON.parse(this.responseText);
        for (let index in blogs) {
          let blogContent =
            "<div class='blog'>" +
            "<h2 class='blog-title'>" +
            blogs[index].blog_title +
            "</h2>" +
            "<span class='blog-date' >posted on: " +
            blogs[index].date_posted +
            "</span>" +
            "<a href='blog?blogid=" +
            blogs[index].blog_id +
            "' class='cta'>Read Blog</a>" +
            "</div > ";
          blogContainer.innerHTML += blogContent;
        }
      } else {
        message.classList.add("message-show", "error-message");
        messageContent.innerHTML = "No blogs found";
      }
    }
  };
  xhr.send("search=&search_text=" + searchText);
}

function closeMessageDiv() {
  message.classList.remove("message-show");
}
