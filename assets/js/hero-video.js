// Hero Video crossfade: static image → video.
//
// URSACHE (ermittelt 10.08.2026): Im macOS-Energiesparmodus blockiert Safari
// jedes Video-Autoplay — auch stummes, rechnerweit, auf allen Seiten
// gleichzeitig, unabhaengig von jeder Website-Einstellung. Der Modus schaltet
// sich unterhalb von 20 % Akku selbsttaetig ein und am Netzteil wieder aus.
// Genau daher ruehrte die jahrelange Sprunghaftigkeit ("mal laeuft es, mal
// nicht") und der Umstand, dass keine Einstellung je etwas geaendert hat.
//
// Belegt durch: 766 play()-Aufrufe mit NotAllowedError auf einer nackten
// Testseite; dasselbe Verhalten mit einer Microsite-Videodatei, die sonst
// zuverlaessig laeuft; Aufloesung, Codec, Faststart, Origin und Markup damit
// ausgeschlossen. Energiesparmodus auf "Nie" gestellt -> alles laeuft sofort.
//
// Der Fall ist also nicht der Regelfall, aber ein haeufiger: Jeder Besucher
// mit schwachem Laptop-Akku sieht ihn. Deshalb muss der abgelehnte Zustand
// wuerdig aussehen — Standbild statt Play-Button — und die erste Nutzergeste
// muss das Video nachtraeglich starten koennen.
//
// Zwei Fallen, die die vorherige Fassung fuer die gesamte Sitzung lahmlegten:
//
//   1. Safari feuert 'playing', ohne dass je ein Frame laeuft — currentTime
//      bleibt auf 0.00 und unmittelbar folgt 'pause'. Ein daran gebundenes
//      running-Flag stand danach dauerhaft auf true und liess jeden weiteren
//      Versuch wirkungslos zurueckkehren.
//   2. Die Gesten-Listener waren { once: true }. Sie feuerten also genau
//      einmal, liefen wegen (1) ins Leere und meldeten sich dann ab.
//
// Ergebnis: ein Play-Button, der bis zum Reload stehen blieb. Diese Fassung
// glaubt deshalb nur der laufenden Zeit und haelt die Gesten offen, bis das
// Video tatsaechlich spielt.
(function () {
  'use strict';

  var video = document.getElementById('hero-video');
  if (!video) return;

  var img = document.querySelector('#hero-media img');
  var revealed = false;
  var attempts = 0;
  var MAX_ATTEMPTS = 25;

  // Einzige verlaessliche Wahrheit. 'playing' luegt, currentTime nicht.
  function isRunning() {
    return !video.paused && !video.ended && video.currentTime > 0;
  }

  // Erst wenn wirklich Bilder laufen, wird ueberblendet. Bleibt das Video
  // stumm stehen, liegt weiterhin das Standbild oben — statt eines
  // eingeblendeten Videos mit Safaris nativem Play-Button darauf.
  function reveal() {
    if (revealed) return;
    revealed = true;
    video.style.opacity = '1';
    if (img) {
      img.style.transition = 'opacity 300ms ease';
      img.style.opacity = '0';
    }
    // Ab hier laeuft es nachweislich — die Gesten werden nicht mehr gebraucht.
    // Hier abmelden und nicht direkt nach attempt(): play() ist asynchron, dort
    // stuende isRunning() noch auf false.
    stopListeningForGestures();
  }

  video.addEventListener('timeupdate', function () {
    if (video.currentTime > 0) reveal();
  });

  // Die Obergrenze bremst nur die automatischen Versuche. Eine Nutzergeste ist
  // genau das, was die Sperre aufhebt — sie darf nie ins Limit laufen. Ein
  // einzelner Klick feuert mehrere Events (pointerdown, click, …), sonst waere
  // das Kontingent nach wenigen Klicks aufgebraucht und das Video endgueltig
  // tot, obwohl der Nutzer alles richtig macht.
  function attempt(trigger, byGesture) {
    if (isRunning()) return;
    if (!byGesture && attempts >= MAX_ATTEMPTS) return;
    attempts++;

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

  // Rettungsanker im Energiesparmodus: Die erste Nutzerinteraktion hebt die
  // Sperre auf.
  //
  // Nur "activation triggering input events" im Sinne der HTML-Spezifikation
  // schalten frei — Klick, Maustaste, Tastendruck, Touch-Ende. Mausbewegung,
  // Scrollen und wheel erzeugen KEINE Nutzeraktivierung und sind hier bewusst
  // nicht gelistet: sie wuerden nur Versuche verbrauchen, ohne je zu wirken.
  //
  // Bewusst ohne { once: true } — eine einzelne Geste kann zu frueh kommen
  // (Video noch nicht geladen) und darf die Chance nicht verbrauchen.
  var gestures = ['pointerdown', 'pointerup', 'mousedown', 'keydown', 'touchend', 'click'];

  function onGesture(evt) {
    attempt(evt.type, true);
  }

  function stopListeningForGestures() {
    gestures.forEach(function (g) {
      document.removeEventListener(g, onGesture);
    });
  }

  gestures.forEach(function (g) {
    document.addEventListener(g, onGesture, { passive: true });
  });

  video.addEventListener('error', function () {
    var e = video.error;
    console.warn(
      '[hero-video] Medienfehler: code ' + (e && e.code) +
      (e && e.message ? ' — ' + e.message : '')
    );
  });
}());
