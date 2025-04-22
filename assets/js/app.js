// Navegación de páginas
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('.nav-link');

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.remove('active');
  });
  const pageToShow = document.getElementById(pageId);
  if (pageToShow) pageToShow.classList.add('active');
}

// Escuchar clics en enlaces
links.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetPage = e.target.getAttribute('data-target');
    showPage(targetPage);
  });
});

// Mostrar página principal por defecto
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});
