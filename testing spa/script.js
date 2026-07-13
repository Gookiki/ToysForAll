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

