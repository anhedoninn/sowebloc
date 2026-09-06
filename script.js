document.getElementById('year').textContent = new Date().getFullYear();

/* ---------- mobile menu ---------- */
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');
menuToggle.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  mobileMenu.setAttribute('aria-hidden', String(!isOpen));
});
mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  mobileMenu.classList.remove('is-open');
  menuToggle.setAttribute('aria-expanded', 'false');
  mobileMenu.setAttribute('aria-hidden', 'true');
}));

/* ---------- nav scroll state ---------- */
const nav = document.getElementById('siteNav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

/* ---------- cart drawer open/close ---------- */
const drawer = document.getElementById('drawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const bagToggle = document.getElementById('bagToggle');
const drawerClose = document.getElementById('drawerClose');

function openDrawer(){
  drawer.classList.add('is-open');
  drawerOverlay.classList.add('is-open');
  drawer.setAttribute('aria-hidden', 'false');
}
function closeDrawer(){
  drawer.classList.remove('is-open');
  drawerOverlay.classList.remove('is-open');
  drawer.setAttribute('aria-hidden', 'true');
}
bagToggle.addEventListener('click', openDrawer);
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDrawer(); });

/* ---------- bag state + drawer render ---------- */
const bagCountEl = document.getElementById('bagCount');
const drawerBody = document.getElementById('drawerBody');
let bagItems = [];

function renderDrawer(){
  if (bagItems.length === 0){
    drawerBody.innerHTML = '<p class="drawer__empty">Ваша корзина пуста.</p>';
    return;
  }
  drawerBody.innerHTML = '';
  bagItems.forEach(item => {
    const row = document.createElement('div');
    row.className = 'drawer__item';
    row.innerHTML = `
      <img src="${item.img}" alt="Studio Set, ${item.color}">
      <div>
        <div class="drawer__item-name">Studio Set</div>
        <div class="drawer__item-meta">Цвет: ${item.color} · Размер: ${item.size}</div>
        <div class="drawer__item-price">10.500 сом</div>
      </div>`;
    drawerBody.appendChild(row);
  });
}

/* ---------- shop cards: size select + add to bag ---------- */
document.querySelectorAll('.shop-card').forEach(card => {
  const sizeButtons = card.querySelectorAll('.size-pill');
  const addBtn = card.querySelector('.shop-card__add');
  const addLabel = addBtn.querySelector('.shop-card__add-label');
  const mainImg = card.querySelector('.shop-card__img--a');
  const colorName = card.dataset.colorName;
  let selectedSize = null;

  sizeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeButtons.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      selectedSize = btn.textContent.trim();
      addLabel.textContent = 'Добавить в корзину';
      addBtn.dataset.state = 'idle';
    });
  });

  addBtn.addEventListener('click', () => {
    if (!selectedSize){
      addLabel.textContent = 'Выберите размер';
      addBtn.animate(
        [{ transform: 'translateX(0)' }, { transform: 'translateX(-4px)' }, { transform: 'translateX(4px)' }, { transform: 'translateX(0)' }],
        { duration: 240 }
      );
      return;
    }
    bagItems.push({ color: colorName, size: selectedSize, img: mainImg.src });
    bagCountEl.textContent = bagItems.length;
    renderDrawer();

    addBtn.dataset.state = 'added';
    addLabel.textContent = 'Добавлено в корзину';
    setTimeout(() => {
      addBtn.dataset.state = 'idle';
      addLabel.textContent = 'Добавить в корзину';
    }, 1600);

    openDrawer();
  });
});

/* ---------- newsletter (front-end only) ---------- */
const newsletterForm = document.getElementById('newsletterForm');
const newsletterNote = document.getElementById('newsletterNote');
if (newsletterForm && newsletterNote){
  newsletterForm.addEventListener('submit', e => {
    e.preventDefault();
    newsletterNote.textContent = 'Вы в списке.';
    newsletterForm.reset();
  });
}

/* ---------- pause background video when reduced motion is requested ---------- */
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches){
  document.querySelectorAll('.hero video').forEach(v => v.pause());
}
