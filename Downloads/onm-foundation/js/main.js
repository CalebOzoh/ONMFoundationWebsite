// Obiianuju-Nnenna Media Foundation shared site behaviour
(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Header scroll state */
  var header = document.querySelector('.site-header');
  function onScroll(){
    if(!header) return;
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  }
  document.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if(toggle && nav){
    toggle.addEventListener('click', function(){
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded','false');
        document.body.style.overflow = '';
      });
    });
  }

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window && !reduceMotion){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in'); });
  }

  /* Hero title line reveal */
  var heroTitle = document.querySelector('.hero-title');
  if(heroTitle){ requestAnimationFrame(function(){ heroTitle.classList.add('in-view'); }); }

  /* Hero depth motion lives in js/ambient-bg.js (canvas-based) */

  /* Animated counters */
  function animateCounter(el){
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1800, start = null;
    function step(ts){
      if(!start) start = ts;
      var p = Math.min((ts-start)/dur, 1);
      var eased = 1 - Math.pow(1-p, 3);
      var val = Math.floor(eased * target);
      el.textContent = val.toLocaleString() + suffix;
      if(p < 1) requestAnimationFrame(step);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll('[data-count]');
  if(counters.length){
    if('IntersectionObserver' in window){
      var cio = new IntersectionObserver(function(entries){
        entries.forEach(function(entry){
          if(entry.isIntersecting){
            animateCounter(entry.target);
            cio.unobserve(entry.target);
          }
        });
      }, {threshold:.5});
      counters.forEach(function(el){ cio.observe(el); });
    } else {
      counters.forEach(animateCounter);
    }
  }

  /* Welcome modal Resilient Woman Conference promo (session-based, non-intrusive) */
  var modal = document.getElementById('welcomeModal');
  if(modal){
    var shown = sessionStorage.getItem('onm_rw_modal_shown');
    if(!shown){
      setTimeout(function(){
        modal.classList.add('is-open');
        modal.removeAttribute('inert');
        var closeBtn = modal.querySelector('.modal-close');
        if(closeBtn) closeBtn.focus();
      }, 1200);
      sessionStorage.setItem('onm_rw_modal_shown', '1');
    } else {
      modal.setAttribute('inert','');
    }
    function closeModal(){
      modal.classList.remove('is-open');
      modal.setAttribute('inert','');
    }
    modal.querySelectorAll('[data-close-modal]').forEach(function(btn){
      btn.addEventListener('click', closeModal);
    });
    modal.addEventListener('click', function(e){ if(e.target === modal) closeModal(); });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
    });
  }

  /* Newsletter form placeholder submit feedback */
  document.querySelectorAll('.news-form').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var btn = form.querySelector('button');
      var original = btn.textContent;
      btn.textContent = 'Subscribed ✓';
      form.querySelector('input').value = '';
      setTimeout(function(){ btn.textContent = original; }, 2600);
    });
  });

  /* Generic form success placeholder (volunteer/partner/contact) */
  document.querySelectorAll('form[data-static-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if(note){ note.textContent = 'Thank you. Your submission has been received and our team will be in touch shortly.'; note.style.color = '#FC3665'; }
      form.reset();
    });
  });

})();
