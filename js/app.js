/**
 * IMS - Intelligent Municipal Infrastructure Management
 * Core Dashboard Logic with API-First Topology
 */

// --- Mock User Data ---
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE = isLocalhost ? 'http://localhost:3000/api' : 'api';
const API_EXT = isLocalhost ? '' : '.json';

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

// --- API-First Infrastructure Data ---
const INFRA_DATA = {
    stats: { assets: 14352, nodes: 745, software: 1891, risk: "Elevated" },
    api_families: {
        internal: { color: '#6366f1', label: 'Internal API', desc: 'Secure intra-org communication' },
        partner: { color: '#f59e0b', label: 'Partner API', desc: 'Auth-based cross-org exchange' },
        public: { color: '#10b981', label: 'Public API', desc: 'Open data & public services' }
    },
    clusters: [
        {
            id: 'citizen', label: 'Citizen Access', color: '#10b981',
            desc: "Public-facing portals and identity services for 150k residents.",
            lead: "Elena Andersson", uptime: "99.99%",
            nodes: [
                { label: 'BankID v4.2', status: 'active', type: 'Public', v: 'v4.2', endpoint: '/api/v4/auth/bankid' },
                { label: 'Resident Portal', status: 'active', type: 'Public', v: 'v1.0', endpoint: '/api/v1/portal' },
                { label: 'E-Payment', status: 'active', type: 'Partner', v: 'v2.1', endpoint: '/api/v2/finance/pay' }
            ]
        },
        {
            id: 'ops', label: 'Municipal Ops', color: '#f59e0b',
            desc: "Smart city sensors, schools, and GIS infrastructure.",
            lead: "Arthur Bergstr\u00f6m", uptime: "98.5%",
            nodes: [
                { label: 'Traffic IoT', status: 'active', type: 'Internal', v: 'v0.9', endpoint: '/api/v1/iot/traffic' },
                { label: 'School LMS', status: 'active', type: 'Internal', v: 'v3.1', endpoint: '/api/v3/edu/lms' },
                { label: 'Social Care', status: 'warning', type: 'Internal', v: 'v5.1', alert: 'Legacy/EOL', endpoint: '/api/v5/social' }
            ]
        },
        {
            id: 'admin', label: 'Backbone', color: '#3b82f6',
            desc: "ERP, HR, and centralized case management.",
            lead: "Lars Lindqvist", uptime: "99.2%",
            nodes: [
                { label: 'Unit4 ERP', status: 'active', type: 'Internal', v: 'v7.1', endpoint: '/api/v7/erp' },
                { label: 'Finance DB', status: 'critical', type: 'Internal', v: 'v2008', alert: 'Legacy Inst.', endpoint: '/api/v1/finance/db' },
                { label: 'Staff HR', status: 'active', type: 'Internal', v: 'v3.0', endpoint: '/api/v3/hr/staff' }
            ]
        },
        {
            id: 'tech', label: 'Tech Base', color: '#a855f7',
            desc: "Data centers, fiber backbone, and storage hardware.",
            lead: "SysAdmin Team", uptime: "99.999%",
            nodes: [
                { label: 'Storage Sync', status: 'active', type: 'Internal', v: 'v6.0', endpoint: '/api/v6/hw/storage' },
                { label: 'Partner Bridge', status: 'critical', type: 'Partner', v: 'v1.4', alert: 'API Misconfig', endpoint: '/api/v1/ext/bridge' },
                { label: 'Fiber Mon', status: 'active', type: 'Internal', v: 'v2.0', endpoint: '/api/v2/hw/fiber' }
            ]
        }
    ],
    logs: [
        { type: 'critical', msg: 'API v1.0 deprecation warning: Migrating to /api/v2/ shortly.' },
        { type: 'warning', msg: 'Partner API authentication failure from external Subnet' },
        { type: 'info', msg: 'Public API-first documentation updated for all endpoints' },
        { type: 'critical', msg: 'Legacy API call (v2008) discovered in Finance Archive' },
        { type: 'success', msg: 'Public API documentation verified for Resident Portal' }
    ]
};

// --- API Library Data ---
const API_LIBRARY_DATA = [
    { name: "BankID v4.2", type: "Public", endpoint: "/api/v4/auth/bankid", service: "Citizen Access Hub", municipalities: ["Eskilstuna", "Göteborg", "Malmö", "Stockholm"] },
    { name: "Resident Portal API", type: "Public", endpoint: "/api/v1/portal", service: "E-Services Central", municipalities: ["Eskilstuna", "Västerås"] },
    { name: "Unit4 Connect", type: "Internal", endpoint: "/api/v7/erp", service: "Admin Backbone", municipalities: ["Eskilstuna"] },
    { name: "Traffic IoT Stream", type: "Internal", endpoint: "/api/v1/iot/traffic", service: "Municipal Operations", municipalities: ["Eskilstuna", "Stockholm"] },
    { name: "Partner Bridge", type: "Partner", endpoint: "/api/v1/ext/bridge", service: "Regional Transport", municipalities: ["Region Sörmland", "Eskilstuna"] },
    { name: "Finance Gateway", type: "Internal", endpoint: "/api/v1/finance/db", service: "Finance Archive", municipalities: ["Eskilstuna"] },
    { name: "School LMS Sync", type: "Internal", endpoint: "/api/v3/edu/lms", service: "Education Services", municipalities: ["Eskilstuna", "Uppsala", "Örebro"] },
    { name: "GIS Spatial API", type: "Partner", endpoint: "/api/v2/stats/geo", service: "Urban Planning", municipalities: ["Stockholm", "Malmö", "Eskilstuna"] },
];

// --- View State ---
let mapTransform = { x: 0, y: 0, scale: 1 };
let isDragging = false;
let startPos = { x: 0, y: 0 };

/**
 * Handle Login manually
 */
function attemptLogin(email, password) {
    const errorMsg = document.getElementById('loginError');
    if (errorMsg) errorMsg.style.display = 'none';

    let normalizedEmail = email.trim();
    if (!normalizedEmail.includes("@")) normalizedEmail += "@eskilstuna.se";

    const user = USERS.find(u => u.email === normalizedEmail && u.password === password);

    if (user) {
        sessionStorage.setItem('ims_session_active', 'true');
        sessionStorage.setItem('ims_user', JSON.stringify(user));
        setTimeout(() => { window.location.reload(); }, 50);
    } else {
        if (errorMsg) {
            errorMsg.textContent = "Invalid username or password.";
            errorMsg.style.display = 'block';
        }
    }
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('usernameInput').value;
    const pass = document.getElementById('passwordInput').value;
    attemptLogin(email, pass);
}

function handleLogout() {
    sessionStorage.clear();
    window.location.reload();
}

function applyUserSession() {
    const savedUser = sessionStorage.getItem('ims_user');
    if (!savedUser) return;
    try {
        const user = JSON.parse(savedUser);
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

            // For CDO, attempt to fetch live KPIs
            if (user.roleKey === 'cdo') {
                fetch(`${API_BASE}/dashboard${API_EXT}`)
                    .then(res => res.json())
                    .then(data => {
                        const homePage = document.getElementById('homePage');
                        const kpiGrid = homePage ? homePage.querySelector('.kpi-grid') : null;
                        if (kpiGrid && data.kpis) {
                            // Update header to indicate live status
                            const h = homePage.querySelector('.page-header p');
                            if (h) h.innerHTML += ' <span style="background: #10b981; color: white; padding: 2px 6px; border-radius: 4px; font-size: 10px; margin-left: 8px; font-weight: bold;">LIVE SQLITE SYNC</span>';

                            let dynamicHtml = '';
                            data.kpis.forEach(kpi => {
                                const isTargetMet = kpi.invert_scale ? (kpi.current_value <= kpi.target_value) : (kpi.current_value >= kpi.target_value);
                                const isCritical = Math.abs(kpi.current_value - kpi.target_value) / kpi.target_value >= 0.2;
                                let statusClass = 'success';
                                if (!isTargetMet) statusClass = isCritical ? 'danger' : 'warning';

                                dynamicHtml += `
                                <div class="kpi-card ${statusClass}">
                                    <div class="kpi-label" style="display: flex; justify-content: space-between; align-items: flex-start;">
                                        <span title="${kpi.definition}">${kpi.label}</span>
                                        <button onclick="openSourceModal(${kpi.id})" style="background: none; border: none; font-size: 0.75rem; color: #3b82f6; text-decoration: underline; cursor: pointer; padding: 0;">See Source</button>
                                    </div>
                                    <div class="kpi-value">${kpi.current_value}${kpi.unit}</div>
                                    <div class="kpi-trend">Target: ${kpi.target_value}${kpi.unit}</div>
                                </div>
                                `;
                            });
                            kpiGrid.innerHTML = dynamicHtml;
                        }
                    })
                    .catch(err => console.warn("Could not fetch live KPIs, falling back to static layout", err));
            }
        }

        // Initialize sidebar listeners
        const showArchBtn = document.getElementById('showArchGuidance');
        const closeArchBtn = document.getElementById('closeArch');
        const archSidebar = document.getElementById('archGuidance');

        if (showArchBtn && archSidebar) {
            showArchBtn.addEventListener('click', () => {
                archSidebar.classList.remove('hidden');
                setTimeout(() => { archSidebar.style.transform = 'translateX(0)'; }, 10);
            });
        }

        if (closeArchBtn && archSidebar) {
            closeArchBtn.addEventListener('click', () => {
                archSidebar.style.transform = 'translateX(-100%)';
                setTimeout(() => { archSidebar.classList.add('hidden'); }, 500);
            });
        }
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
    if (pageId === 'api-library') {
        renderApiLibrary();
    }
}

/**
 * Render the API Library Table
 */
function renderApiLibrary() {
    const tableBody = document.getElementById('apiTableBody');
    if (!tableBody) return;

    tableBody.innerHTML = API_LIBRARY_DATA.map(api => `
        <tr class="hover:bg-slate-50 transition-colors">
            <td class="px-6 py-4 whitespace-nowrap">
                <div class="flex flex-col">
                    <span class="text-sm font-bold text-slate-800">${api.name}</span>
                    <span class="text-[10px] font-mono text-slate-500">${api.endpoint}</span>
                </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
                <span class="px-2 py-1 rounded text-[10px] font-bold uppercase ${api.type === 'Public' ? 'bg-emerald-100 text-emerald-700' :
            api.type === 'Partner' ? 'bg-amber-100 text-amber-700' :
                'bg-indigo-100 text-indigo-700'
        }">${api.type}</span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                ${api.service}
            </td>
            <td class="px-6 py-4">
                <div class="flex flex-wrap gap-1">
                    ${api.municipalities.map(m => `
                        <span class="px-2 py-0.5 bg-slate-200 text-slate-700 text-[10px] rounded-full">${m}</span>
                    `).join('')}
                </div>
            </td>
        </tr>
    `).join('');
}
// --- API-First Discovery Logic ---

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
    window.onmouseup = () => { isDragging = false; svg.style.cursor = 'grab'; };
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

function resetMap() { mapTransform = { x: 0, y: 0, scale: 1 }; updateTransform(); }

function updateTransform() {
    const content = document.getElementById('mapViewport');
    if (content) content.setAttribute('transform', `translate(${mapTransform.x}, ${mapTransform.y}) scale(${mapTransform.scale})`);
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
    core.onclick = () => showDetails('Municipal Hub', 'Core API Orchestrator', 'Central gateway managing API contracts and documentation across Eskilstuna.', 'active', 'IMS-BASE-V1', 'Enterprise Architect', '99.99%');
    viewport.appendChild(core);

    INFRA_DATA.clusters.forEach((c, i) => {
        const angle = (i / INFRA_DATA.clusters.length) * Math.PI * 2;
        const cx = centerX + Math.cos(angle) * clusterRadius;
        const cy = centerY + Math.sin(angle) * clusterRadius;

        // API Connection to Core
        viewport.appendChild(createApiConnection(centerX, centerY, cx, cy, 'internal'));

        const clusterNode = createNode(cx, cy, 32, c.color, c.label, 'active', true);
        clusterNode.onclick = () => showDetails(c.label, 'API Cluster Registry', c.desc, 'active', c.id.toUpperCase(), c.lead, c.uptime);
        viewport.appendChild(clusterNode);

        c.nodes.forEach((n, j) => {
            const subAngle = angle - 0.5 + (j / (c.nodes.length - 1)) * 1.0;
            const sx = cx + Math.cos(subAngle) * 90;
            const sy = cy + Math.sin(subAngle) * 90;

            // Connection representing the API type
            viewport.appendChild(createApiConnection(cx, cy, sx, sy, n.type.toLowerCase()));

            const node = createNode(sx, sy, 14, INFRA_DATA.api_families[n.type.toLowerCase()].color, n.label, n.status);
            node.onclick = () => showDetails(n.label, `${n.type} API Service`, `Interface: ${n.endpoint}<br>Version: ${n.v}<br>${n.alert || 'Documented: YES'}`, n.status, `API-${Math.random().toString(36).substr(2, 5).toUpperCase()}`, c.lead, '99.5%');
            viewport.appendChild(node);
        });
    });
    updateTransform();
}

function createNode(x, y, r, color, label, status = 'active', isMajor = false) {
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.style.cursor = 'pointer';
    g.setAttribute('class', 'api-node-group');

    // Glow for high-level APIs
    if (isMajor) {
        const glow = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        glow.setAttribute('cx', x); glow.setAttribute('cy', y); glow.setAttribute('r', r + 10);
        glow.setAttribute('fill', color); glow.setAttribute('opacity', '0.1');
        g.appendChild(glow);
    }

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
    c.setAttribute('stroke', '#ffffff');
    c.setAttribute('stroke-width', isMajor ? '2' : '1');
    c.setAttribute('stroke-opacity', '0.3');

    const t = document.createElementNS("http://www.w3.org/2000/svg", "text");
    t.setAttribute('x', x); t.setAttribute('y', y + r + 18);
    t.setAttribute('text-anchor', 'middle'); t.setAttribute('fill', '#94a3b8');
    t.setAttribute('font-size', isMajor ? '10' : '9'); t.setAttribute('font-family', 'monospace');
    t.setAttribute('font-weight', isMajor ? 'bold' : 'normal');
    t.textContent = label;
    g.appendChild(c); g.appendChild(t);
    return g;
}

function createApiConnection(x1, y1, x2, y2, type) {
    const family = INFRA_DATA.api_families[type] || { color: '#334155' };
    const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

    const l = document.createElementNS("http://www.w3.org/2000/svg", "line");
    l.setAttribute('x1', x1); l.setAttribute('y1', y1); l.setAttribute('x2', x2); l.setAttribute('y2', y2);
    l.setAttribute('stroke', family.color);
    l.setAttribute('stroke-opacity', '1.0'); // Full opacity for maximum clarity

    // Stronger visual styles for API types
    if (type === 'public') {
        l.setAttribute('stroke-width', '5'); // Even thicker for Public
        // Add a secondary glow line
        const glow = l.cloneNode();
        glow.setAttribute('stroke-width', '10');
        glow.setAttribute('stroke-opacity', '0.2');
        group.appendChild(glow);
    } else if (type === 'partner') {
        l.setAttribute('stroke-width', '3');
        l.setAttribute('stroke-dasharray', '10,5'); // Longer dashes for Partner
    } else {
        l.setAttribute('stroke-width', '2.5'); // Slightly thicker for Internal
    }

    group.appendChild(l);
    return group;
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
                <p class="text-[10px] text-slate-500 font-bold uppercase">Architecture Class</p>
                <p class="text-white text-sm font-semibold">${type}</p>
            </div>
            <div class="text-slate-400 text-xs leading-relaxed space-y-2">
                ${desc}
            </div>
            <div class="pt-2 border-t border-slate-700/50">
                <p class="text-[10px] text-slate-500 font-bold uppercase mb-1">Owner / Lead</p>
                <p class="text-white text-xs">${owner}</p>
            </div>
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

// --- Data Explorer & Source Logic ---

async function loadDataExplorer(tableName) {
    const headerRow = document.getElementById('dataTableHeader');
    const body = document.getElementById('dataTableBody');
    const loader = document.getElementById('dataTableLoading');

    headerRow.innerHTML = '';
    body.innerHTML = '';
    loader.style.display = 'block';

    try {
        const res = await fetch(`${API_BASE}/raw/${tableName}${API_EXT}`);
        const data = await res.json();
        loader.style.display = 'none';

        if (!data || data.length === 0) {
            body.innerHTML = `<tr><td style="padding: 2rem; text-align: center; color: var(--gray-500);">No records found in this table.</td></tr>`;
            return;
        }

        const keys = Object.keys(data[0]);
        let headerHtml = '<tr>';
        keys.forEach(k => {
            headerHtml += `<th style="padding: 0.75rem 1rem; color: var(--gray-500); font-weight: bold; text-transform: uppercase; font-size: 10px; position: sticky; top: 0; background: var(--gray-50); border-bottom: 1px solid var(--gray-200);">${k.replace(/_/g, ' ')}</th>`;
        });
        headerHtml += '</tr>';
        headerRow.innerHTML = headerHtml;

        let bodyHtml = '';
        data.forEach(row => {
            bodyHtml += '<tr style="border-bottom: 1px solid var(--gray-200);">';
            keys.forEach(k => {
                let val = row[k];
                if (typeof val === 'boolean') val = val ? 'True' : 'False';
                if (val === null) val = '';
                bodyHtml += `<td style="padding: 0.75rem 1rem; color: var(--gray-700);">${val}</td>`;
            });
            bodyHtml += '</tr>';
        });
        body.innerHTML = bodyHtml;

    } catch (e) {
        loader.style.display = 'none';
        body.innerHTML = `<tr><td style="padding: 2rem; text-align: center; color: #ef4444;">Error loading data. Is the backend running locally?</td></tr>`;
        console.error(e);
    }
}

async function openSourceModal(kpiId) {
    const modal = document.getElementById('sourceModal');
    if (!modal) return;
    modal.style.display = 'flex';

    document.getElementById('sourceKpiId').textContent = '#' + kpiId;
    document.getElementById('sourceQuery').textContent = 'Loading query...';
    document.getElementById('sourceExplanation').textContent = 'Loading explanation...';
    document.getElementById('sourceTableHeader').innerHTML = '';
    document.getElementById('sourceTableBody').innerHTML = '';

    try {
        const res = await fetch(`${API_BASE}/kpis/${kpiId}/source${API_EXT}`);
        const sourceData = await res.json();

        document.getElementById('sourceQuery').textContent = sourceData.query;
        document.getElementById('sourceExplanation').textContent = sourceData.explanation;

        if (sourceData.data && sourceData.data.length > 0) {
            const keys = Object.keys(sourceData.data[0]);
            let headerHtml = '<tr>';
            keys.forEach(k => {
                headerHtml += `<th style="padding: 0.75rem 1rem; font-weight: bold; text-transform: uppercase; font-size: 10px; background: #1e293b; position: sticky; top: 0; border-bottom: 1px solid #334155;">${k.replace(/_/g, ' ')}</th>`;
            });
            headerHtml += '</tr>';
            document.getElementById('sourceTableHeader').innerHTML = headerHtml;

            let bodyHtml = '';
            sourceData.data.forEach(row => {
                bodyHtml += '<tr style="border-bottom: 1px solid #334155;">';
                keys.forEach(k => {
                    let val = row[k];
                    if (typeof val === 'boolean') val = val ? 'True' : 'False';
                    if (val === null) val = '';
                    bodyHtml += `<td style="padding: 0.75rem 1rem; color: white;">${val}</td>`;
                });
                bodyHtml += '</tr>';
            });
            document.getElementById('sourceTableBody').innerHTML = bodyHtml;
        } else {
            document.getElementById('sourceTableBody').innerHTML = `<tr><td style="padding: 2rem; text-align: center; color: #64748B;">No sample records available for this query.</td></tr>`;
        }

    } catch (e) {
        document.getElementById('sourceQuery').textContent = '-- Error: Could not connect to backend --';
        document.getElementById('sourceExplanation').textContent = 'Please make sure the backend server is running on localhost:3000.';
        console.error(e);
    }
}

// --- Global Lifecycle ---
document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('ims_session_active') === 'true') {
        applyUserSession();
    } else {
        const lp = document.getElementById('loginPage');
        const db = document.getElementById('dashboard');
        if (lp) lp.style.display = 'flex';
        if (db) db.style.display = 'none';
    }
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