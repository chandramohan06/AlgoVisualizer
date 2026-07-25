/**
 * AlgoVisualizer PWA Icon Generator (Production Quality)
 * Generates icons that match the actual brand SVG: triangle graph with colored nodes
 * on a dark-to-indigo gradient background.
 *
 * Brand colors:
 *  - Background gradient: #4F46E5 (top-left) -> #09090B (bottom-right)
 *  - Triangle stroke: white
 *  - Top node (apex): #38BDF8 (cyan)
 *  - Bottom-left node: #818CF8 (purple)
 *  - Bottom-right node: #34D399 (green)
 */

const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// ─── CRC32 ───────────────────────────────────────────────────────────────────
function makeCRCTable() {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
    t[n] = c;
  }
  return t;
}
const CRC_TABLE = makeCRCTable();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = CRC_TABLE[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function makeChunk(type, data) {
  const b = Buffer.alloc(8 + data.length + 4);
  b.writeUInt32BE(data.length, 0);
  b.write(type, 4, 4, 'ascii');
  data.copy(b, 8);
  b.writeUInt32BE(crc32(b.subarray(4, 8 + data.length)), 8 + data.length);
  return b;
}

// ─── Drawing helpers ─────────────────────────────────────────────────────────
function lerp(a, b, t) { return a + (b - a) * t; }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

/** Distance from point (px,py) to line segment (ax,ay)-(bx,by) */
function distToSegment(px, py, ax, ay, bx, by) {
  const dx = bx - ax, dy = by - ay;
  const lenSq = dx * dx + dy * dy;
  if (lenSq === 0) return Math.hypot(px - ax, py - ay);
  const t = clamp(((px - ax) * dx + (py - ay) * dy) / lenSq, 0, 1);
  return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
}

/** Soft anti-aliased circle membership: 1 inside, 0 outside, smooth at edge */
function circleAA(px, py, cx, cy, r) {
  const d = Math.hypot(px - cx, py - cy);
  return clamp(r - d + 0.5, 0, 1);
}

/** Anti-aliased line segment coverage */
function lineAA(px, py, ax, ay, bx, by, hw) {
  const d = distToSegment(px, py, ax, ay, bx, by);
  return clamp(hw - d + 0.5, 0, 1);
}

/**
 * Alpha-blend src (r,g,b,a in 0-255) over dst (r,g,b in 0-255)
 * Returns [r,g,b] (all 0-255)
 */
function blend(dr, dg, db, sr, sg, sb, sa) {
  const alpha = sa / 255;
  return [
    Math.round(dr * (1 - alpha) + sr * alpha),
    Math.round(dg * (1 - alpha) + sg * alpha),
    Math.round(db * (1 - alpha) + sb * alpha),
  ];
}

// ─── Main generator ──────────────────────────────────────────────────────────
function generateIcon(size, maskable) {
  // For maskable icons, no transparency; use full canvas with safe-zone content
  const RGBA = new Uint8Array(size * size * 4);

  // Safe zone for maskable = 80% (content in center 80% means padding is 10% each side)
  const pad = maskable ? size * 0.1 : 0;
  const contentSize = size - 2 * pad;

  // Triangle vertices (scaled to contentSize, then offset by pad)
  // Apex at top-center, base at bottom
  const margin = contentSize * 0.12;
  const apexX  = pad + contentSize / 2;
  const apexY  = pad + margin;
  const baseY  = pad + contentSize - margin;
  const baseX1 = pad + margin;
  const baseX2 = pad + contentSize - margin;

  const nodeR  = contentSize * (size >= 256 ? 0.055 : 0.06);
  const lineHW = contentSize * (size >= 256 ? 0.022 : 0.025);

  // Background gradient: indigo (#4F46E5) top-left -> near-black (#09090B) bottom-right
  const bg1 = [0x4F, 0x46, 0xE5];
  const bg2 = [0x09, 0x09, 0x0B];

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const idx = (y * size + x) * 4;
      const t = (x + y) / (2 * (size - 1));

      // Background color (gradient)
      let r = Math.round(lerp(bg1[0], bg2[0], t));
      let g = Math.round(lerp(bg1[1], bg2[1], t));
      let b = Math.round(lerp(bg1[2], bg2[2], t));
      let a = maskable ? 255 : 0; // transparent bg for non-maskable

      // For non-maskable, add rounded-rect clipping (rx = size * 0.2)
      if (!maskable) {
        const rx = size * 0.2;
        const ix = Math.min(x, size - 1 - x);
        const iy = Math.min(y, size - 1 - y);
        if (ix >= rx || iy >= rx) {
          a = 255;
        } else {
          const dist = Math.hypot(rx - ix, rx - iy);
          const cov = clamp(rx - dist + 0.5, 0, 1);
          a = Math.round(cov * 255);
        }
      }

      // ── Triangle edges (white) ──────────────────────────────────────────
      const edgeAB = lineAA(x, y, apexX, apexY, baseX1, baseY, lineHW);
      const edgeAC = lineAA(x, y, apexX, apexY, baseX2, baseY, lineHW);
      const edgeBC = lineAA(x, y, baseX1, baseY, baseX2, baseY, lineHW);
      const edgeCov = Math.max(edgeAB, edgeAC, edgeBC);

      if (edgeCov > 0) {
        const result = blend(r, g, b, 255, 255, 255, Math.round(edgeCov * 255));
        r = result[0]; g = result[1]; b = result[2];
        if (!maskable) a = Math.max(a, Math.round(edgeCov * 255));
      }

      // ── Apex node: cyan #38BDF8 ─────────────────────────────────────────
      const apexCov = circleAA(x, y, apexX, apexY, nodeR);
      if (apexCov > 0) {
        const result = blend(r, g, b, 0x38, 0xBD, 0xF8, Math.round(apexCov * 255));
        r = result[0]; g = result[1]; b = result[2];
        if (!maskable) a = Math.max(a, Math.round(apexCov * 255));
      }

      // ── Bottom-left node: purple #818CF8 ───────────────────────────────
      const blCov = circleAA(x, y, baseX1, baseY, nodeR);
      if (blCov > 0) {
        const result = blend(r, g, b, 0x81, 0x8C, 0xF8, Math.round(blCov * 255));
        r = result[0]; g = result[1]; b = result[2];
        if (!maskable) a = Math.max(a, Math.round(blCov * 255));
      }

      // ── Bottom-right node: green #34D399 ───────────────────────────────
      const brCov = circleAA(x, y, baseX2, baseY, nodeR);
      if (brCov > 0) {
        const result = blend(r, g, b, 0x34, 0xD3, 0x99, Math.round(brCov * 255));
        r = result[0]; g = result[1]; b = result[2];
        if (!maskable) a = Math.max(a, Math.round(brCov * 255));
      }

      RGBA[idx]     = r;
      RGBA[idx + 1] = g;
      RGBA[idx + 2] = b;
      RGBA[idx + 3] = a;
    }
  }

  // ── Build PNG ─────────────────────────────────────────────────────────────
  // Signature
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(size, 0);
  ihdrData.writeUInt32BE(size, 4);
  ihdrData.writeUInt8(8, 8);   // bit depth
  ihdrData.writeUInt8(6, 9);   // colour type: RGBA
  ihdrData.writeUInt8(0, 10);  // compression
  ihdrData.writeUInt8(0, 11);  // filter
  ihdrData.writeUInt8(0, 12);  // interlace

  // Raw scanlines with filter byte = 0 (None)
  const raw = Buffer.alloc(size * (1 + size * 4));
  for (let row = 0; row < size; row++) {
    raw[row * (1 + size * 4)] = 0; // filter byte
    for (let col = 0; col < size; col++) {
      const src = (row * size + col) * 4;
      const dst = row * (1 + size * 4) + 1 + col * 4;
      raw[dst]     = RGBA[src];
      raw[dst + 1] = RGBA[src + 1];
      raw[dst + 2] = RGBA[src + 2];
      raw[dst + 3] = RGBA[src + 3];
    }
  }

  const compressed = zlib.deflateSync(raw, { level: 9 });
  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdrData),
    makeChunk('IDAT', compressed),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ─── Write Files ─────────────────────────────────────────────────────────────
const outDir = path.join(__dirname, 'client', 'public');
fs.mkdirSync(outDir, { recursive: true });

console.log('Generating production-quality AlgoVisualizer PWA icons...\n');

const icon192 = generateIcon(192, false);
fs.writeFileSync(path.join(outDir, 'pwa-192x192.png'), icon192);
console.log(`✓ pwa-192x192.png         ${icon192.length} bytes`);

const icon512 = generateIcon(512, false);
fs.writeFileSync(path.join(outDir, 'pwa-512x512.png'), icon512);
console.log(`✓ pwa-512x512.png         ${icon512.length} bytes`);

const iconM512 = generateIcon(512, true);
fs.writeFileSync(path.join(outDir, 'pwa-maskable-512x512.png'), iconM512);
console.log(`✓ pwa-maskable-512x512.png ${iconM512.length} bytes`);

console.log('\nAll PWA PNG icons regenerated successfully!');
