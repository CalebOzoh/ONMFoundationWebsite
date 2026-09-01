// The Resilient Woman Conference countdown, speaker carousel and page interactions
(function(){
  "use strict";

  /* Countdown to 31 October 2026, 09:00 WAT (UTC+1) */
  var target = new Date('2026-10-31T09:00:00+01:00').getTime();
  var els = {
    d: document.getElementById('cdDays'),
    h: document.getElementById('cdHours'),
    m: document.getElementById('cdMinutes'),
    s: document.getElementById('cdSeconds')
  };
  var liveRegion = document.getElementById('cdLive');

  function pad(n){ return n < 10 ? '0'+n : ''+n; }

  function tick(){
    var now = Date.now();
    var diff = target - now;
    if(diff <= 0){
      if(els.d){ els.d.textContent = '00'; els.h.textContent='00'; els.m.textContent='00'; els.s.textContent='00'; }
      if(liveRegion) liveRegion.textContent = 'The Resilient Woman Conference is happening now.';
      return;
    }
    var days = Math.floor(diff / (1000*60*60*24));
    var hours = Math.floor((diff / (1000*60*60)) % 24);
    var mins = Math.floor((diff / (1000*60)) % 60);
    var secs = Math.floor((diff / 1000) % 60);
    if(els.d) els.d.textContent = pad(days);
    if(els.h) els.h.textContent = pad(hours);
    if(els.m) els.m.textContent = pad(mins);
    if(els.s) els.s.textContent = pad(secs);
    if(liveRegion) liveRegion.textContent = days + ' days until The Resilient Woman Conference';
  }
  if(els.d){ tick(); setInterval(tick, 1000); }

  /* ============ SPEAKER CAROUSEL ============ */
  (function speakerCarousel(){
    var root = document.querySelector('.spk-carousel');
    if(!root) return;
    var track = root.querySelector('.spk-track');
    var slides = Array.prototype.slice.call(root.querySelectorAll('.speaker'));
    var prev = root.querySelector('.spk-prev');
    var next = root.querySelector('.spk-next');
    var dotsWrap = root.querySelector('.spk-dots');
    if(!track || !slides.length) return;

    var index = 0;

    function perView(){
      var w = window.innerWidth;
      if(w <= 680) return 1;
      if(w <= 1000) return 2;
      return 3;
    }
    function maxIndex(){ return Math.max(0, slides.length - perView()); }

    function buildDots(){
      if(!dotsWrap) return;
      dotsWrap.innerHTML = '';
      for(var i = 0; i <= maxIndex(); i++){
        (function(i){
          var b = document.createElement('button');
          b.className = 'spk-dot' + (i === index ? ' is-active' : '');
          b.setAttribute('aria-label', 'Show speaker group ' + (i+1));
          b.addEventListener('click', function(){ go(i); });
          dotsWrap.appendChild(b);
        })(i);
      }
    }

    function render(){
      var slide = slides[0];
      var style = window.getComputedStyle(track);
      var gap = parseFloat(style.columnGap || style.gap) || 26;
      var step = slide.getBoundingClientRect().width + gap;
      track.style.transform = 'translate3d(' + (-index * step) + 'px,0,0)';
      if(prev) prev.disabled = index <= 0;
      if(next) next.disabled = index >= maxIndex();
      if(dotsWrap){
        Array.prototype.forEach.call(dotsWrap.children, function(d, i){
          d.classList.toggle('is-active', i === index);
        });
      }
      slides.forEach(function(s, i){
        var visible = i >= index && i < index + perView();
        s.setAttribute('aria-hidden', visible ? 'false' : 'true');
      });
    }

    function go(i){
      index = Math.max(0, Math.min(i, maxIndex()));
      render();
    }

    if(prev) prev.addEventListener('click', function(){ go(index - 1); });
    if(next) next.addEventListener('click', function(){ go(index + 1); });

    /* Keyboard support */
    root.addEventListener('keydown', function(e){
      if(e.key === 'ArrowLeft') go(index - 1);
      if(e.key === 'ArrowRight') go(index + 1);
    });

    /* Touch swipe */
    var startX = 0, delta = 0, dragging = false;
    track.addEventListener('touchstart', function(e){
      dragging = true; startX = e.touches[0].clientX; delta = 0;
    }, {passive:true});
    track.addEventListener('touchmove', function(e){
      if(!dragging) return;
      delta = e.touches[0].clientX - startX;
    }, {passive:true});
    track.addEventListener('touchend', function(){
      if(!dragging) return;
      dragging = false;
      if(Math.abs(delta) > 50) go(delta < 0 ? index + 1 : index - 1);
    });

    var resizeTimer;
    window.addEventListener('resize', function(){
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function(){
        index = Math.min(index, maxIndex());
        buildDots();
        render();
      }, 150);
    });

    buildDots();
    render();
    window.addEventListener('load', render);
  })();

  /* Registration tier tabs */
  var tabs = document.querySelectorAll('.reg-tab');
  var panels = document.querySelectorAll('.reg-panel');
  tabs.forEach(function(tab){
    tab.addEventListener('click', function(){
      tabs.forEach(function(t){ t.classList.remove('is-active'); t.setAttribute('aria-selected','false'); });
      panels.forEach(function(p){ p.classList.remove('is-active'); });
      tab.classList.add('is-active');
      tab.setAttribute('aria-selected','true');
      document.getElementById(tab.getAttribute('aria-controls')).classList.add('is-active');
    });
  });

  /* Jump straight to a tier's registration panel via ticket buttons */
  document.querySelectorAll('[data-reg-target]').forEach(function(btn){
    btn.addEventListener('click', function(){
      var id = btn.getAttribute('data-reg-target');
      var tab = document.querySelector('.reg-tab[aria-controls="'+id+'"]');
      if(tab) tab.click();
    });
  });

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function(item){
    var q = item.querySelector('.faq-q');
    var a = item.querySelector('.faq-a');
    q.addEventListener('click', function(){
      var isOpen = item.classList.contains('is-open');
      document.querySelectorAll('.faq-item').forEach(function(i){
        i.classList.remove('is-open');
        i.querySelector('.faq-a').style.maxHeight = null;
        i.querySelector('.faq-q').setAttribute('aria-expanded','false');
      });
      if(!isOpen){
        item.classList.add('is-open');
        a.style.maxHeight = a.scrollHeight + 'px';
        q.setAttribute('aria-expanded','true');
      }
    });
  });

  /* Speaker bio expand */
  document.querySelectorAll('.speaker-toggle').forEach(function(btn){
    btn.addEventListener('click', function(){
      var bio = btn.previousElementSibling;
      var expanded = bio.classList.toggle('clamped') === false;
      btn.textContent = expanded ? 'Read less' : 'Read full bio';
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  });

  /* Registration forms static confirmation */
  document.querySelectorAll('form[data-rw-form]').forEach(function(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      var note = form.querySelector('.form-note');
      if(note){
        note.textContent = 'Thank you for registering. Use the payment button above to complete your ticket purchase, and a confirmation will follow by email or WhatsApp.';
        note.style.color = '#FC3665';
      }
      form.reset();
    });
  });

})();
