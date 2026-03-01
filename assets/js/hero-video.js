// Hero Video crossfade: static image → video.
// Desktop Safari is excluded: autoplay is unreliable there and shows a native
// play button. Video element is removed before Safari can render its media UI.
// iOS Safari works fine (muted autoplay with playsinline is supported).
(function () {
  'use strict';

  var video = document.getElementById('hero-video');
  if (!video) return;

  // Detect desktop Safari (excludes Chrome/Brave which also contain "Safari" in UA)
  var ua = navigator.userAgent;
  var isSafari = /^((?!chrome|android).)*safari/i.test(ua);
  var isIOS = /iPhone|iPad|iPod/i.test(ua);

  if (isSafari && !isIOS) {
    // Remove video — static hero image stays, no play button appears
    video.parentNode.removeChild(video);
    return;
  }

  var img = document.querySelector('#hero-media img');

  video.addEventListener('playing', function () {
    video.style.opacity = '1';
    if (img) {
      img.style.transition = 'opacity 300ms ease';
      img.style.opacity = '0';
    }
  }, { once: true });
}());
