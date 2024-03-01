document.addEventListener("DOMContentLoaded", function() {
  const h1Element = document.getElementById("text1");
  const cursorElement = document.getElementById("cursor");

  const texts = [
    { text: "a software developer.", delay: 2000 },
    { text: "a penetration tester.", delay: 2000 },
    { text: "a back-end developer.", delay: 2000 },
    { text: "an operating system developer.", delay: 2000}
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

const apiLink1 = "https://api.github.com/users/codezz-ops/repos";
const apiLink2 = "https://api.github.com/users/Nebrix/repos";

async function fetchProjects(url) {
 const response = await fetch(url, {
    headers: {
      'Accept': 'application/vnd.github+json',
    },
 });

 if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
 }

 const repos = await response.json();
 return repos.map(repo => ({
    title: repo.name,
    description: repo.description,
    url: repo.html_url,
 }));
}

async function main() {
 try {
    const projects1 = await fetchProjects(apiLink1);
    const projects2 = await fetchProjects(apiLink2);
    const allProjects = [...projects1, ...projects2]; // Combine projects from both users

    // Example: Select specific projects by index
    const selectedProjects = [allProjects[5], allProjects[14], allProjects[9], allProjects[13], allProjects[16], allProjects[15]]; // Adjust indexes as needed
    populateProjects(selectedProjects);
 } catch (error) {
    console.error('Error fetching projects:', error);
 }
}

function populateProjects(projects) {
 const projectsGrid = document.querySelector('.projects-grid');
 projects.forEach(project => {
    const projectDiv = document.createElement('div');
    projectDiv.classList.add('project');

    const projectTitle = document.createElement('h3');
    projectTitle.classList.add('project-title');
    projectTitle.textContent = project.title;

    const projectDescription = document.createElement('p');
    projectDescription.classList.add('project-description');
    projectDescription.textContent = project.description;

    const projectLink = document.createElement('a');
    projectLink.classList.add('btn', 'btn-primary');
    projectLink.href = project.url;
    projectLink.target = '_blank';
    projectLink.textContent = 'GitHub Repository';

    projectDiv.appendChild(projectTitle);
    projectDiv.appendChild(projectDescription);
    projectDiv.appendChild(projectLink);

    projectsGrid.appendChild(projectDiv);
 });
}

main();