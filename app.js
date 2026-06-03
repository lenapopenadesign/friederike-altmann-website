/* ---------- Testimonial Slider · aktiv ab >3 Einträgen ---------- */
(function(){
  var SLIDER_THRESHOLD = 3; // Slider aktiviert sich, wenn mehr Einträge da sind
  var grid = document.querySelector('.testimonial-grid');
  if (!grid || grid.children.length <= SLIDER_THRESHOLD) return;

  grid.classList.add('is-slider');

  // Arrows liegen jetzt neben dem Grid im .testimonial-slider-wrap
  var wrap = grid.parentElement;
  var prev = wrap.querySelector('.testimonial-nav-btn.prev');
  var next = wrap.querySelector('.testimonial-nav-btn.next');
  // Counter sitzt in der Testimonials-Head (separat vom slider-wrap)
  var section = grid.closest('section');
  var counter = section && section.querySelector('.testimonial-counter');
  var total = grid.children.length;

  if (prev) prev.hidden = false;
  if (next) next.hidden = false;
  if (counter) counter.hidden = false;

  function getStep(){
    var card = grid.querySelector('.testimonial');
    return card ? card.offsetWidth + 22 : 0;
  }

  function scrollByCard(dir){
    var step = getStep();
    if (!step) return;
    grid.scrollBy({left: dir * step, behavior: 'smooth'});
  }

  function updateUI(){
    if (prev && next){
      prev.disabled = grid.scrollLeft <= 0;
      next.disabled = grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;
    }
    if (counter){
      var step = getStep();
      var idx = step ? Math.round(grid.scrollLeft / step) + 1 : 1;
      counter.textContent = idx + ' / ' + total;
    }
  }

  if (prev) prev.addEventListener('click', function(){ scrollByCard(-1); });
  if (next) next.addEventListener('click', function(){ scrollByCard(1); });
  grid.addEventListener('scroll', updateUI, {passive:true});
  window.addEventListener('resize', updateUI);
  updateUI();
})();

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
