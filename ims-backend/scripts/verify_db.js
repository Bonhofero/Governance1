const Database = require('better-sqlite3');
const path = require('path');

const dbPath = path.join(__dirname, '..', 'database.sqlite');

try {
    console.log(`\n--- DATABASE VERIFICATION ---`);
    console.log(`Attempting to connect to database at: ${dbPath}`);

    // Connect to the database
    const db = new Database(dbPath, { readonly: true, fileMustExist: true });
    console.log('✅ Successfully connected to the database.');

    // List all tables
    const tables = db.prepare("SELECT name FROM sqlite_master WHERE type='table'").all();
    console.log(`\nTables found (${tables.length}):`);
    console.log(tables.map(t => `- ${t.name}`).join('\n'));

    // Verify key tables and record counts
    const keyTables = [
        'application_systems',
        'organization_units',
        'sourcing_setups',
        'business_services',
        'usage_metrics',
        'incidents'
    ];

    console.log('\n--- DATA INTEGRITY CHECK ---');
    for (const tableName of keyTables) {
        if (tables.some(t => t.name === tableName)) {
            const result = db.prepare(`SELECT COUNT(*) as count FROM ${tableName}`).get();
            console.log(`✅ Table '${tableName}': ${result.count} records found.`);
        } else {
            console.log(`❌ Table '${tableName}': MISSING!`);
        }
    }

    // Sample query verification
    console.log('\n--- SAMPLE QUERY TEST ---');
    const sampleApp = db.prepare("SELECT name, criticality FROM application_systems LIMIT 1").get();
    if (sampleApp) {
        console.log(`✅ Sample Query (application_systems): Found app "${sampleApp.name}" with criticality ${sampleApp.criticality}`);
    } else {
        console.log('❌ Sample Query: No records found in application_systems.');
    }

    db.close();
    console.log('\n✅ Database connection closed safely.');
    console.log('-----------------------------\n');
    process.exit(0);
} catch (error) {
    console.error(`\n❌ DATABASE ERROR: ${error.message}`);
    process.exit(1);
}
