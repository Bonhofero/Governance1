// Mock User Data
const USERS = [
    {
        email: "elena.andersson@eskilstuna.se",
        password: "demo1234",
        name: "Elena Andersson",
        title: "Chief Digital Officer",
        initials: "EA",
        roleKey: "cdo"
    },
    {
        email: "arthur.bergstrom@eskilstuna.se",
        password: "demo1234",
        name: "Arthur Bergstr\u00f6m",
        title: "Operations Lead",
        initials: "AB",
        roleKey: "operations"
    },
    {
        email: "lars.lindqvist@eskilstuna.se",
        password: "demo1234",
        name: "Lars Lindqvist",
        title: "Finance Director",
        initials: "LL",
        roleKey: "finance"
    }
];

const DASHBOARD_CONTENT = {
    cdo: {
        header: `<h1>Dashboard Overview</h1><p>Real-time insights into your digital infrastructure</p>`,
        kpis: `<div class="kpi-card"><div class="kpi-label">Total Active Systems</div><div class="kpi-value">247</div><div class="kpi-trend">Across 12 departments</div></div><div class="kpi-card danger"><div class="kpi-label">Systems at Risk</div><div class="kpi-value">34</div><div class="kpi-trend up">\u2191 6 from last month</div></div><div class="kpi-card warning"><div class="kpi-label">Maintenance vs Development</div><div class="kpi-value">87%</div><div class="kpi-trend">Target: 60% maintenance</div></div><div class="kpi-card success"><div class="kpi-label">Innovation Initiatives</div><div class="kpi-value">23</div><div class="kpi-trend down">\u2193 3 completed this quarter</div></div>`,
        widgets: `<div class="widget"><div class="widget-header"><h3>Risk Heatmap Preview</h3><a class="widget-link" data-nav="risk">View Full \u2192</a></div><div style="height: 200px; background: var(--gray-50); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--gray-600);">\ud83d\udd34 Critical: 8 | \ud83d\udfe1 Monitor: 14 | \ud83d\udfe2 Safe: 225 </div></div><div class="widget"><div class="widget-header"><h3>Portfolio Health</h3><a class="widget-link" data-nav="portfolio">View All \u2192</a></div><div style="height: 200px; background: var(--gray-50); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.9rem;"><div><strong>Quick Wins:</strong>8 initiatives</div><div><strong>Moonshots:</strong>4 initiatives</div><div><strong>Enterprise Anchors:</strong>6 initiatives</div><div><strong>Kill Zone:</strong>2 initiatives</div></div></div><div class="widget"><div class="widget-header"><h3>Recent Incidents</h3><a class="widget-link">View All \u2192</a></div><div style="display: flex; flex-direction: column; gap: 0.75rem;"><div style="padding: 0.75rem; background: var(--gray-50); border-radius: 6px; font-size: 0.85rem;"><strong>CRM System</strong>- Connection timeout <div style="color: var(--gray-600); margin-top: 0.25rem;">2 hours ago</div></div><div style="padding: 0.75rem; background: var(--gray-50); border-radius: 6px; font-size: 0.85rem;"><strong>HR Portal</strong>- Authentication error <div style="color: var(--gray-600); margin-top: 0.25rem;">1 day ago</div></div></div></div>`
    },
    operations: {
        header: `<h1>Operations Overview</h1><p>System stability & incident monitoring</p>`,
        kpis: `<div class="kpi-card danger"><div class="kpi-label">Critical Incidents</div><div class="kpi-value">2</div><div class="kpi-trend up">Attention needed</div></div><div class="kpi-card warning"><div class="kpi-label">Systems at Risk</div><div class="kpi-value">34</div><div class="kpi-trend up">\u2191 6 from last month</div></div><div class="kpi-card success"><div class="kpi-label">Uptime Average</div><div class="kpi-value">99.9%</div><div class="kpi-trend">Target: 99.5%</div></div><div class="kpi-card"><div class="kpi-label">Pending Updates</div><div class="kpi-value">14</div><div class="kpi-trend">Scheduled for weekend</div></div>`,
        widgets: `<div class="widget"><div class="widget-header"><h3>Risk Heatmap Preview</h3><a class="widget-link" data-nav="risk">View Full \u2192</a></div><div style="height: 200px; background: var(--gray-50); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--gray-600);">\ud83d\udd34 Critical: 8 | \ud83d\udfe1 Monitor: 14 | \ud83d\udfe2 Safe: 225 </div></div><div class="widget"><div class="widget-header"><h3>Server Load Average</h3><a class="widget-link">View Nodes \u2192</a></div><div style="height: 200px; background: var(--gray-50); border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0.5rem; font-size: 0.9rem;"><div><strong>Web Tier:</strong> 45% CPU</div><div><strong>DB Tier:</strong> 62% CPU</div><div><strong>Auth Services:</strong> 28% CPU</div></div></div><div class="widget"><div class="widget-header"><h3>Recent Incidents</h3><a class="widget-link">View All \u2192</a></div><div style="display: flex; flex-direction: column; gap: 0.75rem;"><div style="padding: 0.75rem; background: var(--gray-50); border-radius: 6px; font-size: 0.85rem;"><strong>CRM System</strong>- Connection timeout <div style="color: var(--gray-600); margin-top: 0.25rem;">2 hours ago</div></div><div style="padding: 0.75rem; background: var(--gray-50); border-radius: 6px; font-size: 0.85rem;"><strong>HR Portal</strong>- Authentication error <div style="color: var(--gray-600); margin-top: 0.25rem;">1 day ago</div></div></div></div>`
    },
    finance: {
        header: `<h1>Finance Overview</h1><p>IT budget & cost optimization analysis</p>`,
        kpis: `<div class="kpi-card warning"><div class="kpi-label">Total IT Spend (YTD)</div><div class="kpi-value">84.2M kr</div><div class="kpi-trend">7% over target</div></div><div class="kpi-card success"><div class="kpi-label">Identified Savings</div><div class="kpi-value">1.2M kr</div><div class="kpi-trend up">\u2191 Cloud optimization</div></div><div class="kpi-card danger"><div class="kpi-label">Shadow IT Est.</div><div class="kpi-value">4.5M kr</div><div class="kpi-trend up">\u2191 15% increase</div></div><div class="kpi-card"><div class="kpi-label">New Investments</div><div class="kpi-value">12.5M kr</div><div class="kpi-trend down">Across 5 projects</div></div>`,
        widgets: `<div class="widget"><div class="widget-header"><h3>Budget Burn Rate</h3><a class="widget-link" data-nav="financial">View Full \u2192</a></div><div style="height: 200px; background: var(--gray-50); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: var(--gray-600);">Monthly Spend: 8.4M kr / Tracker: On Pace </div></div><div class="widget"><div class="widget-header"><h3>Top Cost Centers</h3><a class="widget-link">View All \u2192</a></div><div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 1rem;"><div style="padding: 0.75rem; background: var(--gray-50); border-radius: 6px; font-size: 0.85rem;"><strong>1. Enterprise Resource Planning</strong>- 35M kr / yr <div style="color: var(--gray-600); margin-top: 0.25rem;">Licensing & Support</div></div><div style="padding: 0.75rem; background: var(--gray-50); border-radius: 6px; font-size: 0.85rem;"><strong>2. Cloud Infrastructure</strong>- 22M kr / yr <div style="color: var(--gray-600); margin-top: 0.25rem;">AWS/Azure Managed Services</div></div></div></div>`
    }
};

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

        // Inject Role-Specific Dashboard Content directly into the layout without nesting
        if (DASHBOARD_CONTENT[user.roleKey]) {
            const content = DASHBOARD_CONTENT[user.roleKey];
            const homePage = document.getElementById('homePage');
            if (homePage) {
                const header = homePage.querySelector('.page-header');
                if (header) header.innerHTML = content.header;

                const kpis = homePage.querySelector('.kpi-grid');
                if (kpis) kpis.innerHTML = content.kpis;

                const widgets = homePage.querySelector('.widget-grid');
                if (widgets) widgets.innerHTML = content.widgets;
            }
        }

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

// --- Discovery & Sweep Module ---

const INFRA_DATA = {
    stats: {
        assets: 14352,
        nodes: 745,
        software: 1891,
        risk: "Elevated"
    },
    clusters: [
        {
            id: 'citizen',
            label: 'Citizen Access & Identity',
            color: '#10b981', // green-500
            nodes: [
                { label: 'BankID 4.0 API', status: 'active' },
                { label: 'Open ID Connect', status: 'active' },
                { label: 'Public Portal Node', status: 'active' },
                { label: 'SAML Identity Provider', status: 'active' },
                { label: 'Electronic Payment GW', status: 'active' }
            ]
        },
        {
            id: 'ops',
            label: 'Municipal Operations',
            color: '#f59e0b', // amber-500
            nodes: [
                { label: 'LMS School Server', status: 'active' },
                { label: 'GIS Spatial DB', status: 'active' },
                { label: 'Social Care Platform', status: 'warning' },
                { label: 'IoT Traffic Controller', status: 'active' },
                { label: 'Street Lighting Hub', status: 'active' }
            ]
        },
        {
            id: 'admin',
            label: 'Administrative Backbone',
            color: '#3b82f6', // blue-500
            nodes: [
                { label: 'Unit4 Business World', status: 'active' },
                { label: 'Personec HR System', status: 'active' },
                { label: 'Finance Oracle DB', status: 'critical' },
                { label: 'Exchange Online Sync', status: 'active' },
                { label: 'Case Routing Engine', status: 'active' }
            ]
        },
        {
            id: 'tech',
            label: 'Technical Base',
            color: '#a855f7', // purple-500
            nodes: [
                { label: 'Cisco Nexus Core', status: 'active' },
                { label: 'PureStorage FlashArray', status: 'active' },
                { label: 'Unauthorized Bridge', status: 'critical' },
                { label: 'LoRaWAN Gateway', status: 'active' },
                { label: 'Cloud Hybrid Gateway', status: 'active' }
            ]
        }
    ],
    logs: [
        { type: 'critical', msg: '3x Windows Server 2012 found (EOL) in Social Services V-LAN' },
        { type: 'warning', msg: 'Unauthorized IoT Bridge detected: Subnet 10.42.12.0/24' },
        { type: 'info', msg: 'Fiber Backbone throughput optimized (98.2% efficiency)' },
        { type: 'critical', msg: 'Legacy SQL Instance (v2008) discovered in Finance Archive' },
        { type: 'warning', msg: 'Certificate expiry in 14 days: citizen-portal-ext.se' },
        { type: 'success', msg: 'BankID 4.0 Integration verified across all nodes' }
    ]
};

function initLandscapeModule() {
    const sweepBtn = document.getElementById('startSweepBtn');
    const overlay = document.getElementById('sweepOverlay');
    const progressBar = document.getElementById('sweepProgress');
    const statusText = document.getElementById('sweepStatus');
    const sweepLog = document.getElementById('sweepLog');
    const container = document.getElementById('landscapeContainer');
    const securityLog = document.getElementById('securityLog');

    if (!sweepBtn || sweepBtn.dataset.initialized) return;
    sweepBtn.dataset.initialized = "true";

    sweepBtn.addEventListener('click', () => {
        // Start Sweep Animation
        overlay.classList.remove('hidden');
        let progress = 0;
        const messages = [
            "Pinging Subnet 10.0.0.0/8...",
            "Discovered 4 major clusters...",
            "Mapping logical dependencies...",
            "Validating software signatures...",
            "Correlating asset IDs...",
            "Finalizing topology export..."
        ];

        const interval = setInterval(() => {
            progress += 1.5;
            if (progress > 100) progress = 100;
            progressBar.style.width = `${progress}%`;

            const msgIndex = Math.floor((progress / 100) * (messages.length - 1));
            if (messages[msgIndex]) {
                statusText.textContent = messages[msgIndex];
                sweepLog.textContent = `[UDP/TCP SCAN] ${Math.random().toString(16).slice(2, 10)}: Found node...`;
            }

            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    container.classList.remove('opacity-40');
                    renderTopology();
                    populateStats();
                    startSecurityLog();
                }, 800);
            }
        }, 30);
    });
}

function renderTopology() {
    const svg = document.getElementById('topologySvg');
    if (!svg) return;
    svg.innerHTML = ''; // Clear previous

    const width = 800;
    const height = 600;
    const centerX = width / 2;
    const centerY = height / 2;
    const clusterRadius = 180;

    // Create central "Municipality Hub"
    const hub = createNode(centerX, centerY, 40, '#1e293b', 'SMART CITY CORE', 'active', true);
    svg.appendChild(hub);

    INFRA_DATA.clusters.forEach((cluster, i) => {
        const angle = (i / INFRA_DATA.clusters.length) * Math.PI * 2;
        const cx = centerX + Math.cos(angle) * clusterRadius;
        const cy = centerY + Math.sin(angle) * clusterRadius;

        // Draw connection to hub
        svg.appendChild(createLine(centerX, centerY, cx, cy));

        // Draw Cluster Node
        svg.appendChild(createNode(cx, cy, 30, cluster.color, cluster.label, 'active', true));

        // Draw sub-nodes
        cluster.nodes.forEach((node, j) => {
            const subAngle = angle - 0.5 + (j / (cluster.nodes.length - 1)) * 1.0;
            const sx = cx + Math.cos(subAngle) * 85;
            const sy = cy + Math.sin(subAngle) * 85;

            svg.appendChild(createLine(cx, cy, sx, sy));
            svg.appendChild(createNode(sx, sy, 12, cluster.color, node.label, node.status));
        });
    });

    // Add scanning line animation to SVG
    const scanLine = document.createElementNS("http://www.w3.org/2000/svg", "line");
    scanLine.setAttribute('x1', '0');
    scanLine.setAttribute('y1', '0');
    scanLine.setAttribute('x2', '800');
    scanLine.setAttribute('y2', '0');
    scanLine.setAttribute('stroke', 'rgba(20, 184, 166, 0.2)');
    scanLine.setAttribute('stroke-width', '40');

    const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate.setAttribute('attributeName', 'y1');
    animate.setAttribute('from', '-40');
    animate.setAttribute('to', '640');
    animate.setAttribute('dur', '4s');
    animate.setAttribute('repeatCount', 'indefinite');

    const animate2 = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate2.setAttribute('attributeName', 'y2');
    animate2.setAttribute('from', '-40');
    animate2.setAttribute('to', '640');
    animate2.setAttribute('dur', '4s');
    animate2.setAttribute('repeatCount', 'indefinite');

    scanLine.appendChild(animate);
    scanLine.appendChild(animate2);
    svg.appendChild(scanLine);
}

function createNode(x, y, r, color, label, status = 'active', isMajor = false) {
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
    group.setAttribute('class', 'cursor-pointer hover:filter hover:brightness-125 transition-all');

    // Status ring for at-risk nodes
    if (status !== 'active') {
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttribute('cx', x);
        ring.setAttribute('cy', y);
        ring.setAttribute('r', r + 4);
        ring.setAttribute('fill', 'none');
        ring.setAttribute('stroke', status === 'critical' ? '#ef4444' : '#f59e0b');
        ring.setAttribute('stroke-width', '2');

        const animate = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        animate.setAttribute('attributeName', 'opacity');
        animate.setAttribute('values', '0.2;1;0.2');
        animate.setAttribute('dur', '1.5s');
        animate.setAttribute('repeatCount', 'indefinite');
        ring.appendChild(animate);

        group.appendChild(ring);
    }

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute('cx', x);
    circle.setAttribute('cy', y);
    circle.setAttribute('r', r);
    circle.setAttribute('fill', status === 'critical' ? '#ef4444' : color);

    if (isMajor) {
        circle.setAttribute('stroke', '#475569');
        circle.setAttribute('stroke-width', '2');
    }

    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute('x', x);
    text.setAttribute('y', y + r + 15);
    text.setAttribute('text-anchor', 'middle');
    text.setAttribute('fill', isMajor ? '#cbd5e1' : '#94a3b8');
    text.setAttribute('font-size', isMajor ? '10' : '8');
    text.setAttribute('font-family', 'monospace');
    text.textContent = label;

    group.appendChild(circle);
    group.appendChild(text);

    // Simple hover effect logic
    group.addEventListener('mouseenter', () => {
        circle.setAttribute('r', r * 1.3);
    });
    group.addEventListener('mouseleave', () => {
        circle.setAttribute('r', r);
    });

    return group;
}

function createLine(x1, y1, x2, y2) {
    const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute('x1', x1);
    line.setAttribute('y1', y1);
    line.setAttribute('x2', x2);
    line.setAttribute('y2', y2);
    line.setAttribute('stroke', '#334155');
    line.setAttribute('stroke-width', '1');
    line.setAttribute('stroke-dasharray', '4');
    return line;
}

function populateStats() {
    const animateValue = (id, target) => {
        const el = document.getElementById(id);
        if (!el) return;
        let current = 0;
        const duration = 2000;
        const stepTime = 30;
        const steps = duration / stepTime;
        const increment = target / steps;

        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                el.textContent = target.toLocaleString();
                clearInterval(interval);
            } else {
                el.textContent = Math.floor(current).toLocaleString();
            }
        }, stepTime);
    };

    animateValue('statAssets', INFRA_DATA.stats.assets);
    animateValue('statNodes', INFRA_DATA.stats.nodes);
    animateValue('statSoftware', INFRA_DATA.stats.software);
    document.getElementById('statRisk').textContent = INFRA_DATA.stats.risk;
}

function startSecurityLog() {
    const logContainer = document.getElementById('securityLog');
    if (!logContainer) return;
    logContainer.innerHTML = '';

    INFRA_DATA.logs.forEach((log, i) => {
        setTimeout(() => {
            const entry = document.createElement('div');
            const colorClass = log.type === 'critical' ? 'text-red-400' : (log.type === 'warning' ? 'text-amber-400' : (log.type === 'success' ? 'text-emerald-400' : 'text-slate-400'));
            const prefix = log.type === 'critical' ? '[CRIT]' : (log.type === 'warning' ? '[WARN]' : '[INFO]');

            entry.className = `border-l-2 pl-2 mb-2 ${log.type === 'critical' ? 'border-red-500' : 'border-slate-700'}`;
            entry.innerHTML = `<span class="font-bold ${colorClass}">${prefix}</span> <span class="text-slate-300 text-[10px]">${log.msg}</span>`;
            logContainer.prepend(entry);
        }, i * 800);
    });
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
    initLandscapeModule();
});

// Re-init when navigating to landscape
const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.target.id === 'landscapePage' && mutation.target.classList.contains('active')) {
            initLandscapeModule();
        }
    });
});

const lpElement = document.getElementById('landscapePage');
if (lpElement) {
    observer.observe(lpElement, { attributes: true, attributeFilter: ['class'] });
}