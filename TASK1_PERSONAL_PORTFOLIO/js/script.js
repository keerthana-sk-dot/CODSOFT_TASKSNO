
const navLinks = document.querySelectorAll(".nav-links a");

navLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.forEach(function (navLink) {
      navLink.classList.remove("active");
    });

    this.classList.add("active");
  });
});


const contactForm = document.getElementById("contact-form");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const messageInput = document.getElementById("message");

const nameError = document.getElementById("name-error");
const emailError = document.getElementById("email-error");
const messageError = document.getElementById("message-error");

const formSuccess = document.getElementById("form-success");

if (contactForm) {
  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    formSuccess.textContent = "";

    let isValid = true;

  
    const nameValue = nameInput.value.trim();

    if (nameValue === "") {
      nameError.textContent = "Please enter your name.";

      isValid = false;
    } else if (nameValue.length < 2) {
      nameError.textContent = "Name must contain at least 2 characters.";

      isValid = false;
    }

    
    const emailValue = emailInput.value.trim();

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      emailError.textContent = "Please enter your email.";

      isValid = false;
    } else if (!emailPattern.test(emailValue)) {
      emailError.textContent = "Please enter a valid email address.";

      isValid = false;
    }

    
    const messageValue = messageInput.value.trim();

    if (messageValue === "") {
      messageError.textContent = "Please enter your message.";

      isValid = false;
    } else if (messageValue.length < 10) {
      messageError.textContent = "Message must contain at least 10 characters.";

      isValid = false;
    }

  
    if (isValid) {
      formSuccess.textContent = "Thank you! Your message has been submitted.";

      contactForm.reset();
    }
  });
}

const sections = document.querySelectorAll("section");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15,
  },
);

sections.forEach(function (section) {
  section.classList.add("reveal");

  revealObserver.observe(section);
});


const pageSections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {
  let currentSection = "";

  pageSections.forEach(function (section) {
    const sectionTop = section.offsetTop - 150;

    const sectionHeight = section.offsetHeight;

    if (
      window.scrollY >= sectionTop &&
      window.scrollY < sectionTop + sectionHeight
    ) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach(function (link) {
    link.classList.remove("active");

    const linkTarget = link.getAttribute("href");

    if (linkTarget === "#" + currentSection) {
      link.classList.add("active");
    }
  });
});
