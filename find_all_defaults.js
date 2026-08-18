const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find page initialization with the default mcu data
const idx = content.indexOf('mcu_bool0:1,mcu_bool1:0');
if (idx !== -1) {
  console.log('Found default data block:');
  console.log(content.slice(idx - 300, idx + 1200).replace(/\s+/g, ' '));
} else {
  console.log('Default data block not found!');
}
