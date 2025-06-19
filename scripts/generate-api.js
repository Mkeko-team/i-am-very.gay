const fs = require('fs');
const path = require('path');

const domainsPath = path.resolve('domain');
const files = fs.readdirSync(domainsPath).filter(f => f.endsWith('.json'));

const reserved = fs.existsSync('util/reserved.json') ? require('../util/reserved.json') : [];

const all = files
  .map(file => {
    const data = JSON.parse(fs.readFileSync(path.join(domainsPath, file), 'utf8'));
    if (reserved.includes(data.request.sub)) return null;
    return {
      sub: data.request.sub,
      owner: data.request.owner,
      dns: data.request.dns,
      ns_reason: data.request.ns_reason || ""
    };
  })
  .filter(Boolean);

const outputPath = process.argv[2] || 'raw-api/v1.json';
const outputDir = path.dirname(outputPath);
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });
fs.writeFileSync(outputPath, JSON.stringify(all, null, 2));
console.log(`API generated at ${outputPath}`); 