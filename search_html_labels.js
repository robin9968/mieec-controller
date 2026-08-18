const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'extracted');
const files = fs.readdirSync(dir);

files.forEach(file => {
  const filepath = path.join(dir, file);
  if (fs.statSync(filepath).isDirectory()) return;
  if (!file.endsWith('.html') && !file.endsWith('.js')) return;

  const content = fs.readFileSync(filepath, 'utf-8');
  for (let i = 1; i <= 9; i++) {
    const term = `mcu_bool${i}`;
    let idx = 0;
    while ((idx = content.indexOf(term, idx)) !== -1) {
      const start = Math.max(0, idx - 150);
      const end = Math.min(content.length, idx + term.length + 150);
      const snippet = content.slice(start, end).replace(/\s+/g, ' ');
      console.log(`Found "${term}" in ${file} at ${idx}:`);
      console.log(`  ... ${snippet} ...`);
      idx += term.length;
    }
  }
});
