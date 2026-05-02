const nav = document.querySelector("nav");
const btn = document.querySelector(".menu-toggle");

btn.addEventListener("click", () => {
  nav.classList.toggle("open");
});