/* ---------- Mobile Burger Nav ---------- */
(function(){
  var burger = document.querySelector('.burger');
  var mobileNav = document.querySelector('.mobile-nav');
  if (!burger || !mobileNav) return;

  function setOpen(open){
    burger.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    mobileNav.classList.toggle('is-open', open);
    mobileNav.setAttribute('aria-hidden', open ? 'false' : 'true');
    document.body.style.overflow = open ? 'hidden' : '';
  }

  // Globaler Helfer, damit das Modal-IIFE das Panel zumachen kann
  window.__closeMobileNav = function(){ setOpen(false); };

  burger.addEventListener('click', function(){
    setOpen(!burger.classList.contains('is-open'));
  });
  mobileNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      // Modal-Trigger werden vom Modal-Handler geschlossen — hier nicht doppelt
      if (a.hasAttribute('data-open-modal')) return;
      setOpen(false);
    });
  });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && burger.classList.contains('is-open')) setOpen(false);
  });
})();

/* ---------- Contact Modal ---------- */
(function(){
  var modal = document.getElementById('contact-modal');
  if (!modal) return;
  var form = document.getElementById('contact-form');
  var formWrap = modal.querySelector('.modal-form-wrap');
  var success = modal.querySelector('.form-success');
  var typeSelect = modal.querySelector('select[name=type]');

  function openModal(prefillType){
    // Mobile-Nav schließen, falls offen
    if (typeof window.__closeMobileNav === 'function') window.__closeMobileNav();
    if (prefillType && typeSelect) typeSelect.value = prefillType;
    formWrap.style.display = '';
    success.style.display = 'none';
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    setTimeout(function(){ modal.querySelector('input').focus(); }, 80);
  }
  function closeModal(){
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  // Event-Delegation: catched auch Klicks auf Kindelemente (z.B. <span>)
  document.addEventListener('click', function(e){
    var trigger = e.target.closest('[data-open-modal]');
    if (!trigger) return;
    e.preventDefault();
    openModal(trigger.getAttribute('data-open-modal'));
  });
  modal.querySelector('.modal-close').addEventListener('click', closeModal);
  modal.addEventListener('click', function(e){ if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', function(e){
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
  });
  form.addEventListener('submit', function(e){
    e.preventDefault();
    formWrap.style.display = 'none';
    success.style.display = 'block';
  });
})();
