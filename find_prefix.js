const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find suffix: and prefix: definitions in data
const keywords = ['suffix:', 'prefix:', 'filterName:'];

keywords.forEach(kw => {
  console.log(`\n=================== SEARCHING FOR: ${kw} ===================`);
  let idx = 0;
  while ((idx = content.indexOf(kw, idx)) !== -1) {
    const start = Math.max(0, idx - 100);
    const end = Math.min(content.length, idx + kw.length + 150);
    console.log(content.slice(start, end).replace(/\s+/g, ' '));
    idx += kw.length;
  }
});
