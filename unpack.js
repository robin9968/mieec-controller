const fs = require('fs');
const path = require('path');

const wxapkgFile = path.join(__dirname, 'decrypted_app.wxapkg');
const outputDir = path.join(__dirname, 'extracted');

try {
  console.log('Reading decrypted file:', wxapkgFile);
  const buf = fs.readFileSync(wxapkgFile);

  // Check header
  const firstMark = buf[0];
  console.log('First mark (should be 0xbe):', firstMark.toString(16));
  if (firstMark !== 0xbe) {
    console.error('Error: Invalid package header mark!');
    process.exit(1);
  }

  const version = buf.readUInt32BE(1);
  const indexLen = buf.readUInt32BE(5);
  const bodyLen = buf.readUInt32BE(9);
  const lastMark = buf[13];
  console.log('Last mark (should be 0xed):', lastMark.toString(16));
  if (lastMark !== 0xed) {
    console.error('Error: Invalid package end header mark!');
    process.exit(1);
  }

  const fileCount = buf.readUInt32BE(14);
  console.log(`Version: ${version}, Index Length: ${indexLen}, Body Length: ${bodyLen}, File Count: ${fileCount}`);

  let offset = 18;
  const files = [];

  for (let i = 0; i < fileCount; i++) {
    if (offset + 4 > buf.length) {
      console.error(`Error: buffer overflow at index ${i} when reading name length.`);
      break;
    }
    const nameLen = buf.readUInt32BE(offset);
    offset += 4;

    if (offset + nameLen > buf.length) {
      console.error(`Error: buffer overflow at index ${i} when reading name of length ${nameLen}.`);
      break;
    }
    const name = buf.slice(offset, offset + nameLen).toString('utf-8');
    offset += nameLen;

    if (offset + 4 > buf.length) {
      console.error(`Error: buffer overflow at index ${i} when reading file offset.`);
      break;
    }
    const fileOffset = buf.readUInt32BE(offset);
    offset += 4;

    if (offset + 4 > buf.length) {
      console.error(`Error: buffer overflow at index ${i} when reading file size.`);
      break;
    }
    const fileSize = buf.readUInt32BE(offset);
    offset += 4;

    console.log(`Parsed index ${i}: nameLen=${nameLen}, name="${name}", fileOffset=${fileOffset}, fileSize=${fileSize}`);
    files.push({ name, offset: fileOffset, size: fileSize });
  }

  console.log(`Parsed ${files.length} file metadata entries.`);

  // Create output directory
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Extract each file
  files.forEach((file) => {
    // Sanitize path (remove leading slash if any)
    let relativePath = file.name;
    if (relativePath.startsWith('/')) {
      relativePath = relativePath.slice(1);
    }

    const fullPath = path.join(outputDir, relativePath);
    const dir = path.dirname(fullPath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const fileData = buf.slice(file.offset, file.offset + file.size);
    fs.writeFileSync(fullPath, fileData);
    console.log(`Extracted: ${file.name} (${file.size} bytes)`);
  });

  console.log('All files extracted successfully to:', outputDir);
} catch (err) {
  console.error('An error occurred during unpacking:', err);
}
