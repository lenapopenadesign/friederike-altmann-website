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

  function atEnd(){
    return grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 1;
  }
  function atStart(){
    return grid.scrollLeft <= 0;
  }

  function scrollByCard(dir){
    var step = getStep();
    if (!step) return;
    // Wrap-around: am Ende → von vorn, am Anfang rückwärts → ans Ende
    if (dir > 0 && atEnd()){
      grid.scrollTo({left: 0, behavior: 'smooth'});
      return;
    }
    if (dir < 0 && atStart()){
      grid.scrollTo({left: grid.scrollWidth, behavior: 'smooth'});
      return;
    }
    grid.scrollBy({left: dir * step, behavior: 'smooth'});
  }

  function updateUI(){
    // Buttons bleiben jetzt immer aktiv — Wrap-around übernimmt die Logik
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
  var errorBox = modal.querySelector('.form-error');
  var submitBtn = form.querySelector('button[type="submit"]');

  function showError(msg){
    if (!errorBox) return;
    errorBox.textContent = msg;
    errorBox.style.display = 'block';
  }
  function hideError(){
    if (!errorBox) return;
    errorBox.style.display = 'none';
    errorBox.textContent = '';
  }

  form.addEventListener('submit', function(e){
    e.preventDefault();
    hideError();
    if (submitBtn){
      submitBtn.disabled = true;
      submitBtn.dataset.originalText = submitBtn.innerHTML;
      submitBtn.innerHTML = 'Wird gesendet…';
    }

    var formData = new FormData(form);

    fetch(form.action || '/contact.php', {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    })
      .then(function(r){ return r.json().then(function(data){ return {status: r.status, data: data}; }); })
      .then(function(res){
        if (res.status >= 200 && res.status < 300 && res.data.ok){
          formWrap.style.display = 'none';
          success.style.display = 'block';
          form.reset();
        } else {
          showError((res.data && res.data.error) || 'Senden fehlgeschlagen. Bitte direkt an post@friederikealtmann.de schreiben.');
        }
      })
      .catch(function(){
        showError('Verbindungsfehler. Bitte später nochmal versuchen oder direkt an post@friederikealtmann.de schreiben.');
      })
      .finally(function(){
        if (submitBtn){
          submitBtn.disabled = false;
          if (submitBtn.dataset.originalText) submitBtn.innerHTML = submitBtn.dataset.originalText;
        }
      });
  });
})();
