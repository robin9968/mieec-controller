const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Let's search for mcu_byte1: or mcu_byte2: in setData calls
const regex = /mcu_byte\d\s*:/g;
let pos = 0;
console.log('--- MCU_BYTE UPDATES ---');
while ((pos = content.indexOf('mcu_byte', pos)) !== -1) {
  const snippet = content.slice(pos - 50, pos + 100).replace(/\s+/g, ' ');
  if (snippet.includes(':') || snippet.includes('Change') || snippet.includes('Drag')) {
    console.log(`  Near index ${pos}: ... ${snippet} ...`);
  }
  pos += 8;
}
