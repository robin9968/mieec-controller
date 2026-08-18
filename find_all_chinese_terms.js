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
  // Let's grab the surrounding 200 characters to see which mcu_byte or variable it relates to
  const start = Math.max(0, match.index - 200);
  const end = Math.min(content.length, match.index + 200);
  const context = content.slice(start, end).replace(/\s+/g, ' ');
  found.push({ label: match[1], context });
}

console.log(`--- FOUND ${found.length} CHINESE LABELS ---`);
found.forEach((item, idx) => {
  console.log(`\nLabel ${idx+1}: "${item.label}"`);
  console.log(`Context: ${item.context}`);
});
