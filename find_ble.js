const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'extracted');
const files = ['app-service.js', 'appservice.app.js', 'chunk_0.appservice.js', 'common.app.js'];

files.forEach(filename => {
  const filepath = path.join(dir, filename);
  if (!fs.existsSync(filepath)) return;
  console.log('Searching in:', filename);
  const content = fs.readFileSync(filepath, 'utf-8');

  // Search for UUIDs
  const uuidRegex = /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/gi;
  let match;
  const uuids = new Set();
  while ((match = uuidRegex.exec(content)) !== null) {
    uuids.add(match[0]);
  }
  if (uuids.size > 0) {
    console.log(`  Found UUIDs:`, Array.from(uuids));
  }

  // Search for serviceId or characteristicId or suuid/cuuid assignments
  const keywords = ['suuid', 'cuuid', 'write', 'serviceId', 'characteristicId', 'FEE7', 'FFE0', 'FFE1', '0000ffe'];
  keywords.forEach(kw => {
    let idx = 0;
    while ((idx = content.indexOf(kw, idx)) !== -1) {
      const start = Math.max(0, idx - 80);
      const end = Math.min(content.length, idx + kw.length + 80);
      const snippet = content.slice(start, end).replace(/\s+/g, ' ');
      console.log(`  Found keyword "${kw}" near: ... ${snippet} ...`);
      idx += kw.length;
    }
  });
});
