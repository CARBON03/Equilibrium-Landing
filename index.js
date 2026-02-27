/* ============================================================
   main.js — EasyTrip Landing Page
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── NAV: shrink on scroll ── */
  const nav = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      nav.style.background = 'rgba(0,0,0,0.92)';
      nav.style.boxShadow = '0 8px 50px rgba(0,0,0,0.7)';
    } else {
      nav.style.background = 'rgba(10,10,10,0.75)';
      nav.style.boxShadow = '0 8px 40px rgba(0,0,0,0.5)';
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

  /* ── MOBILE NAV TOGGLE (hamburger placeholder) ── */
  // If you add a hamburger button with id="nav-toggle", this handles it.
  const toggle = document.getElementById('nav-toggle');
  const navMenu = document.querySelector('nav ul');
  if (toggle && navMenu) {
    toggle.addEventListener('click', () => {
      const open = navMenu.style.display === 'flex';
      navMenu.style.display = open ? 'none' : 'flex';
      navMenu.style.flexDirection = 'column';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '70px';
      navMenu.style.left = '0';
      navMenu.style.right = '0';
      navMenu.style.background = 'var(--surface)';
      navMenu.style.padding = '20px';
      navMenu.style.gap = '16px';
    });
  }

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