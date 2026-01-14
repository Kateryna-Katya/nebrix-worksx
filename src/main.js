document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  lucide.createIcons();

  // 2. Smooth Scroll (Lenis)
  const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // 3. Header Scroll Effect
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          header.style.padding = '12px 0';
          header.style.backgroundColor = 'rgba(10, 11, 16, 0.95)';
      } else {
          header.style.padding = '20px 0';
          header.style.backgroundColor = 'transparent';
      }
  });

  // 4. Placeholder for Burger Menu (will be expanded in next steps)
  const burger = document.querySelector('.burger');
  burger.addEventListener('click', () => {
      console.log('Mobile menu toggled');
  });
});