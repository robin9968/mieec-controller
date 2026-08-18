const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'app', 'index.html');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');
const lines = content.split('\n');

lines.forEach((line, idx) => {
  if (line.includes('handleNotification')) {
    console.log(`Line ${idx+1}: ${line}`);
  }
});
