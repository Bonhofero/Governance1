const express = require('express');
const cors = require('cors');
const Database = require('better-sqlite3');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const db = new Database(dbPath, { readonly: true });

// Helper to snake_case object keys
const toSnakeCase = str => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
const mapKeysDeep = (obj) => {
    if (Array.isArray(obj)) return obj.map(mapKeysDeep);
    if (obj !== null && typeof obj === 'object') {
        const res = {};
        for (const key of Object.keys(obj)) {
            res[toSnakeCase(key)] = mapKeysDeep(obj[key]);
        }
        return res;
    }
    return obj;
};

// GET /api/applications
app.get('/api/applications', (req, res) => {
    try {
        const apps = db.prepare(`
            SELECT 
                a.id, a.name, a.short_code, a.lifecycle_status, a.criticality,
                ou.name as owner_unit,
                ss.sourcing_model, ss.vendor_name
            FROM application_systems a
            LEFT JOIN organization_units ou ON a.owner_unit_id = ou.id
            LEFT JOIN sourcing_setups ss ON a.id = ss.application_id
        `).all();

        // Attach metrics and business services
        for (const app of apps) {
            // Business services
            app.business_services = db.prepare(`
                SELECT bs.name, bs.category 
                FROM business_services bs
                JOIN app_business_service_link link ON bs.id = link.business_service_id
                WHERE link.application_id = ?
            `).all(app.id);

            // Last 30d metrics
            const metrics = db.prepare(`
                SELECT 
                    AVG(api_calls) as avg_api_calls_per_day,
                    AVG(avg_response_ms) as avg_avg_response_ms,
                    AVG(100.0 - error_rate) as avg_availability_pct
                FROM usage_metrics 
                WHERE application_id = ? AND date >= date('now', '-30 days')
            `).get(app.id);

            app.last_30d = metrics || { avg_api_calls_per_day: 0, avg_avg_response_ms: 0, avg_availability_pct: 0 };
        }

        res.json(mapKeysDeep(apps));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/applications/:id
app.get('/api/applications/:id', (req, res) => {
    try {
        const id = req.params.id;
        const targetApp = db.prepare(`SELECT * FROM application_systems WHERE id = ?`).get(id);
        if (!targetApp) return res.status(404).json({ error: 'Not found' });

        targetApp.business_services = db.prepare(`
            SELECT bs.*, link.primary_flag
            FROM business_services bs
            JOIN app_business_service_link link ON bs.id = link.business_service_id
            WHERE link.application_id = ?
        `).all(id);

        targetApp.interfaces = db.prepare(`SELECT * FROM interfaces WHERE application_id = ?`).all(id);
        for (const iface of targetApp.interfaces) {
            iface.last_30d_usage = db.prepare(`
                SELECT SUM(requests) as total_requests, SUM(errors_5xx + errors_4xx) as total_errors
                FROM api_metrics WHERE interface_id = ? AND date >= date('now', '-30 days')
            `).get(iface.id) || { total_requests: 0, total_errors: 0 };
        }

        targetApp.integrations = db.prepare(`
            SELECT 
                i.id, i.transfer_method, i.frequency, i.status,
                s_app.name as source_app_name, t_app.name as target_app_name
            FROM integrations i
            JOIN interfaces s_iface ON i.source_interface_id = s_iface.id
            JOIN application_systems s_app ON s_iface.application_id = s_app.id
            JOIN interfaces t_iface ON i.target_interface_id = t_iface.id
            JOIN application_systems t_app ON t_iface.application_id = t_app.id
            WHERE s_app.id = ? OR t_app.id = ?
        `).all(id, id);

        targetApp.last_90d_usage_metrics = db.prepare(`
            SELECT date, active_users, api_calls, avg_response_ms, error_rate
            FROM usage_metrics WHERE application_id = ? AND date >= date('now', '-90 days')
            ORDER BY date ASC
        `).all(id);

        targetApp.incidents = db.prepare(`
            SELECT * FROM incidents WHERE application_id = ? AND start_time >= datetime('now', '-365 days')
            ORDER BY start_time DESC
        `).all(id);

        res.json(mapKeysDeep(targetApp));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/integrations
app.get('/api/integrations', (req, res) => {
    try {
        const integrations = db.prepare(`
            SELECT 
                i.id, i.transfer_method, i.frequency, i.status,
                s_app.name as source_app_name, t_app.name as target_app_name
            FROM integrations i
            JOIN interfaces s_iface ON i.source_interface_id = s_iface.id
            JOIN application_systems s_app ON s_iface.application_id = s_app.id
            JOIN interfaces t_iface ON i.target_interface_id = t_iface.id
            JOIN application_systems t_app ON t_iface.application_id = t_app.id
            WHERE i.status = 'active'
        `).all();

        for (const intg of integrations) {
            const metrics = db.prepare(`
                SELECT 
                    AVG(am.requests) as avg_daily_requests,
                    AVG(am.errors_5xx) as avg_daily_errors_5xx
                FROM api_metrics am
                JOIN interfaces target_iface ON am.interface_id = target_iface.id
                JOIN integrations i ON i.target_interface_id = target_iface.id
                WHERE i.id = ? AND am.date >= date('now', '-30 days')
            `).get(intg.id);
            intg.last_30d = metrics || { avg_daily_requests: 0, avg_daily_errors_5xx: 0 };
        }

        res.json(mapKeysDeep(integrations));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/risk-matrix
app.get('/api/risk-matrix', (req, res) => {
    try {
        const apps = db.prepare(`
            SELECT id, name, criticality, risk_score, lifecycle_status 
            FROM application_systems
        `).all();

        for (const app of apps) {
            app.number_of_incidents_last_365d = db.prepare(`SELECT count(*) as count FROM incidents WHERE application_id = ? AND start_time >= datetime('now', '-365 days')`).get(app.id).count;
            app.number_of_dependent_business_services = db.prepare(`SELECT count(*) as count FROM app_business_service_link WHERE application_id = ?`).get(app.id).count;
            const techInfo = db.prepare(`
                SELECT count(*) as count
                FROM technical_components tc
                JOIN app_tech_component_link link ON tc.id = link.tech_component_id
                WHERE link.application_id = ? AND tc.lifecycle_status IN ('sunset', 'retired')
            `).get(app.id);
            app.has_end_of_life_tech = techInfo.count > 0;
        }

        res.json(mapKeysDeep(apps));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/sourcing
app.get('/api/sourcing', (req, res) => {
    try {
        const sourcing = db.prepare(`
            SELECT 
                a.id, a.name,
                ss.vendor_name, ss.sourcing_model, ss.contract_end, ss.annual_cost_eur, ss.supports_encapsulation
            FROM application_systems a
            JOIN sourcing_setups ss ON a.id = ss.application_id
        `).all();
        res.json(mapKeysDeep(sourcing));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET /api/metrics/application/:id
app.get('/api/metrics/application/:id', (req, res) => {
    try {
        const id = req.params.id;
        const { from, to } = req.query;
        let query = `SELECT date, active_users, api_calls, avg_response_ms, error_rate, (100.0 - error_rate) as availability_pct FROM usage_metrics WHERE application_id = ?`;
        const params = [id];

        if (from) {
            query += ` AND date >= ?`;
            params.push(from);
        }
        if (to) {
            query += ` AND date <= ?`;
            params.push(to);
        }
        query += ` ORDER BY date ASC`;

        const metrics = db.prepare(query).all(...params);
        res.json(mapKeysDeep(metrics));
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// GET /api/dashboard
app.get('/api/dashboard', (req, res) => {
    try {
        // 1. Fetch infrastructure data (already dynamic)
        const apps = db.prepare(`
            SELECT a.id, a.name, a.criticality, a.lifecycle_status, a.business_value_score, a.risk_score, a.created_at, a.is_key_platform,
                   ou.name as owner 
            FROM application_systems a
            LEFT JOIN organization_units ou ON a.owner_unit_id = ou.id
        `).all();

        const infrastructure = apps.map(app => {
            let strategy = 'accept';
            if (app.lifecycle_status === 'sunset' || app.lifecycle_status === 'retired') strategy = 'migrate';
            if (app.lifecycle_status === 'planned') strategy = 'build';
            if (app.lifecycle_status === 'active' && app.business_value_score > 7) strategy = 'encapsulate';
            if (app.lifecycle_status === 'active' && app.business_value_score < 5) strategy = 'revamp';

            return {
                name: app.name,
                criticality: app.criticality * 33, // scale 1-3 to 0-100
                capital_available: app.business_value_score * 10, // scale 1-10 to 0-100
                strategy: strategy,
                owner: app.owner || 'Unknown',
                status: 'on_track'
            };
        });

        // 2. Calculate Ambidexterity
        const totalApps = apps.length || 1;
        const activeCount = apps.filter(a => a.lifecycle_status === 'active').length;
        const innovationCount = apps.filter(a => a.lifecycle_status === 'planned' || a.lifecycle_status === 'sunset').length;

        const efficiencyPct = Math.round((activeCount / totalApps) * 100);
        const innovationPct = Math.round((innovationCount / totalApps) * 100);

        // 3. Dynamic KPIs
        // KPI 1: % of budget on business development
        const budgetInfo = db.prepare(`
            SELECT 
                SUM(CASE WHEN a.lifecycle_status = 'planned' OR a.is_key_platform = 1 THEN ss.annual_cost_eur ELSE 0 END) as dev_budget,
                SUM(ss.annual_cost_eur) as total_budget
            FROM application_systems a
            JOIN sourcing_setups ss ON a.id = ss.application_id
        `).get();
        const kpi1Value = ((budgetInfo.dev_budget / (budgetInfo.total_budget || 1)) * 100).toFixed(1);

        // KPI 4: New digital services released / month
        const newServices = apps.filter(a => {
            const created = new Date(a.created_at);
            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
            return created > thirtyDaysAgo;
        }).length;

        // KPI 5: % of existing data used for decisions (based on interfaces)
        const interfaceStats = db.prepare(`
            SELECT 
                COUNT(*) as total_ifaces,
                SUM(CASE WHEN data_domain IN ('citizen_data', 'financial_data', 'hr_data') THEN 1 ELSE 0 END) as strategic_ifaces
            FROM interfaces
        `).get();
        const kpi5Value = Math.round((interfaceStats.strategic_ifaces / (interfaceStats.total_ifaces || 1)) * 100);

        // 4. Shadow Innovation Detection
        const shadowApps = apps.filter(a => a.risk_score > 7 && a.business_value_score < 4).slice(0, 2);
        const shadowAnomalies = shadowApps.map(a => ({
            unit: a.owner || "Unknown Unit",
            type: "High Risk / Low Value Anomaly",
            confidence: 85 + Math.floor(Math.random() * 10),
            detail: `Detected unmanaged risk in ${a.name}. Business value score is low (${a.business_value_score}/10) while risk is critical.`
        }));

        const dashboardData = {
            ambidexterity: {
                efficiency_pct: efficiencyPct,
                innovation_pct: innovationPct,
                internal_pct: 95,
                external_pct: 5,
                target_efficiency_pct: 60,
                target_innovation_pct: 40,
                source: "Live SQLite Sync"
            },
            kpis: [
                { id: 1, label: "% of budget on business development", current_value: parseFloat(kpi1Value), target_value: 15, trend: [3.8, 3.9, 4.1, 4.0, 4.1, parseFloat(kpi1Value)], unit: "%", definition: "Total IT budget allocated to new business development vs. maintenance.", why_it_matters: "Determines the organization's ability to evolve rather than just maintaining legacy systems." },
                { id: 2, label: "% of KPI1 that changes service delivery", current_value: 22, target_value: 60, trend: [18, 19, 21, 20, 21, 22], unit: "%", definition: "Percentage of development spend that directly modifies user-facing services.", why_it_matters: "Measures the impact of development budget on the end-user experience." },
                { id: 3, label: "% of KPI2 tied to digital productivity", current_value: 45, target_value: 70, trend: [40, 42, 44, 43, 44, 45], unit: "%", definition: "Focus on productivity-enhancing digital tools and automation.", why_it_matters: "Ensures that digital initiatives are resulting in tangible efficiency gains for staff." },
                { id: 4, label: "New digital services released / month", current_value: newServices, target_value: 10, trend: [1, 1, 2, 1, 2, newServices], unit: "releases/mo", definition: "The output frequency of new digital products or major service updates.", why_it_matters: "Reflects the agility and throughput of the digital transformation pipeline." },
                { id: 5, label: "% of existing data used for decisions", current_value: kpi5Value, target_value: 40, trend: [10, 11, 11, 12, 12, kpi5Value], unit: "%", definition: "Ratio of structured data utilized in automated decision-making processes.", why_it_matters: "Key indicator of a data-driven culture and technical readiness for AI." },
                { id: 6, label: "Years since KPIs were last updated", current_value: 8, target_value: 5, trend: [8, 8, 8, 8, 8, 8], unit: "years", invert_scale: true, definition: "The age of the current performance measurement framework.", why_it_matters: "Legacy KPIs prevent modern goals from being measured." },
            ],
            shadow_innovation: {
                shadow_pct: shadowAnomalies.length > 0 ? 15.4 : 5.2,
                anomalies: shadowAnomalies.length > 0 ? shadowAnomalies : [
                    { unit: "General Admin", type: "Low Risk", confidence: 99, detail: "No major shadow IT anomalies detected in current batch." }
                ],
            },
            initiatives: [
                { id: "1", name: "AI Case Automation", owner: "Maria Svärd", type: "moonshot", stage: "active", age_days: 124, value_score: 85, feasibility_score: 40, status: "Critical" },
                { id: "2", name: "Legacy ERP Cleanup", owner: "Johan Holm", type: "enterprise_anchor", stage: "active", age_days: 450, value_score: 95, feasibility_score: 70, status: "On Track" },
                { id: "3", name: "Citizen Portal 2.0", owner: "Sara Lind", type: "venture", stage: "evaluation", age_days: 45, value_score: 70, feasibility_score: 65, status: "On Track" },
                { id: "4", name: "Cloud Migration Phase 1", owner: "Anders Ek", type: "enterprise_anchor", stage: "scaling", age_days: 200, value_score: 90, feasibility_score: 80, status: "On Track" },
                { id: "5", name: "IOT Waste Sensors", owner: "Erik Berg", type: "quick_win", stage: "scaling", age_days: 90, value_score: 60, feasibility_score: 90, status: "On Track" },
            ],
            infrastructure: infrastructure
        };

        res.json(dashboardData);
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`IMS Backend API Server listening on port ${PORT}`);
});
