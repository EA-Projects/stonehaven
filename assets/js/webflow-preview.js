/* ==========================================================================
   Stonehaven — local preview only. DO NOT PORT TO WEBFLOW.
   Stands in for native Webflow behaviour so the static site works locally:
   Navbar (open/close), page-scroll interaction, Tabs and Form submission.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Navbar: light style once the page scrolls
     (Webflow: page-scroll interaction)
     ------------------------------------------------------------------ */
  var navbar = document.getElementById('navbar');
  var toggle = document.getElementById('navbar-toggle');
  var menu = document.getElementById('navbar-menu');

  function onScroll() {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------------------------
     Navbar: mobile menu (Webflow: Navbar element, .w--open)
     ------------------------------------------------------------------ */
  function setNav(open) {
    navbar.classList.toggle('is-open', open);
    toggle.classList.toggle('w--open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  }

  toggle.addEventListener('click', function () {
    setNav(!navbar.classList.contains('is-open'));
  });

  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setNav(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && navbar.classList.contains('is-open')) {
      setNav(false);
      toggle.focus();
    }
  });

  /* ------------------------------------------------------------------
     Tabs (Webflow: Tabs element, .w--current / .w--tab-active)
     ------------------------------------------------------------------ */
  document.querySelectorAll('[data-tabs]').forEach(function (tabs) {
    var links = Array.prototype.slice.call(tabs.querySelectorAll('[role="tab"]'));

    function select(link) {
      links.forEach(function (l) {
        var on = l === link;
        l.classList.toggle('w--current', on);
        l.setAttribute('aria-selected', on);
        l.tabIndex = on ? 0 : -1;
        document.getElementById(l.getAttribute('aria-controls')).classList.toggle('w--tab-active', on);
      });
    }

    links.forEach(function (link, i) {
      link.addEventListener('click', function () { select(link); });
      link.addEventListener('keydown', function (e) {
        var step = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
        if (!step) return;
        var next = links[(i + step + links.length) % links.length];
        select(next);
        next.focus();
      });
    });
  });

  /* ------------------------------------------------------------------
     Form submission (Webflow: submits, hides the form, shows .w-form-done).
     custom.js validates first and stops this handler when a field is invalid.
     ------------------------------------------------------------------ */
  var form = document.getElementById('form');
  var sent = document.getElementById('sent');

  if (form && sent) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      form.style.display = 'none';
      sent.style.display = 'block';
      sent.focus();
    });
  }
})();
