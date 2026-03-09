/**
 * IMS - Intelligent Municipal Infrastructure Management
 * Core Dashboard Logic with persistent session simulation
 */

// --- Mock User Data ---
const USERS = [
    { email: "elena.andersson@eskilstuna.se", password: "demo1234", name: "Elena Andersson", title: "Chief Digital Officer", initials: "EA", roleKey: "cdo" },
    { email: "arthur.bergstrom@eskilstuna.se", password: "demo1234", name: "Arthur Bergstr\u00f6m", title: "Operations Lead", initials: "AB", roleKey: "operations" },
    { email: "lars.lindqvist@eskilstuna.se", password: "demo1234", name: "Lars Lindqvist", title: "Finance Director", initials: "LL", roleKey: "finance" }
];

const DASHBOARD_CONTENT = {
    cdo: {
        header: `<h1>Dashboard Overview</h1><p>Real-time insights into your digital infrastructure</p>`,
        kpis: `<div class="kpi-card"><div class="kpi-label">Total Active Systems</div><div class="kpi-value">247</div></div><div class="kpi-card danger"><div class="kpi-label">Systems at Risk</div><div class="kpi-value">34</div></div><div class="kpi-card warning"><div class="kpi-label">Maintenance Trend</div><div class="kpi-value">87%</div></div>`,
        widgets: `<div class="widget"><div class="widget-header"><h3>Risk Heatmap</h3></div><div style="height:150px; background:#f8fafc; border-radius:8px; display:flex; align-items:center; justify-content:center;">Widget Content</div></div>`
    },
    operations: {
        header: `<h1>Operations Overview</h1><p>System stability monitoring</p>`,
        kpis: `<div class="kpi-card success"><div class="kpi-label">Uptime</div><div class="kpi-value">99.9%</div></div><div class="kpi-card danger"><div class="kpi-label">Alerts</div><div class="kpi-value">4</div></div>`,
        widgets: `<div class="widget"><h3>Node Monitor</h3><div style="height:150px; background:#f8fafc; border-radius:8px;"></div></div>`
    },
    finance: {
        header: `<h1>Financial Overview</h1><p>Budget & Cost analysis</p>`,
        kpis: `<div class="kpi-card"><div class="kpi-label">IT Spend</div><div class="kpi-value">84M kr</div></div>`,
        widgets: `<div class="widget"><h3>Budget Tracker</h3><div style="height:150px; background:#f8fafc; border-radius:8px;"></div></div>`
    }
};

// --- Discovery Module Data ---
const INFRA_DATA = {
    stats: { assets: 14352, nodes: 745, software: 1891, risk: "Elevated" },
    clusters: [
        {
            id: 'citizen', label: 'Citizen Access', color: '#10b981',
            desc: "Public-facing portals and identity services for 150k residents.",
            lead: "Elena Andersson", uptime: "99.99%",
            nodes: [
                { label: 'BankID 4.0 API', status: 'active', type: 'Gateway', v: '4.2' },
                { label: 'Public Portal', status: 'active', type: 'Web', v: '1.2' },
                { label: 'Payment GW', status: 'active', type: 'FinTech', v: '2.0' }
            ]
        },
        {
            id: 'ops', label: 'Municipal Ops', color: '#f59e0b',
            desc: "Smart city sensors, schools, and GIS infrastructure.",
            lead: "Arthur Bergstr\u00f6m", uptime: "98.5%",
            nodes: [
                { label: 'School LMS', status: 'active', type: 'Edu', v: '3.1' },
                { label: 'Social Platform', status: 'warning', type: 'App', v: '5.1', alert: 'Legacy/EOL' },
                { label: 'Traffic IoT', status: 'active', type: 'Smart', v: '0.9' }
            ]
        },
        {
            id: 'admin', label: 'Backbone', color: '#3b82f6',
            desc: "ERP, HR, and centralized case management.",
            lead: "Lars Lindqvist", uptime: "99.2%",
            nodes: [
                { label: 'Unit4 ERP', status: 'active', type: 'ERP', v: '7.1' },
                { label: 'Finance DB', status: 'critical', type: 'DB', v: '2008', alert: 'Legacy Inst.' },
                { label: 'Mail Sync', status: 'active', type: 'Net', v: 'O365' }
            ]
        },
        {
            id: 'tech', label: 'Tech Base', color: '#a855f7',
            desc: "Data centers, fiber backbone, and storage hardware.",
            lead: "SysAdmin Team", uptime: "99.999%",
            nodes: [
                { label: 'Nexus Core', status: 'active', type: 'Switch', v: '9.3' },
                { label: 'Bridge X', status: 'critical', type: 'Illegal', v: 'Unk', alert: 'Security Breach' },
                { label: 'Storage Array', status: 'active', type: 'HW', v: '6.0' }
            ]
        }
    ],
    logs: [
        { type: 'critical', msg: '3x Windows Server 2012 found (EOL) in Social Services V-LAN' },
        { type: 'warning', msg: 'Unauthorized IoT Bridge detected: Subnet 10.42.12.0/24' },
        { type: 'info', msg: 'Fiber Backbone throughput optimized (98.2% efficiency)' },
        { type: 'critical', msg: 'Legacy SQL Instance (v2008) discovered in Finance Archive' },
        { type: 'success', msg: 'BankID 4.0 Integration verified across all nodes' }
    ]
};

// --- View State ---
let mapTransform = { x: 0, y: 0, scale: 1 };
let isDragging = false;
let startPos = { x: 0, y: 0 };

/**
 * Handle Login manually (called by form or click)
 */
function attemptLogin(email, password) {
    const errorMsg = document.getElementById('loginError');
    if (errorMsg) errorMsg.style.display = 'none';

    let normalizedEmail = email.trim();
    if (!normalizedEmail.includes("@")) normalizedEmail += "@eskilstuna.se";

    const user = USERS.find(u => u.email === normalizedEmail && u.password === password);

    if (user) {
        // Persist session
        sessionStorage.setItem('ims_session_active', 'true');
        sessionStorage.setItem('ims_user', JSON.stringify(user));

        // Use timeout to ensure storage is committed before reload
        setTimeout(() => {
            window.location.reload();
        }, 50);
    } else {
        if (errorMsg) {
            errorMsg.textContent = "Invalid username or password.";
            errorMsg.style.display = 'block';
        }
    }
}

/**
 * Handle form submission
 */
function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('usernameInput').value;
    const pass = document.getElementById('passwordInput').value;
    attemptLogin(email, pass);
}

/**
 * Logout handler
 */
function handleLogout() {
    sessionStorage.clear();
    window.location.reload();
}

/**
 * Apply user-specific data to the UI after reload
 */
function applyUserSession() {
    const savedUser = sessionStorage.getItem('ims_user');
    if (!savedUser) return;

    try {
        const user = JSON.parse(savedUser);

        // Update Profile Info
        const userRoleEl = document.getElementById('userRole');
        const userAvatarEl = document.getElementById('userAvatar');

        if (userRoleEl) userRoleEl.textContent = user.title;
        if (userAvatarEl) userAvatarEl.textContent = user.initials;

        // Inject Role Content
        if (DASHBOARD_CONTENT[user.roleKey]) {
            const content = DASHBOARD_CONTENT[user.roleKey];
            const homePage = document.getElementById('homePage');
            if (homePage) {
                const h = homePage.querySelector('.page-header'); if (h) h.innerHTML = content.header;
                const k = homePage.querySelector('.kpi-grid'); if (k) k.innerHTML = content.kpis;
                const w = homePage.querySelector('.widget-grid'); if (w) w.innerHTML = content.widgets;
            }
        }

        // --- CRITICAL VISIBILITY LOGIC ---
        // Force switch to dashboard view
        const loginPage = document.getElementById('loginPage');
        const dashboard = document.getElementById('dashboard');

        if (loginPage) loginPage.style.setProperty('display', 'none', 'important');
        if (dashboard) {
            dashboard.style.setProperty('display', 'flex', 'important');
            dashboard.classList.add('active');
        }

    } catch (e) {
        console.error("Session restore failed", e);
        sessionStorage.clear();
    }
}

/**
 * Page switching logic
 */
function switchPage(pageId) {
    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.classList.toggle('active', nav.dataset.page === pageId);
    });

    document.querySelectorAll('.page-section').forEach(section => {
        section.classList.toggle('active', section.id === (pageId + 'Page'));
    });

    if (pageId === 'landscape') {
        setTimeout(initLandscapeModule, 50);
    }
}

// --- Discovery & Sweep Logic ---

function initLandscapeModule() {
    const sweepBtn = document.getElementById('startSweepBtn');
    const svg = document.getElementById('topologySvg');

    if (!svg || !sweepBtn || sweepBtn.dataset.initialized) {
        if (svg) setupInteractivity(svg);
        return;
    }
    sweepBtn.dataset.initialized = "true";

    renderTopology();
    populateStats();
    startSecurityLog(true);
    setupInteractivity(svg);

    sweepBtn.addEventListener('click', () => {
        const overlay = document.getElementById('sweepOverlay');
        const progressBar = document.getElementById('sweepProgress');
        overlay.classList.remove('hidden');
        let progress = 0;
        const interval = setInterval(() => {
            progress += 5;
            if (progress > 100) progress = 100;
            progressBar.style.width = `${progress}%`;
            if (progress >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    overlay.classList.add('hidden');
                    document.getElementById('landscapeContainer').classList.remove('opacity-40');
                    renderTopology(); populateStats(); startSecurityLog(false);
                }, 300);
            }
        }, 30);
    });

    const closeBtn = document.getElementById('closeDetails');
    if (closeBtn) closeBtn.addEventListener('click', hideDetails);
}

function setupInteractivity(svg) {
    if (svg.dataset.interactivitySet) return;
    svg.dataset.interactivitySet = "true";

    const zoomIn = document.getElementById('zoomInBtn');
    const zoomOut = document.getElementById('zoomOutBtn');
    const reset = document.getElementById('resetZoomBtn');

    if (zoomIn) zoomIn.onclick = (e) => { e.stopPropagation(); zoom(1.2); };
    if (zoomOut) zoomOut.onclick = (e) => { e.stopPropagation(); zoom(0.8); };
    if (reset) reset.onclick = (e) => { e.stopPropagation(); resetMap(); };

    svg.onmousedown = (e) => {
        if (e.button !== 0) return;
        isDragging = true;
        svg.style.cursor = 'grabbing';
        startPos = { x: e.clientX - mapTransform.x, y: e.clientY - mapTransform.y };
        e.preventDefault();
    };

    window.onmousemove = (e) => {
        if (!isDragging) return;
        mapTransform.x = e.clientX - startPos.x;
        mapTransform.y = e.clientY - startPos.y;
        updateTransform();
    };

    window.onmouseup = () => {
        isDragging = false;
        svg.style.cursor = 'grab';
    };

    svg.onwheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? 0.9 : 1.1;
        zoom(delta, e.clientX, e.clientY);
    };
}

function zoom(factor, centerX, centerY) {
    const svg = document.getElementById('topologySvg');
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const cx = centerX ? centerX - rect.left : rect.width / 2;
    const cy = centerY ? centerY - rect.top : rect.height / 2;

    const newScale = Math.min(Math.max(mapTransform.scale * factor, 0.3), 5);
    const actualFactor = newScale / mapTransform.scale;

    mapTransform.x = cx - (cx - mapTransform.x) * actualFactor;
    mapTransform.y = cy - (cy - mapTransform.y) * actualFactor;
    mapTransform.scale = newScale;
    updateTransform();
}

function resetMap() {
    mapTransform = { x: 0, y: 0, scale: 1 };
    updateTransform();
}

function updateTransform() {
    const content = document.getElementById('mapViewport');
    if (content) {
        content.setAttribute('transform', `translate(${mapTransform.x}, ${mapTransform.y}) scale(${mapTransform.scale})`);
    }
}

function renderTopology() {
    const svg = document.getElementById('topologySvg');
    if (!svg) return;

    let viewport = document.getElementById('mapViewport');
    if (!viewport) {
        viewport = document.createElementNS("http://www.w3.org/2000/svg", "g");
        viewport.id = "mapViewport";
        svg.appendChild(viewport);
    }
    viewport.innerHTML = '';

    const centerX = 400, centerY = 300, clusterRadius = 180;

    const core = createNode(centerX, centerY, 45, '#1e293b', 'SMART CORE', 'active', true);
    core.onclick = () => showDetails('Municipal Hub', 'Core Orchestration', 'Central node connecting all departments.', 'active', 'CORE-X', 'IMS Admin', '99.9%');
    viewport.appendChild(core);

    INFRA_DATA.clusters.forEach((c, i) => {
        const angle = (i / INFRA_DATA.clusters.length) * Math.PI * 2;
        const cx = centerX + Math.cos(angle) * clusterRadius;
        const cy = centerY + Math.sin(angle) * clusterRadius;
        viewport.appendChild(createLine(centerX, centerY, cx, cy));

        const clusterNode = createNode(cx, cy, 32, c.color, c.label, 'active', true);
        clusterNode.onclick = () => showDetails(c.label, 'Cluster Hub', c.desc, 'active', c.id.toUpperCase(), c.lead, c.uptime);
        viewport.appendChild(clusterNode);

        c.nodes.forEach((n, j) => {
            const subAngle = angle - 0.5 + (j / (c.nodes.length - 1)) * 1.0;
            const sx = cx + Math.cos(subAngle) * 90;
            const sy = cy + Math.sin(subAngle) * 90;
            viewport.appendChild(createLine(cx, cy, sx, sy));
            const node = createNode(sx, sy, 14, c.color, n.label, n.status);
            node.onclick = () => showDetails(n.label, n.type, `Version: ${n.v} | ${n.alert || 'Healthy'}`, n.status, `ID-${Math.random().toString(36).substr(2, 5).toUpperCase()}`, c.lead, '99%');
            viewport.appendChild(node);
        });
    });
    updateTransform();
}

function createNode(x, y, r, color, label, status = 'active', isMajor = false) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.style.cursor = 'pointer';

    if (status !== 'active') {
        const ring = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        ring.setAttribute('cx', x); ring.setAttribute('cy', y); ring.setAttribute('r', r + 6);
        ring.setAttribute('fill', 'none'); ring.setAttribute('stroke', status === 'critical' ? '#ef4444' : '#f59e0b');
        ring.setAttribute('stroke-width', '2');
        const anim = document.createElementNS("http://www.w3.org/2000/svg", "animate");
        anim.setAttribute('attributeName', 'r'); anim.setAttribute('values', `${r + 4};${r + 10};${r + 4}`);
        anim.setAttribute('dur', '2s'); anim.setAttribute('repeatCount', 'indefinite');
        ring.appendChild(anim); g.appendChild(ring);
    }

    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute('cx', x); c.setAttribute('cy', y); c.setAttribute('r', r);
    c.setAttribute('fill', status === 'critical' ? '#ef4444' : color);

    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute('x', x); t.setAttribute('y', y + r + 18);
    t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#94a3b8');
    t.setAttribute('font-size', isMajor ? '10' : '8'); t.setAttribute('font-family', 'monospace');
    t.textContent = label;
    g.appendChild(c); g.appendChild(t);
    return g;
}

function createLine(x1, y1, x2, y2) {
    const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('stroke', '#334155'); l.setAttribute('stroke-width', '1'); l.setAttribute('stroke-opacity', '0.4');
    return l;
}

function showDetails(title, type, desc, status, id, owner, uptime) {
    const p = document.getElementById('nodeDetails');
    if (!p) return;
    document.getElementById('detailTitle').textContent = title;
    const s = document.getElementById('detailStatus');
    s.textContent = `STATUS: ${status.toUpperCase()}`;
    s.className = `px-2 py-0.5 rounded text-[10px] font-bold ${status === 'active' ? 'bg-emerald-500/20 text-emerald-400' : (status === 'warning' ? 'bg-amber-500/20 text-amber-400' : 'bg-red-500/20 text-red-400')}`;
    document.getElementById('detailContent').innerHTML = `
        <div class="space-y-4">
            <div class="bg-slate-800/80 p-3 rounded border border-slate-700">
                <p class="text-[10px] text-slate-500 font-bold uppercase">Classification</p>
                <p class="text-white text-sm font-semibold">${type}</p>
            </div>
            <p class="text-slate-400 text-xs leading-relaxed">${desc}</p>
        </div>
    `;
    p.classList.remove('hidden');
    setTimeout(() => { p.style.opacity = '1'; p.style.transform = 'translateX(0)'; }, 50);
}

function hideDetails() {
    const p = document.getElementById('nodeDetails');
    if (!p) return;
    p.style.opacity = '0'; p.style.transform = 'translateX(1rem)';
    setTimeout(() => p.classList.add('hidden'), 300);
}

function populateStats() {
    ['statAssets', 'statNodes', 'statSoftware'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.textContent = INFRA_DATA.stats[id.replace('stat', '').toLowerCase()].toLocaleString();
    });
}

function startSecurityLog(silent) {
    const log = document.getElementById('securityLog'); if (!log) return;
    log.innerHTML = '';
    INFRA_DATA.logs.forEach((item, i) => {
        const add = () => {
            const d = document.createElement('div');
            d.className = `border-l-2 pl-2 mb-2 ${item.type === 'critical' ? 'border-red-500' : 'border-slate-800'}`;
            d.innerHTML = `<span class="font-bold text-[9px] uppercase tracking-tighter">[${item.type}]</span> <span class="text-slate-400 text-[10px]">${item.msg}</span>`;
            log.prepend(d);
        };
        if (silent) add(); else setTimeout(add, i * 400);
    });
}

// --- Global Lifecycle ---

document.addEventListener('DOMContentLoaded', () => {
    // Session Detection
    if (sessionStorage.getItem('ims_session_active') === 'true') {
        applyUserSession();
    } else {
        const lp = document.getElementById('loginPage');
        const db = document.getElementById('dashboard');
        if (lp) lp.style.display = 'flex';
        if (db) db.style.display = 'none';
    }

    // Attach Listeners
    const loginForm = document.getElementById('loginForm');
    if (loginForm) loginForm.addEventListener('submit', handleLogin);

    document.querySelectorAll('.persona-card').forEach(card => {
        card.addEventListener('click', () => {
            const heading = card.querySelector('h4');
            if (heading) attemptLogin(heading.textContent, "demo1234");
        });
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    document.querySelectorAll('.nav-item').forEach(nav => {
        nav.addEventListener('click', () => switchPage(nav.dataset.page));
    });
});