// Foundation video wall: a click-to-play YouTube carousel.
// Nothing is requested from YouTube until the visitor presses play, which keeps
// the page light on mobile data. Pressing play swaps the thumbnail for a
// privacy-enhanced embed and stops any film already playing.
(function(){
  "use strict";

  var root = document.querySelector('.vid-carousel');
  if(!root) return;

  var track  = root.querySelector('.vid-track');
  var slides = Array.prototype.slice.call(root.querySelectorAll('.vid-card'));
  var prev   = root.querySelector('.vid-prev');
  var next   = root.querySelector('.vid-next');
  var dots   = root.querySelector('.vid-dots');
  if(!track || !slides.length) return;

  var index = 0;

  function perView(){
    var w = window.innerWidth;
    if(w <= 680) return 1;
    if(w <= 1040) return 2;
    return 3;
  }
  function maxIndex(){ return Math.max(0, slides.length - perView()); }

  function buildDots(){
    if(!dots) return;
    dots.innerHTML = '';
    for(var i = 0; i <= maxIndex(); i++){
      (function(i){
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'vid-dot' + (i === index ? ' is-active' : '');
        b.setAttribute('aria-label', 'Show video group ' + (i + 1));
        b.addEventListener('click', function(){ go(i); });
        dots.appendChild(b);
      })(i);
    }
  }

  function render(){
    var style = window.getComputedStyle(track);
    var gap = parseFloat(style.columnGap || style.gap) || 26;
    var step = slides[0].getBoundingClientRect().width + gap;
    track.style.transform = 'translate3d(' + (-index * step) + 'px,0,0)';
    if(prev) prev.disabled = index <= 0;
    if(next) next.disabled = index >= maxIndex();
    if(dots){
      Array.prototype.forEach.call(dots.children, function(d, i){
        d.classList.toggle('is-active', i === index);
      });
    }
    slides.forEach(function(s, i){
      s.setAttribute('aria-hidden', (i >= index && i < index + perView()) ? 'false' : 'true');
    });
  }

  function go(i){
    index = Math.max(0, Math.min(i, maxIndex()));
    render();
  }

  /* Click to play: swap the still for the real player */
  function stopAll(){
    root.querySelectorAll('.vid-card.is-playing').forEach(function(card){
      var frame = card.querySelector('iframe');
      if(frame) frame.remove();
      card.classList.remove('is-playing');
      var btn = card.querySelector('.vid-thumb');
      if(btn) btn.hidden = false;
    });
  }

  slides.forEach(function(card){
    var btn = card.querySelector('.vid-thumb');
    if(!btn) return;
    btn.addEventListener('click', function(){
      var id = card.getAttribute('data-yt');
      if(!id) return;
      stopAll();
      var frame = document.createElement('iframe');
      frame.src = 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&modestbranding=1';
      frame.title = card.querySelector('h4') ? card.querySelector('h4').textContent : 'Foundation video';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
      frame.setAttribute('allowfullscreen', '');
      frame.loading = 'lazy';
      btn.hidden = true;
      card.insertBefore(frame, btn);
      card.classList.add('is-playing');
    });
  });

  if(prev) prev.addEventListener('click', function(){ go(index - 1); });
  if(next) next.addEventListener('click', function(){ go(index + 1); });

  root.addEventListener('keydown', function(e){
    if(e.key === 'ArrowLeft')  go(index - 1);
    if(e.key === 'ArrowRight') go(index + 1);
  });

  var startX = 0, delta = 0, dragging = false;
  track.addEventListener('touchstart', function(e){
    dragging = true; startX = e.touches[0].clientX; delta = 0;
  }, {passive:true});
  track.addEventListener('touchmove', function(e){
    if(dragging) delta = e.touches[0].clientX - startX;
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
