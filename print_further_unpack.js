const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

const term = 'this.data.brakeleveltemp1=(this.data.brakeleveltemp1+100*this.data.brakeleveltemp)/100';
const pos = content.indexOf(term);
if (pos !== -1) {
  console.log(content.slice(pos, pos + 2000));
} else {
  console.log('Term not found');
}
