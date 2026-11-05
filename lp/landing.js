'use strict';
// const toggle = document.querySelector('.menu-toggle');
// const navigation = document.querySelector('#navigation');
// toggle.addEventListener('click', () => {
//   const open = toggle.getAttribute('aria-expanded') !== 'true';
//   toggle.setAttribute('aria-expanded', String(open));
//   navigation.classList.toggle('open', open);
// });
// navigation.addEventListener('click', event => {
//   if (event.target.closest('a')) {
//     toggle.setAttribute('aria-expanded', 'false');
//     navigation.classList.remove('open');
//   }
// });
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
  const gallery = document.querySelector(".palliative-gallery-grid");
  if (!gallery) return;

  const tiles = [...gallery.querySelectorAll(".gallery-tile")];
  const images = tiles.map(tile => ({
    src: tile.querySelector("img")?.src,
    alt: tile.querySelector("img")?.alt || "",
    caption: tile.querySelector("figcaption")?.textContent || ""
  })).filter(item => item.src);

  if (!images.length) return;

  const lightbox = document.createElement("div");
  lightbox.className = "asthra-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", "Image gallery");
  lightbox.innerHTML = `
    <button class="asthra-lightbox-btn asthra-lightbox-close"
      aria-label="Close gallery">&times;</button>
    <button class="asthra-lightbox-btn asthra-lightbox-zoom"
      aria-label="Zoom image">+</button>
    <button class="asthra-lightbox-btn asthra-lightbox-prev"
      aria-label="Previous image">&#10094;</button>
    <img class="asthra-lightbox-image" alt="">
    <button class="asthra-lightbox-btn asthra-lightbox-next"
      aria-label="Next image">&#10095;</button>
    <div class="asthra-lightbox-caption" aria-live="polite"></div>
  `;
  document.body.appendChild(lightbox);

  const image = lightbox.querySelector(".asthra-lightbox-image");
  const caption = lightbox.querySelector(".asthra-lightbox-caption");
  const zoomBtn = lightbox.querySelector(".asthra-lightbox-zoom");
  const closeBtn = lightbox.querySelector(".asthra-lightbox-close");

  let currentIndex = 0;
  let isZoomed = false;
  let touchStartX = 0;
  let touchStartY = 0;
  let previousFocus = null;
  let previousOverflow = "";

  function resetZoom() {
    isZoomed = false;
    image.classList.remove("zoomed");
    zoomBtn.textContent = "+";
    zoomBtn.setAttribute("aria-label", "Zoom in");
  }

  function showImage(index) {
    currentIndex = (index + images.length) % images.length;
    resetZoom();

    const item = images[currentIndex];
    image.src = item.src;
    image.alt = item.alt;
    caption.textContent =
      `${item.caption} (${currentIndex + 1} / ${images.length})`;
  }

  function openGallery(index) {
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    showImage(index);
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    closeBtn.focus();
  }

  function closeGallery() {
    lightbox.classList.remove("active");
    document.body.style.overflow = previousOverflow;
    resetZoom();
    previousFocus?.focus();
  }

  function nextImage() {
    showImage(currentIndex + 1);
  }

  function previousImage() {
    showImage(currentIndex - 1);
  }

  // function toggleZoom() {
  //   isZoomed = !isZoomed;
  //   image.classList.toggle("zoomed", isZoomed);
  //   zoomBtn.textContent = isZoomed ? "−" : "+";
  //   zoomBtn.setAttribute(
  //     "aria-label",
  //     isZoomed ? "Zoom out" : "Zoom in"
  //   );
  // }

  tiles.forEach((tile, index) => {
    tile.style.cursor = "pointer";
    tile.setAttribute("tabindex", "0");
    tile.setAttribute("role", "button");
    tile.setAttribute("aria-label", "Enlarge gallery image");

    tile.addEventListener("click", () => openGallery(index));

    tile.addEventListener("keydown", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openGallery(index);
      }
    });
  });

  closeBtn.addEventListener("click", closeGallery);
  // zoomBtn.addEventListener("click", toggleZoom);
  // image.addEventListener("click", toggleZoom);

  lightbox.querySelector(".asthra-lightbox-next")
    .addEventListener("click", nextImage);

  lightbox.querySelector(".asthra-lightbox-prev")
    .addEventListener("click", previousImage);

  lightbox.addEventListener("click", e => {
    if (e.target === lightbox) closeGallery();
  });

  document.addEventListener("keydown", e => {
    if (!lightbox.classList.contains("active")) return;

    if (e.key === "Escape") closeGallery();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") previousImage();

    // Keep keyboard focus inside the modal.
    if (e.key === "Tab") {
      const controls = [...lightbox.querySelectorAll("button")];
      const first = controls[0];
      const last = controls[controls.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // Mobile swipe navigation
  lightbox.addEventListener("touchstart", e => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  lightbox.addEventListener("touchend", e => {
    if (isZoomed) return;

    const diffX = e.changedTouches[0].screenX - touchStartX;
    const diffY = e.changedTouches[0].screenY - touchStartY;

    if (Math.abs(diffX) > 50 &&
        Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX < 0) nextImage();
      else previousImage();
    }
  }, { passive: true });
});


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
// document.querySelector('#callback').addEventListener('submit', event => {
//   event.preventDefault();
//   const form = event.currentTarget;
//   const phone = form.elements.phone;
//   phone.setCustomValidity(phone.value.replace(/\D/g, '').length < 7 ? 'Please enter a phone number with at least 7 digits.' : '');
//   if (!form.reportValidity()) return;
//   const data = new FormData(form);
//   const message = `Hello Asthra, I would like a callback.\nName: ${data.get('name').trim()}\nPhone: ${data.get('phone').trim()}\nPreferred location: ${data.get('location')}\nCare required: ${data.get('care')}\n${data.get('message').trim()}`;
//   const url = `https://wa.me/919566076720?text=${encodeURIComponent(message)}`;
//   const status = form.querySelector('.form-status');
//   status.replaceChildren();
//   const link = document.createElement('a');
//   link.href = url;
//   link.target = '_blank';
//   link.rel = 'noopener noreferrer';
//   link.textContent = 'Continue to WhatsApp to send your callback request ↗';
//   status.append(link);
//   link.focus();
// });
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
