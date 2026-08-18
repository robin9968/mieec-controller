const fs = require('fs');
const path = require('path');

const filepath = path.join(__dirname, 'extracted', 'chunk_0.appservice.js');
if (!fs.existsSync(filepath)) {
  console.error('File not found!');
  process.exit(1);
}

const content = fs.readFileSync(filepath, 'utf-8');

// Find all Page( or Component( or define( calls
let pos = 0;
const pageMatches = [];
while ((pos = content.indexOf('Page({', pos)) !== -1) {
  pageMatches.push({ type: 'Page', pos });
  pos += 6;
}

// Find all occurrences of combineValue and click_type
const targets = ['combineValue:', 'click_type:', 'unpackValue:', 'usersetcombineValue:'];
targets.forEach(target => {
  console.log(`\n=================== ${target} OCCURRENCES ===================`);
  let idx = 0;
  while ((idx = content.indexOf(target, idx)) !== -1) {
    // Find which Page this belongs to (the nearest Page({ before this index)
    let parentPage = 'Unknown';
    let parentPagePos = -1;
    for (let i = pageMatches.length - 1; i >= 0; i--) {
      if (pageMatches[i].pos < idx) {
        parentPagePos = pageMatches[i].pos;
        // Let's grab some context before the Page({ to find the path/name of the page
        const pageContext = content.slice(Math.max(0, parentPagePos - 120), parentPagePos);
        parentPage = pageContext.replace(/\s+/g, ' ');
        break;
      }
    }
    console.log(`Found at index ${idx} in Page near [ ${parentPage} ]:`);
    console.log(content.slice(idx, idx + 800).replace(/\s+/g, ' ') + '...');
    idx += target.length;
  }
});
