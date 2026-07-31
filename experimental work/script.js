function showPage(pageId, event) {
    if (event) {
        event.preventDefault();
    }

    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active-page');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active-page');
    }

    const contentArea = document.querySelector('.content-area');
    if (contentArea) {
        contentArea.scrollTop = 0;
    }

    window.scrollTo({ top: 0, behavior: 'auto' });

    const links = document.querySelectorAll('#menu .sidebar-link');
    links.forEach(link => {
        link.classList.remove('active-link');
    });

    const targetLink = document.getElementById('link-' + pageId);
    if (targetLink) {
        targetLink.classList.add('active-link');
    }
}

const sidebarToggle = document.getElementById('sidebar-toggle');
const sidebarMenu = document.getElementById('menu');
const toggleIcon = sidebarToggle ? sidebarToggle.querySelector('.toggle-icon') : null;

if (sidebarToggle && sidebarMenu) {
    sidebarToggle.addEventListener('click', () => {
        const isClosed = sidebarMenu.classList.toggle('is-closed');
        sidebarToggle.classList.toggle('is-active', isClosed);

        if (toggleIcon) {
            toggleIcon.textContent = isClosed ? '☰' : '☰';
        }

        sidebarToggle.classList.remove('is-popping');
        void sidebarToggle.offsetWidth;
        sidebarToggle.classList.add('is-popping');

        window.setTimeout(() => {
            sidebarToggle.classList.remove('is-popping');
        }, 280);
    });
}

