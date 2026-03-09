const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.sqlite');
const schemaPath = path.join(__dirname, '..', 'schema.sql');

// Remove existing database to start fresh
if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
}

const db = new Database(dbPath);

console.log('Loading schema...');
const schema = fs.readFileSync(schemaPath, 'utf8');
db.exec(schema);

console.log('Seeding data...');

// 1. Organization Units
const orgInsert = db.prepare('INSERT INTO organization_units (name, type, parent_id, short_code) VALUES (?, ?, ?, ?)');
const orgs = [
    { name: 'Sundsvall Municipality', type: 'municipality', parent_id: null, short_code: 'SM' },
    { name: 'Social Services Administration', type: 'administration', parent_id: 1, short_code: 'SOC' },
    { name: 'Education Administration', type: 'administration', parent_id: 1, short_code: 'EDU' },
    { name: 'Urban Planning Administration', type: 'administration', parent_id: 1, short_code: 'URB' },
    { name: 'IT Shared Services', type: 'shared_service', parent_id: 1, short_code: 'IT' },
    { name: 'Sundsvall Energy AB', type: 'company', parent_id: 1, short_code: 'NRG' }
];
const orgIds = {};
for (const org of orgs) {
    const info = orgInsert.run(org.name, org.type, org.parent_id, org.short_code);
    orgIds[org.short_code] = info.lastInsertRowid;
}

// 2. Business Services
const bizServiceInsert = db.prepare('INSERT INTO business_services (name, category, lifecycle_stage, owner_unit_id, public_value_dimension, description) VALUES (?, ?, ?, ?, ?, ?)');
const bizServices = [
    { name: 'Elderly home care', cat: 'elderly_care', stage: 'elderly_care', owner: 'SOC', val: 'access' },
    { name: 'Addiction support', cat: 'social_care', stage: 'working_age', owner: 'SOC', val: 'equality' },
    { name: 'Primary schools', cat: 'schooling', stage: 'schooling', owner: 'EDU', val: 'equality' },
    { name: 'Pre-schools', cat: 'schooling', stage: 'early_childhood', owner: 'EDU', val: 'access' },
    { name: 'Adult education', cat: 'schooling', stage: 'working_age', owner: 'EDU', val: 'cost_efficiency' },
    { name: 'Building permits', cat: 'infrastructure', stage: 'cross_cutting', owner: 'URB', val: 'speed' },
    { name: 'City planning', cat: 'infrastructure', stage: 'cross_cutting', owner: 'URB', val: 'transparency' },
    { name: 'Citizen portal', cat: 'finance_admin', stage: 'cross_cutting', owner: 'IT', val: 'access' },
    { name: 'Financial accounting', cat: 'finance_admin', stage: 'cross_cutting', owner: 'IT', val: 'cost_efficiency' },
    { name: 'HR management', cat: 'finance_admin', stage: 'cross_cutting', owner: 'IT', val: 'cost_efficiency' },
    { name: 'District heating', cat: 'infrastructure', stage: 'cross_cutting', owner: 'NRG', val: 'access' },
    { name: 'Power grid operations', cat: 'infrastructure', stage: 'cross_cutting', owner: 'NRG', val: 'cost_efficiency' }
];
const bsIds = [];
for (const bs of bizServices) {
    const info = bizServiceInsert.run(bs.name, bs.cat, bs.stage, orgIds[bs.owner], bs.val, `Description for ${bs.name}`);
    bsIds.push(info.lastInsertRowid);
}

// 3. Application Systems
const appInsert = db.prepare('INSERT INTO application_systems (name, short_code, description, lifecycle_status, criticality, owner_unit_id, business_value_score, risk_score, technology_stack, data_sensitivity, is_key_platform) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
const apps = [
    { name: 'Case360', code: 'CASE360', status: 'active', crit: 3, owner: 'IT', bvs: 9, rs: 8, tech: '.NET Core on-prem', sens: 'high', is_plat: 1 },
    { name: 'Eneo AI Platform', code: 'ENEO', status: 'active', crit: 2, owner: 'IT', bvs: 8, rs: 7, tech: 'Kubernetes / Python', sens: 'medium', is_plat: 1 },
    { name: 'LearningPortal', code: 'LEARNP', status: 'active', crit: 3, owner: 'EDU', bvs: 9, rs: 5, tech: 'SaaS multi-tenant', sens: 'high', is_plat: 0 },
    { name: 'ElderCare Pro', code: 'ECP', status: 'active', crit: 3, owner: 'SOC', bvs: 8, rs: 8, tech: 'Java / Oracle', sens: 'high', is_plat: 0 },
    { name: 'Proxima Finance', code: 'PROX', status: 'active', crit: 3, owner: 'IT', bvs: 9, rs: 4, tech: 'SaaS', sens: 'high', is_plat: 0 },
    { name: 'HR Maestro', code: 'HRM', status: 'sunset', crit: 2, owner: 'IT', bvs: 5, rs: 9, tech: 'Legacy Windows', sens: 'high', is_plat: 0 },
    { name: 'PermitFlow', code: 'PERM', status: 'active', crit: 2, owner: 'URB', bvs: 7, rs: 4, tech: 'Node.js / Azure', sens: 'medium', is_plat: 0 },
    { name: 'CitizenConnect', code: 'CITIZEN', status: 'active', crit: 3, owner: 'IT', bvs: 10, rs: 6, tech: 'React / Node', sens: 'medium', is_plat: 1 },
    { name: 'SchoolBus Router', code: 'SBR', status: 'active', crit: 1, owner: 'EDU', bvs: 6, rs: 3, tech: 'SaaS', sens: 'low', is_plat: 0 },
    { name: 'EnergyGrid View', code: 'EGV', status: 'active', crit: 3, owner: 'NRG', bvs: 9, rs: 7, tech: 'SCADA / C++', sens: 'medium', is_plat: 0 },
    { name: 'Archival Vault', code: 'ARCH', status: 'active', crit: 2, owner: 'IT', bvs: 7, rs: 4, tech: 'On-prem Storage', sens: 'high', is_plat: 1 },
    { name: 'Library System', code: 'LIB', status: 'active', crit: 2, owner: 'EDU', bvs: 7, rs: 3, tech: 'SaaS', sens: 'low', is_plat: 0 },
    { name: 'PreSchool Admin', code: 'PREA', status: 'active', crit: 2, owner: 'EDU', bvs: 8, rs: 5, tech: '.NET Cloud', sens: 'medium', is_plat: 0 },
    { name: 'Addiction Tracker', code: 'ADDTR', status: 'sunset', crit: 2, owner: 'SOC', bvs: 5, rs: 8, tech: 'Access DB', sens: 'high', is_plat: 0 },
    { name: 'CityMap GIS', code: 'GIS', status: 'active', crit: 2, owner: 'URB', bvs: 8, rs: 3, tech: 'Esri ArcGIS', sens: 'medium', is_plat: 1 },
    { name: 'Heating Billing', code: 'HBILL', status: 'active', crit: 3, owner: 'NRG', bvs: 9, rs: 6, tech: 'Java', sens: 'medium', is_plat: 0 },
    { name: 'Recruitment Hub', code: 'RECRUIT', status: 'planned', crit: 1, owner: 'IT', bvs: 7, rs: 2, tech: 'SaaS', sens: 'medium', is_plat: 0 },
    { name: 'Youth Center Booking', code: 'YCB', status: 'retired', crit: 1, owner: 'SOC', bvs: 2, rs: 2, tech: 'PHP', sens: 'low', is_plat: 0 },
    { name: 'Sanitation Logistics', code: 'SANI', status: 'active', crit: 3, owner: 'URB', bvs: 8, rs: 6, tech: '.NET', sens: 'medium', is_plat: 0 },
    { name: 'Water Mgmt', code: 'WATER', status: 'active', crit: 3, owner: 'URB', bvs: 10, rs: 9, tech: 'SCADA/Local', sens: 'medium', is_plat: 1 },
    // more dummy apps
];
for (let i = 0; i < 30; i++) {
    apps.push({ name: `App System ${i}`, code: `APP${i}`, status: 'active', crit: (i % 3) + 1, owner: 'IT', bvs: 5 + (i % 5), rs: 3 + (i % 4), tech: 'Various', sens: 'medium', is_plat: 0 });
}
const appIds = [];
for (const app of apps) {
    const info = appInsert.run(app.name, app.code, `Description of ${app.name}`, app.status, app.crit, orgIds[app.owner], app.bvs, app.rs, app.tech, app.sens, app.is_plat);
    appIds.push(info.lastInsertRowid);
}

// 4. App <-> Business Service Links
const appBsInsert = db.prepare('INSERT INTO app_business_service_link (application_id, business_service_id, primary_flag) VALUES (?, ?, ?)');
for (let i = 0; i < appIds.length; i++) {
    let bsIdx1 = i % bsIds.length;
    let bsIdx2 = (i + 3) % bsIds.length;
    appBsInsert.run(appIds[i], bsIds[bsIdx1], 1);
    if (i % 2 === 0) appBsInsert.run(appIds[i], bsIds[bsIdx2], 0);
}

// 5. Technical Components
const tcInsert = db.prepare('INSERT INTO technical_components (name, type, vendor, lifecycle_status, location) VALUES (?, ?, ?, ?, ?)');
const tcs = [
    { name: 'K8s Cluster Alpha', type: 'container_platform', vendor: 'Google', status: 'active', loc: 'GCP Europe' },
    { name: 'SQL Server Legacy', type: 'database', vendor: 'Microsoft', status: 'sunset', loc: 'On-prem DC 1' },
    { name: 'Postgres Prod Shared', type: 'database', vendor: 'Open Source', status: 'active', loc: 'Azure West EU' },
    { name: 'Azure API Gateway', type: 'api_gateway', vendor: 'Microsoft', status: 'active', loc: 'Azure West EU' },
    { name: 'Web VM Farm', type: 'vm', vendor: 'VMware', status: 'active', loc: 'On-prem DC 2' }
];
const tcIds = [];
for (const tc of tcs) {
    tcIds.push(tcInsert.run(tc.name, tc.type, tc.vendor, tc.status, tc.loc).lastInsertRowid);
}

// 6. App <-> TC links
const appTcInsert = db.prepare('INSERT INTO app_tech_component_link (application_id, tech_component_id, relationship_type) VALUES (?, ?, ?)');
for (let i = 0; i < appIds.length; i++) {
    appTcInsert.run(appIds[i], tcIds[i % tcIds.length], 'runs_on');
    if (i % 3 === 0) appTcInsert.run(appIds[i], tcIds[(i + 1) % tcIds.length], 'stores_data_in');
}

// 7. Interfaces
const ifaceInsert = db.prepare('INSERT INTO interfaces (application_id, name, type, direction, data_domain, availability_slo, sensitivity) VALUES (?, ?, ?, ?, ?, ?, ?)');
const interfaceIds = [];
for (let i = 0; i < appIds.length; i++) {
    // 2 interfaces per app on avg
    interfaceIds.push(ifaceInsert.run(appIds[i], `API_In_${i}`, 'REST', 'inbound', 'citizen_data', 99.5, 'medium').lastInsertRowid);
    interfaceIds.push(ifaceInsert.run(appIds[i], `Feed_Out_${i}`, 'file_drop', 'outbound', 'financial_data', 95.0, 'low').lastInsertRowid);
}

// 8. Integrations
const integInsert = db.prepare('INSERT INTO integrations (source_interface_id, target_interface_id, transfer_method, frequency, status, description) VALUES (?, ?, ?, ?, ?, ?)');
const integrationIds = [];
for (let i = 0; i < appIds.length - 1; i++) {
    // Connect Outbound of app i to Inbound of app i+1
    let sourceId = interfaceIds[i * 2 + 1]; // Outbound
    let targetId = interfaceIds[(i + 1) * 2]; // Inbound
    let methods = ['api_call', 'csv_file', 'sftp', 'message_bus', 'webhook'];
    let frq = ['real_time', 'hourly', 'daily', 'weekly'];

    integrationIds.push(integInsert.run(
        sourceId, targetId,
        methods[i % methods.length],
        frq[i % frq.length],
        'active',
        `Integration ${i}`
    ).lastInsertRowid);
}

// 9. Usage Metrics (last 180 days)
console.log('Generating Usage Metrics (180 days)...');
const usageInsert = db.prepare('INSERT INTO usage_metrics (application_id, date, active_users, api_calls, avg_response_ms, error_rate, cpu_pct, memory_pct) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
const days = 180;
let baseDate = new Date();
baseDate.setDate(baseDate.getDate() - days);

db.exec('BEGIN TRANSACTION');
for (let d = 0; d < days; d++) {
    let currDateStr = new Date(baseDate.getTime() + d * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    for (const app of appIds) {
        let isWeekend = new Date(currDateStr).getDay() % 6 === 0;
        let scale = isWeekend ? 0.2 : 1.0;
        let users = Math.floor((Math.random() * 500 + 50) * scale);
        let calls = Math.floor((Math.random() * 10000 + 500) * scale);
        let respMs = Math.floor(Math.random() * 300 + 50);
        let errRate = +(Math.random() * 0.5).toFixed(2); // mostly low
        // Occasionally spike error rate
        if (Math.random() < 0.05) errRate = +(Math.random() * 5 + 1).toFixed(2);

        usageInsert.run(app, currDateStr, users, calls, respMs, errRate, Math.random() * 100, Math.random() * 100);
    }
}
db.exec('COMMIT');

// 10. API Metrics (last 90 days)
console.log('Generating API Metrics (90 days)...');
const apiMetricInsert = db.prepare('INSERT INTO api_metrics (interface_id, date, requests, avg_latency_ms, p95_latency_ms, errors_5xx, errors_4xx) VALUES (?, ?, ?, ?, ?, ?, ?)');
let apiDays = 90;
let apiBaseDate = new Date();
apiBaseDate.setDate(apiBaseDate.getDate() - apiDays);

db.exec('BEGIN TRANSACTION');
for (let d = 0; d < apiDays; d++) {
    let currDateStr = new Date(apiBaseDate.getTime() + d * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    for (const iface of interfaceIds) {
        let reqs = Math.floor(Math.random() * 5000);
        let lat = Math.floor(Math.random() * 200 + 20);
        apiMetricInsert.run(iface, currDateStr, reqs, lat, lat * 2, Math.floor(Math.random() * 10), Math.floor(Math.random() * 50));
    }
}
db.exec('COMMIT');

// 11. Incidents
const incidentInsert = db.prepare('INSERT INTO incidents (application_id, integration_id, severity, start_time, end_time, cause_category, description, user_impact_estimate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
db.exec('BEGIN TRANSACTION');
const causes = ['vendor_issue', 'internal_change', 'infra_failure', 'external_dependency', 'unknown'];
for (let i = 0; i < 150; i++) {
    let appId = appIds[Math.floor(Math.random() * appIds.length)];
    let integId = Math.random() > 0.5 ? integrationIds[Math.floor(Math.random() * integrationIds.length)] : null;

    let daysAgo = Math.floor(Math.random() * 365);
    let startD = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);
    let endD = new Date(startD.getTime() + Math.random() * 5 * 60 * 60 * 1000); // 0-5 hours later

    incidentInsert.run(
        appId, integId,
        Math.floor(Math.random() * 3) + 1,
        startD.toISOString(),
        endD.toISOString(),
        causes[Math.floor(Math.random() * causes.length)],
        `Random incident ${i}`,
        Math.floor(Math.random() * 1000)
    );
}
db.exec('COMMIT');

// 14. Sourcing Setups
const srcInsert = db.prepare('INSERT INTO sourcing_setups (application_id, vendor_name, sourcing_model, contract_start, contract_end, annual_cost_eur, supports_encapsulation) VALUES (?, ?, ?, ?, ?, ?, ?)');
const vendors = ['Tietoevry', 'CGI', 'Microsoft', 'AWS', 'Visma', 'LocalDevs AB'];
const models = ['on_prem', 'saas', 'outsourced', 'insourced_dev', 'mixed'];
db.exec('BEGIN TRANSACTION');
for (const appId of appIds) {
    srcInsert.run(
        appId,
        vendors[Math.floor(Math.random() * vendors.length)],
        models[Math.floor(Math.random() * models.length)],
        '2022-01-01',
        '2026-12-31',
        Math.floor(Math.random() * 500000 + 10000),
        Math.random() > 0.5 ? 1 : 0
    );
}
db.exec('COMMIT');

console.log('Done seeding!');
