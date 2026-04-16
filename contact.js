document.addEventListener('DOMContentLoaded', () => {
  // Collapsible Panels (Getting Here)
  const collapsibleToggles = document.querySelectorAll('.collapsible-toggle');
  collapsibleToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const content = toggle.nextElementSibling;
      const isActive = toggle.classList.contains('active');

      // Close all panels
      collapsibleToggles.forEach(t => {
        t.classList.remove('active');
        t.setAttribute('aria-expanded', 'false');
        t.nextElementSibling.classList.remove('active');
      });

      // Open current panel
      if (!isActive) {
        toggle.classList.add('active');
        toggle.setAttribute('aria-expanded', 'true');
        content.classList.add('active');
      }
    });
  });

  // Initialize other scripts if needed
  if (typeof initMagazineCarousels === 'function') {
    initMagazineCarousels();
  }
});