// Switch between pages
function switchPage(pageId, element) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    // Show selected page
    document.getElementById(pageId).classList.add('active');

    // Update active nav link
    if (element) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => item.classList.remove('active'));
        element.classList.add('active');
    }

    // Close mobile menu
    document.getElementById('sidebar').classList.remove('active');
}

// Mobile Toggle
const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });
}

// Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you! Message sent.');
        contactForm.reset();
    });
}
