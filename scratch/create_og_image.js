const sharp = require('sharp');
const path = require('path');

async function createOgImage() {
  const width = 1200;
  const height = 630;

  // SVG overlay for crisp branding & typography
  const svgOverlay = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#F5F5F7" />
      
      <!-- Ambient decorative gradient circle -->
      <circle cx="950" cy="315" r="300" fill="#EAE6E1" opacity="0.6" />
      
      <!-- Brand Kicker -->
      <text x="80" y="140" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="700" letter-spacing="4" fill="#8C5333">BABA TEE GLOBAL - UNDERG, OGBOMOSO</text>
      
      <!-- Main Title -->
      <text x="80" y="240" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="700" letter-spacing="-2" fill="#111115">Quality.</text>
      <text x="80" y="325" font-family="system-ui, -apple-system, sans-serif" font-size="72" font-weight="500" letter-spacing="-2" fill="#2C1810">Affordable.</text>
      
      <!-- Subtitle -->
      <text x="80" y="400" font-family="system-ui, -apple-system, sans-serif" font-size="22" font-weight="400" fill="#555555">Certified UK Used &amp; Brand New Gadgets</text>
      <text x="80" y="435" font-family="system-ui, -apple-system, sans-serif" font-size="18" font-weight="400" fill="#777777">iPhones - Samsung - Google Pixel - MacBooks - Dell XPS</text>
      
      <!-- Trust Badges -->
      <rect x="80" y="490" width="220" height="44" rx="8" fill="#FFFFFF" stroke="#E2DCD5" stroke-width="1" />
      <text x="100" y="518" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#6B3E26">Physical Store at UnderG</text>
      
      <rect x="320" y="490" width="220" height="44" rx="8" fill="#FFFFFF" stroke="#E2DCD5" stroke-width="1" />
      <text x="340" y="518" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="600" fill="#6B3E26">Nationwide Insured Delivery</text>
    </svg>
  `);

  // Resize transparent iPhone lineup to fit on right
  const lineupBuffer = await sharp('public/images/iphone-18-lineup-transparent.png')
    .resize(520, 520, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .toBuffer();

  // Composite SVG background and iPhone lineup
  await sharp(svgOverlay)
    .composite([
      {
        input: lineupBuffer,
        top: 60,
        left: 630,
      },
    ])
    .jpeg({ quality: 92 })
    .toFile('public/images/og-image.jpg');

  console.log('og-image.jpg created successfully at 1200x630!');
}

createOgImage().catch(console.error);
