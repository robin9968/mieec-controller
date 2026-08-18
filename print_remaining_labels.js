const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'page-frame.html');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find all matches for Z([3, "some chinese"]) or Z([3,'some chinese'])
const regex = /Z\(\[3,['"]([^'"]*[\u4e00-\u9fa5]+[^'"]*)['"]\]\)/g;
let match;
const found = [];
while ((match = regex.exec(content)) !== null) {
  found.push({ label: match[1], index: match.index });
}

console.log(`--- FOUND ${found.length} CHINESE LABELS ---`);
found.forEach((item, idx) => {
  if (idx >= 50 && idx < found.length) {
    const start = Math.max(0, item.index - 100);
    const end = Math.min(content.length, item.index + 120);
    const context = content.slice(start, end).replace(/\s+/g, ' ');
    console.log(`Label ${idx+1}: "${item.label}" near: ... ${context} ...`);
  }
});
