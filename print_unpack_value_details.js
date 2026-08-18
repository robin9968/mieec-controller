const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

const term = '66==a';
const pos = content.indexOf(term);
if (pos !== -1) {
  console.log(content.slice(pos - 100, pos + 1200).replace(/\s+/g, ' '));
} else {
  console.log('66==a not found');
}
