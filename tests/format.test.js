import test from "ava";
import fs from "fs";
import path from "path";

const domainsPath = path.resolve("domain");
const files = fs.readdirSync(domainsPath);

const allowedKinds = ["A", "AAAA", "TXT", "CNAME", "MX", "SRV", "PTR", "CAA", "TLSA", "SMIMEA", "SSHFP", "OPENPGPKEY", "SVCB", "HTTPS", "URI", "DS", "DNSKEY", "CDS", "CDNSKEY", "LOC", "NAPTR", "CERT", "DNAME", "NS"];

files.forEach((file) => {
  test(`Valid format for ${file}`, (t) => {
    const data = JSON.parse(fs.readFileSync(path.join(domainsPath, file), "utf8"));
    t.truthy(data.request, `${file}: Missing 'request' object`);
    t.truthy(data.request.sub, `${file}: Missing 'request.sub'`);
    t.truthy(data.request.owner, `${file}: Missing 'request.owner'`);
    t.truthy(data.request.owner.gh, `${file}: Missing 'request.owner.gh'`);
    t.true(Array.isArray(data.request.dns), `${file}: 'request.dns' should be an array`);
    t.true(data.request.dns.length > 0, `${file}: 'request.dns' must have at least one record`);
    data.request.dns.forEach((rec) => {
      t.truthy(rec.kind, `${file}: DNS record missing 'kind'`);
      t.truthy(rec.name, `${file}: DNS record missing 'name'`);
      t.truthy(rec.content, `${file}: DNS record missing 'content'`);
      t.true(typeof rec.proxy === 'boolean', `${file}: DNS record missing 'proxy' (boolean)`);
      t.true(Number.isInteger(rec.ttl), `${file}: DNS record missing 'ttl' (integer)`);
      t.true(allowedKinds.includes(rec.kind), `${file}: DNS record kind '${rec.kind}' is not allowed`);
      if (rec.kind === "NS") {
        t.truthy(data.request.ns_reason, `${file}: NS record requires 'ns_reason'`);
        t.true(data.request.ns_reason.length > 10, `${file}: 'ns_reason' must be descriptive`);
      }
    });
  });
}); 