import test from 'ava';
import fs from 'fs';
import path from 'path';

const domainDir = './domain';

const allowedTypes = ['A', 'AAAA', 'TXT'];

fs.readdirSync(domainDir).forEach(file => {
  const content = JSON.parse(fs.readFileSync(path.join(domainDir, file)));
  test(`Valid record type for ${file}`, t => {
    const type = content.record.type;
    if (type === 'NS') {
      t.truthy(content.justification, 'NS records require a justification field');
    } else {
      t.true(allowedTypes.includes(type), `Record type must be one of: ${allowedTypes.join(', ')} or NS with justification`);
    }
  });
}); 