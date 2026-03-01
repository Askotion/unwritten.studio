// Hero Video crossfade: static image → video.
// Video is declared in HTML with <source> so browsers (incl. Safari) can autoplay
// it from the initial parse. Starts opacity:0 so the static image shows first.
// When video begins playing, crossfade to video and hide the image.
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
}());
