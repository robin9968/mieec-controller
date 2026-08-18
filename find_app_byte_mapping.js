const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Let's search for "app_byte" and see how it maps to "mcu_byte"
const terms = ['app_byte0', 'app_byte1', 'app_byte2', 'app_byte3', 'app_byte4', 'app_byte5', 'app_byte6', 'app_byte7'];

terms.forEach(term => {
  let pos = 0;
  console.log(`\n=================== SEARCHING FOR: ${term} ===================`);
  let count = 0;
  while ((pos = content.indexOf(term, pos)) !== -1 && count < 5) {
    const snippet = content.slice(Math.max(0, pos - 100), Math.min(content.length, pos + 150)).replace(/\s+/g, ' ');
    console.log(`  Match ${count+1}: ... ${snippet} ...`);
    pos += term.length;
    count++;
  }
});
