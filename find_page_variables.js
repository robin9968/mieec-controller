const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find all mcu_byte variables in the state data (e.g. mcu_byte1, mcu_byte2...)
// We want to list all variables in the data block of the page that contains mcu_byte8 and mcu_byte9.
const idx = content.indexOf('mcu_byte8:');
if (idx !== -1) {
  console.log('Found mcu_byte8 inside code:');
  console.log(content.slice(idx - 200, idx + 400).replace(/\s+/g, ' '));
}

// Let's print out all mcu_byte variables that are bound to sliders in the WXML
// WXML has sliders like mcu_byte8Drag, mcu_byte9Drag, etc.
// Let's search for "Drag" in the file to see all drag handlers!
console.log('\n--- DRAG HANDLERS ---');
let pos = 0;
while ((pos = content.indexOf('Drag:', pos)) !== -1) {
  const snippet = content.slice(pos - 30, pos + 200).replace(/\s+/g, ' ');
  console.log(`  Near index ${pos}: ... ${snippet} ...`);
  pos += 5;
}
