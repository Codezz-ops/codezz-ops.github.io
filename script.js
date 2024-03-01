document.addEventListener("DOMContentLoaded", function() {
  const h1Element = document.getElementById("text1");
  const cursorElement = document.getElementById("cursor");

  const texts = [
    { text: "a software developer.", delay: 2000 },
    { text: "a penetration tester.", delay: 2000 },
    { text: "a back-end developer.", delay: 2000 }
  ];

  let currentIndex = 0;

  function typeText(index) {
    let text = texts[index].text;
    let currentText = '';
    let charIndex = 0;

    function type() {
      if (charIndex <= text.length) {
        currentText = text.substring(0, charIndex);
        h1Element.textContent = currentText;
        charIndex++;
        setTimeout(type, 100); // Adjust the typing speed (milliseconds)
      } else {
        // Text typed, start deleting
        setTimeout(deleteText, 1000); // Delay before deleting (1000ms = 1 second)
      }
    }

    function deleteText() {
      if (charIndex >= 0) {
        currentText = text.substring(0, charIndex);
        h1Element.textContent = currentText;
        charIndex--;
        setTimeout(deleteText, 50); // Adjust the deleting speed (milliseconds)
      } else {
        currentIndex = (currentIndex + 1) % texts.length;
        setTimeout(typeText, 1000, currentIndex); // Delay before typing next text (1000ms = 1 second)
      }
    }

    // Start typing
    type();
  }

  typeText(currentIndex);

  // Function to make the cursor blink
  function blinkCursor() {
    cursorElement.style.visibility = cursorElement.style.visibility === 'hidden' ? 'visible' : 'hidden';
    setTimeout(blinkCursor, 500); // Adjust the blinking speed (milliseconds)
  }

  // Start cursor blinking
  blinkCursor();
});

const projects = document.querySelectorAll('#projects .project');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.2 });

projects.forEach(project => {
  observer.observe(project);
});

let lastScrollTop = 0;
window.addEventListener("scroll", () => {
  const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop > lastScrollTop) {
    // Scrolling down, hide the header
    document.querySelector(".header").classList.add("header-hidden");
  } else {
    // Scrolling up, show the header
    document.querySelector(".header").classList.remove("header-hidden");
  }

  lastScrollTop = currentScrollTop;
});
