const message = document.querySelector(".message");
const closeMessage = document.querySelector(".close-message");
const messageContent = document.querySelector(".message-content");

closeMessage.addEventListener("click", closeMessageDiv);

function closeMessageDiv() {
  message.classList.remove("message-show");
}
