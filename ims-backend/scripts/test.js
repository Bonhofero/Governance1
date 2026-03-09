const http = require('http');

const endpoints = [
    '/api/applications',
    '/api/applications/1',
    '/api/integrations',
    '/api/risk-matrix',
    '/api/sourcing',
    '/api/metrics/application/1?from=2024-01-01'
];

async function testEndpoint(path) {
    return new Promise((resolve) => {
        http.get(`http://localhost:3000${path}`, (res) => {
            let data = '';
            res.on('data', chunk => data += chunk);
            res.on('end', () => {
                console.log(`\n--- GET ${path} [${res.statusCode}] ---`);
                try {
                    const parsed = JSON.parse(data);
                    // Just print structure or first element to keep logs clean
                    if (Array.isArray(parsed)) {
                        console.log(`Returned array of ${parsed.length} items.`);
                        if (parsed.length > 0) {
                            console.log('First item keys:', Object.keys(parsed[0]).join(', '));
                            console.log('First item:', JSON.stringify(parsed[0], null, 2));
                        }
                    } else {
                        console.log('Returned object. Keys:', Object.keys(parsed).join(', '));
                        console.log('Object preview:', JSON.stringify(parsed, null, 2).substring(0, 500) + '...');
                    }
                    resolve(true);
                } catch (e) {
                    console.error('Failed to parse JSON:', e, data.substring(0, 200));
                    resolve(false);
                }
            });
        }).on('error', (e) => {
            console.error(`Request to ${path} failed:`, e.message);
            resolve(false);
        });
    });
}

async function runAll() {
    console.log('Waiting 2 seconds for server to boot...');
    await new Promise(r => setTimeout(r, 2000));

    for (const path of endpoints) {
        await testEndpoint(path);
    }
    console.log('\\nAll tests completed.');
    process.exit(0);
}

runAll();
