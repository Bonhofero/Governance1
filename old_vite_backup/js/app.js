// Login handling

document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const role=document.getElementById('roleSelect').value;

        const roleNames= {
            'operations': 'Operations Lead',
            'finance': 'Finance Director',
            'transformation': 'Transformation Officer'
        }

        ;

        document.getElementById('userRole').textContent=roleNames[role];
        document.getElementById('loginPage').style.display='none';
        document.getElementById('dashboard').classList.add('active');
    });

// Navigation
document.querySelectorAll('.nav-item').forEach(item=> {
        item.addEventListener('click', function() {
                const page=this.getAttribute('data-page');

                // Update active nav
                document.querySelectorAll('.nav-item').forEach(nav=> nav.classList.remove('active'));
                this.classList.add('active');

                // Update page
                document.querySelectorAll('.page-section').forEach(section=> section.classList.remove('active'));
                const targetPage=document.getElementById(page + 'Page');

                if (targetPage) {
                    targetPage.classList.add('active');
                }

                else {
                    console.warn('Page section not found:', page + 'Page');
                }
            });
    });

// Widget navigation links
document.querySelectorAll('[data-nav]').forEach(link=> {
        link.addEventListener('click', function(e) {
                e.preventDefault();
                const page=this.getAttribute('data-nav');
                const targetNav=document.querySelector(`.nav-item[data-page="${page}"]`);

                if (targetNav) {
                    targetNav.click();
                }

                else {
                    console.warn('Nav item not found for:', page);
                }
            });
    });

// Portfolio tabs
document.querySelectorAll('.portfolio-tab').forEach(tab=> {
        tab.addEventListener('click', function() {
                const target=this.getAttribute('data-tab');

                document.querySelectorAll('.portfolio-tab').forEach(t=> t.classList.remove('active'));
                this.classList.add('active');

                document.querySelectorAll('.portfolio-content').forEach(c=> c.classList.remove('active'));
                const targetTab=document.getElementById(target + 'Tab');

                if (targetTab) {
                    targetTab.classList.add('active');
                }

                else {
                    console.warn('Tab content not found for:', target + 'Tab');
                }
            });
    });