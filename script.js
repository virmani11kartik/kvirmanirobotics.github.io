// ===========================
// IMMEDIATE THEME INITIALIZATION (before DOM loads)
// ===========================
(function() {
  const savedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", savedTheme);
})();

// ===========================
// WAIT FOR DOM TO LOAD
// ===========================
document.addEventListener('DOMContentLoaded', function() {

console.log("DOM loaded - initializing portfolio...");

// ===========================
// THEME TOGGLE
// ===========================
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = document.getElementById("theme-icon");

console.log("Theme toggle element:", themeToggle);
console.log("Theme icon element:", themeIcon);

if (themeToggle && themeIcon) {
  // Set initial icon based on current theme
  const currentTheme = document.documentElement.getAttribute("data-theme");
  themeIcon.className = currentTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
  
  console.log("Theme toggle initialized. Current theme:", currentTheme);

  // Toggle handler
  themeToggle.addEventListener("click", function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    const current = document.documentElement.getAttribute("data-theme");
    const newTheme = current === "dark" ? "light" : "dark";
    
    console.log("Toggling theme from", current, "to", newTheme);
    
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    themeIcon.className = newTheme === "dark" ? "fas fa-moon" : "fas fa-sun";
  });
  
  console.log("Theme toggle click handler attached");
} else {
  console.error("Theme toggle or icon element not found!");
}

// ===========================
// SCROLL PROGRESS INDICATOR
// ===========================
const scrollProgress = document.getElementById("scroll-progress");

function updateScrollProgress() {
  if (!scrollProgress) return;
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
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
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
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
  link.addEventListener("click", () => {
    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");
      if (hamburger) {
        const bars = hamburger.querySelectorAll(".bar");
        bars.forEach(bar => {
          bar.style.transform = "none";
          bar.style.opacity = "1";
        });
      }
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

if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
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
}

// ===========================
// NAVBAR BACKGROUND ON SCROLL
// ===========================
const navbar = document.querySelector(".navbar");

if (navbar) {
  window.addEventListener("scroll", () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > 50) {
      navbar.style.boxShadow = "var(--shadow-lg)";
    } else {
      navbar.style.boxShadow = "var(--shadow-sm)";
    }
  });
}

// ===========================
// PERFORMANCE OPTIMIZATION
// ===========================
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

// ===========================
// ACCESSIBILITY ENHANCEMENTS
// ===========================
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navMenu && navMenu.classList.contains("active")) {
    navMenu.classList.remove("active");
    if (hamburger) {
      const bars = hamburger.querySelectorAll(".bar");
      bars.forEach(bar => {
        bar.style.transform = "none";
        bar.style.opacity = "1";
      });
    }
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

console.log("Portfolio initialized successfully!");

}); // End of DOMContentLoaded


// ===========================
// CAD IMAGE GALLERY
// ===========================
class CADGallery {
  constructor() {
    this.currentIndex = 0;
    this.images = [];
    this.galleryTitle = '';
    this.init();
  }

  init() {
    // Create modal HTML
    this.createModal();
    
    // Add click listeners to design images
    const designImages = document.querySelectorAll('.mechanical-design .design-image');
    designImages.forEach(img => {
      img.style.cursor = 'pointer';
      img.addEventListener('click', (e) => {
        e.stopPropagation();
        this.openGallery(img);
      });
    });
  }

  createModal() {
    const modalHTML = `
      <div class="gallery-modal" id="cadGalleryModal">
        <div class="gallery-container">
          <div class="gallery-header">
            <div>
              <div class="gallery-title" id="galleryTitle"></div>
              <div class="gallery-counter" id="galleryCounter"></div>
            </div>
            <button class="gallery-close" id="galleryClose" aria-label="Close gallery">
              <i class="fas fa-times"></i>
            </button>
          </div>
          
          <div class="gallery-main">
            <button class="gallery-nav gallery-prev" id="galleryPrev" aria-label="Previous image">
              <i class="fas fa-chevron-left"></i>
            </button>
            
            <div class="gallery-image-container">
              <i class="fas fa-spinner gallery-loading" id="galleryLoading"></i>
              <img class="gallery-image" id="galleryImage" alt="CAD View">
            </div>
            
            <button class="gallery-nav gallery-next" id="galleryNext" aria-label="Next image">
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
          
          <div class="gallery-thumbnails" id="galleryThumbnails"></div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    // Add event listeners
    document.getElementById('galleryClose').addEventListener('click', () => this.closeGallery());
    document.getElementById('galleryPrev').addEventListener('click', () => this.navigate(-1));
    document.getElementById('galleryNext').addEventListener('click', () => this.navigate(1));
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') this.closeGallery();
      if (e.key === 'ArrowLeft') this.navigate(-1);
      if (e.key === 'ArrowRight') this.navigate(1);
    });
    
    // Close on background click
    document.getElementById('cadGalleryModal').addEventListener('click', (e) => {
      if (e.target.id === 'cadGalleryModal') this.closeGallery();
    });
  }

  openGallery(designElement) {
    // Get images from data attribute
    const imagesData = designElement.getAttribute('data-images');
    
    if (!imagesData) {
      console.warn('No images data found for this design');
      return;
    }
    
    try {
      this.images = JSON.parse(imagesData);
    } catch (e) {
      console.error('Error parsing images data:', e);
      return;
    }
    
    // Get title from the card
    const card = designElement.closest('.design-card');
    this.galleryTitle = card ? card.querySelector('h3').textContent : 'CAD Views';
    
    this.currentIndex = 0;
    
    // Show modal
    const modal = document.getElementById('cadGalleryModal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Update content
    this.updateGallery();
    this.createThumbnails();
  }

  closeGallery() {
    const modal = document.getElementById('cadGalleryModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  navigate(direction) {
    this.currentIndex += direction;
    
    if (this.currentIndex < 0) this.currentIndex = 0;
    if (this.currentIndex >= this.images.length) this.currentIndex = this.images.length - 1;
    
    this.updateGallery();
  }

  updateGallery() {
    const img = document.getElementById('galleryImage');
    const loading = document.getElementById('galleryLoading');
    const title = document.getElementById('galleryTitle');
    const counter = document.getElementById('galleryCounter');
    const prevBtn = document.getElementById('galleryPrev');
    const nextBtn = document.getElementById('galleryNext');
    
    // Show loading
    loading.style.display = 'block';
    img.classList.remove('active');
    
    // Update title and counter
    title.textContent = this.galleryTitle;
    counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    
    // Update navigation buttons
    prevBtn.classList.toggle('disabled', this.currentIndex === 0);
    nextBtn.classList.toggle('disabled', this.currentIndex === this.images.length - 1);
    
    // Load image
    const newImg = new Image();
    newImg.onload = () => {
      img.src = this.images[this.currentIndex];
      loading.style.display = 'none';
      setTimeout(() => img.classList.add('active'), 50);
    };
    newImg.src = this.images[this.currentIndex];
    
    // Update thumbnails
    this.updateThumbnails();
  }

  createThumbnails() {
    const container = document.getElementById('galleryThumbnails');
    container.innerHTML = '';
    
    this.images.forEach((src, index) => {
      const thumb = document.createElement('div');
      thumb.className = 'gallery-thumb';
      if (index === this.currentIndex) thumb.classList.add('active');
      
      const img = document.createElement('img');
      img.src = src;
      img.alt = `View ${index + 1}`;
      
      thumb.appendChild(img);
      thumb.addEventListener('click', () => {
        this.currentIndex = index;
        this.updateGallery();
      });
      
      container.appendChild(thumb);
    });
  }

  updateThumbnails() {
    const thumbs = document.querySelectorAll('.gallery-thumb');
    thumbs.forEach((thumb, index) => {
      thumb.classList.toggle('active', index === this.currentIndex);
    });
    
    // Scroll active thumbnail into view
    const activeThumb = document.querySelector('.gallery-thumb.active');
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }
}

// Initialize gallery when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new CADGallery();
});