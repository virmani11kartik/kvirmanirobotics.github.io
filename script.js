// Professional Portfolio - Enhanced JavaScript

// ===========================
// THEME TOGGLE
// ===========================
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

// Load saved theme or default to dark
const savedTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", savedTheme);
themeIcon.className = savedTheme === "dark" ? "fas fa-moon" : "fas fa-sun";

// Toggle handler with smooth transition
themeToggle.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  themeIcon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
});

// ===========================
// SCROLL PROGRESS INDICATOR
// ===========================
const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = `${scrollPercent}%`;
}

window.addEventListener("scroll", updateScrollProgress);

// ===========================
// RESPONSIVE NAVIGATION
// ===========================
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");

// Toggle mobile menu
hamburger?.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  
  // Animate hamburger bars
  const bars = hamburger.querySelectorAll(".bar");
  bars.forEach((bar, index) => {
    if (navMenu.classList.contains("active")) {
      if (index === 0) bar.style.transform = "rotate(45deg) translate(5px, 5px)";
      if (index === 1) bar.style.opacity = "0";
      if (index === 2) bar.style.transform = "rotate(-45deg) translate(7px, -6px)";
    } else {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    }
  });
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      const bars = hamburger.querySelectorAll(".bar");
      bars.forEach(bar => {
        bar.style.transform = "none";
        bar.style.opacity = "1";
      });
    }
  });
});

// ===========================
// ACTIVE NAVIGATION HIGHLIGHT
// ===========================
function highlightActiveSection() {
  const sections = document.querySelectorAll("section[id]");
  const scrollPosition = window.scrollY + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const sectionId = section.getAttribute("id");
    const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

    if (correspondingLink) {
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navLinks.forEach(link => link.classList.remove("active"));
        correspondingLink.classList.add("active");
      }
    }
  });
}

window.addEventListener("scroll", highlightActiveSection);

// ===========================
// PROJECT FILTERING
// ===========================
const filterBtns = document.querySelectorAll(".filter-btn");
const projectCards = document.querySelectorAll(".project-card");

filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    // Update active button
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const filterValue = btn.getAttribute("data-filter");

    // Filter projects with animation
    projectCards.forEach((card, index) => {
      const categories = card.getAttribute("data-category");
      
      // Hide all cards first
      card.style.opacity = "0";
      card.style.transform = "scale(0.9)";

      setTimeout(() => {
        if (filterValue === "all" || categories.includes(filterValue)) {
          card.style.display = "block";
          setTimeout(() => {
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 50);
        } else {
          card.style.display = "none";
        }
      }, 200);
    });
  });
});

// ===========================
// SCROLL ANIMATIONS
// ===========================
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px"
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }, index * 100);
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll(".fade-in").forEach(el => {
  el.style.opacity = "0";
  el.style.transform = "translateY(30px)";
  el.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
  fadeInObserver.observe(el);
});

// ===========================
// SKILL BAR ANIMATIONS
// ===========================
const skillBars = document.querySelectorAll(".skill-progress");

const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar = entry.target;
      const width = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = width;
      }, 100);
      skillObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
  skillObserver.observe(bar);
});

// ===========================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    
    // Don't prevent default for empty hash or non-section links
    if (href === "#" || !href.startsWith("#")) return;
    
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  });
});

// ===========================
// FORM HANDLING
// ===========================
const contactForm = document.getElementById("contact-form");

contactForm?.addEventListener("submit", (e) => {
  e.preventDefault();
  
  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData);
  
  // Here you would typically send the form data to a server
  // For now, we'll just show a success message
  console.log("Form submitted:", data);
  
  // Show success message
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  const originalText = submitBtn.innerHTML;
  submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
  submitBtn.style.background = "var(--success)";
  submitBtn.disabled = true;
  
  // Reset form
  setTimeout(() => {
    contactForm.reset();
    submitBtn.innerHTML = originalText;
    submitBtn.style.background = "";
    submitBtn.disabled = false;
  }, 3000);
});

// ===========================
// NAVBAR BACKGROUND ON SCROLL
// ===========================
const navbar = document.querySelector(".navbar");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;
  
  // Add/remove shadow based on scroll position
  if (currentScroll > 50) {
    navbar.style.boxShadow = "var(--shadow-lg)";
  } else {
    navbar.style.boxShadow = "var(--shadow-sm)";
  }
  
  lastScroll = currentScroll;
});

// ===========================
// TYPING EFFECT (Optional Enhancement)
// ===========================
function typeWriter(element, text, speed = 50) {
  let i = 0;
  element.textContent = "";
  
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  
  type();
}

// Apply typing effect to hero title on load (optional)
window.addEventListener("load", () => {
  const heroTitle = document.querySelector(".hero-title");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    // Uncomment to enable typing effect
    // typeWriter(heroTitle, originalText, 50);
  }
});

// ===========================
// PARALLAX EFFECT FOR HERO
// ===========================
window.addEventListener("scroll", () => {
  const hero = document.querySelector(".hero");
  if (hero) {
    const scrolled = window.scrollY;
    const heroContent = hero.querySelector(".hero-content");
    if (heroContent) {
      heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
      heroContent.style.opacity = `${1 - scrolled / 600}`;
    }
  }
});

// ===========================
// PRELOADER (Optional)
// ===========================
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
  
  // Hide scroll indicator after 3 seconds
  setTimeout(() => {
    const scrollDown = document.querySelector(".scroll-down");
    if (scrollDown) {
      scrollDown.style.opacity = "0";
      setTimeout(() => {
        scrollDown.style.display = "none";
      }, 300);
    }
  }, 3000);
});

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
// Debounce function for scroll events
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Apply debouncing to scroll events
window.addEventListener("scroll", debounce(() => {
  updateScrollProgress();
  highlightActiveSection();
}, 10));

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================
// Add keyboard navigation support
document.addEventListener("keydown", (e) => {
  // Close mobile menu on Escape
  if (e.key === "Escape" && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    const bars = hamburger.querySelectorAll(".bar");
    bars.forEach(bar => {
      bar.style.transform = "none";
      bar.style.opacity = "1";
    });
  }
});

// ===========================
// CONSOLE MESSAGE
// ===========================
console.log(
  "%cKartik Virmani - Portfolio",
  "color: #3b82f6; font-size: 24px; font-weight: bold;"
);
console.log(
  "%cInterested in the code? Check out my GitHub!",
  "color: #8b5cf6; font-size: 14px;"
);
console.log("https://github.com/virmani11kartik");