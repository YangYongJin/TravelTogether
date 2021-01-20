

// ---------------slide animation effect ------------------
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}


// --------------scroll fade effects ------------------
let fadeElements = document.querySelectorAll(".hide");
window.addEventListener("scroll", function (e) {
  fadeElements = Array.from(fadeElements);
  fadeElements.forEach(function (item) {
    let posFromTop = item.getBoundingClientRect().top;
    // let scrollY = window.scrollY;
    let winH = window.innerHeight;

    /* 3 */
    if (winH > posFromTop) {
      let timeDuration = 3000;
      item.animate(
        { opacity: "1" },
        {
          duration: timeDuration,
        }
      );
      setTimeout(() => {
        item.style.opacity = 1;
      }, timeDuration);
    }
  });
});
