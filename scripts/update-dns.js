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
    for (const rec of req.dns) {
      const fqdn = `${rec.name}.i-am-very.gay`;
      const recordData = {
        type: rec.kind,
        name: fqdn,
        content: rec.content
      };
      if (typeof rec.proxy === 'boolean') recordData.proxied = rec.proxy;
      // TTL logic: if proxy is true, omit ttl (Cloudflare auto); if proxy is false, require ttl, but if missing or 0, omit for auto
      if (rec.proxy === true) {
        // Do not set ttl, Cloudflare will use auto
      } else {
        if (rec.ttl && rec.ttl > 0) {
          recordData.ttl = rec.ttl;
        } // else omit ttl for auto
      }
      await axios.post(BASE_URL, recordData, { headers }).catch(err => {
        if (err.response?.data?.errors) {
          console.error(err.response.data.errors);
        } else {
          console.error(err.message);
        }
      });
    }
  }
})(); 