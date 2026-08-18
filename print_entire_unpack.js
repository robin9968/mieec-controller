const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

const term = 'unpackValue:function';
const pos = content.indexOf(term);
if (pos !== -1) {
  // Let's print 4000 characters to make sure we get the whole function!
  console.log(content.slice(pos, pos + 4000));
} else {
  console.log('unpackValue:function not found');
}
