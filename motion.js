/*============================================
  DREAM MEDIA - MOTION SYSTEM
  ============================================
  GSAP-driven interaction layer: preloader,
  Lenis smooth scroll, kinetic text intro,
  scroll-triggered reveals, magnetic cursor,
  magnetic buttons, card tilt, reactive marquee.

  Everything here is progressive enhancement:
  if GSAP / its plugins fail to load, the CSS
  fallbacks in staily.css keep the page usable.
============================================*/

(function () {
  "use strict";

  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var hasGSAP = typeof window.gsap !== "undefined";
  var hasScrollTrigger = hasGSAP && typeof window.ScrollTrigger !== "undefined";
  var hasSplitText = hasGSAP && typeof window.SplitText !== "undefined";
  var hasLenis = typeof window.Lenis !== "undefined";
  var isFinePointer =
    window.matchMedia && window.matchMedia("(pointer: fine)").matches;
  var isTouch = "ontouchstart" in window;
  var canHover = isFinePointer && !isTouch && !reduceMotion;

  if (hasScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (hasSplitText) gsap.registerPlugin(SplitText);
  }

  /*============================================
    LENIS SMOOTH SCROLL
  ============================================*/
  function initLenis() {
    if (!hasLenis || reduceMotion) return;

    var lenis = new Lenis({
      lerp: 0.11,
      smoothWheel: true,
      wheelMultiplier: 1
    });

    lenis.on("scroll", function () {
      if (hasScrollTrigger) ScrollTrigger.update();
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Route in-page anchor clicks through Lenis for a consistent glide
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener("click", function (e) {
        var id = a.getAttribute("href");
        if (!id || id === "#") return;
        var target = document.querySelector(id);
        if (!target) return;
        e.preventDefault();
        lenis.scrollTo(target, { offset: -20, duration: 1.2 });
      });
    });
  }

  /*============================================
    HEADER SHOW/HIDE + BACK-TO-TOP
  ============================================*/
  function initHeaderScroll() {
    var header = document.querySelector("[data-header]");
    var backTop = document.getElementById("backTopBtn");
    if (!header) return;

    var lastY = window.scrollY;

    function onScroll() {
      var y = window.scrollY;

      header.classList.toggle("active", y > 80);

      if (y > lastY && y > 160) {
        header.classList.add("header--hidden");
      } else {
        header.classList.remove("header--hidden");
      }
      lastY = y;

      if (backTop) backTop.classList.toggle("active", y > 400);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  /*============================================
    CUSTOM MAGNETIC CURSOR
  ============================================*/
  function initCursor() {
    if (!hasGSAP || !canHover) return;

    var dot = document.querySelector(".cursor-dot");
    var ring = document.querySelector(".cursor-ring");
    var label = document.querySelector(".cursor-ring-label");
    if (!dot || !ring) return;

    document.body.classList.add("has-custom-cursor");

    var dotX = gsap.quickTo(dot, "x", { duration: 0.09, ease: "power3" });
    var dotY = gsap.quickTo(dot, "y", { duration: 0.09, ease: "power3" });
    var ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3" });
    var ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3" });

    window.addEventListener("mousemove", function (e) {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);
    });

    document.querySelectorAll("a, button, [data-cursor]").forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        var text = el.getAttribute("data-cursor");
        ring.classList.add("is-active");
        if (text) {
          ring.classList.add("is-labeled");
          if (label) label.textContent = text;
        }
      });
      el.addEventListener("mouseleave", function () {
        ring.classList.remove("is-active", "is-labeled");
        if (label) label.textContent = "";
      });
    });
  }

  /*============================================
    MAGNETIC BUTTONS
  ============================================*/
  function initMagnetic() {
    if (!hasGSAP || !canHover) return;

    var magneticEls = document.querySelectorAll("[data-magnetic]");
    if (!magneticEls.length) return;

    document.body.classList.add("has-magnetic");

    magneticEls.forEach(function (el) {
      var xTo = gsap.quickTo(el, "x", { duration: 0.5, ease: "elastic.out(1, 0.4)" });
      var yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "elastic.out(1, 0.4)" });

      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var relX = e.clientX - r.left - r.width / 2;
        var relY = e.clientY - r.top - r.height / 2;
        xTo(relX * 0.35);
        yTo(relY * 0.35);
      });

      el.addEventListener("mouseleave", function () {
        xTo(0);
        yTo(0);
      });
    });
  }

  /*============================================
    CARD TILT
  ============================================*/
  function initTilt() {
    if (!hasGSAP || !canHover) return;

    var tiltEls = document.querySelectorAll("[data-tilt]");
    if (!tiltEls.length) return;

    // Flags the CSS fallback hover-lift off, since GSAP now owns
    // the transform (translateY + rotation + scale) on these cards.
    document.body.classList.add("has-tilt");

    tiltEls.forEach(function (el) {
      gsap.set(el, { transformPerspective: 800 });

      var rxTo = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3" });
      var ryTo = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3" });
      var sTo = gsap.quickTo(el, "scale", { duration: 0.5, ease: "power3" });
      var yTo = gsap.quickTo(el, "y", { duration: 0.5, ease: "power3" });

      el.addEventListener("mousemove", function (e) {
        var r = el.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width - 0.5;
        var py = (e.clientY - r.top) / r.height - 0.5;
        rxTo(py * -10);
        ryTo(px * 10);
        sTo(1.03);
        yTo(-8);
      });

      el.addEventListener("mouseleave", function () {
        rxTo(0);
        ryTo(0);
        sTo(1);
        yTo(0);
      });
    });
  }

  /*============================================
    HERO KINETIC INTRO
    (prepared immediately so elements are hidden
    before the preloader ever reveals the page;
    played once the curtain starts wiping away)
  ============================================*/
  var heroTl = null;

  function prepareHeroIntro() {
    if (!hasGSAP || reduceMotion) return;

    var heading = document.getElementById("hero-heading");
    var tl = gsap.timeline({ paused: true });

    if (heading && hasSplitText) {
      var split = new SplitText(heading, { type: "chars,words" });
      gsap.set(split.chars, { yPercent: 130, opacity: 0, rotateZ: 6 });
      tl.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        rotateZ: 0,
        duration: 0.9,
        ease: "power4.out",
        stagger: 0.012
      });
    } else if (heading) {
      gsap.set(heading, { opacity: 0, y: 40 });
      tl.to(heading, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
    }

    var heroIns = document.querySelectorAll("[data-hero-in]");
    if (heroIns.length) {
      gsap.set(heroIns, { opacity: 0, y: 24 });
      tl.to(
        heroIns,
        { opacity: 1, y: 0, duration: 0.7, ease: "power3.out", stagger: 0.12 },
        "-=0.55"
      );
    }

    var banner = document.querySelector("[data-hero-banner]");
    if (banner) {
      gsap.set(banner, { opacity: 0, scale: 0.85, y: 30 });
      tl.to(
        banner,
        { opacity: 1, scale: 1, y: 0, duration: 1, ease: "power3.out" },
        "-=0.8"
      );
    }

    heroTl = tl;
  }

  function playHeroIntro() {
    if (heroTl) heroTl.play();
  }

  /*============================================
    SCROLL-TRIGGERED REVEALS
  ============================================*/
  function initScrollReveals() {
    if (!hasGSAP || !hasScrollTrigger || reduceMotion) return;

    // Line-masked title reveals
    document.querySelectorAll("[data-split-lines]").forEach(function (el) {
      if (hasSplitText) {
        var split = new SplitText(el, { type: "lines", linesClass: "split-line" });
        split.lines.forEach(function (line) {
          var wrap = document.createElement("span");
          wrap.className = "split-line-wrap";
          line.parentNode.insertBefore(wrap, line);
          wrap.appendChild(line);
        });
        gsap.set(split.lines, { yPercent: 110, opacity: 0 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: function () {
            gsap.to(split.lines, {
              yPercent: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power4.out",
              stagger: 0.08
            });
          }
        });
      } else {
        gsap.set(el, { opacity: 0, y: 30 });
        ScrollTrigger.create({
          trigger: el,
          start: "top 85%",
          once: true,
          onEnter: function () {
            gsap.to(el, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" });
          }
        });
      }
    });

    // Single-block fade/rise
    document.querySelectorAll("[data-reveal-up]").forEach(function (el) {
      gsap.set(el, { opacity: 0, y: 50 });
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        once: true,
        onEnter: function () {
          gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: "power3.out" });
        }
      });
    });

    // Staggered card groups
    document.querySelectorAll("[data-stagger-group]").forEach(function (group) {
      var items = group.children;
      if (!items.length) return;
      gsap.set(items, { opacity: 0, y: 40 });
      ScrollTrigger.create({
        trigger: group,
        start: "top 88%",
        once: true,
        onEnter: function () {
          gsap.to(items, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            stagger: 0.08
          });
        }
      });
    });

    // Big background number parallax
    document.querySelectorAll("[data-parallax]").forEach(function (el) {
      gsap.to(el, {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });
  }

  /*============================================
    FEATURE SCROLL STEPS
    Pins the section and walks through the three cards as you scroll:
    the active card lights up, the visual crossfades to a matching
    photo, and a rail tracks progress. Desktop only — pinning on
    small screens fights with native scrolling.
  ============================================*/
  function initFeatureSteps() {
    var section = document.querySelector("#feature");
    if (!section || !hasGSAP || !hasScrollTrigger) return;

    var pinEl = section.querySelector("[data-feature-pin]");
    var visual = section.querySelector("[data-feature-visual]");
    var list = section.querySelector(".feature-list");
    var cards = section.querySelectorAll("[data-feature-step]");
    if (!pinEl || !visual || !list || cards.length < 2) return;

    // --- build the step image layers ---
    var stepImgs = [];
    cards.forEach(function (card) {
      var src = card.getAttribute("data-feature-img");
      var img = document.createElement("img");
      img.src = src;
      img.alt = "";
      img.className = "feature-visual-img";
      visual.appendChild(img);
      stepImgs.push(img);
    });

    // --- build the caption chip ---
    var caption = document.createElement("figcaption");
    caption.className = "feature-visual-caption";
    var capIndex = document.createElement("span");
    capIndex.className = "feature-visual-index";
    var capLabel = document.createElement("span");
    capLabel.className = "feature-visual-label";
    caption.appendChild(capIndex);
    caption.appendChild(capLabel);
    visual.appendChild(caption);

    // --- build the progress rail ---
    var rail = document.createElement("span");
    rail.className = "feature-rail";
    rail.setAttribute("aria-hidden", "true");
    var fill = document.createElement("span");
    fill.className = "feature-rail-fill";
    rail.appendChild(fill);
    list.appendChild(rail);

    var activeIndex = -1;
    var currentImg = null;

    function paintCaption(i) {
      var title = cards[i].querySelector(".card-title");
      capIndex.textContent = ("0" + (i + 1)).slice(-2);
      capLabel.textContent = title ? title.textContent.trim() : "";
    }

    function setActive(i) {
      if (i === activeIndex) return;
      activeIndex = i;

      cards.forEach(function (c, idx) {
        c.classList.toggle("is-active", idx === i);
      });

      var img = stepImgs[i];
      if (currentImg && currentImg !== img) {
        gsap.to(currentImg, {
          opacity: 0,
          duration: 0.45,
          ease: "power2.out",
          overwrite: true
        });
      }
      gsap.to(img, {
        opacity: 1,
        duration: 0.55,
        ease: "power2.out",
        overwrite: true
      });
      if (!reduceMotion) {
        gsap.fromTo(
          img,
          { scale: 1.08 },
          { scale: 1, duration: 1.1, ease: "power3.out", overwrite: "auto" }
        );
      }
      currentImg = img;

      paintCaption(i);
      if (reduceMotion) {
        gsap.set(caption, { opacity: 1, y: 0 });
      } else {
        gsap.fromTo(
          caption,
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.45, ease: "power3.out", overwrite: true }
        );
      }
    }

    // Card titles are re-written by the language toggle, so repaint the
    // caption after a switch or it keeps the previous language's text.
    var langBtn = document.getElementById("lang-toggle-btn");
    if (langBtn) {
      langBtn.addEventListener("click", function () {
        setTimeout(function () {
          if (activeIndex >= 0) paintCaption(activeIndex);
        }, 0);
      });
    }

    // Clicking a card jumps to its step.
    cards.forEach(function (card, i) {
      card.addEventListener("click", function () {
        setActive(i);
      });
    });

    var mm = gsap.matchMedia();

    // Short windows can't fit the pinned content in one screen, which
    // would clip the last card — fall back to the normal flow there.
    mm.add("(min-width: 992px) and (min-height: 700px)", function () {
      list.classList.add("is-stepped");
      pinEl.classList.add("is-pinned");
      setActive(0);

      var st = ScrollTrigger.create({
        // Trigger on the pinned container, not the section: the section
        // carries ~130px of vertical padding, so starting from its top
        // pinned the content that far down the viewport — leaving a gap
        // above and pushing the last card off the bottom.
        trigger: pinEl,
        start: "top top",
        end: function () {
          return "+=" + window.innerHeight * (cards.length - 1) * 0.9;
        },
        pin: pinEl,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: function (self) {
          var idx = Math.min(
            cards.length - 1,
            Math.floor(self.progress * cards.length)
          );
          setActive(idx);
          fill.style.height = (self.progress * 100).toFixed(2) + "%";
        }
      });

      return function cleanup() {
        st.kill();
        list.classList.remove("is-stepped");
        pinEl.classList.remove("is-pinned");
        cards.forEach(function (c) {
          c.classList.remove("is-active");
        });
        gsap.set(stepImgs, { clearProps: "opacity,transform" });
        gsap.set(caption, { clearProps: "opacity,transform" });
        fill.style.height = "0%";
        activeIndex = -1;
        currentImg = null;
      };
    });
  }

  /*============================================
    SERVICE HOVER BACKDROP
    Reveals a representative photo behind the card
    grid, crossfading as you move between cards.
  ============================================*/
  function initServiceBackdrop() {
    var section = document.querySelector(".service");
    if (!section || !hasGSAP) return;

    var cards = section.querySelectorAll("[data-service-bg]");
    var grid = section.querySelector(".grid-list");
    if (!cards.length || !grid) return;

    var layer = document.createElement("div");
    layer.className = "service-backdrop";
    layer.setAttribute("aria-hidden", "true");

    // One <img> per unique photo, reused by any card that shares it.
    var byUrl = {};
    cards.forEach(function (card) {
      var url = card.getAttribute("data-service-bg");
      if (!url || byUrl[url]) return;
      var img = document.createElement("img");
      img.src = url;
      img.alt = "";
      img.className = "service-backdrop-img";
      layer.appendChild(img);
      byUrl[url] = img;
    });

    section.insertBefore(layer, section.firstChild);

    var current = null;

    function show(url) {
      var img = byUrl[url];
      if (!img || img === current) return;

      if (current) {
        gsap.to(current, { opacity: 0, duration: 0.45, ease: "power2.out", overwrite: true });
      }

      gsap.to(img, { opacity: 1, duration: 0.6, ease: "power2.out", overwrite: true });

      if (!reduceMotion) {
        gsap.fromTo(
          img,
          { scale: 1.12 },
          { scale: 1, duration: 1.4, ease: "power3.out", overwrite: "auto" }
        );
      }

      current = img;
      section.classList.add("has-backdrop");
    }

    function hide() {
      if (!current) return;
      gsap.to(current, { opacity: 0, duration: 0.5, ease: "power2.out", overwrite: true });
      current = null;
      section.classList.remove("has-backdrop");
    }

    cards.forEach(function (card) {
      var url = card.getAttribute("data-service-bg");
      card.addEventListener("mouseenter", function () {
        show(url);
      });
      // Keyboard parity: tabbing through the cards drives it too.
      card.addEventListener("focusin", function () {
        show(url);
      });
    });

    grid.addEventListener("mouseleave", hide);
    grid.addEventListener("focusout", function (e) {
      if (!grid.contains(e.relatedTarget)) hide();
    });
  }

  /*============================================
    PARTNER LOGO MARQUEE
    The partner logos ship as one combined sheet, so we slice it into
    individual tiles via background-position rather than needing 26
    separate files. Grid geometry measured off the source image:
    cells are 104x104, columns every 175px from x=58, rows every
    ~145.33px from y=90 (7,7,6,6 logos per row = 26 total).
  ============================================*/
  function initPartners() {
    var host = document.querySelector("[data-partners]");
    if (!host) return;

    var CELL_X0 = 58;
    var CELL_Y0 = 90;
    var COL_PITCH = 175;
    var ROW_PITCH = 145.33;
    var PER_ROW = [7, 7, 6, 6];

    var logos = [];
    PER_ROW.forEach(function (count, row) {
      for (var col = 0; col < count; col++) {
        logos.push({
          x: Math.round(CELL_X0 + COL_PITCH * col),
          y: Math.round(CELL_Y0 + ROW_PITCH * row)
        });
      }
    });

    function makeTile(logo) {
      var tile = document.createElement("span");
      tile.className = "partner-logo";
      tile.style.setProperty("--x", logo.x);
      tile.style.setProperty("--y", logo.y);
      return tile;
    }

    // Split into two bands that travel in opposite directions.
    var half = Math.ceil(logos.length / 2);
    var bands = [logos.slice(0, half), logos.slice(half)];
    var frag = document.createDocumentFragment();
    var rows = [];

    bands.forEach(function (band, i) {
      var row = document.createElement("div");
      row.className = "partners-row";

      // Two identical tracks so the loop reads as continuous.
      for (var copy = 0; copy < 2; copy++) {
        var track = document.createElement("div");
        track.className = "partners-track";
        if (copy) track.setAttribute("aria-hidden", "true");
        band.forEach(function (logo) {
          track.appendChild(makeTile(logo));
        });
        row.appendChild(track);
      }

      rows.push({ el: row, reverse: i % 2 === 1 });
      frag.appendChild(row);
    });

    var fallback = host.querySelector("[data-partners-fallback]");
    if (fallback) fallback.remove();
    host.appendChild(frag);

    if (!hasGSAP) return;

    rows.forEach(function (row) {
      var tracks = row.el.querySelectorAll(".partners-track");
      var entry = registerMarquee(tracks, {
        duration: 38,
        reverse: row.reverse
      });

      // Elastic lean. Applied to the tracks rather than the row: the row
      // is the masked/clipped box, and skewing that would slant its
      // fade-out edges. GSAP composes skewX with the loop's xPercent.
      var skewSetters = [];
      tracks.forEach(function (track) {
        skewSetters.push(
          gsap.quickTo(track, "skewX", { duration: 0.6, ease: "power3.out" })
        );
      });
      skewRegistry.push(function (v) {
        var amount = row.reverse ? -v : v;
        skewSetters.forEach(function (set) {
          set(amount);
        });
      });

      // Hovering a row holds it still so a brand can be read.
      row.el.addEventListener("mouseenter", function () {
        entry.paused = true;
        gsap.to(entry.tween, { timeScale: 0, duration: 0.4, overwrite: true });
      });
      row.el.addEventListener("mouseleave", function () {
        entry.paused = false;
        gsap.to(entry.tween, {
          timeScale: entry.idle,
          duration: 0.6,
          overwrite: true
        });
      });
    });

    // Tiles pop in as the section arrives.
    if (hasScrollTrigger && !reduceMotion) {
      var tiles = host.querySelectorAll(".partner-logo");
      gsap.set(tiles, { opacity: 0, scale: 0.5, yPercent: 18 });
      ScrollTrigger.create({
        trigger: host,
        start: "top 88%",
        once: true,
        onEnter: function () {
          gsap.to(tiles, {
            opacity: 0.72,
            scale: 1,
            yPercent: 0,
            duration: 0.7,
            ease: "back.out(1.7)",
            stagger: { each: 0.025, from: "start" },
            // Hand the tiles back to CSS afterwards, otherwise the inline
            // opacity/transform would outrank the :hover rules and the
            // logos could never brighten or scale up again.
            onComplete: function () {
              gsap.set(tiles, { clearProps: "opacity,transform" });
            }
          });
        }
      });
    }
  }

  /*============================================
    REACTIVE MARQUEE
  ============================================*/
  // Every marquee on the page registers here and is driven by one
  // shared scroll listener (see initMarqueeScrollDriver).
  var marqueeRegistry = [];
  var skewRegistry = [];

  function registerMarquee(tracks, opts) {
    opts = opts || {};
    var duration = opts.duration || 24;

    // Two identical tracks sit side by side, so sliding a full width and
    // repeating produces a seamless infinite loop. Reversed rows start
    // pre-shifted and travel back to 0, so there's never a leading gap.
    var tween = opts.reverse
      ? gsap.fromTo(
          tracks,
          { xPercent: -100 },
          { xPercent: 0, duration: duration, ease: "none", repeat: -1 }
        )
      : gsap.to(tracks, {
          xPercent: -100,
          duration: duration,
          ease: "none",
          repeat: -1
        });

    // Idle drift: gentle crawl normally, still for reduced-motion users
    // (they still get the scroll-linked movement, which is user-driven).
    var entry = {
      tween: tween,
      idle: reduceMotion ? 0 : 1,
      paused: false
    };

    tween.timeScale(entry.idle);
    marqueeRegistry.push(entry);
    return entry;
  }

  function initMarqueeScrollDriver() {
    if (!hasGSAP || !marqueeRegistry.length) return;

    var lastY = window.scrollY;
    var settleTimer = null;

    window.addEventListener(
      "scroll",
      function () {
        var y = window.scrollY;
        var delta = y - lastY;
        lastY = y;
        if (!delta) return;

        // Scrolling down drives each strip along its own axis; scrolling
        // up reverses every one of them.
        var direction = delta > 0 ? 1 : -1;
        var boost = gsap.utils.clamp(1, 9, Math.abs(delta) / 6);

        marqueeRegistry.forEach(function (m) {
          if (m.paused) return;
          gsap.to(m.tween, {
            timeScale: direction * boost,
            duration: 0.25,
            ease: "power2.out",
            overwrite: true
          });
        });

        // Elastic lean: the rows skew slightly into the scroll direction
        // and spring back, which reads as momentum rather than a flat slide.
        var skew = gsap.utils.clamp(-6, 6, delta / 10);
        skewRegistry.forEach(function (set) {
          set(skew);
        });

        clearTimeout(settleTimer);
        settleTimer = setTimeout(function () {
          marqueeRegistry.forEach(function (m) {
            if (m.paused) return;
            gsap.to(m.tween, {
              timeScale: m.idle,
              duration: 0.9,
              ease: "power2.out",
              overwrite: true
            });
          });
          skewRegistry.forEach(function (set) {
            set(0);
          });
        }, 180);
      },
      { passive: true }
    );
  }

  function initMarquee() {
    var tracks = document.querySelectorAll("[data-marquee-track]");
    if (!tracks.length || !hasGSAP) return;

    // Tells the CSS to stop driving the marquee, since JS now owns it.
    // (Only set once we're certain the JS loop is actually running —
    // otherwise the strip ends up frozen with no animation at all.)
    document.body.classList.add("has-js-marquee");

    registerMarquee(tracks, { duration: 24 });
  }

  /*============================================
    PRELOADER
  ============================================*/
  function runPreloader(onReveal, onDone) {
    var preloader = document.getElementById("preloader");

    // Respect reduced-motion and any missing-dependency case the same
    // way: skip the animated curtain entirely, reveal instantly.
    if (!preloader || !hasGSAP || reduceMotion) {
      if (preloader) preloader.style.display = "none";
      onReveal();
      onDone();
      return;
    }

    document.documentElement.style.overflow = "hidden";
    function unlockScroll() {
      document.documentElement.style.overflow = "";
    }

    // Failsafe: never let a slow/blocked tween leave the page locked.
    var settled = false;
    var failsafe = setTimeout(function () {
      if (settled) return;
      settled = true;
      document.body.classList.add("is-loaded");
      preloader.style.display = "none";
      unlockScroll();
      onReveal();
      onDone();
    }, 4000);

    var numEl = document.getElementById("preloaderNum");
    var barEl = document.getElementById("preloaderBar");
    var panel1 = document.querySelector(".preloader-panel-1");
    var panel2 = document.querySelector(".preloader-panel-2");
    var counter = { val: 0 };

    var tl = gsap.timeline({
      onComplete: function () {
        if (settled) return;
        settled = true;
        clearTimeout(failsafe);
        document.body.classList.add("is-loaded");
        preloader.style.display = "none";
        unlockScroll();
        onDone();
      }
    });

    tl.to(counter, {
      val: 100,
      duration: 1.3,
      ease: "power2.inOut",
      onUpdate: function () {
        var v = Math.round(counter.val);
        if (numEl) numEl.textContent = v;
        if (barEl) barEl.style.width = v + "%";
      }
    });

    tl.to(".preloader-inner, .preloader-bar", { opacity: 0, duration: 0.3 }, "+=0.1");
    tl.call(
      function () {
        if (settled) return;
        onReveal();
      },
      [],
      "+=0"
    );

    if (panel1 && panel2) {
      tl.to(panel1, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, "<");
      tl.to(panel2, { yPercent: 100, duration: 0.9, ease: "power4.inOut" }, "<");
    }
  }

  /*============================================
    BOOT
  ============================================*/
  function boot() {
    initLenis();
    initHeaderScroll();
    initMarquee();
    initPartners();
    // Registered last: drives every marquee above from one scroll listener.
    initMarqueeScrollDriver();

    if (hasGSAP) {
      initCursor();
      initMagnetic();
      initTilt();
      initServiceBackdrop();
      initFeatureSteps();
      initScrollReveals();
      if (hasScrollTrigger) ScrollTrigger.refresh();
    }
  }

  document.body.classList.add(hasGSAP ? "motion-ready" : "motion-basic");

  // Hide hero elements (if GSAP is available) before first paint settles,
  // so there is nothing to "flash" once the preloader curtain opens.
  prepareHeroIntro();

  runPreloader(
    function onReveal() {
      playHeroIntro();
      boot();
    },
    function onDone() {
      if (hasScrollTrigger) ScrollTrigger.refresh();
    }
  );
})();
