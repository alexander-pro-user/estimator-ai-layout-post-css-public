//header
function initHeader() {
    const menuBtn = document.getElementById('id-mobile-hamburger-button');
    const mobileMenu = document.getElementById('id-mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
}