/* Auroraflow — shared client-side enhancements */
(function () {
  /* Inject decorative sparkles into every .page-hero (subpage header).
     Honors prefers-reduced-motion. */
  function addSparkles() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    document.querySelectorAll('.page-hero').forEach((hero) => {
      if (hero.querySelector('.hero-sparkles')) return;
      const layer = document.createElement('div');
      layer.className = 'hero-sparkles';
      layer.setAttribute('aria-hidden', 'true');

      /* Hand-tuned positions (top%, left%, size px, delay s, twinkle s) — avoids the
         center where the headline sits, clusters around the eyebrow + edges.
         Twinkle durations vary so sparkles never blink in unison. */
      const POSITIONS = [
        [22, 14,  14, 0.55, 2.4],
        [34, 23,   8, 1.10, 3.1],
        [18, 78,  16, 0.70, 2.7],
        [42, 88,  10, 1.25, 3.6],
        [62, 12,  11, 1.40, 2.2],
        [70, 80,  13, 0.95, 2.9],
        [82, 30,   9, 1.55, 3.3],
        [78, 62,  12, 1.20, 2.5],
        [12, 48,   7, 1.65, 3.8],
        [55, 50,   6, 1.85, 2.1]
      ];

      POSITIONS.forEach(([top, left, size, delay, twinkle]) => {
        const s = document.createElement('span');
        s.className = 'hero-sparkle';
        s.style.top    = top  + '%';
        s.style.left   = left + '%';
        s.style.width  = size + 'px';
        s.style.height = size + 'px';
        s.style.setProperty('--delay', delay + 's');
        s.style.setProperty('--twinkle', twinkle + 's');
        layer.appendChild(s);
      });

      /* layer should sit above the gradient/vignette but below the text */
      hero.insertBefore(layer, hero.querySelector('.page-hero-content'));
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addSparkles);
  } else {
    addSparkles();
  }
})();
