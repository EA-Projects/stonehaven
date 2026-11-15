/* ==========================================================================
   Stonehaven — custom code
   Port to Webflow: Site settings › Custom code › Footer code (before </body>).
   Everything here runs on top of native Webflow elements.
   ========================================================================== */
(function () {
  'use strict';

  /* ------------------------------------------------------------------
     Links with data-topic pre-select the inquiry type in the form
     (Webflow: add the data-topic custom attribute to the link)
     ------------------------------------------------------------------ */
  var topic = document.getElementById('f-topic');

  document.addEventListener('click', function (e) {
    var link = e.target.closest('[data-topic]');
    if (link && topic) topic.value = link.getAttribute('data-topic');
  });

  /* ------------------------------------------------------------------
     "The Stonehaven way" video: play hides the cover and shows controls;
     the cover comes back when the video ends
     ------------------------------------------------------------------ */
  var video = document.getElementById('way-video');

  if (video) {
    var media = video.querySelector('.video_media');
    var play = video.querySelector('.video_play-button');

    play.addEventListener('click', function () {
      video.classList.add('is-playing');
      media.controls = true;
      media.play();
      media.focus();
    });

    media.addEventListener('ended', function () {
      video.classList.remove('is-playing');
      media.controls = false;
      media.currentTime = 0;
      play.focus();
    });
  }

  /* ------------------------------------------------------------------
     Contact form validation
     Runs in the capture phase, before Webflow's own submit handler, and
     stops the submission when a field is invalid. The message is shown in
     the form's error block (.w-form-fail).
     ------------------------------------------------------------------ */
  var form = document.getElementById('form');
  var err = document.getElementById('err');
  var EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  if (form && err) {
    form.addEventListener('submit', function (e) {
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
      err.style.display = msg ? 'block' : '';

      if (invalid) {
        e.preventDefault();
        e.stopImmediatePropagation();
        invalid.focus();
      }
    }, true);
  }
})();
