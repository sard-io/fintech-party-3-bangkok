(() => {
  'use strict';
  const header = document.getElementById('site-header');
  const updateHeader = () => header.classList.toggle('is-scrolled', window.scrollY > 24);
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const videos = [...document.querySelectorAll('.video-frame video')];
  videos.forEach((video) => {
    const frame = video.closest('.video-frame');
    const videoError = frame.parentElement.querySelector('.video-error');
    video.addEventListener('play', () => {
      videoError.hidden = true;
      videos.forEach((other) => { if (other !== video) other.pause(); });
    });
    video.addEventListener('error', () => { videoError.hidden = false; });
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
