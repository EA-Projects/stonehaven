(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Sticky header: switch to the light style once the page scrolls
     ------------------------------------------------------------------ */
  var header = document.querySelector('header.site');
  var nav = document.querySelector('nav.nav');
  var burger = document.getElementById('burger');

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 40);
  }
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ------------------------------------------------------------------
     Mobile menu
     ------------------------------------------------------------------ */
  function setNav(open) {
    nav.classList.toggle('open', open);
    burger.setAttribute('aria-expanded', open);
    burger.textContent = open ? 'Close' : 'Menu';
  }

  burger.addEventListener('click', function () {
    setNav(!nav.classList.contains('open'));
  });

  document.querySelectorAll('#menu a').forEach(function (link) {
    link.addEventListener('click', function () { setNav(false); });
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      setNav(false);
      burger.focus();
    }
  });

  /* ------------------------------------------------------------------
     Hero audience switch (MGAs / Reinsurers)
     The MGA copy is read from the HTML, so it only lives in one place.
     ------------------------------------------------------------------ */
  var lede = document.querySelector('.hero .lede');
  var cta = document.getElementById('cta1');
  var audienceButtons = document.querySelectorAll('.switch [data-a]');

  var copy = {
    mga: {
      text: lede.textContent,
      label: cta.textContent,
      href: cta.getAttribute('href'),
      topic: cta.getAttribute('data-topic')
    },
    re: {
      text: 'Stonehaven is a hybrid fronting carrier and a member of the Ledgebrook group. We keep a share of every program and underwrite it as though we retained it all, and we give reinsurers direct visibility into the performance of the programs they support.',
      label: 'Request a capacity briefing',
      href: '#reinsurers',
      topic: 'capacity'
    }
  };

  audienceButtons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      audienceButtons.forEach(function (other) {
        other.setAttribute('aria-pressed', String(other === btn));
      });
      var c = copy[btn.getAttribute('data-a')];
      lede.textContent = c.text;
      cta.textContent = c.label;
      cta.setAttribute('href', c.href);
      cta.setAttribute('data-topic', c.topic);
    });
  });

  /* ------------------------------------------------------------------
     Links with data-topic pre-select the inquiry type in the form
     ------------------------------------------------------------------ */
  var topic = document.getElementById('f-topic');

  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-topic]');
    if (link && topic) topic.value = link.getAttribute('data-topic');
  });

  /* ------------------------------------------------------------------
     Press list: show / hide older announcements
     ------------------------------------------------------------------ */
  var newsToggle = document.getElementById('news-toggle');

  if (newsToggle) {
    newsToggle.addEventListener('click', function () {
      var open = newsToggle.getAttribute('aria-expanded') !== 'true';
      document.querySelectorAll('.news-more').forEach(function (li) { li.hidden = !open; });
      newsToggle.setAttribute('aria-expanded', open);
      newsToggle.textContent = open ? 'Show fewer' : 'More announcements';
    });
  }

  /* ------------------------------------------------------------------
     "The Stonehaven way" video: play hides the cover and shows controls;
     the cover comes back when the video ends
     ------------------------------------------------------------------ */
  var vid = document.getElementById('way-video');

  if (vid) {
    var media = vid.querySelector('video');
    var play = vid.querySelector('.vid-play');

    play.addEventListener('click', function () {
      vid.classList.add('is-playing');
      media.controls = true;
      media.play();
      media.focus();
    });

    media.addEventListener('ended', function () {
      vid.classList.remove('is-playing');
      media.controls = false;
      media.currentTime = 0;
      play.focus();
    });
  }

  /* ------------------------------------------------------------------
     Contact form (concept only: nothing is sent)
     ------------------------------------------------------------------ */
  var form = document.getElementById('form');
  var err = document.getElementById('err');
  var sent = document.getElementById('sent');
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var name = form.elements.fname;
      var email = form.elements.femail;
      var invalid = null;
      var msg = '';

      if (!name.value.trim()) {
        invalid = name;
        msg = 'Please enter your name.';
      } else if (!EMAIL_RE.test(email.value.trim())) {
        invalid = email;
        msg = 'Please enter a valid work email address.';
      }

      // Tie the error message to the field that caused it
      [name, email].forEach(function (field) {
        if (field === invalid) {
          field.setAttribute('aria-invalid', 'true');
          field.setAttribute('aria-describedby', 'err');
        } else {
          field.removeAttribute('aria-invalid');
          field.removeAttribute('aria-describedby');
        }
      });

      err.textContent = msg;
      err.hidden = !msg;
      sent.hidden = !!msg;
      if (invalid) invalid.focus();
    });
  }
})();
