/* =========================================
   Nexadream Portfolio — vanilla interactions
   ========================================= */

(function () {
  'use strict';

  /* ----------------------------------
     Reveal-on-scroll via IntersectionObserver
     ---------------------------------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add('is-visible'));
  }

  /* ----------------------------------
     Soft cursor glow (desktop only)
     ---------------------------------- */
  const glow = document.querySelector('.glow-follow');
  if (glow && window.matchMedia('(min-width: 1024px)').matches) {
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    window.addEventListener('mousemove', (e) => {
      targetX = e.clientX;
      targetY = e.clientY;
    });

    const tick = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      glow.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();
  }

  /* ----------------------------------
     Portfolio filter tabs
     ---------------------------------- */
  const filterBtns = document.querySelectorAll('.portfolio-filter__btn');
  const portfolioCards = document.querySelectorAll('.portfolio-grid .p-card');
  if (filterBtns.length && portfolioCards.length) {
    filterBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');

        filterBtns.forEach((b) => {
          const isActive = b === btn;
          b.classList.toggle('is-active', isActive);
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        portfolioCards.forEach((card) => {
          const category = card.getAttribute('data-category');
          const show = filter === 'all' || category === filter;
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  /* ----------------------------------
     Year stamp in footer
     ---------------------------------- */
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ----------------------------------
     Subtle parallax for elements with [data-parallax]
     ---------------------------------- */
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (parallaxEls.length && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-parallax') || '0.08');
          el.style.transform = `translate3d(0, ${y * speed * -1}px, 0)`;
        });
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }
})();
