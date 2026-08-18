const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'page-frame.html');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find all matches for mcu_bool1Change, mcu_bool2Change...
for (let i = 1; i <= 9; i++) {
  const handler = `mcu_bool${i}Change`;
  let idx = 0;
  console.log(`\n=== HANDLER: ${handler} ===`);
  while ((idx = content.indexOf(handler, idx)) !== -1) {
    const start = Math.max(0, idx - 400);
    const end = Math.min(content.length, idx + 400);
    // Find Chinese characters or text labels
    const snippet = content.slice(start, end).replace(/\s+/g, ' ');
    console.log(`  Near: ... ${snippet} ...`);
    idx += handler.length;
  }
}
