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

function initSelectForCountries() {
    const toggleBtn = document.getElementById('country-toggle');
    const dropdown = document.getElementById('country-dropdown');
    const phoneInput = document.getElementById('phone');


    toggleBtn.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
    });


    dropdown.querySelectorAll('li').forEach((item) => {
        item.addEventListener('click', () => {
            const flag = item.getAttribute('data-flag');
            const code = item.getAttribute('data-code');

            toggleBtn.querySelector('img').src = flag;

            phoneInput.placeholder = `${code} (000) 000-0000`;

            dropdown.classList.add('hidden');
        });
    });

    document.addEventListener('click', (e) => {
        if (!toggleBtn.contains(e.target) && !dropdown.contains(e.target)) {
            dropdown.classList.add('hidden');
        }
    });
}