const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find all functions starting with setMcuByte
const setRegex = /setMcuByte\w+:function/g;
let match;
while ((match = setRegex.exec(content)) !== null) {
  const funcName = match[0].split(':')[0];
  const idx = match.index;
  console.log(`\n=================== FUNCTION: ${funcName} ===================`);
  console.log(content.slice(idx, idx + 1000).replace(/\s+/g, ' '));
}

// Find Page({ data: { ... } }) variables like cupsAll, modesAll
const keywords = ['cupsAll:', 'cupsAll1:', 'modesAll:', 'productmodes:', 'mcu_byte2_text:'];
keywords.forEach(kw => {
  console.log(`\n=================== KEYWORD: ${kw} ===================`);
  let idx = 0;
  while ((idx = content.indexOf(kw, idx)) !== -1) {
    console.log(content.slice(idx - 50, idx + 300).replace(/\s+/g, ' '));
    idx += kw.length;
  }
});
