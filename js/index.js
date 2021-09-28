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
document.addEventListener("mouseover", function (e) {
  const hoveredEl = e.target;
  const hoveredElTagName = hoveredEl.tagName;
  if (hoveredElTagName !== "H2") return; // If the element is not an h2 then I dont want to do anything

  let grow = gsap.to(hoveredEl, {
    duration: 0.1,
    ease: "power4.out",
    fontSize: "4rem",
  });

  grow.play();

  //   once I mouseout of that element, I want to revert the font size back to the original font size
  hoveredEl.addEventListener("mouseout", function () {
    grow.reverse();
  });
});
