const fs = require('fs');
const path = require('path');
const axios = require('axios');

const CF_API_TOKEN = process.env.CF_API_TOKEN;
const CF_ZONE_ID = process.env.CF_ZONE_ID;

const headers = {
  Authorization: `Bearer ${CF_API_TOKEN}`,
  'Content-Type': 'application/json',
};

const BASE_URL = `https://api.cloudflare.com/client/v4/zones/${CF_ZONE_ID}/dns_records`;

const files = fs.readdirSync('./domain');

(async () => {
  for (const file of files) {
    const content = JSON.parse(fs.readFileSync(path.join('./domain', file)));
    const req = content.request;
    const name = `${req.sub}.i-am-very.gay`;
    for (const rec of req.dns) {
      if (rec.kind === 'NS' && !req.ns_reason) {
        console.error(`NS record for ${name} requires a justification (ns_reason). Skipping.`);
        continue;
      }
      console.log(`Creating ${rec.kind} record for ${name} → ${rec.target}`);
      await axios.post(BASE_URL, {
        type: rec.kind,
        name,
        content: rec.target,
        ttl: 3600,
      }, { headers }).catch(err => {
        if (err.response?.data?.errors) {
          console.error(err.response.data.errors);
        } else {
          console.error(err.message);
        }
      });
    }
  }
})(); 