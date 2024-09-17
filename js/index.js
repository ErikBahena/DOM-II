// I'm going to be using gsap for all of my animations along with my add event listeners. I wan't to see what I am capable of.
import { gsap } from "gsap";

// Your code goes here
// I am going to start with the images lazy loading, not practically, like setting images to a lower quality version, then after some api fetch rendering them with quality but applying some kind of filter or opactiy while the site rendering all the content, then once the dom content loads, the opacity filter will be turned off

const pageImagesArr = Array.from(document.images);

// Bring Images into view once dom is loaded, I'm using dom content loaded because this event doesn't wait for images, or style sheets to load which is what I want
const opacLoadImages = function () {
  pageImagesArr.forEach((image) => {
    gsap.to(image, { duration: 1, ease: "shine.in", opacity: 1 });
  });
};

document.addEventListener("DOMContentLoaded", opacLoadImages);

// Adding a double click functionality to images, if someone wants to view the image on a new tab, double clicking would allow them to do so.
pageImagesArr.forEach((img) => {
  img.addEventListener("dblclick", (e) => {
    window.open(e.target.src, "_blank");
  });
});

// I want to make it so that the h2s I am hovering over increase in front size a bit
let growTo = function (el, fontSize) {
  return gsap.to(el, {
    duration: 0.1,
    ease: "power4.out",
    fontSize: fontSize,
  });
};

let changeColorTo = function (el, color) {
  return gsap.to(el, { duration: 0, color });
};

document.addEventListener("mouseover", function (e) {
  const hoveredEl = e.target;
  const hoveredElTagName = hoveredEl.tagName;
  if (hoveredElTagName !== "H2") return; // If the element is not an h2 then I dont want to do anything
  let h2Grow = growTo(hoveredEl, "4rem");

  h2Grow.play();
  //   once I mouseout of that element, I want to revert the font size back to the original font size
  hoveredEl.addEventListener("mouseout", function () {
    h2Grow.reverse();
  });
});

// preventing the nav links default behaviour
const navLinks = document.querySelectorAll("nav a");
navLinks.forEach((link) =>
  link.addEventListener("click", function (e) {
    e.preventDefault();
  })
);
// making the nav links grow and turn into a different color
navLinks.forEach((link) =>
  link.addEventListener("mouseover", function () {
    let navLinksGrow = growTo(link, "2rem");
    let navLinksChangeCol = changeColorTo(link, "red");

    link.addEventListener("mouseout", function () {
      navLinksGrow.reverse();
      navLinksChangeCol.reverse();
    });
  })
);

// find text feature with the keydown event

document.addEventListener("keydown", function (e) {
  if (e.key.match(/[A-Z|a-z|ü|é]/i) && e.key.length === 1) {
    window.find(e.key);
  }
});

// I am going to add an event listener to the entire content pick section because I don't want to add an event listener to every single button, although there are not many, on a larger scale this could really slow down your site.
document.querySelector(".content-pick").addEventListener("click", function (e) {
  const button = e.target;
  if (!button.classList.contains("btn")) return;
  button.style.backgroundColor = "red";
});

//  make the nav sticky one we scroll to the right spot with position fixed
// there is a far more efficient way to do this but I don't remember how.
const navBar = document.querySelector(".main-navigation");
window.addEventListener("scroll", function (e) {
  if (window.pageYOffset >= 90) {
    navBar.style.position = "fixed";
  } else {
    navBar.style.position = "unset";
  }
});
