/*============================================
  DREAM MEDIA - MAIN JAVASCRIPT
  ============================================
  Features:
  - Bilingual Content (Arabic/English)
  - Dark/Light Theme Toggle
  - Swiper Slider
  - Lightbox Image Viewer
  - Reveal on Scroll Animation
  - Floating Contact Menu
============================================*/

// ============================================
// TRANSLATIONS - Bilingual Content
// ============================================
const translations = {
  en: {
    // ====== Navigation ======
    home: "Home",
    services: "Services",
    features: "Features",
    marketing: "Marketing",
    bookNow: "Book Now",

    // ====== Hero Section ======
    heroTitle:
      'Building Digital <span class="has-before">Marketing</span>, Brand and Experience',
    heroText:
      "At Dream Media, we specialize in marketing, brand building, training, and consulting, delivering efficient and impactful solutions.",

    // ====== Services Section ======
    servicesSubtitle: "Our Services",
    servicesTitle:
      'Managing your business with our <span class="has-before">best service</span>',
    serviceCard1: "Marketing & Communication",
    serviceCard2: "Business Training",
    serviceCard3: "Printing",
    serviceCard4: "Event Management",
    serviceCard5: "Design & Creatives",
    serviceCard6: "business & consulting",
    serviceCard7: "Business Development",
    serviceMoreLink: " More Services",

    // ====== Features Section ======
    featureSubtitle: "Why Choose Dream Media",
    featureTitle:
      'Experts in Marketing, Training, and Business Consulting, Solving Client <span class="has-before">Challenges</span>',
    featureFastTitle: "Fast Working Process",
    featureFastText:
      "At Dream Media we specialize in marketing, building brand for agency, social media design.",
    featureTeamTitle: "Dedicated Team",
    featureTeamText:
      "At Dream Media, our team works closely with you to build an effective and integrated marketing strategy.",
    featureSupportTitle: "24/7 Hours Support",
    featureSupportText:
      "At Dream Media we specialize in designing, building brand for agency, social media design.",

    // ====== Marketing Projects Section ======
    marketingSubtitle: "Our Work",
    marketingTitle: 'Featured <span class="has-before">Projects</span>',
    marketingButton: "View Project",

    // ====== Partners Section ======
    partnersSubtitle: "Our Partners",
    partnersTitle: 'Trusted by Leading <span class="has-before">Companies</span>',

    // ====== Footer Section ======
    footerAboutTitle: "About Dream Media",
    footerAboutText:
      "Baghdad-based marketing and business solutions company specializing in digital marketing, social media management, video production, printing, and training. We help businesses and organizations grow and build a strong presence through creative strategies and measurable results.",
    footerInstagramTitle: "Instagram Posts",
    footerCopyright: "© 2024 Dream Media. All Rights Reserved",

    // ====== Floating Contact ======
    contactWhatsApp: "WhatsApp",
    contactEmail: "Email",
    contactPhone: "Phone",

    // ====== Hero secondary CTA ======
    heroWorkBtn: "See Our Work",

    // ====== Reels ======
    reelBadge: "Reel",

    // ====== CTA Band ======
    ctaEyebrow: "Let's Talk",
    ctaTitle: "Let's build your next campaign together",
    ctaBtn: "Message Us",

    // ====== Footer Quick Links ======
    footerLinksTitle: "Quick Links",

    // ====== Additional UI Elements ======
    closeButton: "Close",
    previousButton: "Previous",
    nextButton: "Next",
    viewImage: "View Image"
  },

  ar: {
    // ====== القائمة الرئيسية ======
    home: "الرئيسية",
    services: "الخدمات",
    features: "المميزات",
    marketing: "التسويق",
    bookNow: "احجز الآن",

    // ====== قسم البطل (Hero) ======
    heroTitle:
      'نبني <span class="has-before">التسويق الرقمي</span>، الهوية التجارية والتجربة',
    heroText:
      "في دريم ميديا نختص في التسويق وبناء العلامة التجارية والتدريب والاستشارات لنقدّم حلولًا فعّالة ومؤثرة.",

    // ====== قسم الخدمات ======
    servicesSubtitle: "خدماتنا",
    servicesTitle:
      'ندير أعمالك من خلال <span class="has-before">أفضل الخدمات</span>',
    serviceCard1: "التسويق والاتصال",
    serviceCard2: "تدريب الأعمال",
    serviceCard3: "الطباعة",
    serviceCard4: "إدارة الفعاليات",
    serviceCard5: "التصميم والإبداع",
    serviceCard6: "الأعمال والاستشارات",
    serviceCard7: "تطوير الأعمال",
    serviceMoreLink: "خدمات أخرى",

    // ====== قسم المميزات ======
    featureSubtitle: "لماذا تختار دريم ميديا؟",
    featureTitle:
      'خبراء في التسويق والتدريب والاستشارات لنحل <span class="has-before">تحديات</span> عملائنا',
    featureFastTitle: "سرعة في إنجاز العمل",
    featureFastText:
      "في دريم ميديا نختص في التسويق، بناء العلامة التجارية، تصميم السوشيال ميديا.",
    featureTeamTitle: "فريق متخصص",
    featureTeamText:
      "في دريم ميديا، يعمل فريقنا معك خطوة بخطوة لبناء استراتيجية تسويقية فعّالة ومتكاملة.",
    featureSupportTitle: "دعم على مدار الساعة",
    featureSupportText:
      "في دريم ميديا نختص في التصميم، بناء العلامة التجارية، تصميم السوشيال ميديا.",

    // ====== قسم المشاريع التسويقية ======
    marketingSubtitle: "أعمالنا",
    marketingTitle: 'أبرز <span class="has-before">المشاريع</span>',
    marketingButton: "عرض المشروع",

    // ====== قسم الشركاء ======
    partnersSubtitle: "شركاؤنا",
    partnersTitle: 'موثوق بنا من قبل <span class="has-before">شركات رائدة</span>',

    // ====== قسم الفوتر ======
    footerAboutTitle: "عن دريم ميديا",
    footerAboutText:
      "شركة حلول تسويقية وتجارية مقرّها بغداد، متخصصة في التسويق الرقمي، إدارة حسابات التواصل الاجتماعي، إنتاج الفيديو، الطباعة، والتدريب. نساعد الشركات والمؤسسات على النمو وبناء حضور قوي من خلال استراتيجيات إبداعية ونتائج قابلة للقياس.",
    footerInstagramTitle: "منشورات إنستغرام",
    footerCopyright: "© 2024 دريم ميديا. جميع الحقوق محفوظة",

    // ====== زر التواصل العائم ======
    contactWhatsApp: "واتساب",
    contactEmail: "البريد الإلكتروني",
    contactPhone: "اتصال",

    // ====== زر البطل الثانوي ======
    heroWorkBtn: "شاهد أعمالنا",

    // ====== الريلز ======
    reelBadge: "ريل",

    // ====== شريط الدعوة للتواصل ======
    ctaEyebrow: "لنتحدث",
    ctaTitle: "لنبني حملتك القادمة معًا",
    ctaBtn: "راسلنا",

    // ====== روابط الفوتر السريعة ======
    footerLinksTitle: "روابط سريعة",

    // ====== عناصر واجهة المستخدم الإضافية ======
    closeButton: "إغلاق",
    previousButton: "السابق",
    nextButton: "التالي",
    viewImage: "عرض الصورة"
  }
};

// ============================================
// LANGUAGE TOGGLE FUNCTIONALITY
// ============================================
const langToggleBtn = document.getElementById("lang-toggle-btn");
const htmlTag = document.documentElement;

// Default Language: Arabic
let currentLang = localStorage.getItem("lang") || "ar";

/**
 * Update content based on selected language
 * @param {string} lang - Language code ('ar' or 'en')
 */
function updateContent(lang) {
  // Set page direction (RTL for Arabic, LTR for English)
  htmlTag.lang = lang;
  htmlTag.dir = lang === "ar" ? "rtl" : "ltr";

  // Update language toggle button text
  if (langToggleBtn) {
    langToggleBtn.textContent = lang === "ar" ? "EN" : "AR";
  }

  // ====== Navigation Menu ======
  const navHome = document.querySelector('[data-nav-link][href="#home"]');
  const navService = document.querySelector('[data-nav-link][href="#service"]');
  const navFeature = document.querySelector('[data-nav-link][href="#feature"]');
  const navProject = document.querySelector('[data-nav-link][href="#project"]');

  if (navHome) navHome.textContent = translations[lang].home;
  if (navService) navService.textContent = translations[lang].services;
  if (navFeature) navFeature.textContent = translations[lang].features;
  if (navProject) navProject.textContent = translations[lang].marketing;

  // ====== Book Now Button ======
  document.querySelectorAll("[data-book-text]").forEach((bookText) => {
    bookText.textContent = translations[lang].bookNow;
  });

  // ====== Hero Section ======
  const heroHeading = document.getElementById("hero-heading");
  if (heroHeading) {
    heroHeading.innerHTML = translations[lang].heroTitle;
  }

  const heroTextEl = document.querySelector(".hero-text");
  if (heroTextEl && translations[lang].heroText) {
    heroTextEl.textContent = translations[lang].heroText;
  }

  // ====== Services Section ======
  const serviceSection = document.getElementById("service");
  if (serviceSection) {
    const serviceSubtitle = serviceSection.querySelector(".section-subtitle");
    const serviceTitle = serviceSection.querySelector(".section-title");

    if (serviceSubtitle && translations[lang].servicesSubtitle) {
      serviceSubtitle.textContent = translations[lang].servicesSubtitle;
    }

    if (serviceTitle && translations[lang].servicesTitle) {
      serviceTitle.innerHTML = translations[lang].servicesTitle;
    }

    const serviceCardTitles = serviceSection.querySelectorAll(
      ".service-card .card-title"
    );
    const serviceKeys = [
      "serviceCard1",
      "serviceCard2",
      "serviceCard3",
      "serviceCard4",
      "serviceCard5",
      "serviceCard6",
      "serviceCard7"
    ];

    serviceCardTitles.forEach((el, idx) => {
      const key = serviceKeys[idx];
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });

    const moreSpan = serviceSection.querySelector(".link-card .span");
    if (moreSpan && translations[lang].serviceMoreLink) {
      moreSpan.textContent = translations[lang].serviceMoreLink;
    }
  }

  // ====== Features Section ======
  const featureSection = document.getElementById("feature");
  if (featureSection) {
    const featureSubtitle = featureSection.querySelector(".section-subtitle");
    const featureTitle = featureSection.querySelector(".section-title");

    if (featureSubtitle && translations[lang].featureSubtitle) {
      featureSubtitle.textContent = translations[lang].featureSubtitle;
    }

    if (featureTitle && translations[lang].featureTitle) {
      featureTitle.innerHTML = translations[lang].featureTitle;
    }

    const featureCards = featureSection.querySelectorAll(".feature-card");
    if (featureCards.length >= 3) {
      const [fastCard, teamCard, supportCard] = featureCards;

      const fastTitle = fastCard.querySelector(".card-title");
      const fastText = fastCard.querySelector(".card-text");
      if (fastTitle) fastTitle.textContent = translations[lang].featureFastTitle;
      if (fastText) fastText.textContent = translations[lang].featureFastText;

      const teamTitle = teamCard.querySelector(".card-title");
      const teamText = teamCard.querySelector(".card-text");
      if (teamTitle) teamTitle.textContent = translations[lang].featureTeamTitle;
      if (teamText) teamText.textContent = translations[lang].featureTeamText;

      const supportTitle = supportCard.querySelector(".card-title");
      const supportText = supportCard.querySelector(".card-text");
      if (supportTitle)
        supportTitle.textContent = translations[lang].featureSupportTitle;
      if (supportText)
        supportText.textContent = translations[lang].featureSupportText;
    }
  }

  // ====== Marketing Projects Section ======
  const marketingSection = document.getElementById("project");
  if (marketingSection) {
    const marketingSubtitle = marketingSection.querySelector(".section-subtitle");
    const marketingTitle = marketingSection.querySelector(".section-title");

    if (marketingSubtitle && translations[lang].marketingSubtitle) {
      marketingSubtitle.textContent = translations[lang].marketingSubtitle;
    }

    if (marketingTitle && translations[lang].marketingTitle) {
      marketingTitle.innerHTML = translations[lang].marketingTitle;
    }

    const sliderBtns = marketingSection.querySelectorAll(".slider-btn");
    sliderBtns.forEach((btn) => {
      btn.textContent = translations[lang].marketingButton;
    });
  }

  // ====== Partners Section ======
  const partnersSection = document.getElementById("partners");
  if (partnersSection) {
    const partnersSubtitle = partnersSection.querySelector(".section-subtitle");
    const partnersTitle = partnersSection.querySelector(".section-title");

    if (partnersSubtitle && translations[lang].partnersSubtitle) {
      partnersSubtitle.textContent = translations[lang].partnersSubtitle;
    }

    if (partnersTitle && translations[lang].partnersTitle) {
      partnersTitle.innerHTML = translations[lang].partnersTitle;
    }
  }

  // ====== Footer Section ======
  const footer = document.querySelector(".footer");
  if (footer) {
    const footerTitles = footer.querySelectorAll(".footer-list-title");
    if (footerTitles[0]) {
      footerTitles[0].textContent = translations[lang].footerAboutTitle;
    }
    if (footerTitles[1]) {
      footerTitles[1].textContent = translations[lang].footerInstagramTitle;
    }

    const footerTextEl = footer.querySelector(".footer-text");
    if (footerTextEl && translations[lang].footerAboutText) {
      footerTextEl.textContent = translations[lang].footerAboutText;
    }

    const copyrightEl = footer.querySelector(".copyright");
    if (copyrightEl && translations[lang].footerCopyright) {
      copyrightEl.textContent = translations[lang].footerCopyright;
    }
  }

  // ====== Floating Contact Menu ======
  const fcMenu = document.getElementById("fc-menu");
  if (fcMenu) {
    const labels = fcMenu.querySelectorAll(".fc-item span");
    const contactKeys = ["contactWhatsApp", "contactEmail", "contactPhone"];
    labels.forEach((el, idx) => {
      const key = contactKeys[idx];
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  // ====== Hero Secondary CTA ======
  const heroWorkBtn = document.querySelector("[data-hero-work-btn] span");
  if (heroWorkBtn && translations[lang].heroWorkBtn) {
    heroWorkBtn.textContent = translations[lang].heroWorkBtn;
  }

  // ====== Capability Marquee ======
  const marqueeKeys = {
    1: "serviceCard1",
    2: "serviceCard2",
    3: "serviceCard3",
    4: "serviceCard4",
    5: "serviceCard5",
    6: "serviceCard6",
    7: "serviceCard7"
  };
  document.querySelectorAll("[data-marquee-item]").forEach((el) => {
    const key = marqueeKeys[el.getAttribute("data-marquee-item")];
    if (key && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // ====== Reel Badges ======
  document.querySelectorAll("[data-reel-badge]").forEach((el) => {
    const icon = el.querySelector("ion-icon");
    el.textContent = translations[lang].reelBadge;
    if (icon) el.prepend(icon);
  });

  // ====== CTA Band ======
  const ctaEyebrow = document.querySelector("[data-cta-eyebrow]");
  const ctaTitle = document.querySelector("[data-cta-title]");
  const ctaBtn = document.querySelector("[data-cta-btn]");
  if (ctaEyebrow) ctaEyebrow.textContent = translations[lang].ctaEyebrow;
  if (ctaTitle) ctaTitle.textContent = translations[lang].ctaTitle;
  if (ctaBtn) ctaBtn.textContent = translations[lang].ctaBtn;

  // ====== Footer Quick Links ======
  const footerLinksTitle = document.querySelector("[data-footer-links-title]");
  if (footerLinksTitle) footerLinksTitle.textContent = translations[lang].footerLinksTitle;

  const quickLinkKeys = { home: "home", services: "services", features: "features", marketing: "marketing" };
  document.querySelectorAll("[data-footer-quick-link]").forEach((el) => {
    const key = quickLinkKeys[el.getAttribute("data-footer-quick-link")];
    if (key && translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  // Save language preference
  localStorage.setItem("lang", lang);
  currentLang = lang;
}

// Language Toggle Event Listener
if (langToggleBtn) {
  langToggleBtn.addEventListener("click", () => {
    const newLang = currentLang === "ar" ? "en" : "ar";
    updateContent(newLang);
  });
}

// Apply language on page load
updateContent(currentLang);

// ============================================
// MOBILE NAVIGATION TOGGLE
// ============================================
const navbarEl = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlayEl = document.querySelector(".overlay");

function toggleNavbar() {
  navbarEl.classList.toggle("active");
  if (overlayEl) overlayEl.classList.toggle("active");
  document.body.style.overflow = navbarEl.classList.contains("active") ? "hidden" : "";
}

if (navbarEl && navTogglers.length) {
  navTogglers.forEach((el) => {
    el.addEventListener("click", toggleNavbar);
  });
}

// Close mobile menu on Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && navbarEl && navbarEl.classList.contains("active")) {
    toggleNavbar();
  }
});

// Header scroll state and back-to-top visibility are handled by motion.js
// (they need to stay in sync with the Lenis-driven smooth scroll).

// ============================================
// THEME TOGGLE (Light / Dark Mode)
// ============================================
const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

// Swaps the Phosphor icon class rather than the button's text — writing
// textContent here would delete the <i> element the icon lives in.
// Light theme shows a moon (click = go dark), dark shows a sun.
function updateThemeIcon(theme) {
  const icon = themeToggle && themeToggle.querySelector("[data-theme-icon]");
  if (!icon) return;
  icon.classList.remove("ph-sun", "ph-moon");
  icon.classList.add(theme === "light" ? "ph-moon" : "ph-sun");
}

// Load saved theme
const savedTheme = localStorage.getItem("dream-theme");
if (savedTheme) root.setAttribute("data-theme", savedTheme);
updateThemeIcon(root.getAttribute("data-theme"));

// Theme toggle event listener
if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") === "light" ? "dark" : "light";
    root.setAttribute("data-theme", current);
    localStorage.setItem("dream-theme", current);
    updateThemeIcon(current);
  });
}

// ============================================
// AUTOMATIC COPYRIGHT YEAR
// ============================================
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ============================================
// SWIPER SLIDER (Marketing Projects)
// ============================================
const marketingSwiper = new Swiper(".marketing-slider", {
  slidesPerView: 1,
  spaceBetween: 25,
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false
  },
  navigation: {
    nextEl: ".marketing-next",
    prevEl: ".marketing-prev"
  },
  pagination: {
    el: ".marketing-pagination",
    clickable: true
  },
  breakpoints: {
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 }
  }
});

// Scroll-triggered reveal animation is handled by motion.js (GSAP ScrollTrigger).

// ============================================
// LIGHTBOX IMAGE VIEWER
// ============================================
(function () {
  const lightbox = document.getElementById("lightbox");
  if (!lightbox) return;

  const lbImg = lightbox.querySelector(".lightbox__img");
  const lbCaption = lightbox.querySelector(".lightbox__caption");
  const btnClose = lightbox.querySelector(".lightbox__close");
  const btnPrev = lightbox.querySelector(".lightbox__prev");
  const btnNext = lightbox.querySelector(".lightbox__next");

  // Only images explicitly marked with data-lightbox open the viewer.
  // This previously grabbed every <img> inside main, which meant clicking
  // the hero portrait (or a 30px service icon) opened a full-screen
  // gallery of the entire site.
  // Swiper's loop clones slides, so dedupe by src or the gallery repeats.
  const seenSrc = new Set();
  const galleryImages = Array.from(
    document.querySelectorAll("[data-lightbox]")
  ).filter((img) => {
    const src = img.getAttribute("src");
    if (seenSrc.has(src)) return false;
    seenSrc.add(src);
    return true;
  });
  if (galleryImages.length === 0) return;

  // Track currently opened image index
  let currentIndex = -1;

  function openAt(index) {
    const img = galleryImages[index];
    if (!img) return;
    currentIndex = index;
    lbImg.src = img.src;
    lbImg.alt = img.alt || "";
    lbCaption.textContent =
      img.getAttribute("data-caption") || img.alt || "";
    lightbox.classList.add("lightbox--open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lbImg.focus && lbImg.focus();
  }

  function close() {
    lightbox.classList.remove("lightbox--open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    currentIndex = -1;
  }

  function showNext() {
    if (currentIndex < 0) return;
    const next = (currentIndex + 1) % galleryImages.length;
    openAt(next);
  }

  function showPrev() {
    if (currentIndex < 0) return;
    const prev = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    openAt(prev);
  }

  // Delegated so Swiper's cloned loop slides work too — those clones are
  // created after this runs, so per-element listeners would miss them.
  // The clone and its original share a src, which is how we find the index.
  function indexOfSrc(src) {
    return galleryImages.findIndex((g) => g.getAttribute("src") === src);
  }

  document.addEventListener("click", (e) => {
    const img = e.target.closest && e.target.closest("[data-lightbox]");
    if (!img) return;
    const i = indexOfSrc(img.getAttribute("src"));
    if (i < 0) return;
    e.preventDefault();
    openAt(i);
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;
    const img = e.target.closest && e.target.closest("[data-lightbox]");
    if (!img) return;
    const i = indexOfSrc(img.getAttribute("src"));
    if (i >= 0) openAt(i);
  });

  // Applied to clones as well, hence the broad selector.
  document.querySelectorAll("[data-lightbox]").forEach((img) => {
    img.style.cursor = "zoom-in";
    img.setAttribute("tabindex", "0");
  });

  // Controls
  btnClose.addEventListener("click", close);
  btnNext.addEventListener("click", showNext);
  btnPrev.addEventListener("click", showPrev);

  // Close when clicking outside image content
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) close();
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    if (lightbox.getAttribute("aria-hidden") === "false") {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") showNext();
      if (e.key === "ArrowLeft") showPrev();
    }
  });

  // Preload adjacent images for smoother navigation
  function preload(src) {
    const img = new Image();
    img.src = src;
  }

  const obs = new MutationObserver(() => {
    if (currentIndex >= 0) {
      const next = (currentIndex + 1) % galleryImages.length;
      const prev = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
      preload(galleryImages[next].src);
      preload(galleryImages[prev].src);
    }
  });
  obs.observe(lightbox, { attributes: true, attributeFilter: ["class"] });
})();

// ============================================
// FLOATING CONTACT MENU
// ============================================
const fcToggle = document.getElementById("fc-toggle");
const fcMenu = document.getElementById("fc-menu");

if (fcToggle && fcMenu) {
  // Toggle menu on button click
  fcToggle.addEventListener("click", () => {
    fcMenu.classList.toggle("show");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (e) => {
    if (!fcToggle.contains(e.target) && !fcMenu.contains(e.target)) {
      fcMenu.classList.remove("show");
    }
  });
}

// ============================================
// END OF SCRIPT
// ============================================
