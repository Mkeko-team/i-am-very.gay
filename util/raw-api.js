// util/raw-api.js
// Generates a public API JSON (v1.json) from all subdomain files in the new format
// Usage: node util/raw-api.js

const fs = require('fs');
const path = require('path');

const domainsPath = path.resolve('domain');
const files = fs.readdirSync(domainsPath).filter(f => f.endsWith('.json'));

const reserved = require('./reserved.json');

const all = files
  .map(file => {
    const data = JSON.parse(fs.readFileSync(path.join(domainsPath, file), 'utf8'));
    // Skip reserved subdomains
    if (reserved.includes(data.request.sub)) return null;
    return {
      sub: data.request.sub,
      owner: data.request.owner,
      dns: data.request.dns,
      ns_reason: data.request.ns_reason || ""
    };
  })
  .filter(Boolean);

if (!fs.existsSync('public')) fs.mkdirSync('public');
fs.writeFileSync('public/v1.json', JSON.stringify(all, null, 2));
console.log('API generated at public/v1.json'); 