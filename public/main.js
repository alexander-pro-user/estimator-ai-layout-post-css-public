function initHeader() {
    const menuBtn = document.getElementById('id-mobile-hamburger-button');
    const mobileMenu = document.getElementById('id-mobile-menu');
    const loginBtn = document.getElementById('id-login-button');
    const loginMobileBtn = document.getElementById('id-login-button-mobile');
    const logoBtn = document.getElementById('id-logo-button');
    const popupMenuButton = document.getElementById('id-popup-menu-button');
    const popupMenu = document.getElementById('id-popup-menu');
    const popupMenuCancelButton = document.getElementById('id-cancel-popup-button');

    if (menuBtn) {
        const menuIcon = menuBtn.querySelector('img');

        menuBtn.addEventListener('click', () => {
            if (!mobileMenu || !menuIcon) return;

            mobileMenu.classList.toggle('hidden');

            const isOpen = !mobileMenu.classList.contains('hidden');
            menuIcon.src = isOpen
                ? 'images/icons/close-mobile-hamburger-icon.svg'
                : 'images/icons/mobile-hamburger-icon.svg';
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            window.location.href = '/estimations.html';
        });
    }

    if (loginMobileBtn) {
        loginMobileBtn.addEventListener('click', () => {
            window.location.href = '/estimations.html';
        });
    }

    if (logoBtn) {
        logoBtn.addEventListener('click', () => {
            window.location.href = '/';
        });
    }

    if (popupMenuButton && popupMenu && popupMenuCancelButton) {
        popupMenuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            popupMenu.classList.toggle('hidden');
        });

        popupMenuCancelButton.addEventListener('click', (e) => {
            e.stopPropagation();
            popupMenu.classList.add('hidden');
        });

        document.addEventListener('click', (e) => {
            if (!popupMenu.contains(e.target) && !popupMenuButton.contains(e.target)) {
                popupMenu.classList.add('hidden');
            }
        });
    }
}

function initSelectForCountries() {
    const toggleBtn = document.getElementById('country-toggle');
    const dropdown = document.getElementById('country-dropdown');
    const phoneInput = document.getElementById('phone');

    if (!toggleBtn || !dropdown || !phoneInput) {
        console.warn('initSelectForCountries: some elements not found in DOM');
        return;
    }

    toggleBtn.addEventListener('click', () => {
        dropdown.classList.toggle('hidden');
    });

    dropdown.querySelectorAll('li').forEach((item) => {
        item.addEventListener('click', () => {
            const flag = item.getAttribute('data-flag');
            const code = item.getAttribute('data-code');
            const img = toggleBtn.querySelector('img');

            if (img) img.src = flag;
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

function initCollapseBlocks(){
    // Get all headers of collapsible blocks
    const collapseHeaders = document.querySelectorAll('.custom-form-collapse-header');

    collapseHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Find the parent element of the block
            const collapseBlock = this.closest('.custom-form-collapse');

            // Find the block body
            const collapseBody = collapseBlock.querySelector('.custom-form-collapse-body');

            // Checking current display status
            if (collapseBody.style.display === 'none') {
                // Разворачиваем блок
                collapseBody.style.display = 'block';
                collapseBlock.querySelector('.custom-form-collapse-header-image img:first-child').style.display = 'none';
                collapseBlock.querySelector('.custom-form-collapse-header-image img:last-child').style.display = 'inline';
            } else {
                // Collapse block
                collapseBody.style.display = 'none';
                collapseBlock.querySelector('.custom-form-collapse-header-image img:first-child').style.display = 'inline';
                collapseBlock.querySelector('.custom-form-collapse-header-image img:last-child').style.display = 'none';
            }
        });
    });

    // Initially hide block bodies
    const collapseBodies = document.querySelectorAll('.custom-form-collapse-body');
    collapseBodies.forEach(body => {
        body.style.display = 'none';
    });

    // Initially, we show the advantages and hide the disadvantages.
    const headerImages = document.querySelectorAll('.custom-form-collapse-header-image img');
    headerImages.forEach((img, index) => {
        if (index % 2 === 0) {
            img.style.display = 'inline';
        } else {
            img.style.display = 'none';
        }
    });
}