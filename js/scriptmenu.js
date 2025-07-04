/*Esta parte es para el boton de nav*/
var toggleMenu = document.querySelector('.toggle-menu');
var mainMenu = document.querySelector('.menulist');
var menuIcon = document.getElementById('menu-icon');

toggleMenu.addEventListener('click', function() {
    
    mainMenu.classList.toggle('menulist-active');

    
    if (mainMenu.classList.contains('menulist-active')) {
        menuIcon.src = 'assets/imagenes/svg/iconmenuclose.svg';
    } else {
        menuIcon.src = 'assets/imagenes/svg/iconmenu.svg';
    }

});


document.addEventListener("DOMContentLoaded", () => {
  const currentLocation = location.href.split('#')[0];

  document.querySelectorAll('.menuitems').forEach(item => {
    const link = item.querySelector('a');
    if (link && link.href.split('#')[0] === currentLocation) {
      item.classList.add('menu-colors');
    }
  });
});



window.addEventListener("DOMContentLoaded", () => {
  const hash = location.hash;

  if (!hash) return;

  const el = document.querySelector(hash);
  const colapsable = el?.closest(".collapse");

  if (colapsable) {
    new bootstrap.Collapse(colapsable, { toggle: true });

    setTimeout(() => {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 300);
  }
});


