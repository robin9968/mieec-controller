const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

const wxid = 'wx46c1cae5162e2847';
const salt = 'saltiest';
const iv = 'the iv: 16 bytes';
const iterations = 1000;

const encryptedFile = 'C:\\Users\\robin\\AppData\\Roaming\\Tencent\\xwechat\\radium\\users\\c2e54708fa1b610b9c495667f6fa7744\\applet\\packages\\wx46c1cae5162e2847\\86\\__APP__.wxapkg';
const outputFile = path.join(__dirname, 'decrypted_app.wxapkg');

try {
  console.log('Reading file:', encryptedFile);
  const fileBuffer = fs.readFileSync(encryptedFile);

  const signature = fileBuffer.slice(0, 6).toString('utf-8');
  console.log('File signature:', signature);
  if (signature !== 'V1MMWX') {
    console.error('Error: Not a V1MMWX encrypted file!');
    process.exit(1);
  }

  console.log('Deriving key via PBKDF2...');
  const key = crypto.pbkdf2Sync(wxid, salt, iterations, 32, 'sha1');

  console.log('Decrypting AES header...');
  const encryptedHead = fileBuffer.slice(6, 6 + 1024);
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, Buffer.from(iv, 'utf-8'));
  // Let auto padding handle PKCS7 padding removal if present
  decipher.setAutoPadding(true);
  const decryptedHead = Buffer.concat([decipher.update(encryptedHead), decipher.final()]);

  console.log('Decrypting XOR body...');
  const encryptedTail = fileBuffer.slice(6 + 1024);
  const xorKey = wxid.charCodeAt(wxid.length - 2);
  const decryptedTail = Buffer.alloc(encryptedTail.length);
  for (let i = 0; i < encryptedTail.length; i++) {
    decryptedTail[i] = encryptedTail[i] ^ xorKey;
  }

  const decryptedFile = Buffer.concat([decryptedHead, decryptedTail]);
  fs.writeFileSync(outputFile, decryptedFile);
  console.log('Success! Decrypted file written to:', outputFile);
} catch (err) {
  console.error('An error occurred during decryption:', err);
}
