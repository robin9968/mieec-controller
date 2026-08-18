const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find occurrences of mcu_byte
const mcuBytes = [
  'mcu_byte1', 'mcu_byte2', 'mcu_byte3', 'mcu_byte4', 'mcu_byte5', 
  'mcu_byte6', 'mcu_byte7', 'mcu_byte8', 'mcu_byte9', 'mcu_byte10', 
  'mcu_byte11', 'mcu_byte12', 'mcu_byte13', 'mcu_byte17', 'mcu_byte18', 'mcu_byte61'
];

mcuBytes.forEach(byteName => {
  console.log(`\n=================== ${byteName} ===================`);
  let idx = 0;
  let count = 0;
  while ((idx = content.indexOf(byteName, idx)) !== -1 && count < 5) {
    const start = Math.max(0, idx - 120);
    const end = Math.min(content.length, idx + byteName.length + 150);
    console.log(`Match ${count + 1} at ${idx}: ... ${content.slice(start, end).replace(/\s+/g, ' ')} ...`);
    idx += byteName.length;
    count++;
  }
});
