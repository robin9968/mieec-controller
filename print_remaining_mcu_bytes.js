const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'page-frame.html');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

const bytes = [10, 11, 12, 60, 61];

bytes.forEach(b => {
  const term = `mcu_byte${b}`;
  let idx = 0;
  console.log(`\n=================== SEARCHING FOR: ${term} ===================`);
  let count = 0;
  while ((idx = content.indexOf(term, idx)) !== -1 && count < 8) {
    const start = Math.max(0, idx - 180);
    const end = Math.min(content.length, idx + term.length + 180);
    console.log(`  Match ${count+1}: ... ${content.slice(start, end).replace(/\s+/g, ' ')} ...`);
    idx += term.length;
    count++;
  }
});
