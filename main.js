'use strict';

const JETS = [
  {
    id: 'jet-1',
    name: 'Gulfstream G700',
    cat: 'heavy',
    seats: 19,
    range: '7,500 nm',
    speed: 'Mach 0.925',
    price: '$14,500 / hr',
    img: 'images/jet-1.jpg',
    desc: 'The pinnacle of long-range executive luxury. Features five customizable living areas, circadian lighting, ultra-low cabin altitude, and an extended aft stateroom with en-suite shower.',
    amen: ['Aft Master Suite', 'Full Gourmet Galley', 'Starlink Ka-Band Wi-Fi', 'En-suite Shower', 'Bespoke Lounge Seating']
  },
  {
    id: 'jet-2',
    name: 'Bombardier Global 7500',
    cat: 'heavy',
    seats: 17,
    range: '7,700 nm',
    speed: 'Mach 0.925',
    price: '$13,800 / hr',
    img: 'images/jet-2.jpg',
    desc: 'Industry flagship featuring four true architectural living spaces, patented Nuage ergonomic seating, a dedicated permanent crew suite, and unmatched non-stop global range.',
    amen: ['Principal Suite & Bed', 'Conference & Dining Suite', 'Ka-Band High Speed Wi-Fi', 'Dedicated Crew Suite', 'Sound Insulation']
  },
  {
    id: 'jet-3',
    name: 'Cessna Citation Longitude',
    cat: 'midsize',
    seats: 12,
    range: '3,500 nm',
    speed: 'Mach 0.84',
    price: '$7,200 / hr',
    img: 'images/jet-3.jpg',
    desc: 'Super-midsize perfection engineered with a stand-up flat floor, class-leading quiet cabin acoustics, and seamless transcontinental non-stop capabilities.',
    amen: ['Flat Floor Architecture', 'High-Speed Wi-Fi', 'Walk-in Baggage Access', 'Touch Cabin Controls', 'Full Refreshment Bar']
  },
  {
    id: 'jet-4',
    name: 'Embraer Phenom 300E',
    cat: 'light',
    seats: 8,
    range: '2,010 nm',
    speed: 'Mach 0.78',
    price: '$4,300 / hr',
    img: 'images/jet-4.jpg',
    desc: 'The best-selling light jet in the world for over a decade. Combines unrivaled speed, expansive cabin room, oversized windows, and exceptional fuel efficiency.',
    amen: ['Club Configuration', 'In-Flight Wi-Fi', 'Enclosed Private Lavatory', 'Class-Leading Luggage Bay', 'Bose Noise Cancelling']
  },
  {
    id: 'jet-5',
    name: 'Dassault Falcon 8X',
    cat: 'heavy',
    seats: 14,
    range: '6,450 nm',
    speed: 'Mach 0.90',
    price: '$11,900 / hr',
    img: 'images/jet-5.jpg',
    desc: 'Tri-jet engineering delivering incomparable landing agility at short airfields, paired with handcrafted French artisanal luxury and 33 panoramic windows.',
    amen: ['Tri-Jet Agility', 'Three-Zone Cabin', 'Lie-Flat Sleeping Berths', 'Full Forward Galley', 'High-Speed Global Wi-Fi']
  },
  {
    id: 'jet-6',
    name: 'HondaJet Elite II',
    cat: 'light',
    seats: 5,
    range: '1,547 nm',
    speed: 'Mach 0.75',
    price: '$3,200 / hr',
    img: 'images/jet-6.jpg',
    desc: 'Cutting-edge Over-The-Wing Engine Mount design provides a remarkably quiet and spacious passenger sanctuary for swift personal and executive point-to-point travel.',
    amen: ['Over-The-Wing Engine Quiet', 'Ergonomic Executive Club', 'Fully Private Lavatory', 'Bespoke Bongiovi Audio', 'Dual-Color Leather']
  }
];

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

// Professional card builder with enhanced layout & badges
function jetCard(j) {
  return `
  <article class="card reveal" data-cat="${j.cat}" data-id="${j.id}">
    <div class="jet-img">
      <div class="jet-img-placeholder">✈</div>
      <img src="${j.img}" alt="${j.name}" loading="lazy" onerror="this.style.display='none'">
      <span class="jet-category-badge">${j.cat}</span>
    </div>
    <div class="cbody">
      <h3>${j.name}</h3>
      <p class="desc-brief">${j.desc}</p>
      
      <div class="meta-grid">
        <div class="item">
          <small>Capacity</small>
          <b>👥 ${j.seats} Pax</b>
        </div>
        <div class="item">
          <small>Range</small>
          <b>🧭 ${j.range}</b>
        </div>
        <div class="item">
          <small>Speed</small>
          <b>⚡ ${j.speed}</b>
        </div>
      </div>
      
      <div class="cbody-footer">
        <div class="price-wrap">
          <small>Charter Rate</small>
          <span class="price">${j.price}</span>
        </div>
        <button class="btn sm ghost" data-details="${j.id}" aria-label="View specifications for ${j.name}">Explore</button>
      </div>
    </div>
  </article>`;
}

/* ==========================================================================
   Header Scroll State & Progress Bar
   ========================================================================== */
const hdr = $('.hdr');
const progressBar = $('.scroll-progress');
const backToTopBtn = $('.back-to-top');

function handleScroll() {
  const scrollY = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  
  if (hdr) hdr.classList.toggle('solid', scrollY > 40);
  
  if (progressBar && docHeight > 0) {
    const progress = (scrollY / docHeight) * 100;
    progressBar.style.width = `${progress}%`;
  }
  
  if (backToTopBtn) {
    backToTopBtn.classList.toggle('show', scrollY > 400);
  }
}

window.addEventListener('scroll', handleScroll, { passive: true });
handleScroll();

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* Mobile Navigation */
const burger = $('.burger');
const links = $('.links');

if (burger && links) {
  burger.addEventListener('click', () => {
    const isOpen = links.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', isOpen);
  });
  
  $$('.links a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', false);
    });
  });
}

/* Page Load Stagger Animation */
$$('.stagger').forEach(group => {
  [...group.children].forEach((child, index) => {
    child.style.setProperty('--i', index);
  });
});

/* Render Fleet Items */
const featuredContainer = $('#featured');
if (featuredContainer) {
  featuredContainer.innerHTML = JETS.filter(j => ['jet-1', 'jet-3', 'jet-4'].includes(j.id))
    .map(j => jetCard(j))
    .join('');
}

const bentoContainer = $('#bento');
if (bentoContainer) {
  bentoContainer.innerHTML = JETS.map(j => jetCard(j)).join('');
}

/* Intersection Observer for Smooth Scroll Reveal */
const io = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function observeElements() {
  $$('.reveal:not(.in)').forEach((el, index) => {
    el.style.setProperty('--i', (index % 4) + 1);
    io.observe(el);
  });
}
observeElements();

/* Dynamic Mouse Spotlight Glow on Cards */
document.addEventListener('pointermove', e => {
  const card = e.target.closest && e.target.closest('.card, .opt, .sbar, .cta, .mbox');
  if (!card) return;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  card.style.setProperty('--my', `${e.clientY - rect.top}px`);
});

/* Animated Counter Numbers */
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = +el.dataset.count;
    const startTime = performance.now();
    const duration = 2000;

    const updateCounter = currentTime => {
      const elapsed = Math.min((currentTime - startTime) / duration, 1);
      // Ease out cubic
      const progress = 1 - Math.pow(1 - elapsed, 3);
      el.textContent = Math.round(target * progress).toLocaleString();
      if (elapsed < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        el.textContent = target.toLocaleString();
      }
    };
    
    requestAnimationFrame(updateCounter);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

$$('[data-count]').forEach(el => counterObserver.observe(el));

/* Quick Search Form Handler */
const quickForm = $('#quickSearch');
if (quickForm) {
  const dateInput = $('input[name=date]', quickForm);
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
  }
  
  quickForm.addEventListener('submit', e => {
    e.preventDefault();
    const params = new URLSearchParams(new FormData(quickForm));
    location.href = `booking.html?${params.toString()}`;
  });
}

/* Fleet Filter Chips */
const filters = $('#filters');
if (filters && bentoContainer) {
  filters.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    
    $$('.chip', filters).forEach(c => c.classList.toggle('on', c === chip));
    const filter = chip.dataset.filter;
    let matchCount = 0;
    
    $$('.card', bentoContainer).forEach(card => {
      const matches = filter === 'all' || card.dataset.cat === filter;
      card.classList.toggle('hide', !matches);
      if (matches) matchCount++;
    });
    
    const emptyNotice = $('#empty');
    if (emptyNotice) emptyNotice.hidden = matchCount > 0;
  });
}

/* Aircraft Details Modal */
const modal = $('#modal');
if (modal) {
  const modalBody = $('#mbody');
  
  const closeModal = () => {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  };
  
  document.addEventListener('click', e => {
    const trigger = e.target.closest('[data-details]');
    if (trigger) {
      const jet = JETS.find(x => x.id === trigger.dataset.details);
      if (!jet) return;
      
      modalBody.innerHTML = `
        <div class="jet-img" style="aspect-ratio: 21/9;">
          <img src="${jet.img}" alt="${jet.name}" onerror="this.style.display='none'">
          <span class="jet-category-badge">${jet.cat} Jet</span>
        </div>
        <div class="mbody-content">
          <div style="display:flex;justify-content:space-between;align-items:flex-start;flex-wrap:wrap;gap:12px;margin-bottom:12px">
            <div>
              <span class="eyebrow" style="margin-bottom:6px">${jet.cat} Class</span>
              <h3>${jet.name}</h3>
            </div>
            <div class="price-wrap" style="text-align:right">
              <small>Charter Price</small>
              <span class="price" style="font-size:1.6rem">${jet.price}</span>
            </div>
          </div>
          
          <p class="lead" style="font-size:1.05rem;line-height:1.7;margin-bottom:24px">${jet.desc}</p>
          
          <div class="specs">
            <div><small>Guest Capacity</small><b>👥 ${jet.seats} Seats</b></div>
            <div><small>Maximum Range</small><b>🧭 ${jet.range}</b></div>
            <div><small>Cruising Speed</small><b>⚡ ${jet.speed}</b></div>
            <div><small>Hourly Rate</small><b class="price">${jet.price}</b></div>
          </div>
          
          <div class="amen-title">Bespoke Cabin Amenities</div>
          <div class="amen">${jet.amen.map(item => `<span>${item}</span>`).join('')}</div>
          
          <div style="display:flex;gap:16px;flex-wrap:wrap;margin-top:20px">
            <a class="btn" href="booking.html?jet=${jet.id}">Charter This Aircraft</a>
            <button class="btn ghost mclose-btn" type="button">Close Details</button>
          </div>
        </div>`;
      
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      return;
    }
    
    if (e.target === modal || e.target.closest('.mclose') || e.target.closest('.mclose-btn')) {
      closeModal();
    }
  });
  
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* Multi-Step Booking Wizard Logic */
const bookForm = $('#bookForm');
if (bookForm) {
  const steps = $$('.step', bookForm);
  const dots = $$('.dot');
  const progressBar = $('.prog i');
  const errorMsg = $('#err');
  const params = new URLSearchParams(location.search);
  const state = { trip: 'One way', jet: '' };
  let currentStep = 0;

  // Render Jet choices
  const jetOptsContainer = $('#jetOpts');
  if (jetOptsContainer) {
    jetOptsContainer.innerHTML = JETS.map(j => `
      <div class="opt" data-jet="${j.id}" tabindex="0" role="radio" aria-checked="false">
        <b>${j.name}</b>
        <small>👥 ${j.seats} Passengers · 🧭 ${j.range}</small>
        <div><span class="price">${j.price}</span></div>
      </div>
    `).join('');
  }

  // Pre-fill query parameters if present
  ['from', 'to', 'date', 'pax'].forEach(field => {
    if (params.get(field) && bookForm.elements[field]) {
      bookForm.elements[field].value = params.get(field);
    }
  });

  const dateInput = bookForm.elements['date'];
  if (dateInput) {
    dateInput.min = new Date().toISOString().split('T')[0];
  }

  function selectJet(id) {
    state.jet = id;
    $$('.opt').forEach(opt => {
      const isSelected = opt.dataset.jet === id;
      opt.classList.toggle('on', isSelected);
      opt.setAttribute('aria-checked', isSelected);
    });
  }

  if (params.get('jet')) {
    selectJet(params.get('jet'));
  }

  if (jetOptsContainer) {
    jetOptsContainer.addEventListener('click', e => {
      const opt = e.target.closest('.opt');
      if (opt) selectJet(opt.dataset.jet);
    });

    jetOptsContainer.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        const opt = e.target.closest('.opt');
        if (opt) {
          e.preventDefault();
          selectJet(opt.dataset.jet);
        }
      }
    });
  }

  const tripSeg = $('#tripSeg');
  if (tripSeg) {
    tripSeg.addEventListener('click', e => {
      const chip = e.target.closest('.chip');
      if (!chip) return;
      state.trip = chip.dataset.trip;
      $$('.chip', tripSeg).forEach(c => c.classList.toggle('on', c === chip));
    });
  }

  function renderStep(stepIndex) {
    currentStep = stepIndex;
    steps.forEach((step, idx) => step.classList.toggle('on', idx === stepIndex));
    dots.forEach((dot, idx) => dot.classList.toggle('on', idx <= stepIndex));
    
    if (progressBar) {
      progressBar.style.width = `calc((100% - 48px) * ${stepIndex / (dots.length - 1)})`;
    }

    const backBtn = $('#back');
    const nextBtn = $('#next');
    if (backBtn) backBtn.style.visibility = stepIndex === 0 ? 'hidden' : 'visible';
    if (nextBtn) {
      nextBtn.textContent = stepIndex === steps.length - 2 ? 'Submit Request ✦' : 'Continue →';
    }
    
    if (errorMsg) errorMsg.textContent = '';
    window.scrollTo({ top: bookForm.offsetTop - 110, behavior: 'smooth' });
  }

  function validateStep(stepIndex) {
    let isValid = true;
    let message = '';

    const currentStepEl = steps[stepIndex];
    $$('.in', currentStepEl).forEach(input => {
      const bad = !input.checkValidity() || (input.required && !input.value.trim());
      input.classList.toggle('err', bad);
      if (bad) {
        isValid = false;
        message = 'Please check and complete the required highlighted fields.';
      }
    });

    if (stepIndex === 1 && !state.jet) {
      isValid = false;
      message = 'Please select a preferred aircraft model to proceed.';
    }

    if (errorMsg) errorMsg.textContent = message;
    return isValid;
  }

  function buildSummary() {
    const f = bookForm.elements;
    const selectedJet = JETS.find(x => x.id === state.jet);
    const summaryRows = [
      ['Trip Type', state.trip],
      ['Routing', `${f.from.value} ✈ ${f.to.value}`],
      ['Departure Date', f.date.value],
      ['Passenger Count', `${f.pax.value} Guests`],
      ['Selected Jet', selectedJet ? selectedJet.name : 'Not chosen'],
      ['Estimated Rate', selectedJet ? selectedJet.price : '-'],
      ['Lead Passenger', f.name.value],
      ['Contact Details', `${f.email.value} · ${f.phone.value}`],
      ['Special Requests', f.notes.value.trim() ? f.notes.value : 'None specified']
    ];

    const sumContainer = $('#sum');
    if (sumContainer) {
      sumContainer.innerHTML = summaryRows
        .map(row => `<div><span>${row[0]}</span><b>${row[1]}</b></div>`)
        .join('');
    }
  }

  const nextBtn = $('#next');
  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (!validateStep(currentStep)) return;
      
      // Before reaching review step (index 3)
      if (currentStep === 2) {
        buildSummary();
      }
      
      // Submit action (on review step)
      if (currentStep === steps.length - 2) {
        const referenceCode = 'AUR-' + Math.random().toString(36).slice(2, 8).toUpperCase();
        const refEl = $('#ref');
        if (refEl) refEl.textContent = referenceCode;
        
        bookForm.classList.add('submitted');
        const progEl = $('.prog');
        const actionsEl = $('.actions', bookForm);
        if (progEl) progEl.hidden = true;
        if (actionsEl) actionsEl.hidden = true;
        
        steps.forEach(s => s.classList.remove('on'));
        const doneStep = $('#done');
        if (doneStep) doneStep.classList.add('on');
        
        window.scrollTo({ top: bookForm.offsetTop - 100, behavior: 'smooth' });
        return;
      }
      
      renderStep(currentStep + 1);
    });
  }

  const backBtn = $('#back');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      if (currentStep > 0) renderStep(currentStep - 1);
    });
  }

  bookForm.addEventListener('submit', e => e.preventDefault());
  $$('.in', bookForm).forEach(input => {
    input.addEventListener('input', () => input.classList.remove('err'));
  });

  renderStep(0);
}

/* ==========================================================================
   Toast Notification Helper
   ========================================================================== */
function showToast(message, icon = '✓') {
  let toast = $('#toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-msg"></span>`;
    document.body.appendChild(toast);
  }
  
  $('.toast-msg', toast).textContent = message;
  $('.toast-icon', toast).textContent = icon;
  toast.classList.add('show');
  
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4200);
}

/* ==========================================================================
   Newsletter Subscription Handler (All Pages)
   ========================================================================== */
$$('.newsletter-box').forEach(box => {
  box.addEventListener('submit', handleNewsletterSubmit);
  const btn = $('button', box);
  if (btn && box.tagName !== 'FORM') {
    btn.addEventListener('click', () => handleNewsletterSubmit(null, box));
  }
});

function handleNewsletterSubmit(e, boxEl) {
  if (e) e.preventDefault();
  const form = boxEl || (e && e.target);
  if (!form) return;
  
  const input = $('input[type=email]', form);
  if (!input) return;
  const email = input.value.trim();
  
  if (!email || !input.checkValidity()) {
    input.classList.add('err');
    showToast('Please enter a valid executive email address.', '⚠');
    return;
  }
  
  input.classList.remove('err');
  
  // Store subscribers in localStorage
  try {
    const list = JSON.parse(localStorage.getItem('aurum_subscribers') || '[]');
    if (!list.includes(email)) list.push(email);
    localStorage.setItem('aurum_subscribers', JSON.stringify(list));
  } catch (err) {
    console.warn(err);
  }

  input.value = '';
  showToast(`Welcome to AURUM Dispatch. Updates confirmed for ${email}`, '✦');
}

/* ==========================================================================
   Testimonials & Client Review Submission System
   ========================================================================== */
const DEFAULT_REVIEWS = [
  {
    stars: 5,
    text: 'Impeccable service from the initial charter brief to our arrival in Zurich. The cabin acoustics were whisper-quiet, enabling crucial executive briefings en route.',
    name: 'Layla Haddad',
    title: 'Managing Director, Meridian Capital',
    initials: 'LH'
  },
  {
    stars: 5,
    text: 'The flight team anticipated every subtle preference, from custom dietary requests to onward helicopter transfers in Monaco. AURUM is in a league of its own.',
    name: 'James Whitfield',
    title: 'Senior Partner, Whitfield & Co.',
    initials: 'JW'
  },
  {
    stars: 5,
    text: 'Punctual, discreet, and unmatched in terms of luxury finishes. Travelling with family and associates has never been so seamless and thoroughly enjoyable.',
    name: 'Omar Farouk',
    title: 'Chairman, Nile Ventures',
    initials: 'OF'
  }
];

function getStoredReviews() {
  try {
    const custom = JSON.parse(localStorage.getItem('aurum_reviews') || '[]');
    return [...DEFAULT_REVIEWS, ...custom];
  } catch (e) {
    return DEFAULT_REVIEWS;
  }
}

function renderReviews() {
  const container = $('#testimonialsGrid');
  if (!container) return;
  
  const reviews = getStoredReviews();
  container.innerHTML = reviews.map((r, idx) => `
    <div class="card quote reveal in" style="--i:${(idx % 3) + 1}">
      <div>
        <div class="quote-stars">${'★'.repeat(r.stars)}${'☆'.repeat(5 - r.stars)}</div>
        <p>“${r.text}”</p>
      </div>
      <div class="quote-author">
        <div class="quote-avatar">${r.initials || r.name.slice(0, 2).toUpperCase()}</div>
        <div class="quote-info">
          <b>${r.name}</b>
          <small>${r.title || 'Private Jet Charter Guest'}</small>
        </div>
      </div>
    </div>
  `).join('');
}
renderReviews();

// Review Modal Handling
const reviewModal = $('#reviewModal');
const openReviewBtn = $('#openReviewModal');
const closeReviewBtn = $('#closeReviewModal');
const reviewForm = $('#reviewForm');

if (openReviewBtn && reviewModal) {
  openReviewBtn.addEventListener('click', () => {
    reviewModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
}

if (closeReviewBtn && reviewModal) {
  closeReviewBtn.addEventListener('click', () => {
    reviewModal.classList.remove('open');
    document.body.style.overflow = '';
  });
  
  reviewModal.addEventListener('click', e => {
    if (e.target === reviewModal) {
      reviewModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
}

// Interactive Star Rating
let currentRating = 5;
const ratingContainer = $('#ratingInput');
if (ratingContainer) {
  const starButtons = $$('.star-btn', ratingContainer);
  
  function updateStars(rating, isHover = false) {
    starButtons.forEach(btn => {
      const val = +btn.dataset.val;
      if (isHover) {
        btn.classList.toggle('hover', val <= rating);
      } else {
        btn.classList.toggle('active', val <= rating);
      }
    });
  }
  
  updateStars(currentRating);
  
  starButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => updateStars(+btn.dataset.val, true));
    btn.addEventListener('mouseleave', () => starButtons.forEach(b => b.classList.remove('hover')));
    btn.addEventListener('click', () => {
      currentRating = +btn.dataset.val;
      updateStars(currentRating);
    });
  });
}

// Review Submission Handler
if (reviewForm) {
  reviewForm.addEventListener('submit', e => {
    e.preventDefault();
    const nameInput = $('input[name=revName]', reviewForm);
    const titleInput = $('input[name=revTitle]', reviewForm);
    const commentInput = $('textarea[name=revComment]', reviewForm);
    const errEl = $('#revErr');
    
    if (!nameInput.value.trim() || !commentInput.value.trim()) {
      if (errEl) errEl.textContent = 'Please fill out your name and experience details.';
      return;
    }
    
    const initials = nameInput.value.trim().split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'VIP';
    const newReview = {
      stars: currentRating,
      text: commentInput.value.trim(),
      name: nameInput.value.trim(),
      title: titleInput.value.trim() || 'Private Guest',
      initials: initials
    };
    
    try {
      const custom = JSON.parse(localStorage.getItem('aurum_reviews') || '[]');
      custom.unshift(newReview);
      localStorage.setItem('aurum_reviews', JSON.stringify(custom));
    } catch (err) {
      console.warn(err);
    }
    
    reviewForm.reset();
    currentRating = 5;
    if (ratingContainer) {
      $$('.star-btn', ratingContainer).forEach(b => b.classList.add('active'));
    }
    
    if (reviewModal) {
      reviewModal.classList.remove('open');
      document.body.style.overflow = '';
    }
    
    renderReviews();
    showToast('Thank you! Your testimonial has been published.', '★');
  });
}

/* ==========================================================================
   Support Page Handler (support.html)
   ========================================================================== */
const supportForm = $('#supportForm');
if (supportForm) {
  const successBox = $('#supportSuccess');
  const errEl = $('#supportErr');
  const ticketRefEl = $('#supportTicketRef');
  const resetBtn = $('#resetSupportForm');

  supportForm.addEventListener('submit', e => {
    e.preventDefault();
    const inputs = $$('.in', supportForm);
    let valid = true;
    
    inputs.forEach(i => {
      const bad = !i.checkValidity() || (i.required && !i.value.trim());
      i.classList.toggle('err', bad);
      if (bad) valid = false;
    });

    if (!valid) {
      if (errEl) errEl.textContent = 'Please fill out all required fields correctly.';
      return;
    }

    if (errEl) errEl.textContent = '';
    const ticketId = 'TKT-' + Math.floor(1000 + Math.random() * 9000);
    if (ticketRefEl) ticketRefEl.textContent = ticketId;

    supportForm.hidden = true;
    if (successBox) successBox.hidden = false;
    showToast(`Priority ticket ${ticketId} created. Response en route.`, '📞');
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      supportForm.reset();
      supportForm.hidden = false;
      if (successBox) successBox.hidden = true;
    });
  }
}

