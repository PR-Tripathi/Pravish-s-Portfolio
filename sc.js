
window.addEventListener('load', () => setTimeout(() => document.getElementById('loader').classList.add('done'), 950));

// ── Cursor (desktop only)
if(window.matchMedia('(pointer:fine)').matches) {
  const c = document.getElementById('cur'), r = document.getElementById('cur-r');
  let mx=0,my=0,rx=0,ry=0;
  document.addEventListener('mousemove', e => { mx=e.clientX; my=e.clientY; });
  (function tick(){
    rx+=(mx-rx)*.13; ry+=(my-ry)*.13;
    c.style.cssText = `left:${mx}px;top:${my}px`;
    r.style.cssText = `left:${rx}px;top:${ry}px`;
    requestAnimationFrame(tick);
  })();
}

// ── Nav solid on scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('solid', window.scrollY > 50);
window.addEventListener('scroll', onScroll, {passive:true});

// ── Hamburger
const ham = document.getElementById('ham');
const mob = document.getElementById('mob-menu');
ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mob.classList.toggle('open');
  document.body.style.overflow = mob.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mob-link').forEach(a => a.addEventListener('click', () => {
  ham.classList.remove('open'); mob.classList.remove('open');
  document.body.style.overflow = '';
}));

// ── Reveal on scroll
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('v'); });
}, {threshold:0.07, rootMargin:'0px 0px -36px 0px'});
document.querySelectorAll('.r').forEach(el => ro.observe(el));

// ── Skill bars
const so = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting) {
      const f = e.target.querySelector('.sk-fill'), l = e.target.dataset.level;
      if(f) setTimeout(() => f.style.width = l+'%', 180);
    }
  });
}, {threshold:0.35});
document.querySelectorAll('.skill-card').forEach(el => so.observe(el));

// ── Active nav link highlight
const secs = document.querySelectorAll('[id]');
const nls = document.querySelectorAll('.nav-links a:not(.btn-nav-cta):not(.btn-nav-resume)');
window.addEventListener('scroll', () => {
  let cur2='';
  secs.forEach(s => { if(window.scrollY >= s.offsetTop - 130) cur2=s.id; });
  nls.forEach(a => {
    const active = a.getAttribute('href') === '#'+cur2;
    a.classList.toggle('active', active);
  });
}, {passive:true});