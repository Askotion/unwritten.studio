// Hero Video crossfade: static image → video.
//
// Safari startet das Video nicht ueber das autoplay-Attribut, ein expliziter
// .play()-Aufruf ist noetig. Die vorherige Fassung machte genau einen Versuch
// und verschluckte das Scheitern:
//
//     video.play().catch(function () {});
//
// Lehnt Safari in genau diesem Moment ab — Tab im Hintergrund, Seite noch
// nicht sichtbar, Stromsparmodus, Netz haengt —, bleibt der Play-Button fuer
// den Rest der Sitzung stehen, ohne jede Spur in der Konsole.
//
// Diese Fassung versucht es an jedem Punkt erneut, an dem sich die Lage
// geaendert haben kann, und schreibt den Ablehnungsgrund in die Konsole.
// Ein abgelehnter Versuch ist damit nicht mehr das Ende — und beim naechsten
// Auftreten steht dort, WARUM abgelehnt wurde, statt dass wir raten muessen.
(function () {
  'use strict';

  var video = document.getElementById('hero-video');
  if (!video) return;

  var img = document.querySelector('#hero-media img');
  var running = false;

  video.addEventListener('playing', function () {
    running = true;
    video.style.opacity = '1';
    if (img) {
      img.style.transition = 'opacity 300ms ease';
      img.style.opacity = '0';
    }
  }, { once: true });

  function attempt(trigger) {
    if (running || !video.paused) return;

    var p = video.play();
    // Aeltere Browser geben kein Promise zurueck.
    if (!p || typeof p.catch !== 'function') return;

    p.catch(function (err) {
      console.warn(
        '[hero-video] play() abgelehnt (' + trigger + '): ' +
        err.name + ' — ' + err.message +
        ' | readyState ' + video.readyState +
        ' | muted ' + video.muted
      );
    });
  }

  attempt('init');

  // Bei langsamer Verbindung kommt der erste Versuch zu frueh.
  video.addEventListener('loadeddata', function () { attempt('loadeddata'); });
  video.addEventListener('canplay', function () { attempt('canplay'); });

  // Wurde die Seite in einem Hintergrundtab geoeffnet, lehnt Safari ab, bis
  // sie sichtbar wird.
  document.addEventListener('visibilitychange', function () {
    if (!document.hidden) attempt('visible');
  });

  // Letzter Ausweg: Die erste Nutzerinteraktion hebt jede Autoplay-Sperre auf.
  ['pointerdown', 'keydown', 'touchstart'].forEach(function (evt) {
    document.addEventListener(evt, function () { attempt(evt); }, {
      once: true,
      passive: true
    });
  });

  video.addEventListener('error', function () {
    var e = video.error;
    console.warn(
      '[hero-video] Medienfehler: code ' + (e && e.code) +
      (e && e.message ? ' — ' + e.message : '')
    );
  });
}());
