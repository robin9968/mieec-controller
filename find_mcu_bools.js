const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find occurrences of mcu_bool
const mcuBools = ['mcu_bool1', 'mcu_bool2', 'mcu_bool3', 'mcu_bool4', 'mcu_bool5', 'mcu_bool6', 'mcu_bool7'];

mcuBools.forEach(boolName => {
  console.log(`\n=================== ${boolName} ===================`);
  let idx = 0;
  let count = 0;
  while ((idx = content.indexOf(boolName, idx)) !== -1 && count < 5) {
    const start = Math.max(0, idx - 100);
    const end = Math.min(content.length, idx + boolName.length + 150);
    console.log(`Match ${count + 1} at ${idx}: ... ${content.slice(start, end).replace(/\s+/g, ' ')} ...`);
    idx += boolName.length;
    count++;
  }
});
