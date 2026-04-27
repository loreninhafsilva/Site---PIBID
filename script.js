  // ── Scroll reveal
  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(el => io.observe(el));

  

  // ── Smooth active link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href') === '#' + current ? 'var(--azul-brilho)' : '';
    });
  });

  // ── Stagger obj cards
  document.querySelectorAll('.obj-card').forEach((c, i) => {
    c.style.transitionDelay = (i * 0.07) + 's';
  });

  // ── Counter animation
  function animateCount(el, target, suffix = '') {
    let start = 0;
    const dur = 1500;
    const step = target / (dur / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { el.textContent = target + suffix; clearInterval(timer); }
      else el.textContent = Math.floor(start) + suffix;
    }, 16);
  }

  const statsObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        document.querySelectorAll('.stat-number').forEach(el => {
          const txt = el.textContent;
          if (txt === '3') animateCount(el, 3);
        });
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.5 });

  // ── Filters ──
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      document.querySelectorAll('#ativGrid .ativ-card').forEach(card => {
        card.classList.toggle('ativ-hidden', filter !== 'all' && card.dataset.area !== filter);
      });
    });
  });
