// ===== TYPEWRITER EFFECT =====
const phrases = [
  "Frontend Developer",
  "Problem Solver",
  "Linux Enthusiast",
  "Code Craftsman"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typewriterEl = document.getElementById('typewriter');

function typeWriter() {
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typewriterEl.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typewriterEl.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    setTimeout(() => isDeleting = true, 2000);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
  }
  
  const typingSpeed = isDeleting ? 50 : 100;
  setTimeout(typeWriter, typingSpeed);
}

// Start typewriter effect
typeWriter();

// ===== COPY EMAIL FUNCTIONALITY =====
const copyEmailBtn = document.getElementById('copyEmail');
const emailText = document.getElementById('emailText');
const email = 'satyamsharma22@gmail.com';

copyEmailBtn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(email);
    
    // Show success state
    emailText.innerHTML = `
      <svg class="btn-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7"></path>
      </svg>
      Email Copied!
    `;
    
    copyEmailBtn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
    
    // Reset after 2 seconds
    setTimeout(() => {
      emailText.innerHTML = `
        <svg class="btn-icon" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
        </svg>
        Copy Email Address
      `;
      copyEmailBtn.style.background = 'linear-gradient(135deg, #3b82f6, #8b5cf6)';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy email:', err);
    
    // Show error state
    emailText.innerHTML = `
      <svg class="btn-icon" fill="currentColor" viewBox="0 0 20 20">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
      </svg>
      Failed to Copy
    `;
  }
});

// ===== SMOOTH SCROLL FOR NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ===== ACTIVE NAVIGATION STATE =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function setActiveNav() {
  let current = 'home';
  const scrollPosition = window.pageYOffset;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    // Check if we're within this section (with some offset for better UX)
    if (scrollPosition >= sectionTop - 300 && scrollPosition < sectionTop + sectionHeight - 300) {
      current = section.getAttribute('id');
    }
  });
  
  // Update navigation links
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

// Throttle function to improve performance
function throttle(func, wait) {
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

// Add scroll event listener with throttling
window.addEventListener('scroll', throttle(setActiveNav, 100));

// Set initial active state
setActiveNav();

// ===== REVEAL ON SCROLL ANIMATION =====
function revealOnScroll() {
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const windowHeight = window.innerHeight;
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('active');
    }
  });
}

// Add scroll event listener for reveal animations
window.addEventListener('scroll', throttle(revealOnScroll, 100));

// Initial check for elements in view
revealOnScroll();

// ===== PREVENT CARD FLIP GLITCH =====
// The card flip is now purely CSS-based and only triggers on hover
// No JavaScript intervention needed - the CSS handles it perfectly

// ===== PAGE LOAD ANIMATION =====
window.addEventListener('load', () => {
  document.body.style.opacity = '0';
  setTimeout(() => {
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '1';
  }, 100);
});

// ===== PERFORMANCE OPTIMIZATION =====
// Use Intersection Observer for better performance on scroll animations
if ('IntersectionObserver' in window) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
      }
    });
  }, observerOptions);
  
  // Observe all reveal elements
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

// ===== HANDLE NAVIGATION STABILITY =====
// Ensure dock navigation doesn't glitch on hover
const dockNav = document.getElementById('dockNav');
if (dockNav) {
  // Prevent layout shift by ensuring consistent positioning
  dockNav.style.willChange = 'transform';
}

// ===== SECTION VISIBILITY MANAGEMENT =====
// Ensure sections don't overlap visually
function manageSectionVisibility() {
  const scrollPosition = window.pageYOffset;
  const windowHeight = window.innerHeight;
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.clientHeight;
    
    // Add a class to manage visibility if needed
    if (scrollPosition + windowHeight > sectionTop && scrollPosition < sectionBottom) {
      section.style.zIndex = '10';
    } else if (scrollPosition >= sectionBottom) {
      section.style.zIndex = '5';
    }
  });
}

window.addEventListener('scroll', throttle(manageSectionVisibility, 100));
manageSectionVisibility();

// ===== ACCESSIBILITY ENHANCEMENTS =====
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ===== PREVENT MOBILE SCROLL ISSUES =====
// Ensure smooth scrolling works on mobile devices
if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
  document.documentElement.style.scrollBehavior = 'smooth';
}

// ===== CONSOLE EASTER EGG =====
console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #3b82f6;');
console.log('%cInterested in the code? Check out the portfolio at satyamsharma.dev', 'font-size: 14px; color: #60a5fa;');
console.log('%cBuilt with ❤️ using vanilla HTML, CSS, and JavaScript', 'font-size: 12px; color: #9ca3af;');