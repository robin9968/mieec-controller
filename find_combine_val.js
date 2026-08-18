const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find function definition of combineValue
const target = 'combineValue:function';
let idx = 0;
while ((idx = content.indexOf(target, idx)) !== -1) {
  console.log(`Found ${target} at index ${idx}:`);
  const snippet = content.slice(idx, idx + 2500);
  console.log(snippet);
  idx += target.length;
}
