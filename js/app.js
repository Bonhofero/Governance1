// Mock User Data
const USERS = [
    {
        email: "elena.andersson@eskilstuna.se",
        password: "demo1234",
        name: "Elena Andersson",
        title: "Chief Digital Officer",
        initials: "EA"
    },
    {
        email: "arthur.bergstrom@eskilstuna.se",
        password: "demo1234",
        name: "Arthur Bergström",
        title: "Operations Lead",
        initials: "AB"
    },
    {
        email: "lars.lindqvist@eskilstuna.se",
        password: "demo1234",
        name: "Lars Lindqvist",
        title: "Finance Director",
        initials: "LL"
    }
];

// Login handling
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const usernameInput = document.getElementById('usernameInput').value.trim();
    const passwordInput = document.getElementById('passwordInput').value;
    const errorMsg = document.getElementById('loginError');

    // Auto-append domain if not present
    let email = usernameInput;
    if (!email.includes("@")) {
        email = email + "@eskilstuna.se";
    }

    // Find user
    const user = USERS.find(u => u.email === email && u.password === passwordInput);

    if (user) {
        // Hide error if previously shown
        errorMsg.style.display = 'none';

        // Update UI with user info
        document.getElementById('userRole').textContent = user.title;
        document.getElementById('userAvatar').textContent = user.initials;

        // Transition to dashboard
        document.getElementById('loginPage').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');

        // Reset form
        e.target.reset();
    } else {
        // Show error
        errorMsg.textContent = "Invalid username or password. Please try again.";
        errorMsg.style.display = 'block';
    }
});

// Logout handling
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function () {
        // Transition back to login
        document.getElementById('dashboard').classList.remove('active');
        document.getElementById('loginPage').style.display = 'flex';

        // Reset to home page on next login
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        document.querySelector('.nav-item[data-page="home"]').classList.add('active');

        document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
        document.getElementById('homePage').classList.add('active');
    });
}

// Navigation
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function () {
        const page = this.getAttribute('data-page');

        // Update active nav
        document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
        this.classList.add('active');

        // Update page
        document.querySelectorAll('.page-section').forEach(section => section.classList.remove('active'));
        const targetPage = document.getElementById(page + 'Page');

        if (targetPage) {
            targetPage.classList.add('active');
        }

        else {
            console.warn('Page section not found:', page + 'Page');
        }
    });
});

// Widget navigation links
document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const page = this.getAttribute('data-nav');
        const targetNav = document.querySelector(`.nav-item[data-page="${page}"]`);

        if (targetNav) {
            targetNav.click();
        }

        else {
            console.warn('Nav item not found for:', page);
        }
    });
});

// Portfolio tabs
document.querySelectorAll('.portfolio-tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const target = this.getAttribute('data-tab');

        document.querySelectorAll('.portfolio-tab').forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        document.querySelectorAll('.portfolio-content').forEach(c => c.classList.remove('active'));
        const targetTab = document.getElementById(target + 'Tab');

        if (targetTab) {
            targetTab.classList.add('active');
        }

        else {
            console.warn('Tab content not found for:', target + 'Tab');
        }
    });
});