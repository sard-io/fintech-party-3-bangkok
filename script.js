(() => {
  'use strict';
  const header = document.getElementById('site-header');
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const video = document.getElementById('pool-video');
  const launch = document.getElementById('video-launch');
  const videoError = document.getElementById('video-error');
  launch.hidden = false;
  launch.addEventListener('click', async () => {
    videoError.hidden = true;
    try { await video.play(); }
    catch { videoError.hidden = false; launch.hidden = false; }
  });
  video.addEventListener('play', () => { launch.hidden = true; });
  video.addEventListener('ended', () => { launch.hidden = false; });
  video.addEventListener('error', () => { videoError.hidden = false; launch.hidden = true; });

  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); }
      });
    }, { threshold: .09 });
    document.documentElement.classList.add('reveal-ready');
    document.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element));
  }
})();
