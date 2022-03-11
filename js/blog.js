// GET TH SPECIFIC BLOG ID SENT THROUGH THE SEARCH PARAMETERS
const urlParams = new URLSearchParams(window.location.search);
const blogId = urlParams.get("blogid");
const loader = document.querySelector(".loader");
const blogTitle = document.querySelector(".blog-title");
const blogContainer = document.querySelector(".blog-container");
const content = document.querySelector(".content");

const likeNumber = document.querySelector("#like-number");
const dislikeNumber = document.querySelector("#dislike-number");
const loveNumber = document.querySelector("#love-number");

window.onload = getBlog();

function getBlog() {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "./php/getblogs.php", true);
  xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  xhr.onload = function () {
    if (this.responseText != "") {
      const blog = JSON.parse(this.responseText);
      blogTitle.innerHTML = blog.blog_title;
      const blogDiv =
        "<div class='blog'>" +
        "<div class='blog-meta'>" +
        "<div>" +
        blog.date_posted +
        "</div>" +
        "</div>" +
        "<div class='blog-content' >" +
        blog.blog_content +
        "</div>" +
        "</div>";

      likeNumber.innerHTML = blog.likes;
      dislikeNumber.innerHTML = blog.dislikes;
      loveNumber.innerHTML = blog.loves;
      blogContainer.innerHTML = blogDiv;
    }
  };

  xhr.send("get_blog=&blog_id=" + blogId);
}

// PROCESS REACTIONS
const reactions = document.querySelectorAll(".reaction");

reactions.forEach((reaction) => {
  reaction.addEventListener("click", () => {
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/updatereaction.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    xhr.onload = function () {
      if (this.responseText == "reactionUpdated") {
        message.classList.add("message-show", "success-message");
        messageContent.innerHTML = "Thanks for the feedback !";
      }
    };

    if (reaction.attributes.id.value == "like") {
      xhr.send("updateReaction&blogId=" + blogId + "&like");
    } else if (reaction.attributes.id.value == "dislike") {
      xhr.send("updateReaction&blogId=" + blogId + "&dislike");
    } else {
      xhr.send("updateReaction&blogId=" + blogId + "&love");
    }

    setTimeout(() => {
      getBlog();
    }, 100);
  });
});

// CLOSE THE PRELOADER
const preloader = document.querySelector(".preloader");

window.addEventListener("load", () => {
  preloader.classList.add("preloader-close");
});
