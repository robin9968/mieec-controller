const http = require('http');
const fs = require('fs');
const path = require('path');
const os = require('os');

const PORT = 8080;
const PUBLIC_DIR = __dirname;

const server = http.createServer((req, res) => {
  let filePath = path.join(PUBLIC_DIR, req.url === '/' ? 'index.html' : req.url);
  
  // Simple router
  const ext = path.extname(filePath);
  let contentType = 'text/html';
  if (ext === '.js') contentType = 'text/javascript';
  if (ext === '.css') contentType = 'text/css';
  if (ext === '.png') contentType = 'image/png';
  if (ext === '.jpg') contentType = 'image/jpeg';
  if (ext === '.json') contentType = 'application/json';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// Find local IP address
const interfaces = os.networkInterfaces();
const addresses = [];
for (const k in interfaces) {
  for (const k2 in interfaces[k]) {
    const address = interfaces[k][k2];
    if (address.family === 'IPv4' && !address.internal) {
      addresses.push(address.address);
    }
  }
}

server.listen(PORT, () => {
  console.log(`\n======================================================`);
  console.log(`🚀 MIIEC Controller Server läuft!`);
  console.log(`🌐 Lokal auf dem PC: http://localhost:${PORT}`);
  console.log(`\n📱 Auf dem iPhone öffnen (im selben WLAN-Netzwerk):`);
  if (addresses.length === 0) {
    console.log(`⚠️ Keine WLAN-IP-Adresse gefunden. Vergewissern Sie sich, dass Ihr PC im WLAN ist.`);
  } else {
    addresses.forEach(ip => {
      console.log(`👉 http://${ip}:${PORT}`);
    });
  }
  console.log(`======================================================\n`);
});
