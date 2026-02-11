// ===== Loading Screen =====
window.addEventListener('load', () => {
  const loader = document.querySelector('.loader-wrapper');
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 500);
});

// ===== Dark Mode Toggle =====
function toggleTheme() {
  const html = document.documentElement;
  const currentTheme = html.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  html.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  
  // Update icon
  const themeIcon = document.querySelector('.theme-toggle i');
  if (newTheme === 'dark') {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  } else {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
  }
}

// Load saved theme
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  
  const themeIcon = document.querySelector('.theme-toggle i');
  if (savedTheme === 'dark' && themeIcon) {
    themeIcon.classList.remove('fa-moon');
    themeIcon.classList.add('fa-sun');
  }
});

// ===== Mobile Menu Toggle =====
function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  
  navLinks.classList.toggle('show');
  menuToggle.classList.toggle('active');
  
  // Close dropdowns when menu closes
  if (!navLinks.classList.contains('show')) {
    document.querySelectorAll('.dropdown').forEach(dropdown => {
      dropdown.classList.remove('active');
    });
  }
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  const nav = document.querySelector('nav');
  const menuToggle = document.querySelector('.menu-toggle');
  
  if (nav && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.remove('show');
    menuToggle.classList.remove('active');
  }
});

// ===== Smooth Scroll =====
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    const headerHeight = document.querySelector('header').offsetHeight;
    const sectionPosition = section.offsetTop - headerHeight;
    
    window.scrollTo({
      top: sectionPosition,
      behavior: 'smooth'
    });
  } else if (sectionId === 'contact') {
    window.location.href = 'contact.html';
  } else if (sectionId === 'about') {
    window.location.href = 'about.html';
  }
  
  // Close mobile menu
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.querySelector('.menu-toggle');
  if (navLinks) {
    navLinks.classList.remove('show');
    if (menuToggle) menuToggle.classList.remove('active');
  }
}

// ===== Scroll to Top =====
function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Show/hide back to top button
window.addEventListener('scroll', () => {
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  }
});

// ===== Sticky Header =====
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (header) {
    if (window.scrollY > 100) {
      header.classList.add('sticky-header');
    } else {
      header.classList.remove('sticky-header');
    }
  }
});

// ===== Scroll Animations (AOS) =====
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-aos]').forEach(el => {
    observer.observe(el);
  });
});

// ===== Counter Animation =====
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);
  
  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };
  
  updateCounter();
}

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
      const target = parseInt(entry.target.getAttribute('data-target'));
      animateCounter(entry.target, target);
      entry.target.classList.add('counted');
    }
  });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.counter').forEach(counter => {
    counterObserver.observe(counter);
  });
});

// ===== Testimonial Slider =====
let currentTestimonialIndex = 0;
const testimonials = document.querySelectorAll('.testimonial-item');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.toggle('active', i === index);
  });
  
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
  
  currentTestimonialIndex = index;
}

function changeTestimonial(direction) {
  currentTestimonialIndex += direction;
  
  if (currentTestimonialIndex < 0) {
    currentTestimonialIndex = testimonials.length - 1;
  } else if (currentTestimonialIndex >= testimonials.length) {
    currentTestimonialIndex = 0;
  }
  
  showTestimonial(currentTestimonialIndex);
}

function currentTestimonial(index) {
  showTestimonial(index);
}

// Auto-play testimonials
let testimonialInterval;
function startTestimonialAutoPlay() {
  testimonialInterval = setInterval(() => {
    changeTestimonial(1);
  }, 5000);
}

function stopTestimonialAutoPlay() {
  clearInterval(testimonialInterval);
}

document.addEventListener('DOMContentLoaded', () => {
  if (testimonials.length > 0) {
    startTestimonialAutoPlay();
    
    // Pause on hover
    const slider = document.querySelector('.testimonial-slider');
    if (slider) {
      slider.addEventListener('mouseenter', stopTestimonialAutoPlay);
      slider.addEventListener('mouseleave', startTestimonialAutoPlay);
    }
  }
});

// ===== Portfolio Filter =====
document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      // Filter items
      const filter = button.getAttribute('data-filter');
      
      portfolioItems.forEach(item => {
        const category = item.getAttribute('data-category');
        
        if (filter === 'all' || category === filter) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });
});

// ===== Newsletter Subscription =====
function subscribeNewsletter(event) {
  event.preventDefault();
  
  const emailInput = document.getElementById('newsletterEmail');
  const messageDiv = document.getElementById('newsletterMessage');
  
  if (!emailInput || !messageDiv) return;
  
  const email = emailInput.value.trim();
  
  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(email)) {
    messageDiv.textContent = 'Please enter a valid email address.';
    messageDiv.style.color = '#e74c3c';
    return;
  }
  
  // Simulate subscription
  messageDiv.textContent = 'Thank you for subscribing! Check your email for confirmation.';
  messageDiv.style.color = '#2ebf91';
  emailInput.value = '';
  
  // Reset message after 5 seconds
  setTimeout(() => {
    messageDiv.textContent = '';
  }, 5000);
}

// ===== Enhanced Form Validation + LocalStorage Save =====
function validateForm() {
  let isValid = true;
  
  const name = document.getElementById('name');
  const email = document.getElementById('email');
  const message = document.getElementById('message');
  const subject = document.getElementById('subject');
  
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  
  // Reset errors
  if (nameError) nameError.textContent = '';
  if (emailError) emailError.textContent = '';
  if (messageError) messageError.textContent = '';
  
  if (name) name.style.border = '2px solid #e0e0e0';
  if (email) email.style.border = '2px solid #e0e0e0';
  if (message) message.style.border = '2px solid #e0e0e0';
  
  // Validate name (no empty)
  if (name && name.value.trim() === '') {
    if (nameError) {
      nameError.textContent = 'Name is required';
      nameError.style.display = 'block';
    }
    name.style.border = '2px solid #e74c3c';
    isValid = false;
  }
  
  // Validate email (no empty + simple pattern)
  if (email && email.value.trim() === '') {
    if (emailError) {
      emailError.textContent = 'Email is required';
      emailError.style.display = 'block';
    }
    email.style.border = '2px solid #e74c3c';
    isValid = false;
  } else if (email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value.trim())) {
      if (emailError) {
        emailError.textContent = 'Please enter a valid email address';
        emailError.style.display = 'block';
      }
      email.style.border = '2px solid #e74c3c';
      isValid = false;
    }
  }
  
  // Validate message (no empty)
  if (message && message.value.trim() === '') {
    if (messageError) {
      messageError.textContent = 'Message is required';
      messageError.style.display = 'block';
    }
    message.style.border = '2px solid #e74c3c';
    isValid = false;
  }
  
  if (isValid) {
    const form = document.getElementById('contactForm');
    if (form) {
      // Build submission object
      const submission = {
        name: name ? name.value.trim() : '',
        email: email ? email.value.trim() : '',
        subject: subject ? subject.value.trim() : '',
        message: message ? message.value.trim() : '',
        createdAt: new Date().toISOString()
      };

      // Read existing submissions from LocalStorage
      const key = 'contactSubmissions';
      let existing = [];
      try {
        const raw = localStorage.getItem(key);
        if (raw) {
          existing = JSON.parse(raw);
          if (!Array.isArray(existing)) existing = [];
        }
      } catch (e) {
        existing = [];
      }

      // Add new submission and save back
      existing.push(submission);
      localStorage.setItem(key, JSON.stringify(existing));

      // Optional: clear form
      form.reset();

      // Redirect to submissions page to display saved data
      window.location.href = 'submissions.html';
    }
  }
  
  return false; // Prevent default submit; we handle everything here
}

// ===== Real-time Form Validation + Submissions Page Loader =====
document.addEventListener('DOMContentLoaded', () => {
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');
  
  if (nameInput) {
    nameInput.addEventListener('blur', () => {
      if (nameInput.value.trim() !== '') {
        nameInput.style.border = '2px solid #2ebf91';
      }
    });
  }
  
  if (emailInput) {
    emailInput.addEventListener('blur', () => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (emailRegex.test(emailInput.value.trim())) {
        emailInput.style.border = '2px solid #2ebf91';
      }
    });
  }
  
  if (messageInput) {
    messageInput.addEventListener('blur', () => {
      if (messageInput.value.trim().length >= 10) {
        messageInput.style.border = '2px solid #2ebf91';
      }
    });
  }

  // Load submissions on Submissions page
  const submissionsContainer = document.getElementById('submissionsList');
  if (submissionsContainer) {
    let submissions = [];
    try {
      const stored = localStorage.getItem('contactSubmissions');
      submissions = stored ? JSON.parse(stored) : [];
      if (!Array.isArray(submissions)) submissions = [];
    } catch (e) {
      submissions = [];
    }

    if (!submissions.length) {
      submissionsContainer.innerHTML = '<p class="no-submissions">No submissions found yet. Fill out the contact form to see your messages here.</p>';
    } else {
      submissionsContainer.innerHTML = '';

      submissions
        .slice()
        .reverse()
        .forEach((submission, index) => {
          const card = document.createElement('div');
          card.className = 'submission-card';

          const timestamp = submission.createdAt ? new Date(submission.createdAt) : null;
          const formattedDate = timestamp && !isNaN(timestamp)
            ? timestamp.toLocaleString()
            : 'Unknown time';

          card.innerHTML = `
            <div class="submission-header">
              <div>
                <h3>${submission.name || 'Anonymous'}</h3>
                <p class="submission-email">${submission.email || 'No email provided'}</p>
              </div>
              <span class="submission-index">#${submissions.length - index}</span>
            </div>
            <p class="submission-message">${(submission.message || '').replace(/\n/g, '<br>')}</p>
            <p class="submission-meta">Submitted on ${formattedDate}</p>
          `;

          submissionsContainer.appendChild(card);
        });
    }
  }
});

// ===== Scroll Indicator Click =====
document.addEventListener('DOMContentLoaded', () => {
  const scrollIndicator = document.querySelector('.scroll-indicator');
  if (scrollIndicator) {
    scrollIndicator.addEventListener('click', () => {
      scrollToSection('services');
    });
  }
});

// ===== Active Navigation Link =====
window.addEventListener('scroll', () => {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// ===== Parallax Effect for Hero =====
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector('.hero');
  if (hero) {
    const heroContent = hero.querySelector('.hero-content');
    if (heroContent && scrolled < hero.offsetHeight) {
      heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
      heroContent.style.opacity = 1 - (scrolled / hero.offsetHeight);
    }
  }
});

// ===== Initialize on DOM Load =====
document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scroll to all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        e.preventDefault();
        scrollToSection(href.substring(1));
      }
    });
  });
  
  // Initialize portfolio items opacity
  document.querySelectorAll('.portfolio-item').forEach(item => {
    item.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
  });

  // ===== Render submissions page (if present) =====
  const submissionsContainer = document.getElementById('submissionsContainer');
  if (submissionsContainer) {
    const key = 'contactSubmissions';
    let submissions = [];
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        submissions = JSON.parse(raw);
        if (!Array.isArray(submissions)) submissions = [];
      }
    } catch (e) {
      submissions = [];
    }

    if (!submissions.length) {
      submissionsContainer.innerHTML = `
        <div class="card">
          <p style="margin: 0; color: var(--text-light);">
            No submissions yet. Go to the <a href="contact.html">contact page</a> and send a message.
          </p>
        </div>
      `;
    } else {
      const listHtml = submissions
        .slice()
        .reverse()
        .map((item, index) => {
          const date = new Date(item.createdAt);
          const formatted = isNaN(date.getTime())
            ? ''
            : date.toLocaleString();
          return `
            <div class="card" style="margin-bottom: 20px; text-align: left;">
              <h3 style="margin-bottom: 10px;">${item.name || 'Unknown'} <span style="font-size: 12px; font-weight: 400; color: var(--text-light);">#${submissions.length - index}</span></h3>
              <p style="margin: 4px 0;"><strong>Email:</strong> ${item.email || '-'}</p>
              ${item.subject ? `<p style="margin: 4px 0;"><strong>Subject:</strong> ${item.subject}</p>` : ''}
              <p style="margin: 10px 0; white-space: pre-wrap;"><strong>Message:</strong><br>${item.message || '-'}</p>
              ${formatted ? `<p style="margin: 4px 0; font-size: 13px; color: var(--text-light);"><i class="fa fa-clock"></i> ${formatted}</p>` : ''}
            </div>
          `;
        })
        .join('');

      submissionsContainer.innerHTML = listHtml;
    }
  }
});
