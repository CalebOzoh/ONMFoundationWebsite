/* =========================================================
   OBIIANUJU-NNENNA MEDIA FOUNDATION AMBIENT MOTION FIELD
   A lightweight, dependency-free canvas backdrop: soft drifting
   colour fields plus a parallax dust layer. Runs on one shared
   requestAnimationFrame loop, pauses off-screen and on hidden
   tabs, and falls back to a single still frame when the visitor
   prefers reduced motion.
   ========================================================= */
(function(){
  "use strict";

  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  var THEMES = {
    navy: {
      base: null,
      blobs: ['rgba(252,54,101,.30)', 'rgba(244,183,58,.22)', 'rgba(255,255,255,.06)'],
      dust: 'rgba(255,255,255,.55)'
    },
    pink: {
      base: null,
      blobs: ['rgba(255,255,255,.30)', 'rgba(244,183,58,.34)', 'rgba(4,26,54,.14)'],
      dust: 'rgba(255,255,255,.75)'
    },
    cream: {
      base: null,
      blobs: ['rgba(252,54,101,.10)', 'rgba(244,183,58,.14)', 'rgba(4,26,54,.05)'],
      dust: 'rgba(4,26,54,.28)'
    }
  };

  var pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
  window.addEventListener('pointermove', function(e){
    pointer.tx = e.clientX / window.innerWidth;
    pointer.ty = e.clientY / window.innerHeight;
  }, { passive: true });

  function makeBlobs(colors){
    return colors.map(function(color, i){
      return {
        color: color,
        rel: 0.34 + i * 0.16,
        ox: 0.22 + (i * 0.28 % 0.66),
        oy: 0.3 + (i * 0.21 % 0.5),
        orbit: 0.14 + i * 0.03,
        speed: 0.00006 + i * 0.00002,
        phase: i * 2.1,
        depth: 0.35 + i * 0.25
      };
    });
  }

  function makeDust(count, color){
    var arr = [];
    for(var i=0;i<count;i++){
      var depth = Math.random();
      arr.push({
        x: Math.random(), y: Math.random(),
        r: 0.6 + depth * 1.8,
        depth: 0.2 + depth * 0.8,
        speed: 0.00002 + depth * 0.00006,
        wobble: Math.random() * Math.PI * 2,
        color: color
      });
    }
    return arr;
  }

  function Instance(canvas){
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.themeKey = canvas.getAttribute('data-theme') || 'navy';
    this.theme = THEMES[this.themeKey] || THEMES.navy;
    this.visible = true;
    this.w = 0; this.h = 0; this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.blobs = makeBlobs(this.theme.blobs);
    this.resize();

    var area = (this.canvas.clientWidth * this.canvas.clientHeight) || 300000;
    var count = reduceMotion ? 14 : Math.max(16, Math.min(46, Math.round(area / 16000)));
    this.dust = makeDust(count, this.theme.dust);

    if('IntersectionObserver' in window){
      var self = this;
      this.io = new IntersectionObserver(function(entries){
        self.visible = entries[0].isIntersecting;
      }, { threshold: 0.01 });
      this.io.observe(canvas);
    }
  }

  Instance.prototype.resize = function(){
    var rect = this.canvas.getBoundingClientRect();
    var w = Math.max(1, Math.round(rect.width));
    var h = Math.max(1, Math.round(rect.height));
    this.canvas.width = w * this.dpr;
    this.canvas.height = h * this.dpr;
    this.w = w; this.h = h;
  };

  Instance.prototype.draw = function(t, px, py){
    var ctx = this.ctx, w = this.w, h = this.h, dpr = this.dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);
    var minDim = Math.min(w, h);

    this.blobs.forEach(function(b){
      var ang = t * b.speed + b.phase;
      var cx = (b.ox + Math.cos(ang) * b.orbit + (px - 0.5) * 0.05 * b.depth) * w;
      var cy = (b.oy + Math.sin(ang * 0.86) * b.orbit + (py - 0.5) * 0.05 * b.depth) * h;
      var r = b.rel * minDim;
      var grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
      grad.addColorStop(0, b.color);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.fill();
    });

    ctx.save();
    this.dust.forEach(function(d){
      var yy = ((d.y - t * d.speed) % 1 + 1) % 1;
      var wob = Math.sin(t * 0.0006 + d.wobble) * 0.01 * d.depth;
      var xx = ((d.x + wob + (px - 0.5) * 0.03 * d.depth) % 1 + 1) % 1;
      ctx.globalAlpha = 0.25 + d.depth * 0.45;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.arc(xx * w, yy * h, d.r, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.restore();
  };

  var instances = [];
  document.querySelectorAll('.ambient-canvas').forEach(function(canvas){
    instances.push(new Instance(canvas));
  });

  if(!instances.length) return;

  window.addEventListener('resize', function(){
    instances.forEach(function(inst){ inst.resize(); });
  });

  if(reduceMotion){
    instances.forEach(function(inst){ inst.draw(0, 0.5, 0.5); });
    return;
  }

  var running = true;
  document.addEventListener('visibilitychange', function(){
    running = !document.hidden;
    if(running) requestAnimationFrame(loop);
  });

  function loop(t){
    if(!running) return;
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    for(var i=0;i<instances.length;i++){
      var inst = instances[i];
      if(inst.visible) inst.draw(t, pointer.x, pointer.y);
    }
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

})();
