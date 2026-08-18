const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Let's search for occurrences of app_byte1 outside of the unpackValue definition
// We want to find any observers or other methods that copy app_byte to mcu_byte
const term = 'app_byte1';
let pos = 0;
console.log('--- app_byte1 occurrences ---');
while ((pos = content.indexOf(term, pos)) !== -1) {
  const snippet = content.slice(Math.max(0, pos - 100), Math.min(content.length, pos + 150)).replace(/\s+/g, ' ');
  console.log(`  Near index ${pos}: ... ${snippet} ...`);
  pos += term.length;
}
