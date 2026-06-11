// ===== SCROLL ANIMATIONS (AOS-like system) =====
(function() {
  'use strict';

  // --- Configuration ---
  const CONFIG = {
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1,
  };

  // --- Initialize AOS elements ---
  function initAOS() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    elements.forEach(function(el) {
      var type = el.getAttribute('data-aos');
      var delay = el.getAttribute('data-aos-delay') || '';
      var duration = el.getAttribute('data-aos-duration') || '';

      // Add base classes
      el.classList.add('aos-init');
      el.classList.add('aos-' + type);

      if (delay) el.classList.add('aos-delay-' + delay);
      if (duration) el.classList.add('aos-duration-' + duration);
    });
  }

  // --- Set up Intersection Observer ---
  function observeAOS() {
    var elements = document.querySelectorAll('.aos-init');
    if (!elements.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
            observer.unobserve(entry.target);
          }
        });
      }, CONFIG);

      elements.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      // Fallback: show all immediately
      elements.forEach(function(el) {
        el.classList.add('aos-animate');
      });
    }
  }

  // --- Stagger children ---
  function initStagger() {
    var parents = document.querySelectorAll('.aos-stagger');
    parents.forEach(function(parent) {
      var children = parent.querySelectorAll('[data-aos]');
      children.forEach(function(child, index) {
        var existingDelay = child.getAttribute('data-aos-delay');
        if (!existingDelay || existingDelay === '0') {
          var staggerDelay = 50 + (index * 100);
          child.classList.add('aos-delay-' + staggerDelay);
          child.style.transitionDelay = staggerDelay + 'ms';
        }
      });
    });
  }

  // --- Reveal animation ---
  function initReveal() {
    var reveals = document.querySelectorAll('.reveal, .img-reveal');
    if (!reveals.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      }, { rootMargin: '0px 0px -50px 0px', threshold: 0.2 });

      reveals.forEach(function(el) {
        observer.observe(el);
      });
    } else {
      reveals.forEach(function(el) {
        el.classList.add('revealed');
      });
    }
  }

  // ===== SKELETON LOADING =====
  function initSkeleton() {
    var body = document.body;

    // Mark loading state
    body.classList.remove('loaded');

    // When the page is fully loaded (including images)
    function onPageLoaded() {
      // Small delay for smoother transition
      setTimeout(function() {
        body.classList.add('loaded');
      }, 200);
    }

    if (document.readyState === 'complete') {
      onPageLoaded();
    } else {
      window.addEventListener('load', onPageLoaded);
    }
  }

  // ===== ENHANCED COUNTER ANIMATION =====
  function initCounters() {
    var counters = document.querySelectorAll('.counter[data-target]');
    if (!counters.length) return;

    counters.forEach(function(counter) {
      var target = parseInt(counter.getAttribute('data-target'), 10);
      if (isNaN(target)) return;

      var duration = parseInt(counter.getAttribute('data-duration'), 10) || 2000;
      var startTime = null;
      var startValue = 0;

      function updateCounter(currentTime) {
        if (!startTime) startTime = currentTime;
        var elapsed = currentTime - startTime;
        var progress = Math.min(elapsed / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);

        counter.textContent = current.toLocaleString();

        if (progress < 1) {
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target.toLocaleString();
        }
      }

      // Observe counter and start when visible
      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              requestAnimationFrame(updateCounter);
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });

        observer.observe(counter);
      } else {
        requestAnimationFrame(updateCounter);
      }
    });
  }

  // ===== PARALLAX ON SCROLL (lightweight) =====
  function initParallax() {
    var parallaxElements = document.querySelectorAll('[data-parallax]');
    if (!parallaxElements.length) return;

    window.addEventListener('scroll', function() {
      var scrollY = window.scrollY;

      parallaxElements.forEach(function(el) {
        var speed = parseFloat(el.getAttribute('data-parallax')) || 0.3;
        var rect = el.getBoundingClientRect();
        var isVisible = rect.top < window.innerHeight && rect.bottom > 0;

        if (isVisible) {
          var offset = scrollY * speed;
          el.style.transform = 'translateY(' + offset + 'px)';
        }
      });
    });
  }

  // ===== INIT ON DOM READY =====
  function init() {
    initAOS();
    initStagger();
    observeAOS();
    initReveal();
    initSkeleton();
    initCounters();
    initParallax();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
