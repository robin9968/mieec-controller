const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find all calls to .write(
let idx = 0;
while ((idx = content.indexOf('.write({', idx)) !== -1) {
  const start = Math.max(0, idx - 400);
  const end = Math.min(content.length, idx + 400);
  console.log(`\n=================== WRITE CALL AT INDEX ${idx} ===================`);
  console.log(content.slice(start, end).replace(/\s+/g, ' '));
  idx += 8;
}
