const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find function positions
const functions = ['combineValue', 'unpackValue', 'keypoppwdcombineValue', '_setMcuStorage', 'unpackValue'];

functions.forEach(fnName => {
  console.log(`\n=================== SEARCHING FOR: ${fnName} ===================`);
  let idx = 0;
  while ((idx = content.indexOf(fnName + ':', idx)) !== -1) {
    // Extract 2000 characters from the start of the function definition to see the whole function
    const start = idx;
    const end = Math.min(content.length, idx + 3000);
    const snippet = content.slice(start, end);
    console.log(`Found "${fnName}" at index ${idx}:`);
    console.log(snippet.slice(0, 2000) + '\n... [TRUNCATED] ...');
    idx += fnName.length;
  }
});
