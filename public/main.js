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

    document.querySelectorAll('.popup-filter').forEach(filter => {
        const btn = filter.querySelector('.popup-filter__button');
        const popupMenu = filter.querySelector('.popup-filter__popup');
        if (!btn || !popupMenu) return;

        popupMenu.innerHTML = popupHtml;

        const nameInput = popupMenu.querySelector('#nameFilter');

        const statusFilter = popupMenu.querySelector('#statusFilter');

        const timeSelect = popupMenu.querySelector('#timeFilter');
        const timeMin = popupMenu.querySelector('#timeFilterMin');
        const timeMax = popupMenu.querySelector('#timeFilterMax');

        const amountMin = popupMenu.querySelector('#amountMin');
        const amountMax = popupMenu.querySelector('#amountMax');
        const presets = popupMenu.querySelectorAll('.table-filter__preset');

        const applyBtn = popupMenu.querySelector('#applyFilter');
        const cancelBtn = popupMenu.querySelector('#cancelFilter');
        const clearBtn = popupMenu.querySelector('#clearFilter');

        /* Time select - inputs */
        if (timeSelect && timeMin && timeMax) {
            timeSelect.addEventListener('change', e => {
                const option = e.target.selectedOptions[0];
                timeMin.value = option.dataset.min || '';
                timeMax.value = option.dataset.max || '';
            });
        }

        /* Amount presets */
        presets.forEach(preset => {
            preset.addEventListener('click', () => {
                presets.forEach(p => p.classList.remove('table-filter__preset--active'));
                preset.classList.add('table-filter__preset--active');

                amountMin.value = preset.dataset.min || '';
                amountMax.value = preset.dataset.max || '';
            });
        });

        /* Manual time input disables select + min ≤ max */
        [timeMin, timeMax].forEach(input => {
            if (!input) return;
            input.addEventListener('input', () => {
                if (timeSelect) timeSelect.value = '';

                input.value = input.value.replace(/\D/g, '');

                const min = timeMin.value !== '' ? parseInt(timeMin.value, 10) : null;
                const max = timeMax.value !== '' ? parseInt(timeMax.value, 10) : null;

                if (input === timeMin && max !== null && min !== null && min > max) {
                    timeMax.value = min;
                }

                if (input === timeMax && max !== null && min !== null && max < min) {
                    timeMin.value = max;
                }
            });
        });

        /* Manual amount input disables presets + min ≤ max */
        [amountMin, amountMax].forEach(input => {
            if (!input) return;
            input.addEventListener('input', () => {
                presets.forEach(p => p.classList.remove('table-filter__preset--active'));

                let value = input.value
                    .replace(/[^0-9.]/g, '')
                    .replace(/^(\.)/, '')
                    .replace(/(\..*)\./g, '$1');

                input.value = value;

                const min = amountMin.value !== '' ? parseFloat(amountMin.value) : null;
                const max = amountMax.value !== '' ? parseFloat(amountMax.value) : null;

                if (input === amountMin && max !== null && min !== null && min > max) {
                    amountMax.value = min;
                }

                if (input === amountMax && max !== null && min !== null && max < min) {
                    amountMin.value = max;
                }
            });
        });

        /* Clear */
        if (clearBtn) {
            clearBtn.addEventListener('click', e => {
                e.stopPropagation();

                nameInput.value = '';
                timeSelect.value = '';
                timeMin.value = '';
                timeMax.value = '';
                amountMin.value = '';
                amountMax.value = '';
                statusFilter.value = '';

                presets.forEach(p => p.classList.remove('table-filter__preset--active'));
            });
        }

        /* Close */
        [applyBtn, cancelBtn].forEach(btn => {
            if (!btn) return;
            btn.addEventListener('click', e => {
                e.stopPropagation();
                popupMenu.classList.add('hidden');
            });
        });

        /* Toggle popup */
        btn.addEventListener('click', e => {
            e.stopPropagation();
            document.querySelectorAll('.popup-filter__popup')
                .forEach(p => p !== popupMenu && p.classList.add('hidden'));

            popupMenu.classList.toggle('hidden');
        });

        popupMenu.addEventListener('click', e => e.stopPropagation());
    });

    document.addEventListener('click', () => {
        document.querySelectorAll('.popup-filter__popup')
            .forEach(p => p.classList.add('hidden'));
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
        const openedModals = document.querySelectorAll('.custom-modal-overlay.open');

        if (isBodyOverflowReturn || openedModals.length === 0) {
            setTimeout(() => {
                if (!document.querySelector('.modal.open')) {
                    body.style.overflow = '';
                    body.style.paddingRight = '';
                }
            }, MODAL_ANIMATION_DURATION);
        }
    }
}