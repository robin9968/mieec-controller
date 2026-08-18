const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'page-frame.html');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// We want to find where mcu_byte13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32 are used in templates
const bytes = [13, 14, 15, 16, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32];

bytes.forEach(b => {
  const term = `mcu_byte${b}`;
  let idx = 0;
  console.log(`\n=================== SEARCHING FOR: ${term} ===================`);
  while ((idx = content.indexOf(term, idx)) !== -1) {
    const start = Math.max(0, idx - 250);
    const end = Math.min(content.length, idx + term.length + 250);
    console.log(content.slice(start, end).replace(/\s+/g, ' '));
    idx += term.length;
  }
});
