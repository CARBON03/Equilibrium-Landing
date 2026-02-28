/* ============================================================
   main.js — EasyTrip Landing Page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Ensure nav background/shadow is correct on load
    function updateNavBg() {
      if (!nav) return;
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(0,0,0,0.92)';
        nav.style.boxShadow = '0 8px 50px rgba(0,0,0,0.7)';
      } else {
        nav.style.background = 'rgba(10,10,10,0.75)';
        nav.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5)';
      }
    }
    updateNavBg();
    window.addEventListener('scroll', updateNavBg);
  // Scroll to top button logic
  const scrollBtn = document.getElementById('scrollToTop');
  function updateScrollBtn() {
    const hero = document.querySelector('.hero');
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : window.innerHeight;
    if (heroBottom < -40) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.pointerEvents = 'auto';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
    }
  }
  window.addEventListener('scroll', updateScrollBtn);
  updateScrollBtn();
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  const nav = document.querySelector('nav');
  const hero = document.querySelector('.hero');
  window.addEventListener('scroll', () => {
    const heroBottom = hero ? hero.getBoundingClientRect().bottom : window.innerHeight;
    const firstP = document.querySelector('.features p, .rewards-section p, section p');
    if (heroBottom < 0) {
      nav.classList.add('nav-hidden');
      // Move nav softly towards first <p> after hero
      if (firstP) {
        const pRect = firstP.getBoundingClientRect();
        nav.style.transform = `translate(-50%, ${pRect.top - 40}px) scale(0.92)`;
      }
      nav.style.opacity = '0';
      nav.style.pointerEvents = 'none';
    } else {
      nav.classList.remove('nav-hidden');
      nav.style.opacity = '1';
      nav.style.pointerEvents = '';
      nav.style.transform = 'translateX(-50%)';
      if (window.scrollY > 60) {
        nav.style.background = 'rgba(0,0,0,0.92)';
        nav.style.boxShadow = '0 8px 50px rgba(0,0,0,0.7)';
      } else {
        nav.style.background = 'rgba(10,10,10,0.75)';
        nav.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5)';
      }
    }
  });


/* ── FADE-IN on scroll for feature cards ── */
  const cards = document.querySelectorAll('.feature-card');

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        cardObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(24px)';
    card.style.transition = `opacity 0.6s ${i * 0.08}s ease, transform 0.6s ${i * 0.08}s ease`;
    cardObserver.observe(card);
  });

  /* ── CURSOR GLOW (desktop only) ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.style.cssText = `
      position: fixed;
      width: 300px; height: 300px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(240,127,60,0.06) 0%, transparent 70%);
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      transition: left 0.15s ease, top 0.15s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  /* ── MOBILE NAV TOGGLE (tap to expand, like desktop hover) ── */
  const isMobile = () => window.matchMedia('(max-width: 768px)').matches;
  let navAutoCloseTimer = null;

  function closeNavMobile() {
    nav.classList.remove('nav-open');
    clearTimeout(navAutoCloseTimer);
    navAutoCloseTimer = null;
  }

  nav.addEventListener('click', () => {
    if (!isMobile()) return;
    const isOpen = nav.classList.toggle('nav-open');
    clearTimeout(navAutoCloseTimer);
    if (isOpen) {
      navAutoCloseTimer = setTimeout(() => closeNavMobile(), 4000);
    }
  });
  document.addEventListener('click', (e) => {
    if (isMobile() && !nav.contains(e.target)) {
      closeNavMobile();
    }
  });

  /* ── PHONE LAYER: subtle parallax on mouse move ── */
  const phoneLayer = document.getElementById('phone-layer');
  if (phoneLayer && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 12;
      const y = (e.clientY / window.innerHeight - 0.5) * 12;
      phoneLayer.style.transform = `perspective(800px) rotateY(${x}deg) rotateX(${-y}deg)`;
    });
    document.addEventListener('mouseleave', () => {
      phoneLayer.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
    });
    phoneLayer.style.transition = 'transform 0.1s ease';
  }

});