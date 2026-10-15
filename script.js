(() => {
  'use strict';
  const header = document.getElementById('site-header');
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const videos = [...document.querySelectorAll('.video-frame video')];
  videos.forEach((video) => {
    const frame = video.closest('.video-frame');
    const launch = frame.querySelector('.video-launch');
    const videoError = frame.parentElement.querySelector('.video-error');
    launch.hidden = false;
    launch.addEventListener('click', async () => {
      videoError.hidden = true;
      try { await video.play(); }
      catch { videoError.hidden = false; launch.hidden = false; }
    });
    video.addEventListener('play', () => {
      launch.hidden = true;
      videoError.hidden = true;
      videos.forEach((other) => { if (other !== video) other.pause(); });
    });
    video.addEventListener('ended', () => { launch.hidden = false; });
    video.addEventListener('error', () => { videoError.hidden = false; launch.hidden = true; });
  });

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
