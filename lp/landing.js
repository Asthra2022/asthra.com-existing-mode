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
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = `Hello Asthra, I would like a callback.\nName: ${data.get('name').trim()}\nPhone: ${data.get('phone').trim()}\nPreferred location: ${data.get('location')}\n${data.get('message').trim()}`;
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
document.querySelector('#year').textContent = new Date().getFullYear();
