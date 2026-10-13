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
document.querySelector('#callback').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const phone = form.elements.phone;
  phone.setCustomValidity(phone.value.replace(/\D/g, '').length < 7 ? 'Please enter a phone number with at least 7 digits.' : '');
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = `Hello Asthra, I would like a callback.\nName: ${data.get('name').trim()}\nPhone: ${data.get('phone').trim()}\nPreferred location: ${data.get('location')}\nCare required: ${data.get('care')}\n${data.get('message').trim()}`;
  const url = `https://wa.me/919566076720?text=${encodeURIComponent(message)}`;
  const status = form.querySelector('.form-status');
  status.replaceChildren();
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = 'Continue to WhatsApp to send your callback request ↗';
  status.append(link);
  link.focus();
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
