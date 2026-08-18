const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Search for mcu_boolXChange definitions
for (let i = 1; i <= 7; i++) {
  const name = `mcu_bool${i}Change`;
  console.log(`\n=================== FUNCTION: ${name} ===================`);
  let idx = 0;
  while ((idx = content.indexOf(name + ':', idx)) !== -1) {
    console.log(content.slice(idx, idx + 600).replace(/\s+/g, ' '));
    idx += name.length;
  }
}
