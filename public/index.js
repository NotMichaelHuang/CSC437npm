console.log("Index.js loaded");

const menu = document.querySelector('.menu');
const header = document.querySelector('header');
const menuButton = document.querySelector('.menu-btn');
const links = document.querySelectorAll('.toggle');

// Toggle menu open/close
menuButton.addEventListener('click', () => {
  console.log("Inside open");

  links.forEach((link) => {
    link.style.display = "block";
  });
});

// Close menu if click is outside the header
document.body.addEventListener('click', (event) => {
  console.log("Inside close");

  if (!header.contains(event.target)) {
    links.forEach((link) => {
      link.style.display = "none";
    });
  }
});


