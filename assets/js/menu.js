// menu.js
function toggleMenu() {
  const menu = document.getElementById("menu");
  menu.classList.toggle("open");
}

document.addEventListener("click", function (e) {
  const menu = document.getElementById("menu");
  const menuIcon = document.querySelector(".menu-icon");
  if (!menu.contains(e.target) && e.target !== menuIcon) {
    menu.classList.remove("open");
  }
});
