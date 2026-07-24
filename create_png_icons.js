const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 implementation for PNG chunks
function makeCRCTable() {
  const cTable = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) {
      c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    }
    cTable[n] = c;
  }
  return cTable;
}

const crcTable = makeCRCTable();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const buf = Buffer.alloc(8 + len + 4);
  buf.writeUInt32BE(len, 0);
  buf.write(type, 4, 4, 'ascii');
  data.copy(buf, 8);
  const crcVal = crc32(buf.subarray(4, 8 + len));
  buf.writeUInt32BE(crcVal, 8 + len);
  return buf;
}

function generatePNG(width, height, isMaskable = false) {
  // 1. Signature
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // 2. IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData.writeUInt8(8, 8); // Bit depth
  ihdrData.writeUInt8(6, 9); // Color type: 6 = RGBA
  ihdrData.writeUInt8(0, 10); // Compression
  ihdrData.writeUInt8(0, 11); // Filter
  ihdrData.writeUInt8(0, 12); // Interlace
  const ihdr = createChunk('IHDR', ihdrData);

  // 3. Raw Scanlines
  const rawScanlines = Buffer.alloc(height * (1 + width * 4));
  let offset = 0;

  const cx = width / 2;
  const cy = height / 2;
  const radius = width * (isMaskable ? 0.45 : 0.4);

  for (let y = 0; y < height; y++) {
    rawScanlines[offset++] = 0; // Filter byte: 0 (None)
    for (let x = 0; x < width; x++) {
      const dx = x - cx;
      const dy = y - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let r = 9, g = 9, b = 11, a = 255; // Default dark bg #09090b

      if (dist <= radius) {
        // Gradient fill from indigo (#4F46E5) to purple (#818CF8)
        const t = (x + y) / (width + height);
        r = Math.round(79 * (1 - t) + 129 * t);
        g = Math.round(70 * (1 - t) + 140 * t);
        b = Math.round(229 * (1 - t) + 248 * t);

        // Add inner algorithm node shape / icon symbol
        const nodeDist = Math.sqrt(dx * dx + dy * dy);
        if (nodeDist < radius * 0.3) {
          r = 56; g = 189; b = 248; // Cyan glowing center #38BDF8
        } else if (Math.abs(dx) < radius * 0.15 || Math.abs(dy) < radius * 0.15) {
          r = 255; g = 255; b = 255; // White cross connector lines
        }
      } else if (!isMaskable) {
        // Transparent outer edges if not maskable
        a = 0; r = 0; g = 0; b = 0;
      }

      rawScanlines[offset++] = r;
      rawScanlines[offset++] = g;
      rawScanlines[offset++] = b;
      rawScanlines[offset++] = a;
    }
  }

  // 4. Compress scanlines with zlib DEFLATE
  const compressedData = zlib.deflateSync(rawScanlines);
  const idat = createChunk('IDAT', compressedData);

  // 5. IEND
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([sig, ihdr, idat, iend]);
}

const publicDir = path.join(__dirname, 'client', 'public');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

console.log('Generating PWA PNG Icons...');

const icon192 = generatePNG(192, 192, false);
fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), icon192);
console.log('✓ Created pwa-192x192.png (Size:', icon192.length, 'bytes)');

const icon512 = generatePNG(512, 512, false);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), icon512);
console.log('✓ Created pwa-512x512.png (Size:', icon512.length, 'bytes)');

const iconMaskable512 = generatePNG(512, 512, true);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), iconMaskable512);
console.log('✓ Created pwa-maskable-512x512.png (Size:', iconMaskable512.length, 'bytes)');

console.log('All PWA PNG icons generated successfully!');
