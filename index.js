// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const allMicrosoftBtn = document.getElementById('all-microsoft-btn');
  const allMicrosoftMenu = document.getElementById('all-microsoft-menu');
  const searchToggle = document.getElementById('search-toggle');
  const searchBox = document.getElementById('search-box');
  const searchInput = document.getElementById('search-input');
  const searchSubmit = document.getElementById('search-submit');

  // Mobile menu toggle
  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', function() {
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
      
      // Position dropdown to the left of search button
      if (navMenu.classList.contains('active')) {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
          const searchRect = searchContainer.getBoundingClientRect();
          const navbarRect = document.getElementById('navbar').getBoundingClientRect();
          // Calculate right offset: distance from navbar right edge to search button left edge
          const rightOffset = navbarRect.right - searchRect.left;
          navMenu.style.right = rightOffset + 'px';
        }
      } else {
        navMenu.style.right = '';
      }
    });

  
  const dropdown = document.querySelector(".all-microsoft-dropdown");
  const button = document.querySelector(".all-microsoft-btn");

  button.addEventListener("click", (e) => {
    e.stopPropagation(); // prevents closing immediately
    dropdown.classList.toggle("active");
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", () => {
    dropdown.classList.remove("active");
  });



    // Close menu when clicking on a link and add active state
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        // Remove active class from all links
        navLinks.forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
        
        if (window.innerWidth <= 600) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideNav = navMenu.contains(event.target);
      const isClickOnToggle = menuToggle.contains(event.target);
      
      if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navMenu.style.right = '';
      }
    });

    // Recalculate position on window resize
    window.addEventListener('resize', function() {
      if (navMenu.classList.contains('active')) {
        const searchContainer = document.querySelector('.search-container');
        if (searchContainer) {
          const searchRect = searchContainer.getBoundingClientRect();
          const navbarRect = document.getElementById('navbar').getBoundingClientRect();
          const rightOffset = navbarRect.right - searchRect.left;
          navMenu.style.right = rightOffset + 'px';
        }
      }
    });
  }
  // All Microsoft dropdown toggle
  if (allMicrosoftBtn && allMicrosoftMenu) {
    allMicrosoftBtn.addEventListener('click', function(event) {
      event.stopPropagation();
      allMicrosoftBtn.classList.toggle('active');
      allMicrosoftMenu.classList.toggle('active');
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideDropdown = allMicrosoftMenu.contains(event.target);
      const isClickOnButton = allMicrosoftBtn.contains(event.target);
      
      if (!isClickInsideDropdown && !isClickOnButton && allMicrosoftMenu.classList.contains('active')) {
        allMicrosoftBtn.classList.remove('active');
        allMicrosoftMenu.classList.remove('active');
      }
    });

    // Close dropdown when clicking on a link inside
    const dropdownLinks = allMicrosoftMenu.querySelectorAll('a');
    dropdownLinks.forEach(link => {
      link.addEventListener('click', function() {
        allMicrosoftBtn.classList.remove('active');
        allMicrosoftMenu.classList.remove('active');
      });
    });
  }

  // Search bar toggle functionality
  if (searchToggle && searchBox) {
    searchToggle.addEventListener('click', function(event) {
      event.stopPropagation();
      searchBox.classList.toggle('active');
      if (searchBox.classList.contains('active')) {
        searchInput.focus();
      }
    });

    // Handle search submission
    if (searchSubmit && searchInput) {
      searchSubmit.addEventListener('click', function(event) {
        event.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
          // You can customize this to perform actual search
          console.log('Searching for:', searchTerm);
          // Example: window.location.href = `https://www.microsoft.com/en-us/search?q=${encodeURIComponent(searchTerm)}`;
        }
      });

      // Allow Enter key to submit search
      searchInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
          event.preventDefault();
          searchSubmit.click();
        }
      });
    }

    // Close search box when clicking outside
    document.addEventListener('click', function(event) {
      const isClickInsideSearch = searchBox.contains(event.target);
      const isClickOnToggle = searchToggle.contains(event.target);
      
      if (!isClickInsideSearch && !isClickOnToggle && searchBox.classList.contains('active')) {
        searchBox.classList.remove('active');
        searchInput.value = '';
      }
    });

    // Close search box when clicking on search icon again
    searchToggle.addEventListener('click', function(event) {
      if (searchBox.classList.contains('active') && searchInput.value === '') {
        // Already handled by toggle above
      }
    });
  }

  // Back to top button functionality
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    // Show/hide button based on scroll position
    window.addEventListener('scroll', function() {
      if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
      } else {
        backToTopBtn.style.display = 'none';
      }
    });

    // Scroll to top when button is clicked
    backToTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    // Initially hide the button
    backToTopBtn.style.display = 'none';
  }

  // Carousel functionality
  const carouselSlides = document.querySelectorAll('.carousel-slide');
  const carouselDots = document.querySelectorAll('.carousel-dot');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  let currentSlide = 0;
  let carouselInterval;

  function showSlide(index) {
    // Remove active class from all slides and dots
    carouselSlides.forEach(slide => slide.classList.remove('active'));
    carouselDots.forEach(dot => dot.classList.remove('active'));

    // Add active class to current slide and dot
    if (carouselSlides[index]) {
      carouselSlides[index].classList.add('active');
    }
    if (carouselDots[index]) {
      carouselDots[index].classList.add('active');
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % carouselSlides.length;
    showSlide(currentSlide);
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + carouselSlides.length) % carouselSlides.length;
    showSlide(currentSlide);
  }

  function startCarousel() {
    carouselInterval = setInterval(nextSlide,5000); // Auto-advance every 0.6 seconds
  }
  function stopCarousel() {
    clearInterval(carouselInterval);
  }

  // Event listeners
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      stopCarousel();
      startCarousel(); // Restart auto-play
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      stopCarousel();
      startCarousel(); // Restart auto-play
    });
  }

  // Dot navigation
  carouselDots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      currentSlide = index;
      showSlide(currentSlide);
      stopCarousel();
      startCarousel(); // Restart auto-play
    });
  });

  // Auto-play carousel
  if (carouselSlides.length > 0) {
    startCarousel();

    // Pause on hover
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
      carouselContainer.addEventListener('mouseenter', stopCarousel);
      carouselContainer.addEventListener('mouseleave', startCarousel);
    }
  }
});