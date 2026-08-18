const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find all matches for mcu_byteXX_text
const textRegex = /mcu_byte\d+_text:\s*"[^"]*"/g;
let match;
const matches = new Set();
while ((match = textRegex.exec(content)) !== null) {
  matches.add(match[0]);
}

console.log('--- FOUND TEXT MAPPINGS ---');
Array.from(matches).forEach(m => console.log(m));

// Let's also search for variables like mcu_byte1Change or check_type in the code
// to see how the user inputs map to values.
const changes = ['mcu_byte1Change', 'mcu_byte2Change', 'mcu_byte3Change', 'mcu_byte4Change', 'mcu_byte61Change'];
changes.forEach(c => {
  console.log(`\n--- SEARCHING FOR ${c} ---`);
  let idx = 0;
  while ((idx = content.indexOf(c, idx)) !== -1) {
    console.log(content.slice(idx, idx + 1000).replace(/\s+/g, ' '));
    idx += c.length;
  }
});
