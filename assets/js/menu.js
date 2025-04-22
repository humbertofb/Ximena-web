// Abrir y cerrar menú hamburguesa
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const menuLinks = sideMenu.querySelectorAll('li');

function toggleMenu() {
  sideMenu.style.left = sideMenu.style.left === '0px' ? '-100%' : '0';
}

menuBtn.addEventListener('click', (e) => {
  e.stopPropagation();
  toggleMenu();
});

// Cerrar menú al hacer clic en un enlace
menuLinks.forEach(link => {
  link.addEventListener('click', () => {
    sideMenu.style.left = '-100%';
  });
});

// Cerrar menú al hacer clic fuera
document.addEventListener('click', (e) => {
  if (sideMenu.style.left === '0px' && !sideMenu.contains(e.target) && e.target.id !== 'menuBtn') {
    sideMenu.style.left = '-100%';
  }
});
