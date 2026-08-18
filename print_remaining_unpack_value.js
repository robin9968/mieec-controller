const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

const term = 'MODIFIED_REEL:mt})}"大师模式"==P';
const pos = content.indexOf(term);
if (pos !== -1) {
  console.log(content.slice(pos, pos + 1500));
} else {
  console.log('Term not found');
}
