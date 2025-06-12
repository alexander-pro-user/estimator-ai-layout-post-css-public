//header
function initHeader() {
    const menuBtn = document.getElementById('id-mobile-hamburger-button');
    const mobileMenu = document.getElementById('id-mobile-menu');
    const loginBtn = document.getElementById('id-login-button');
    const logoBtn = document.getElementById('id-logo-button');
    const popupMenuButton = document.getElementById('id-popup-menu-button');
    const popupMenu = document.getElementById('id-popup-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = '/estimations.html';
        })
    }

    if (logoBtn) {
        logoBtn.addEventListener('click', () => {
            window.location.href = '/';
        })
    }

    if (popupMenuButton && popupMenu) {
        popupMenuButton.addEventListener('click', () => {
            popupMenu.classList.remove('hidden');
        })
    }
}