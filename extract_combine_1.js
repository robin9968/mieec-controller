const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Extract combineValue from index 135506
const start = 135500;
const snippet = content.slice(start, start + 2500);
console.log(snippet);
