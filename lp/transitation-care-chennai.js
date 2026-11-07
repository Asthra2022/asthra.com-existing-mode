'use strict';
const menuToggle=document.querySelector('#menuToggle');const mainNav=document.querySelector('#mainNav');
menuToggle.addEventListener('click',()=>{const isOpen=mainNav.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(isOpen));menuToggle.textContent=isOpen?'✕':'☰';});
mainNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mainNav.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}));
document.querySelector('#year').textContent=new Date().getFullYear();
const admission=document.querySelector('#admission');admission.min=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().split('T')[0];
const stats=document.querySelector('#stats');let counted=false;const observer=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting||counted)return;counted=true;stats.querySelectorAll('[data-count]').forEach(el=>{const target=Number(el.dataset.count);const suffix=el.dataset.suffix||'';const start=performance.now();function tick(now){const progress=Math.min((now-start)/1300,1);const ease=1-Math.pow(1-progress,3);el.textContent=Math.round(target*ease).toLocaleString('en-IN')+suffix;if(progress<1)requestAnimationFrame(tick)}requestAnimationFrame(tick)});observer.disconnect()},{threshold:.3});observer.observe(stats);
const enquiry=document.querySelector('#enquiry');const formStatus=document.querySelector('#formStatus');enquiry.addEventListener('submit',e=>{e.preventDefault();if(!enquiry.reportValidity())return;const data=new FormData(enquiry);const phone=String(data.get('phone')).replace(/\D/g,'');if(phone.length<10||phone.length>13){formStatus.textContent='Please enter a valid mobile number.';return;}const lines=['Asthra Transition Care Enquiry','Name: '+data.get('name'),'Phone: '+data.get('phone'),'Patient age: '+data.get('age'),'Condition: '+data.get('condition'),'Location: '+data.get('location'),'Expected admission: '+(data.get('admission')||'Not specified')];const message=lines.join('\n');const mailto='mailto:reachus@asthraliving.com?subject='+encodeURIComponent('New Asthra Transition Care Enquiry')+'&body='+encodeURIComponent(message);formStatus.textContent='Your email app will open with the enquiry details. Please send the email to the Asthra care team. No enquiry has been submitted yet.';window.location.href=mailto;});

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
