document.addEventListener('DOMContentLoaded', () => {
  const DEBOUNCE_DELAY = 200;

  const debounce = (func, delay = DEBOUNCE_DELAY) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const toggleBodyScroll = (lock) => {
    document.body.classList.toggle('no-scroll', lock);
  };

  const initPreloader = () => {
    const preloader = document.querySelector('.preloader');
    const pageElements = document.querySelectorAll(
      '.site-header, .hero-section, section, footer'
    );

    if (!preloader) return;

    if (sessionStorage.getItem('preloaderShown') !== 'true') {
      document.body.classList.add('preloading');
      toggleBodyScroll(true);

      pageElements.forEach((el) => {
        el.style.display = 'none';
      });

      let progress = 0;
      const interval = setInterval(() => {
        progress += 10;

        if (progress >= 100) {
          clearInterval(interval);
          preloader.style.opacity = '0';

          setTimeout(() => {
            preloader.style.display = 'none';
            document.body.classList.remove('preloading');

            pageElements.forEach((el) => {
              el.style.display = '';
            });

            sessionStorage.setItem('preloaderShown', 'true');
            toggleBodyScroll(false);
          }, 300);
        }
      }, 50);
    } else {
      preloader.style.display = 'none';
      document.body.classList.remove('preloading');
      pageElements.forEach((el) => {
        el.style.display = '';
      });
      toggleBodyScroll(false);
    }
  };

  const preloadImages = (container) => {
    if (!container) return;

    const images = container.querySelectorAll('img');
    images.forEach((img) => {
      const preloadImg = new Image();
      preloadImg.src = img.src;
      preloadImg.onerror = () => {
        console.warn(`Failed to preload image: ${img.src}`);
      };
    });
  };

  const initMobileMenu = () => {
    const toggle = document.querySelector('.mobile-menu-toggle');
    const nav = document.querySelector('.nav-container');
    const dropdowns = document.querySelectorAll('.has-dropdown');

    if (!toggle || !nav) return;

    const closeMenu = () => {
      toggle.classList.remove('active');
      nav.classList.remove('active');
      toggleBodyScroll(false);

      dropdowns.forEach((dropdown) => {
        dropdown.classList.remove('active');
        const submenu = dropdown.querySelector('.dropdown-menu');
        if (submenu && window.innerWidth <= 768) {
          submenu.style.display = 'none';
        } else if (submenu) {
          submenu.style.display = '';
        }
      });
    };

    toggle.addEventListener('click', () => {
      const isActive = toggle.classList.contains('active');
      toggle.classList.toggle('active');
      nav.classList.toggle('active');
      toggleBodyScroll(!isActive);
    });

    toggle.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        toggle.click();
      }
    });

    dropdowns.forEach((dropdown) => {
      const link = dropdown.querySelector('a');
      const submenu = dropdown.querySelector('.dropdown-menu');

      if (!link || !submenu) return;

      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 768) {
          e.preventDefault();

          const isOpen = dropdown.classList.contains('active');

          dropdowns.forEach((item) => {
            if (item !== dropdown) {
              item.classList.remove('active');
              const otherSubmenu = item.querySelector('.dropdown-menu');
              if (otherSubmenu) otherSubmenu.style.display = 'none';
            }
          });

          dropdown.classList.toggle('active', !isOpen);
          submenu.style.display = !isOpen ? 'flex' : 'none';
        }
      });
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        const isDropdownParent = link.parentElement.classList.contains('has-dropdown');
        if (window.innerWidth <= 768 && !isDropdownParent) {
          closeMenu();
        }
      });
    });

    window.addEventListener(
      'resize',
      debounce(() => {
        if (window.innerWidth > 768) {
          closeMenu();
          dropdowns.forEach((dropdown) => {
            const submenu = dropdown.querySelector('.dropdown-menu');
            if (submenu) submenu.style.display = '';
          });
        }
      }, 100)
    );
  };

  const initHeaderScroll = () => {
    const header = document.querySelector('.site-header');
    if (!header) return;

    const onScroll = debounce(() => {
      header.classList.toggle('scrolled', window.pageYOffset > 50);
    }, 50);

    window.addEventListener('scroll', onScroll);
    onScroll();
  };

  const initSmoothScroll = () => {
    const trigger = document.querySelector('.hero-content .btn-primary');
    if (!trigger) return;

    trigger.addEventListener('click', (e) => {
      const targetSelector = trigger.getAttribute('href');
      if (!targetSelector || !targetSelector.startsWith('#')) return;

      const target = document.querySelector(targetSelector);
      if (!target) return;

      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    });
  };

  const initPackageToggle = () => {
    const toggles = document.querySelectorAll('.details-toggle');
    if (!toggles.length) return;

    toggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        const details = toggle.nextElementSibling;
        const isOpen = toggle.classList.contains('active');

        toggle.classList.toggle('active', !isOpen);
        toggle.setAttribute('aria-expanded', String(!isOpen));

        if (details) {
          details.classList.toggle('active', !isOpen);
        }
      });
    });
  };

  const initScrollAnimation = () => {
    const animatedElements = document.querySelectorAll('[data-animate]');
    if (!animatedElements.length) return;

    if (!('IntersectionObserver' in window)) {
      animatedElements.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observerRef) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observerRef.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedElements.forEach((element) => observer.observe(element));
  };

  const initNewsletterForm = () => {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      const emailInput = form.querySelector('input[type="email"]');
      if (!emailInput) return;

      const email = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailRegex.test(email)) {
        e.preventDefault();
        alert('Please enter a valid email address.');
        emailInput.focus();
      }
    });
  };

  initPreloader();
  preloadImages(document.querySelector('.hero-section'));
  initMobileMenu();
  initHeaderScroll();
  initSmoothScroll();
  initPackageToggle();
  initScrollAnimation();
  initNewsletterForm();
});

document.body.classList.add('no-scroll');

setTimeout(() => {
  if (!document.body.classList.contains('preloading')) {
    document.body.classList.remove('no-scroll');
  }
}, 1000);