function initHeader() {
    const menuBtn = document.getElementById('id-mobile-hamburger-button');
    const mobileMenu = document.getElementById('id-mobile-menu');
    const loginBtn = document.getElementById('id-login-button');
    const loginMobileBtn = document.getElementById('id-login-button-mobile');
    const logoBtn = document.getElementById('id-logo-button');

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

        // Close the menu if you click outside the menu block
        document.addEventListener('click', e => {
            if (e.target.closest('#id-mobile-hamburger-button')) return;
            if (!mobileMenu.contains(e.target)) {
                mobileMenu.classList.add('hidden');

                const isOpen = !mobileMenu.classList.contains('hidden');
                menuIcon.src = isOpen
                    ? 'images/icons/close-mobile-hamburger-icon.svg'
                    : 'images/icons/mobile-hamburger-icon.svg';
            }
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

function initCollapseBlocks() {
    const collapseHeaders = document.querySelectorAll('.custom-form-collapse-header');

    collapseHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Find the parent element of the block
            const collapseBlock = this.closest('.custom-form-collapse');

            // Find the block body
            const collapseBody = collapseBlock.querySelector('.custom-form-collapse-body');

            // toggle active class
            collapseBlock.classList.toggle('custom-form-collapse--active');

            if (collapseBlock.classList.contains('custom-form-collapse--active')) {
                // Expand
                collapseBody.style.maxHeight = collapseBody.scrollHeight + 'px';
                collapseBlock.querySelector('.custom-form-collapse-header-image img:first-child').style.display = 'none';
                collapseBlock.querySelector('.custom-form-collapse-header-image img:last-child').style.display = 'inline';
            } else {
                // Collapse block
                collapseBody.style.maxHeight = '0';
                collapseBlock.querySelector('.custom-form-collapse-header-image img:first-child').style.display = 'inline';
                collapseBlock.querySelector('.custom-form-collapse-header-image img:last-child').style.display = 'none';
            }
        });
    });

    // Initial setup
    const collapseBodies = document.querySelectorAll('.custom-form-collapse-body');
    collapseBodies.forEach(body => {
        body.style.maxHeight = '0';
        body.style.overflow = 'hidden';
        body.style.transition = 'max-height 0.2s ease';
    });

    const headerImages = document.querySelectorAll('.custom-form-collapse-header-image img');
    headerImages.forEach((img, index) => {
        if (index % 2 === 0) {
            img.style.display = 'inline';
        } else {
            img.style.display = 'none';
        }
    });
}

async function initShowMorePopup() {
    const popupHtml = await fetch('/components/popup-menu.html')
        .then(r => r.text());

    const popupMenus = document.querySelectorAll('.popup-menu');

    popupMenus.forEach(el => {
        el.innerHTML = popupHtml;

        const cancelButton = el.querySelector('.cancel-popup-button');
        cancelButton.addEventListener('click', () => {
            el.classList.add('hidden');
        });
    });

    const buttons = document.querySelectorAll('.popup-menu-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            const popup = btn.nextElementSibling;

            popupMenus.forEach(p => {
                if (p !== popup) {
                    p.classList.add('hidden');
                }
            });

            popup.classList.toggle('hidden');
        });
    });

    document.addEventListener('click', e => {
        if (e.target.closest('.popup-menu-button')) return;

        popupMenus.forEach(popup => {
            if (!popup.contains(e.target)) {
                popup.classList.add('hidden');
            }
        });
    });
}

async function initPopupFilterEstimation() {
    const popupHtml = await fetch('/components/popup-filter-estimations.html')
        .then(r => r.text());

    const filters = document.querySelectorAll('.popup-filter');

    filters.forEach(filter => {
        const btn = filter.querySelector('.popup-filter__button');
        const popupMenu = filter.querySelector('.popup-filter__popup');
        if (!btn || !popupMenu) return;

        popupMenu.innerHTML = popupHtml;

        const cancelBtn = popupMenu.querySelector('#cancelFilter');
        const applyBtn = popupMenu.querySelector('#applyFilter');
        const clearBtn = popupMenu.querySelector('#clearFilter');

        const nameInput = popupMenu.querySelector('#nameFilter');
        const timeInput = popupMenu.querySelector('#timeFilter');
        const minInput = popupMenu.querySelector('#amountMin');
        const maxInput = popupMenu.querySelector('#amountMax');
        const presets = popupMenu.querySelectorAll('.table-filter__preset');

        [cancelBtn, applyBtn].forEach(btn => {
            if (!btn) return;
            btn.addEventListener('click', e => {
                e.stopPropagation();
                popupMenu.classList.add('hidden');
            });
        });

        if (clearBtn) {
            clearBtn.addEventListener('click', e => {
                e.stopPropagation();

                if (nameInput) nameInput.value = '';
                if (timeInput) timeInput.value = '';
                if (minInput) minInput.value = '';
                if (maxInput) maxInput.value = '';

                presets.forEach(p => p.classList.remove('table-filter__preset--active'));
            });
        }

        function normalizeAmountInput(input) {
            input.addEventListener('input', e => {
                let value = e.target.value;

                value = value.replace(',', '.');

                const parts = value.split('.');
                if (parts.length > 2) {
                    value = parts[0] + '.' + parts.slice(1).join('');
                }

                value = value.replace(/[^0-9.]/g, '');

                e.target.value = value;

                presets.forEach(p => p.classList.remove('table-filter__preset--active'));
            });
        }

        if (minInput) normalizeAmountInput(minInput);
        if (maxInput) normalizeAmountInput(maxInput);

        presets.forEach(preset => {
            preset.addEventListener('click', () => {
                presets.forEach(p => p.classList.remove('table-filter__preset--active'));
                preset.classList.add('table-filter__preset--active');

                if (minInput) minInput.value = preset.dataset.min || '';
                if (maxInput) maxInput.value = preset.dataset.max || '';
            });
        });

        btn.addEventListener('click', e => {
            e.stopPropagation();

            document.querySelectorAll('.popup-filter__popup').forEach(p => {
                if (p !== popupMenu) p.classList.add('hidden');
            });

            popupMenu.classList.toggle('hidden');
        });

        popupMenu.addEventListener('click', e => e.stopPropagation());
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.popup-filter__popup').forEach(popup => {
            popup.classList.add('hidden');
        });
    });
}

async function initShowMorePopupSupportRequests() {
    const popupHtml = await fetch('/components/popup-menu-support-requests.html')
        .then(r => r.text());

    const popupMenus = document.querySelectorAll('.popup-menu');

    popupMenus.forEach(el => {
        el.innerHTML = popupHtml;

        const cancelButton = el.querySelector('.cancel-popup-button');
        cancelButton.addEventListener('click', () => {
            el.classList.add('hidden');
        });
    });

    const buttons = document.querySelectorAll('.popup-menu-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            const popup = btn.nextElementSibling;

            popupMenus.forEach(p => {
                if (p !== popup) {
                    p.classList.add('hidden');
                }
            });

            popup.classList.toggle('hidden');
        });
    });

    document.addEventListener('click', e => {
        if (e.target.closest('.popup-menu-button')) return;

        popupMenus.forEach(popup => {
            if (!popup.contains(e.target)) {
                popup.classList.add('hidden');
            }
        });
    });
}

async function initShowMoreEstimationPagePopup() {
    const popupHtml = await fetch('/components/popup-menu-estimation-page.html')
        .then(r => r.text());

    const popupMenus = document.querySelectorAll('.popup-menu-page');

    popupMenus.forEach(el => {
        el.innerHTML = popupHtml;

        const cancelButton = el.querySelector('.cancel-popup-button');
        cancelButton.addEventListener('click', () => {
            el.classList.add('hidden');
        });
    });

    const buttons = document.querySelectorAll('.popup-menu-page-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            const popup = btn.nextElementSibling;

            popupMenus.forEach(p => {
                if (p !== popup) {
                    p.classList.add('hidden');
                }
            });

            popup.classList.toggle('hidden');
        });
    });

    document.addEventListener('click', e => {
        if (e.target.closest('.popup-menu-page-button')) return;

        popupMenus.forEach(popup => {
            if (!popup.contains(e.target)) {
                popup.classList.add('hidden');
            }
        });
    });
}

async function initShowMoreEstimationPageItemPopup() {
    const popupHtml = await fetch('/components/popup-menu-estimation-page-item.html')
        .then(r => r.text());

    const popupMenus = document.querySelectorAll('.popup-menu');

    popupMenus.forEach(el => {
        el.innerHTML = popupHtml;

        const cancelButton = el.querySelector('.cancel-popup-button');
        cancelButton.addEventListener('click', () => {
            el.classList.add('hidden');
        });
    });

    const buttons = document.querySelectorAll('.popup-menu-button');
    buttons.forEach(btn => {
        btn.addEventListener('click', e => {
            const popup = btn.nextElementSibling;

            popupMenus.forEach(p => {
                if (p !== popup) {
                    p.classList.add('hidden');
                }
            });

            popup.classList.toggle('hidden');
        });
    });

    document.addEventListener('click', e => {
        if (e.target.closest('.popup-menu-button')) return;

        popupMenus.forEach(popup => {
            if (!popup.contains(e.target)) {
                popup.classList.add('hidden');
            }
        });
    });
}

function resetAllModalBodiesScroll() {
    document.querySelectorAll('.custom-modal-body').forEach(el => {
        el.scrollTop = 0;
    });
}

function getScrollbarWidth() {
    return window.innerWidth - document.documentElement.clientWidth;
}

const MODAL_ANIMATION_DURATION = 200;

function openModal(show, idModal, event = null, isBodyOverflowReturn = true) {
    if (event) event.preventDefault();

    const modal = idModal && document.getElementById(idModal);
    if (!modal) return;

    const body = document.body;

    if (show) {
        const scrollbarWidth = getScrollbarWidth();

        modal.classList.add('open');
        body.style.overflow = 'hidden';

        if (scrollbarWidth > 0) {
            body.style.paddingRight = `${scrollbarWidth}px`;
        }

        resetAllModalBodiesScroll();
    } else {
        modal.classList.remove('open');

        if (isBodyOverflowReturn) {
            setTimeout(() => {
                if (!document.querySelector('.modal.open')) {
                    body.style.overflow = '';
                    body.style.paddingRight = '';
                }
            }, MODAL_ANIMATION_DURATION);
        }
    }
}