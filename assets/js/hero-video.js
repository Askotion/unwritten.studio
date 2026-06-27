// Hero Video crossfade: static image → video.
// Definitive Safari fix: call .play() manually from JS instead of relying on
// the autoplay attribute — works reliably on both desktop and iOS Safari.
(function () {
  'use strict';

  var video = document.getElementById('hero-video');
  if (!video) return;

  var img = document.querySelector('#hero-media img');

  video.addEventListener('playing', function () {
    video.style.opacity = '1';
    if (img) {
      img.style.transition = 'opacity 300ms ease';
      img.style.opacity = '0';
    }
  }, { once: true });

  // Safari autoplay fix — autoplay attribute is unreliable in Safari;
  // an explicit .play() call from JS is the only dependable trigger.
  video.play().catch(function () {});
}());
