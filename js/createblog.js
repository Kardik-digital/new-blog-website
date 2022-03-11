const saveBlog = document.querySelector(".save-blog");
const createBlog = document.querySelector(".create-blog");

const errorMessageContent = document.querySelector(".error-message-content");
const formContainer = document.querySelector(".form-container");
const closeFormModal = document.querySelector(".close-form-modal");
const blogForm = document.querySelector("#blog-form");
const editorContainer = document.getElementById("editor-container");

// QUILL EDITOR INITIALIZATION

var quill = new Quill("#editor-container", {
  modules: {
    toolbar: "#toolbar-container",
  },
  placeholder: "Start blogging",
  theme: "snow",
});

// save the blog
saveBlog.addEventListener("click", () => {
  openFormContainer();
  let blogContent = quill.root.innerHTML;
  let myInput = document.getElementById("input");
  myInput.innerHTML = blogContent;

  createBlog.addEventListener("click", (e) => {
    e.preventDefault();
    const blogTitle = document.querySelector("#blog-title").value;
    const tags = document.querySelector("#tags").value;

    // SAVE THE CONTENT TO THE DATABASE

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "./php/saveblog.php", true);

    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.onload = function () {
      if (this.status) {
        if (this.responseText == "blogSaved") {
          closeFormContainer();
          blogForm.reset();
          message.classList.add("message-show", "success-message");
          messageContent.innerHTML = "Blog Added";
        } else if (this.status == "error") {
          message.classList.add("message-show", "error-message");
          messageContent.innerHTML = "Unable to save blog";
        }
      }
    };

    xhr.send(
      "save_blog=&blog_title=" +
        blogTitle +
        "&tags=" +
        tags +
        "&blog_content=" +
        myInput.value
    );
  });
});

// CLOSE MODAL
closeFormModal.addEventListener("click", closeFormContainer);

function openFormContainer() {
  formContainer.classList.add("open-form-container");
}
function closeFormContainer() {
  formContainer.classList.remove("open-form-container");
}

// CLOSE MESSAGE

closeMessage.addEventListener("click", closeMessageDiv);

function closeMessageDiv() {
  message.classList.remove("message-show");
}
