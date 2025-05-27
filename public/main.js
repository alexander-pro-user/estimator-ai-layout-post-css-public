//header
function initHeader() {
    const menuBtn = document.getElementById('id-mobile-hamburger-button');
    const mobileMenu = document.getElementById('id-mobile-menu');
    const loginBtn = document.getElementById('id-login-button');
    const logoBtn = document.getElementById('id-logo-button');


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
}