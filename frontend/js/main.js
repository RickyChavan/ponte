(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  // Mobile menu
  const btn = $('#menuBtn'), nav = $('#nav');
  const setMenu = open => {
    nav.classList.toggle('open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  btn.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
  nav.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('open')) { setMenu(false); btn.focus(); }
  });

  // Scroll reveal (skipped for reduced motion)
  const items = $$('.reveal');
  if ('IntersectionObserver' in window && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.12 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('in'));
  }

  // Contact form
  const form = $('#form'), done = $('#done');
  const panels = $$('[data-for]', form);
  const role = () => form.elements.role.value;

  const setRole = r => {
    panels.forEach(p => {
      const on = p.dataset.for === r;
      p.hidden = !on;
      p.style.display = on ? 'grid' : '';
      $$('input,select,textarea', p).forEach(i => { i.disabled = !on; });
    });
    clearErrors();
  };
  $$('input[name=role]', form).forEach(r => r.addEventListener('change', () => setRole(role())));
  $$('[data-role]').forEach(a => a.addEventListener('click', () => {
    const radio = $(`input[name=role][value=${a.dataset.role}]`, form);
    radio.checked = true; setRole(radio.value);
  }));

  const clearErrors = () => $$('.field.err', form).forEach(f => {
    f.classList.remove('err'); $('.msg', f).textContent = '';
    $$('input,select,textarea', f).forEach(i => { i.removeAttribute('aria-invalid'); i.removeAttribute('aria-describedby'); });
  });
  const fail = (key, text, list) => {
    const f = $(`[data-f=${key}]`, form), msg = $('.msg', f);
    msg.id = `err-${key}`;
    f.classList.add('err'); msg.textContent = text; list.push(f);
    $$('input,select,textarea', f).forEach(i => { i.setAttribute('aria-invalid', 'true'); i.setAttribute('aria-describedby', msg.id); });
  };

  const validate = () => {
    clearErrors();
    const bad = [], v = n => (form.elements[n]?.value || '').trim();
    if (!v('name')) fail('name', 'Please tell us your name.', bad);
    if (!v('email')) fail('email', 'Please enter your email.', bad);
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v('email'))) fail('email', 'Please enter a valid email, like name@company.com.', bad);
    if (role() === 'founder') {
      if (!v('company')) fail('company', 'Please enter your company name.', bad);
      if (!v('stage')) fail('stage', 'Please choose your stage and size.', bad);
      if (!$$('input[name=needs]:checked', form).length) fail('needs', "Pick at least one, or choose 'Not sure yet'.", bad);
    } else if (!v('expertise')) fail('expertise', 'Please tell us your area of expertise.', bad);
    if (!form.elements.consent.checked) fail('consent', 'Please tick this box so we can contact you.', bad);
    return bad;
  };

  form.addEventListener('submit', e => {
    e.preventDefault();
    if (form.elements.website.value) return; // honeypot
    const bad = validate();
    if (bad.length) { $('input,select,textarea', bad[0]).focus(); return; }
    // TODO: POST to the Python backend once it exists.
    const first = form.elements.name.value.trim().split(' ')[0];
    $('#doneName').textContent = first ? ', ' + first : '';
    form.style.display = 'none';
    done.classList.add('show');
    done.focus();
  });

  setRole(role());
})();
