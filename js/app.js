/* ============================================================
   YUEHUI COATING EQUIPMENT — Application Layer
   Navigation, scroll reveals, forms, mascot interactions.
   ============================================================ */
(function () {
  'use strict';

  /* ---------- Boot screen ---------- */
  window.addEventListener('load', function () {
    var boot = document.querySelector('.boot');
    if (boot) {
      setTimeout(function () { boot.classList.add('is-hidden'); }, 420);
    }
  });

  /* ---------- Header scroll state ---------- */
  var header = document.querySelector('.site-header');
  if (header) {
    var onScroll = function () {
      if (window.scrollY > 24) header.classList.add('is-scrolled');
      else header.classList.remove('is-scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Mobile menu toggle ---------- */
  var toggle = document.querySelector('.menu-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      var open = toggle.classList.toggle('is-open');
      navLinks.classList.toggle('is-open', open);
      document.body.classList.toggle('no-scroll', open);
      toggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        toggle.classList.remove('is-open');
        navLinks.classList.remove('is-open');
        document.body.classList.remove('no-scroll');
      }
    });
  }

  /* ---------- Reveal on scroll ---------- */
  var bindReveal = function () {
    var items = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || !items.length) {
      items.forEach(function (el) { el.classList.add('is-revealed'); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var delay = parseInt(entry.target.getAttribute('data-reveal-delay') || '0', 10);
          setTimeout(function () { entry.target.classList.add('is-revealed'); }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    items.forEach(function (el) { io.observe(el); });
  };
  bindReveal();

  /* ---------- Animated counters ---------- */
  var bindCounters = function () {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length || !('IntersectionObserver' in window)) {
      counters.forEach(function (el) { el.textContent = el.getAttribute('data-counter'); });
      return;
    }
    var animate = function (el) {
      var target = parseFloat(el.getAttribute('data-counter'));
      var decimals = parseInt(el.getAttribute('data-counter-decimals') || '0', 10);
      var duration = 1600;
      var start = null;
      var step = function (ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / duration, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        var val = (target * eased).toFixed(decimals);
        el.textContent = val;
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animate(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(function (el) { io.observe(el); });
  };
  bindCounters();

  /* ---------- Mascot parallax on hero ---------- */
  var mascot = document.querySelector('[data-mascot]');
  var heroVisual = document.querySelector('.hero-visual');
  if (mascot && heroVisual) {
    heroVisual.addEventListener('mousemove', function (e) {
      var rect = heroVisual.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      mascot.style.transform = 'translate(' + (x * 12) + 'px,' + (y * 12) + 'px) rotate(' + (x * 6) + 'deg)';
    });
    heroVisual.addEventListener('mouseleave', function () {
      mascot.style.transform = '';
    });
  }

  /* ---------- Smooth scroll anchors ---------- */
  document.addEventListener('click', function (e) {
    var a = e.target.closest('a[href^="#"]');
    if (!a) return;
    var href = a.getAttribute('href');
    if (!href || href === '#') return;
    var target = document.querySelector(href);
    if (!target) return;
    e.preventDefault();
    var offset = (header ? header.offsetHeight : 0) + 12;
    var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top: top, behavior: 'smooth' });
  });

  /* ---------- Form handling (contact) ---------- */
  var form = document.querySelector('[data-contact-form]');
  if (form) {
    var status = form.querySelector('.form-status');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var data = new FormData(form);
      var subject = encodeURIComponent('[Website] ' + (data.get('topic') || 'Inquiry') + ' — ' + (data.get('name') || 'Anonymous'));
      var body = encodeURIComponent(
        'Name: ' + (data.get('name') || '-') + '\n' +
        'Company: ' + (data.get('company') || '-') + '\n' +
        'Email: ' + (data.get('email') || '-') + '\n' +
        'Country: ' + (data.get('country') || '-') + '\n' +
        'Topic: ' + (data.get('topic') || '-') + '\n\n' +
        (data.get('message') || '')
      );
      var mailto = 'mailto:support@yuehuicoat.com?subject=' + subject + '&body=' + body;
      window.location.href = mailto;
      if (status) {
        status.classList.remove('error');
        status.textContent = 'Thanks! Your email client is opening with the message pre-filled. We will reply within 1 business day.';
      }
      form.reset();
    });
  }

  /* ---------- Cookie / privacy banner ---------- */
  var banner = document.querySelector('[data-cookie-banner]');
  if (banner) {
    var KEY = 'yuehuicoat.consent';
    var consent = null;
    try { consent = localStorage.getItem(KEY); } catch (err) { consent = null; }
    if (!consent) {
      setTimeout(function () { banner.classList.add('is-visible'); }, 1400);
    }
    banner.addEventListener('click', function (e) {
      var t = e.target.closest('[data-cookie-action]');
      if (!t) return;
      var action = t.getAttribute('data-cookie-action');
      try { localStorage.setItem(KEY, action + ':' + Date.now()); } catch (err) { /* ignore */ }
      banner.classList.remove('is-visible');
    });
  }

  /* ---------- Year stamp ---------- */
  var yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Active nav link ---------- */
  var path = window.location.pathname.replace(/\/$/, '') || '/';
  document.querySelectorAll('.nav-links a').forEach(function (a) {
    var href = a.getAttribute('href');
    if (!href) return;
    if (href === '/' && (path === '/' || path.endsWith('/index.html'))) {
      a.classList.add('is-active');
    } else if (href !== '/' && path.indexOf(href) === 0) {
      a.classList.add('is-active');
    }
  });
})();
