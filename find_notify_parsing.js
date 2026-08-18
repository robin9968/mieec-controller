const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Let's search for occurrences of onBLECharacteristicValueChange or similar callback names
// Common WeChat BLE notify triggers:
// - onBLECharacteristicValueChange
// - ArrayBuffer
// - dataView
// - getUint8 or getUint16
// - throwdata or throw_data

const searchTerms = [
  'onBLECharacteristicValueChange',
  'throwdata',
  'maxSpeed',
  'throwSpeed',
  'throwDistance',
  'unpackValue',
  'mcu_byte'
];

searchTerms.forEach(term => {
  let pos = 0;
  console.log(`\n=================== SEARCHING FOR: ${term} ===================`);
  let count = 0;
  while ((pos = content.indexOf(term, pos)) !== -1 && count < 10) {
    const snippet = content.slice(Math.max(0, pos - 150), Math.min(content.length, pos + 250)).replace(/\s+/g, ' ');
    console.log(`  Match ${count+1}: ... ${snippet} ...`);
    pos += term.length;
    count++;
  }
});
