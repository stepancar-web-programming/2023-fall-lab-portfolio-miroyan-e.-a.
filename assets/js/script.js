'use strict';

(function () {
  const addEventOnElements = function (elements, eventType, callback) {
    for (let i = 0, len = elements.length; i < len; i++) {
      elements[i].addEventListener(eventType, callback);
    }
  }

  const preloader = document.querySelector("[data-preloader]");

  window.addEventListener("DOMContentLoaded", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  });

  const navTogglers = document.querySelectorAll("[data-nav-toggler]");
  const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
  const navbar = document.querySelector("[data-navbar]");
  const overlay = document.querySelector("[data-overlay]");

  const toggleNavbar = function () {
    navbar.classList.toggle("active");
    navToggleBtn.classList.toggle("active");
    overlay.classList.toggle("active");
    document.body.classList.toggle("nav-active");
  }

  addEventOnElements(navTogglers, "click", toggleNavbar);

  const header = document.querySelector("[data-header]");

  window.addEventListener("scroll", function () {
    if (window.scrollY >= 100) {
      header.classList.add("active");
    } else {
      header.classList.remove("active");
    }
  });

  const sliders = document.querySelectorAll("[data-slider]");

  const initSlider = function (currentSlider) {
    const sliderContainer = currentSlider.querySelector("[data-slider-container]");
    const sliderPrevBtn = currentSlider.querySelector("[data-slider-prev]");
    const sliderNextBtn = currentSlider.querySelector("[data-slider-next]");

    let totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
    let totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

    let currentSlidePos = 0;

    const moveSliderItem = function () {
      sliderContainer.style.transform = `translateX(-${sliderContainer.children[currentSlidePos].offsetLeft}px)`;
    }

    const slideNext = function () {
      const slideEnd = currentSlidePos >= totalSlidableItems;

      if (slideEnd) {
        currentSlidePos = 0;
      } else {
        currentSlidePos++;
      }

      moveSliderItem();
    }

    sliderNextBtn.addEventListener("click", slideNext);

    const slidePrev = function () {
      if (currentSlidePos <= 0) {
        currentSlidePos = totalSlidableItems;
      } else {
        currentSlidePos--;
      }

      moveSliderItem();
    }

    sliderPrevBtn.addEventListener("click", slidePrev);

    const dontHaveExtraItem = totalSlidableItems <= 0;
    if (dontHaveExtraItem) {
      sliderNextBtn.style.display = 'none';
      sliderPrevBtn.style.display = 'none';
    }

    currentSlider.addEventListener("wheel", function (event) {
      if (event.shiftKey && event.deltaY > 0) slideNext();
      if (event.shiftKey && event.deltaY < 0) slidePrev();
    });

    window.addEventListener("resize", function () {
      totalSliderVisibleItems = Number(getComputedStyle(currentSlider).getPropertyValue("--slider-items"));
      totalSlidableItems = sliderContainer.childElementCount - totalSliderVisibleItems;

      moveSliderItem();
    });
  }

  for (let i = 0, len = sliders.length; i < len; i++) {
    initSlider(sliders[i]);
  }

  const navHomeButton = document.getElementById('home-button');
  const navServiceButton = document.getElementById('services-button');
  const navPersonalButton = document.getElementById('personal-button');
  const navArticlesButton = document.getElementById('articles-button');

  const targetSection = document.getElementById('section2');

  const HomeSection = document.getElementById('home-section');
  const ServicesSection = document.getElementById('services-section');
  const PersonalSection = document.getElementById('personal-section');
  const ArticlesSection = document.getElementById('articles-section');

  navHomeButton.addEventListener('click', function () {
    HomeSection.scrollIntoView(true)
  });

  navServiceButton.addEventListener('click', function () {
    ServicesSection.scrollIntoView(true)
  });

  navPersonalButton.addEventListener('click', function () {
    PersonalSection.scrollIntoView(true)
  });

  navArticlesButton.addEventListener('click', function () {
    ArticlesSection.scrollIntoView(true)
  });

  const navLinks = document.querySelectorAll('.navbar-link');

  const handleNavClick = function (event) {
    event.preventDefault();
    const targetId = event.currentTarget.getAttribute('id');
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: 'smooth' });
      updateBrowserUrl(targetId);
      setTimeout(() => {
        event.currentTarget.blur();
      }, 300);
    }
  };

  const handleNavKeyPress = function (event) {
    if (event.key === 'Enter') {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('id');
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
        updateBrowserUrl(targetId);
        setTimeout(() => {
          event.currentTarget.blur();
        }, 300);
      }
    }
  
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      event.preventDefault();
      const currentIndex = Array.from(navLinks).indexOf(event.currentTarget);
      let nextIndex;
  
      if (event.key === 'ArrowDown') {
        nextIndex = currentIndex < navLinks.length - 1 ? currentIndex + 1 : 0;
      } else {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : navLinks.length - 1;
      }
  
      navLinks[nextIndex].focus();
      const targetId = navLinks[nextIndex].getAttribute('id');
      updateBrowserUrl(targetId);
    }
  };
  
  const updateBrowserUrl = function (targetId) {
    const currentPageUrl = window.location.href;
    const baseUrl = currentPageUrl.split('#')[0];
    const newUrl = targetId ? `${baseUrl}#${targetId.split('-')[0]}` : baseUrl;
    window.history.replaceState({}, document.title, newUrl);
  };

  navLinks.forEach(link => {
    link.addEventListener('click', handleNavClick);
    link.addEventListener('keydown', handleNavKeyPress);
    link.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        event.currentTarget.click();
      }
    });
  });


  const page2Link = document.getElementById('page2');

  if (page2Link) {
    page2Link.addEventListener('click', function (event) {
      event.preventDefault();
      window.location.href = page2Link.getAttribute('href');
    });

    page2Link.addEventListener('keydown', handleNavKeyPress);
    page2Link.addEventListener('keyup', function (event) {
      if (event.key === 'Enter') {
        event.currentTarget.click();
      }
    });
  }  

})();

