'use strict';
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  navigation.classList.toggle('open', open);
});
navigation.addEventListener('click', event => {
  if (event.target.closest('a')) {
    toggle.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  }
});
document.querySelectorAll('[data-location]').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('select[name="location"]').value = link.dataset.location;
  });
});
 const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  document.querySelectorAll(".facility-photos img").forEach((img) => {
    img.addEventListener("click", () => {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt;
      lightbox.showModal();
    });
  });

  // Close when clicking the backdrop, the image, or the × button
  lightbox.addEventListener("click", () => lightbox.close());

document.addEventListener("DOMContentLoaded", function () {
  const section = document.querySelector(".trust-strip");
  if (!section) return;

  const counters = section.querySelectorAll(".counter");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        const duration = 2000;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const progress = Math.min(
            (currentTime - startTime) / duration,
            1
          );

          const easeOut = 1 - Math.pow(1 - progress, 3);
          const value = Math.floor(target * easeOut);

          counter.textContent = value.toLocaleString("en-IN");

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          } else {
            counter.textContent = target.toLocaleString("en-IN");
          }
        }

        requestAnimationFrame(updateCounter);
      });

      observer.unobserve(section);
    });
  }, {
    threshold: 0.3
  });

  observer.observe(section);
});
  function initHeroSliders() {
    document.querySelectorAll(".hero-carousel").forEach((carousel) => {
      const slides = [...carousel.querySelectorAll(".hero-slide")];
      const dots = [...carousel.querySelectorAll(".hero-carousel-dots button")];

      if (slides.length < 2) return;

      let current = 0;
      let timer;

      function showSlide(index) {
        current = (index + slides.length) % slides.length;

        slides.forEach((slide, i) => {
          const active = i === current;
          slide.classList.toggle("is-active", active);
          slide.setAttribute("aria-hidden", String(!active));
        });

        dots.forEach((dot, i) => {
          const active = i === current;
          dot.classList.toggle("is-active", active);

          if (active) {
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        });
      }

      function startAutoSlide() {
        clearInterval(timer);
        timer = setInterval(() => {
          showSlide(current + 1);
        }, 4000);
      }

      dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
          showSlide(index);
          startAutoSlide();
        });
      });

      showSlide(0);
      startAutoSlide();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initHeroSliders, {
      once: true
    });
  } else {
    initHeroSliders();
  }
const form = document.querySelector('#callback');

// Clear any custom phone error as the user edits
form.elements.phone.addEventListener('input', e => e.target.setCustomValidity(''));

form.addEventListener('submit', event => {
  event.preventDefault();

  const phone = form.elements.phone;
  phone.setCustomValidity(
    phone.value.replace(/\D/g, '').length < 7
      ? 'Please enter a phone number with at least 7 digits.'
      : ''
  );
  if (!form.reportValidity()) return;

  const data = new FormData(form);
  const message =
    `Hello Asthra, I would like a callback.\n` +
    `Name: ${data.get('name').trim()}\n` +
    `Phone: ${data.get('phone').trim()}\n` +
    `Preferred location: ${data.get('location')}\n` +
    `Care required: ${data.get('care')}\n` +
    `Additional Info: ${data.get('message').trim()}`;

  const url = `https://wa.me/919566076720?text=${encodeURIComponent(message)}`;

  // Open WhatsApp directly
  window.open(url, '_blank');

  form.reset();
});
const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

document.querySelector('[name="phone"]').addEventListener('input', event => event.target.setCustomValidity(''));
document.querySelectorAll('[data-enquiry]').forEach(link => {
  link.addEventListener('click', () => { document.querySelector('[name="message"]').value = link.dataset.enquiry; });
});

const videoDialog = document.querySelector('.video-dialog');
const videoPlayer = document.querySelector('.video-player');
document.querySelectorAll('[data-video]').forEach(button => {
  button.addEventListener('click', () => {
    const id = button.dataset.video;
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1`;
    iframe.title = 'Asthra family video testimonial';
    iframe.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
    iframe.allowFullscreen = true;
    iframe.referrerPolicy = 'strict-origin-when-cross-origin';
    videoPlayer.replaceChildren(iframe);
    videoDialog.querySelector('.video-external').href = `https://www.youtube.com/watch?v=${id}`;
    videoDialog.showModal();
  });
});
videoDialog.querySelector('.video-close').addEventListener('click', () => videoDialog.close());
videoDialog.addEventListener('close', () => videoPlayer.replaceChildren());
videoDialog.addEventListener('click', event => { if (event.target === videoDialog) {
  const bounds = videoDialog.getBoundingClientRect();
  if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) videoDialog.close();
} });
document.querySelectorAll('img[data-fallback]').forEach(img => {
  const useFallback = () => { if (img.dataset.fallback) {
    const fallback = img.dataset.fallback;
    delete img.dataset.fallback;
    img.src = fallback;
  } };
  img.addEventListener('error', useFallback);
  if (img.complete && !img.naturalWidth) useFallback();
});

document.querySelectorAll('.review-expand').forEach(button => {
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    button.closest('.review-card').classList.toggle('expanded', expanded);
    button.replaceChildren(document.createTextNode(expanded ? 'Show less ' : 'Read full review '));
    const icon = document.createElement('span');
    icon.setAttribute('aria-hidden', 'true');
    icon.textContent = expanded ? '−' : '＋';
    button.append(icon);
  });
});

/* Scroll-reveal + header shadow (progressive enhancement) */
(() => {
  const header = document.querySelector('.header');
  const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
  if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const targets = document.querySelectorAll('.section-heading, .service-card, .location-card, .routine-grid > div, .steps-grid > div, .family-video, .review-card, .faq details, .orange-card, .plan-details, .callback, .intro-photo, .facility-photos, .arched-photo');
  document.documentElement.classList.add('js');
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  targets.forEach((el, i) => { el.classList.add('reveal'); el.style.setProperty('--d', (i % 4) * 70 + 'ms'); io.observe(el); });
})();
